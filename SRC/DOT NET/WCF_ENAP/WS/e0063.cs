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
            // Evento 
            int ID_EMPRESA,
            int ID_EVENTO,
            // Datos Trabajador 
            string RUT_TRABAJADOR,
            string NOMBRES,
            string APELLIDO_MATERNO,
            string APELLIDO_PATERNO,
            string ANOS_EXPERIENCIA_CARGO,
            string ANOS_EXPERIENCIA_LABORAL,
            int ID_CARGO,
            // Tipo Incidente a persona
            int[] TIPO_INCIDENTE_PERSONA_LIST,
            // Causa Inmediata Acción
            int[] CAUSA_INMEDIATA_ACCION_LIST,
            // Factores de la persona
            int[] CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA,
            int[] CAUSA_LISTA_FATORES_AUTOCUIDADO,
            int[] CAUSA_LISTA_FATORES_CAP_MENTAL,
            int[] CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO,
            int[] CAUSA_LISTA_FATORES_FALTA_HABILIDAD,
            int[] CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA,
            int[] CAUSA_LISTA_FATORES_TECNCION_MENTAL,


            //causas patrimonio
            int[] TIPO_INCIDENTE_PATRIMONIO_LIST,
            int[] CAUSA_INMEDIATA_ACCION_PATRIMONIO_LIST,
            // Factores de la patrimonio
            int[] CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO,
            int[] CAUSA_LISTA_FACTORES_ING_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_COMPRAS_INADECUADAS,
            int[] CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADO,
            int[] CAUSA_LISTA_FACTORES_HERRAMIENTAS_INADECUADAS,
            int[] CAUSA_LISTA_FACTORES_USO_DESGASTE,
            int[] CAUSA_LISTA_FACTORES_ABUSO,
            int[] CAUSA_LISTA_FACTORES_ERRORES,

            int ID_TRABAJADOR,
            int ID_EVENTO_EMPRESA,
            int ID_EVENTO_TRABAJADOR,
            int ID_PELIGRO,
            int ID_CAUSA


            )
        {
            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();

            if (ID_EMPRESA == 0)
            {
                ID_EMPRESA = 1;
            }
            // Declaro un atributo para trabajarlo abajo
            TBL_EVENTO_EMPRESA existeEventoEmpresa = null;
            try
            {
                //Busco en la base de datos un registro con los parametros asignados
                existeEventoEmpresa = (from evento_empresa in bd.TBL_EVENTO_EMPRESA
                                       where evento_empresa.ID_EVENTO == ID_EVENTO && evento_empresa.ID_EMPRESA == ID_EMPRESA
                                       select evento_empresa).Single<TBL_EVENTO_EMPRESA>();
                //Si no existe morira
            }//ingresa dos veces el id_evento_empresa
            catch (Exception ex) { }
            //si el atributo sigue siendo nulo lo creo
            if (existeEventoEmpresa == null)
            {
                existeEventoEmpresa = new TBL_EVENTO_EMPRESA()
                {
                    ID_EVENTO = ID_EVENTO,
                    ID_EMPRESA = ID_EMPRESA,
                    ESTADO = true
                };
                bd.TBL_EVENTO_EMPRESA.InsertOnSubmit(existeEventoEmpresa);
                bd.SubmitChanges();
            }
            TBL_I_PRELIMINAR nuevoInformePreliminar = null;
            try
            {
                nuevoInformePreliminar = (from informe_preliminar in bd.TBL_I_PRELIMINAR
                                          where informe_preliminar.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA //&& informe_preliminar.ID_EMPRESA == ID_EMPRESA
                                          select informe_preliminar).Single<TBL_I_PRELIMINAR>();
            }
            catch (Exception ex) { }
            if (nuevoInformePreliminar == null)
            {
                nuevoInformePreliminar = new TBL_I_PRELIMINAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    FECHA_INGRESO = DateTime.Now,
                    CLASIFICACION = CLASIFICACION
                };
                bd.TBL_I_PRELIMINAR.InsertOnSubmit(nuevoInformePreliminar);
                bd.SubmitChanges();
            }
            TBL_TRABAJADOR nuevoTrabajador = null;
            try
            {
                nuevoTrabajador = (from trabajador in bd.TBL_TRABAJADOR
                                   where trabajador.RUT_TRABAJADOR == RUT_TRABAJADOR
                                   select trabajador).Single<TBL_TRABAJADOR>();
            }
            catch (Exception ex) { }
            if (nuevoTrabajador == null)
            {
                nuevoTrabajador = new TBL_TRABAJADOR()
                {
                    RUT_TRABAJADOR = RUT_TRABAJADOR,
                    NOMBRES = NOMBRES,
                    APELLIDO_MATERNO = APELLIDO_MATERNO,
                    APELLIDO_PATERNO = APELLIDO_PATERNO,
                    ANOS_EXPERIENCIA_CARGO = int.Parse(ANOS_EXPERIENCIA_CARGO),
                    ID_CARGO = ID_CARGO,
                    ANOS_EXPERIENCIA_LABORAL = int.Parse(ANOS_EXPERIENCIA_LABORAL)
                };
                bd.TBL_TRABAJADOR.InsertOnSubmit(nuevoTrabajador);
                bd.SubmitChanges();
            }
            TBL_EVENTO_TRABAJADOR existeEventoTrabajador = null;
            try
            {
                existeEventoTrabajador = (from evento_trabajador in bd.TBL_EVENTO_TRABAJADOR
                                          where evento_trabajador.ID_TRABAJADOR == ID_TRABAJADOR && evento_trabajador.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR
                                          select evento_trabajador).Single<TBL_EVENTO_TRABAJADOR>();
            }
            catch (Exception ex) { }
            if (existeEventoTrabajador == null)
            {
                existeEventoTrabajador = new TBL_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_TRABAJADOR = nuevoTrabajador.ID_TRABAJADOR
                };
                bd.TBL_EVENTO_TRABAJADOR.InsertOnSubmit(existeEventoTrabajador);
                bd.SubmitChanges();
            }
            foreach (int idPeligro in TIPO_INCIDENTE_PERSONA_LIST)
            {
                TBL_PELIGRO_EVENTO_TRABAJADOR nuevoPeligroEncontrado = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
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
            foreach (int idCapacidadFisicaPsicologicaInadecuada in CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFCPsI = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCapacidadFisicaPsicologicaInadecuada
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFCPsI);
                bd.SubmitChanges();
            }
            foreach (int idFactoresAutocuidado in CAUSA_LISTA_FATORES_AUTOCUIDADO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFAC = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresAutocuidado
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFAC);
                bd.SubmitChanges();
            }
            foreach (int idFactoresCapMental in CAUSA_LISTA_FATORES_CAP_MENTAL)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFCM = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresCapMental
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFCM);
                bd.SubmitChanges();
            }
            foreach (int idFactoresFaltaConocimiento in CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFC = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresFaltaConocimiento
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFC);
                bd.SubmitChanges();
            }
            foreach (int idFactoresFaltaHabilidad in CAUSA_LISTA_FATORES_FALTA_HABILIDAD)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFFH = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresFaltaHabilidad
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFFH);
                bd.SubmitChanges();
            }
            foreach (int idFactoresMotivacionInadecuada in CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaFMI = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresMotivacionInadecuada
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaFMI);
                bd.SubmitChanges();
            }
            foreach (int idFactoresTencionMental in CAUSA_LISTA_FATORES_TECNCION_MENTAL)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaListaTM = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idFactoresTencionMental
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaListaTM);
                bd.SubmitChanges();
            }


   //*datos incidente patrimonio*//
            
            foreach (int idTipoIncidente_Patrimonio in TIPO_INCIDENTE_PATRIMONIO_LIST)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaIncidentePatrimonio = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idTipoIncidente_Patrimonio
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaIncidentePatrimonio);
                bd.SubmitChanges();
            }
            foreach (int idCausaInmediataAccionPatrimonio in CAUSA_INMEDIATA_ACCION_PATRIMONIO_LIST)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaAccionPatrimonio = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaInmediataAccionPatrimonio
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaAccionPatrimonio);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresFaltaLiderasgo in CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresFaltaLiderasgo = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresFaltaLiderasgo
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresFaltaLiderasgo);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresIngInadecuada in CAUSA_LISTA_FACTORES_ING_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresIngInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresIngInadecuada
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresIngInadecuada);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresComprasInadecuadas in CAUSA_LISTA_FACTORES_COMPRAS_INADECUADAS)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresComprasInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresComprasInadecuadas
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresComprasInadecuada);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresMantenimientoInadecuado in CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresMantenimientoInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresMantenimientoInadecuado
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresMantenimientoInadecuada);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresHerramientaInadecuado in CAUSA_LISTA_FACTORES_HERRAMIENTAS_INADECUADAS)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresHerramientaInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresHerramientaInadecuado
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresHerramientaInadecuada);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresUsoDesgaste in CAUSA_LISTA_FACTORES_USO_DESGASTE)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresUsoDesgaste = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresUsoDesgaste
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresUsoDesgaste);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresAbuso in CAUSA_LISTA_FACTORES_ABUSO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresAbuso = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresAbuso
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresAbuso);
                bd.SubmitChanges();
            }
            foreach (int idCausaFactoresErrores in CAUSA_LISTA_FACTORES_ERRORES)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFatoresErrores = new TBL_CAUSA_INFORME_PRELIMIANAR
                {
                    ID_INFORME_PRELIMINAR = nuevoInformePreliminar.ID_INFORME_PRELIMINAR,
                    ID_CAUSA = idCausaFactoresErrores
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFatoresErrores);
                bd.SubmitChanges();
            }

            // objJSON.items = nuevo;
            objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
            objJSON.success = true;

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