/**
*Imports.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using WCF_ENAP.WS;

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class e0063
    {
        private DataClassesEnapDataContext bd;

        public e0063()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_I_PRELIMINAR>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<TBL_I_PRELIMINAR>> objJSON = new JSONCollection<List<TBL_I_PRELIMINAR>>();
            try
            {
                if (_dir == null)
                {
                    _dir = "DESC";
                }
                if (_page == 0)
                {
                    _page = 1;
                }
                if (_limit == 0)
                {
                    _limit = 10;
                }
                _start = (_page * _limit) - _limit;
                var query = bd.TBL_I_PRELIMINAR.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_I_PRELIMINAR> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count<TBL_I_PRELIMINAR>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }




        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_I_PRELIMINAR> Create(
            int CLASIFICACION,
            int ID_EMPRESA,
            /* Evento */
            int ID_EVENTO,
            /* Datos Trabajador */
            string RUT_TRABAJADOR,
            string NOMBRES,
            string APELLIDO_MATERNO,
            string APELLIDO_PATERNO,
            string ANOS_EXPERIENCIA_CARGO,
            string ANOS_EXPERIENCIA_LABORAL,
            int ID_TRABAJADOR,
            int ID_CARGO,
            /* Tipo Incidente a persona*/
            int[] TIPO_INCIDENTE_PERSONA_LIST,
            /* Causa Inmediata Acción*/
            int[] CAUSA_INMEDIATA_ACCION_LIST,
            /* Factores de la persona*/
            int[] CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA,
            int[] CAUSA_LISTA_FATORES_AUTOCUIDADO,
            int[] CAUSA_LISTA_FATORES_CAP_MENTAL,
            int[] CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO,
            int[] CAUSA_LISTA_FATORES_FALTA_HABILIDAD,
            int[] CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA,
            int[] CAUSA_LISTA_FATORES_TECNCION_MENTAL)
        {
            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                if (ID_EMPRESA == 0)
                {
                    ID_EMPRESA = 1;
                }
                TBL_EVENTO_EMPRESA nuevoEventoEmpresa = new TBL_EVENTO_EMPRESA()
                {
                    ID_EVENTO = ID_EVENTO,
                    ID_EMPRESA = ID_EMPRESA,
                    ESTADO = true
                };

                bd.TBL_EVENTO_EMPRESA.InsertOnSubmit(nuevoEventoEmpresa);
                bd.SubmitChanges();

                TBL_I_PRELIMINAR nuevoInformePreliminar = new TBL_I_PRELIMINAR()
                {
                    //ID_EVENTO_EMPRESA = nuevoEventoEmpresa.ID_EVENTO_EMPRESA,
                    FECHA_INGRESO = DateTime.Now,// CONSULAR CONFIGURACION DE SERVIDOOR
                    CLASIFICACION = CLASIFICACION
                };
                bd.TBL_I_PRELIMINAR.InsertOnSubmit(nuevoInformePreliminar);
                bd.SubmitChanges();
                /*Consultar si existe*/
                TBL_TRABAJADOR nuevoTrabajador = new TBL_TRABAJADOR()
                {
                    RUT_TRABAJADOR = RUT_TRABAJADOR,
                    NOMBRES = NOMBRES,
                    APELLIDO_MATERNO = APELLIDO_MATERNO,
                    APELLIDO_PATERNO = APELLIDO_PATERNO,
                    ANOS_EXPERIENCIA_CARGO = int.Parse(ANOS_EXPERIENCIA_CARGO),
                    ANOS_EXPERIENCIA_LABORAL = int.Parse(ANOS_EXPERIENCIA_LABORAL)
                };
                bd.TBL_TRABAJADOR.InsertOnSubmit(nuevoTrabajador);
                bd.SubmitChanges();
                
                TBL_EVENTO_TRABAJADOR nuevoEventoTrabajador = new TBL_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = nuevoEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_TRABAJADOR = nuevoTrabajador.ID_TRABAJADOR
                    
                };
                bd.TBL_EVENTO_TRABAJADOR.InsertOnSubmit(nuevoEventoTrabajador);
                bd.SubmitChanges();

                foreach(int idPeligro in TIPO_INCIDENTE_PERSONA_LIST) {
                    TBL_PELIGRO_EVENTO_TRABAJADOR nuevoPeligroEncontrado = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                    {
                        ID_EVENTO_TRABAJADOR = nuevoEventoTrabajador.ID_EVENTO_TRABAJADOR,
                        ID_PELIGRO = idPeligro
                    };
                    bd.TBL_PELIGRO_EVENTO_TRABAJADOR.InsertOnSubmit(nuevoPeligroEncontrado);
                    bd.SubmitChanges();
                }
                foreach (int idCausaInmediata in CAUSA_INMEDIATA_ACCION_LIST)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idCausaInmediata
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                    bd.SubmitChanges();
                }
                foreach (int idCapacidadFisicaInadecuada in CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFCFI = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idCapacidadFisicaInadecuada
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFCFI);
                    bd.SubmitChanges();
                
                }
                foreach (int idCapacidadFisicaPsicologicaInadecuada in CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFCPsI = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idCapacidadFisicaPsicologicaInadecuada
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFCPsI);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresAutocuidado in CAUSA_LISTA_FATORES_AUTOCUIDADO )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFAC = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresAutocuidado
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFAC);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresCapMental in CAUSA_LISTA_FATORES_CAP_MENTAL )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFCM = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresCapMental
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFCM);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresFaltaConocimiento in CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFC = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresFaltaConocimiento
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFC);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresFaltaHabilidad in CAUSA_LISTA_FATORES_FALTA_HABILIDAD )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFFH = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresFaltaHabilidad
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFFH);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresMotivacionInadecuada in CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFMI = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresMotivacionInadecuada
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFMI);
                    bd.SubmitChanges();
                }
                foreach (int idFactoresTencionMental in CAUSA_LISTA_FATORES_TECNCION_MENTAL )
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaTM = new TBL_CAUSA_INFORME_PRELIMIANAR
                    {
                        ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                        ID_CAUSA = idFactoresTencionMental
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaTM);
                    bd.SubmitChanges();
                }


                // objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_I_PRELIMINAR> Get(string id)
        {
            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                objJSON.items = (from variable in bd.TBL_I_PRELIMINAR where variable.ID_INFORME_PRELIMINAR == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_I_PRELIMINAR> Update(string id, TBL_I_PRELIMINAR nuevo)
        {

            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                var objeto = (from variable in bd.TBL_I_PRELIMINAR
                              where variable.ID_INFORME_PRELIMINAR == int.Parse(id)
                              select variable).Single();
                objeto.ID_INFORME_PRELIMINAR = nuevo.ID_INFORME_PRELIMINAR;
                objeto.ID_EVENTO_EMPRESA = nuevo.ID_EVENTO_EMPRESA;
                objeto.FECHA_INGRESO = nuevo.FECHA_INGRESO;
                objeto.CLASIFICACION = nuevo.CLASIFICACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;

        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
        public void Delete(string id)
        {
            var objeto = (from variable in bd.TBL_I_PRELIMINAR
                          where variable.ID_INFORME_PRELIMINAR == int.Parse(id)
                          select variable).First();

            bd.TBL_I_PRELIMINAR.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("ID_INFORME_PRELIMINAR"))
                {
                    return "E00_ID_INFORME";
                }
                if (_sort.Equals("ID_EVENTO_EMPRESA"))
                {
                    return "ID_EVENTO_EMPRESA";
                }
                if (_sort.Equals("FECHA_INGRESO"))
                {
                    return "FECHA_INGRESO";
                }
                if (_sort.Equals("CLASIFICACION"))
                {
                    return "CLASIFICACION";
                }

            }
            return "ID_INFORME_PRELIMINAR";
        }
    }
}