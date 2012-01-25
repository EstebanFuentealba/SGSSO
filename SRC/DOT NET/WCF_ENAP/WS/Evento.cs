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
using System.Globalization;
using System.Web.Script.Serialization;

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    public class InformePreliminarJSON
    {
        public int ID_INFORME_PRELIMINAR;
        public int ID_EVENTO_EMPRESA;

        public bool AFECTA_PERSONA = false;
        public bool AFECTA_PATRIMONIO = false;
        public bool AFECTA_PERDIDA_PROCESO = false;
        public bool AFECTA_MEDIO_AMBIENTE = false;
        public bool AFECTA_IMAGEN = false;

        public int CLASIFICACION_TRABAJADOR;
        public int CLASIFICACION_PATRIMONIO;
        public int CLASIFICACION_MEDIO_AMBIENTE;
        public int CLASIFICACION_PERDIDA_PROCESO;
        public int CLASIFICACION_IMAGEN;

        public int[] TIPO_INCIDENTE_PATRIMONIO;
        public int[] TIPO_INCIDENTE_PERSONA;

        public int[] CAUSA_INMEDIATA_ACCION_PATRIMONIO;

        public int[] CAUSA_LISTA_FACTORES_ABUSO_MALTRATO;
        public int[] CAUSA_LISTA_FACTORES_ING_INADECUADA;
        public int[] CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA;
        public int[] CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA;
        public int[] CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO;
        public int[] CAUSA_LISTA_FACTORES_USO_DESGASTE;
        public int[] CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO;

    }
    public class TrabajadorInvolucradoJSON
    {
        public int ID_EVENTO_TRABAJADOR;
        public int ID_EVENTO_EMPRESA;
        public string RUT_TRABAJADOR;
        public string NOMBRES;
        public string APELLIDO_MATERNO;
        public string APELLIDO_PATERNO;
        public int ANOS_EXPERIENCIA_CARGO;
        public int ANOS_EXPERIENCIA_LABORAL;
        public int ID_CARGO;
        public int ID_MATRIZ;
        public bool IS_CTP;
        // Causa Inmediata Acción
        public int[] CAUSA_INMEDIATA_ACCION;
        // Factores de la persona
        public int[] CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA;
        public int[] CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA;
        public int[] CAUSA_LISTA_FATORES_TENSION_FISICA;
        public int[] CAUSA_LISTA_FATORES_TENSION_MENTAL;
        public int[] CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO;
        public int[] CAUSA_LISTA_FATORES_FALTA_HABILIDAD;
        public int[] CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA;
        public int[] CAUSA_LISTA_FATORES_AUTOCUIDADO;
        public int[] CAUSA_LISTA_FACTORES_ERRORES;
    }
    public class ExtJSSort
    {
        public string property;
        public string direction;
        public ExtJSSort() { }
    }
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class Evento
    {
        private DataClassesEnapDataContext bd;

        public Evento()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "preliminar?ID_EVENTO_EMPRESA={ID_EVENTO_EMPRESA}")]
        public JSONCollection<InformePreliminarJSON> GetInformePreliminar(
            int ID_EVENTO_EMPRESA)
        {
            JSONCollection<InformePreliminarJSON> objJSON = new JSONCollection<InformePreliminarJSON>();
            var resultsCausas = ( from cip in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                            join ca in bd.TBL_CAUSA on cip.ID_CAUSA equals ca.ID_CAUSA
                            where cip.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                            orderby ca.TIPO_CAUSA ascending
                            select ca).ToList();
            var resultsEvaluaciones = (from ev in bd.TBL_EVALUACION_INCIDENTE
                                 where ev.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                 orderby ev.AFECTA ascending
                                 select ev).ToList();
            var resultsPeligros = (from pet in bd.TBL_PELIGRO_EVENTO_TRABAJADOR
                                   join pe in bd.TBL_PELIGRO on pet.ID_PELIGRO equals pe.ID_PELIGRO
                                   where pet.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                   orderby pe.TIPO_PELIGRO ascending
                                   select pe).ToList();
            InformePreliminarJSON informePreliminar = new InformePreliminarJSON();
            List<int> incidenteOtro = new List<int>();
            List<int> incidentePersona = new List<int>(); 
            foreach (TBL_PELIGRO peligro in resultsPeligros)
            {
                if (peligro.TIPO_PELIGRO == 1)
                {
                    incidentePersona.Add(peligro.ID_PELIGRO);
                }
                else if (peligro.TIPO_PELIGRO == 2)
                {
                    incidenteOtro.Add(peligro.ID_PELIGRO);
                }
            }
            informePreliminar.TIPO_INCIDENTE_PATRIMONIO = incidenteOtro.ToArray();
            informePreliminar.TIPO_INCIDENTE_PERSONA = incidentePersona.ToArray();

            foreach (TBL_EVALUACION_INCIDENTE evaluacion in resultsEvaluaciones)
            {
                if (evaluacion.AFECTA == 1)
                {
                    informePreliminar.CLASIFICACION_TRABAJADOR = (int)evaluacion.CALIFICACION;
                    informePreliminar.AFECTA_PERSONA = true;
                }
                else if (evaluacion.AFECTA == 2)
                {
                    informePreliminar.CLASIFICACION_PATRIMONIO = (int)evaluacion.CALIFICACION;
                    informePreliminar.AFECTA_PATRIMONIO = true;
                }
                else if (evaluacion.AFECTA == 3)
                {
                    informePreliminar.CLASIFICACION_PERDIDA_PROCESO = (int)evaluacion.CALIFICACION;
                    informePreliminar.AFECTA_PERDIDA_PROCESO = true;
                }
                else if (evaluacion.AFECTA == 4)
                {
                    informePreliminar.CLASIFICACION_MEDIO_AMBIENTE = (int)evaluacion.CALIFICACION;
                    informePreliminar.AFECTA_MEDIO_AMBIENTE = true;
                }
                else if (evaluacion.AFECTA == 5)
                {
                    informePreliminar.CLASIFICACION_IMAGEN = (int)evaluacion.CALIFICACION;
                    informePreliminar.AFECTA_IMAGEN = true;
                }
            }
            List<int> condiciones = new List<int>();
            List<int> abusoMaltrato = new List<int>();
            List<int> ingInadecuada = new List<int>();
            List<int> adquisicionesInadecuada = new List<int>();
            List<int> mantencionInadecuada = new List<int>();
            List<int> herramientaEquipoInadecuada = new List<int>();
            List<int> usoDesgaste = new List<int>();
            List<int> faltaLiderazgo = new List<int>();
            foreach (TBL_CAUSA causa in resultsCausas)
            {
                if (causa.TIPO_CAUSA == e0063.CAUSA_CONDICION)
                {
                    condiciones.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_FACTORES_ABUSO)
                {
                    abusoMaltrato.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_ING_INADECUADA)
                {
                    ingInadecuada.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_COMPRAS_INADECUADAS)
                {
                    adquisicionesInadecuada.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_MANTENIMIENTO_INADECUADO)
                {
                    mantencionInadecuada.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_HERR_EQUI_INADECUADO)
                {
                    herramientaEquipoInadecuada.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_USO_DESGASTE)
                {
                    usoDesgaste.Add(causa.ID_CAUSA);
                }
                else if (causa.TIPO_CAUSA == e0063.CAUSA_FALTA_LIDERAZGO)
                {
                    faltaLiderazgo.Add(causa.ID_CAUSA);
                }
            }
            informePreliminar.ID_INFORME_PRELIMINAR = ID_EVENTO_EMPRESA;
            informePreliminar.ID_EVENTO_EMPRESA = ID_EVENTO_EMPRESA; 
            informePreliminar.CAUSA_INMEDIATA_ACCION_PATRIMONIO = condiciones.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_ABUSO_MALTRATO = abusoMaltrato.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_ING_INADECUADA = ingInadecuada.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA = adquisicionesInadecuada.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA = mantencionInadecuada.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO = herramientaEquipoInadecuada.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_USO_DESGASTE = usoDesgaste.ToArray();
            informePreliminar.CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO = faltaLiderazgo.ToArray();
            objJSON.items = informePreliminar;
            objJSON.totalCount = 1;
            objJSON.success = true;
            //} catch (Exception ex) { objJSON.success = false; }
            return objJSON;
        }

        [WebGet(UriTemplate = "trabajadores?page={_page}&start={_start}&limit={_limit}&sort={_sort}&ID_EVENTO_EMPRESA={ID_EVENTO_EMPRESA}&ID_TRABAJADOR={ID_TRABAJADOR}")]
        public JSONCollection<List<TrabajadorInvolucradoJSON>> GetTrabajadores(
            int _page,
            int _start,
            int _limit,
            string _sort,
            int ID_EVENTO_EMPRESA,
            int ID_TRABAJADOR)
        {
            JSONCollection<List<TrabajadorInvolucradoJSON>> objJSON = new JSONCollection<List<TrabajadorInvolucradoJSON>>();
            ExtJSSort sort = null;
            if (_sort != null)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                sort = ser.Deserialize<ExtJSSort>(_sort.Replace("[", "").Replace("]", ""));
            }
            if (sort != null && sort.direction == null)
            {
                sort.direction = "DESC";
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

            var resultTrabajador = (from et in bd.TBL_EVENTO_TRABAJADOR
                                    join tr in bd.TBL_TRABAJADOR on et.ID_TRABAJADOR equals tr.ID_TRABAJADOR
                                    where et.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                    orderby tr.RUT_TRABAJADOR ascending
                                    select new { 
                                        et.ID_EVENTO_EMPRESA,
                                        et.ID_EVENTO_TRABAJADOR,
                                        tr.ID_TRABAJADOR,
                                        tr.RUT_TRABAJADOR,
                                        tr.NOMBRES,
                                        tr.APELLIDO_PATERNO,
                                        tr.APELLIDO_MATERNO,
                                        tr.ANOS_EXPERIENCIA_LABORAL,
                                        tr.ANOS_EXPERIENCIA_CARGO,
                                        tr.ID_CARGO,
                                        et.IS_CTP,
                                        et.ID_MATRIZ
                                    }).Skip(_start).Take(_limit);
            List<TrabajadorInvolucradoJSON> trabajadores = new List<TrabajadorInvolucradoJSON>();
                foreach (var trabajador in resultTrabajador)
                {
                    
                    TrabajadorInvolucradoJSON trabajadorInvolucrado = new TrabajadorInvolucradoJSON()
                    {
                        RUT_TRABAJADOR = trabajador.RUT_TRABAJADOR,
                        NOMBRES = trabajador.NOMBRES,
                        APELLIDO_PATERNO = trabajador.APELLIDO_PATERNO,
                        APELLIDO_MATERNO = trabajador.APELLIDO_MATERNO,
                        ANOS_EXPERIENCIA_LABORAL = (int)trabajador.ANOS_EXPERIENCIA_LABORAL,
                        ANOS_EXPERIENCIA_CARGO = (int)trabajador.ANOS_EXPERIENCIA_CARGO,
                        ID_CARGO = (int)trabajador.ID_CARGO,
                        IS_CTP = ((trabajador.IS_CTP == null) ? false : (bool)trabajador.IS_CTP)
                    };
                    if(trabajador.ID_MATRIZ != null && trabajador.ID_MATRIZ > 0){
                        trabajadorInvolucrado.ID_MATRIZ = (int)trabajador.ID_MATRIZ;
                    }
                    trabajadorInvolucrado.ID_EVENTO_TRABAJADOR = trabajador.ID_EVENTO_TRABAJADOR;
                    trabajadorInvolucrado.ID_EVENTO_EMPRESA = (int)trabajador.ID_EVENTO_EMPRESA;

                    var resultsCausas = (from ct in bd.TBL_CAUSA_TRABAJADOR
                                         join et in bd.TBL_EVENTO_TRABAJADOR on ct.ID_EVENTO_TRABAJADOR equals et.ID_EVENTO_TRABAJADOR
                                         join ca in bd.TBL_CAUSA on ct.ID_CAUSA equals ca.ID_CAUSA
                                         where et.ID_TRABAJADOR == trabajador.ID_TRABAJADOR
                                         orderby ca.TIPO_CAUSA ascending
                                         select ca).ToList();
                    List<int> acciones = new List<int>();
                    List<int> capFisicaInadecuada = new List<int>();
                    List<int> capPsicologicaInadecuada = new List<int>();
                    List<int> tensionFisicaFisiologica = new List<int>();
                    List<int> tensionMentalSicologica = new List<int>();
                    List<int> faltaConocimiento = new List<int>();
                    List<int> faltaHabilidad = new List<int>();
                    List<int> motivacionDeficiente = new List<int>();
                    List<int> autoCuidado = new List<int>();
                    List<int> errores = new List<int>(); 
                    foreach (TBL_CAUSA causa in resultsCausas)
                    {
                        
                        if (causa.TIPO_CAUSA == e0063.CAUSA_ACCION)
                        {
                            acciones.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_CAP_FISICA_INADECUADA)
                        {
                            capFisicaInadecuada.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_CAP_PSICOLOGICA_INADECUADA)
                        {
                            capPsicologicaInadecuada.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_TENSION_FISICA)
                        {
                            tensionFisicaFisiologica.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL)
                        {
                            tensionMentalSicologica.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_FALTA_CONOCIMIENTO)
                        {
                            faltaConocimiento.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_FALTA_HABILIDAD)
                        {
                            faltaHabilidad.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_MOTIVACION_INADECUADA)
                        {
                            motivacionDeficiente.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_AUTO_CUIDADO)
                        {
                            autoCuidado.Add(causa.ID_CAUSA);
                        }
                        else if (causa.TIPO_CAUSA == e0063.CAUSA_ERRORES)
                        {
                            errores.Add(causa.ID_CAUSA);
                        }
                    }
                    trabajadorInvolucrado.CAUSA_INMEDIATA_ACCION = acciones.ToArray();
                    
                    trabajadorInvolucrado.CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA = capFisicaInadecuada.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA = capPsicologicaInadecuada.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_TENSION_FISICA = tensionFisicaFisiologica.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_TENSION_MENTAL = tensionMentalSicologica.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO = faltaConocimiento.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_FALTA_HABILIDAD = faltaHabilidad.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA = motivacionDeficiente.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FATORES_AUTOCUIDADO = autoCuidado.ToArray();
                    trabajadorInvolucrado.CAUSA_LISTA_FACTORES_ERRORES = errores.ToArray();
                    trabajadores.Add(trabajadorInvolucrado);
                    
                }
            objJSON.items = trabajadores; 
            objJSON.totalCount = objJSON.items.Count;
            objJSON.success = true;
            //} catch (Exception ex) { objJSON.success = false; }
            return objJSON;
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&ID_ORGANIZACION={ID_ORGANIZACION}&ANO={ANO}&CALIFICACION={CALIFICACION}")]
        public JSONCollection<List<sp_get_eventos_listResult>> GetCollection(int _page,
            int _start,
            int _limit,
            string _sort,
            int ID_ORGANIZACION,
            int ANO,
            int CALIFICACION)
        {
            ExtJSSort sort = null;
            if (_sort != null)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                sort = ser.Deserialize<ExtJSSort>(_sort.Replace("[", "").Replace("]", ""));
            }
            JSONCollection<List<sp_get_eventos_listResult>> objJSON = new JSONCollection<List<sp_get_eventos_listResult>>();
            //try{
            if (ID_ORGANIZACION == 0)
            {
                ID_ORGANIZACION = 1;
            }
            if (ANO == 0)
            {
                ANO = DateTime.Now.Year;
            }
            if (sort != null && sort.direction == null)
            {
                sort.direction = "DESC";
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
            int CALIFICACION__ = 0;
            if (CALIFICACION != null)
            {
                CALIFICACION__ = CALIFICACION;
            }
            var query = bd.sp_get_eventos_list(_start, _limit, ID_ORGANIZACION, ANO, CALIFICACION__).OrderBy(orderBy(sort));
            //aki
            query = query.Select(r => r);
            List<sp_get_eventos_listResult> results = query.ToList(); // :S
            objJSON.items = results;
            objJSON.totalCount = bd.TBL_EVENTO.Count<TBL_EVENTO>();
            objJSON.success = true;
            //} catch (Exception ex) { objJSON.success = false; }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "preliminar/{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<InformePreliminarJSON> UpdateInformePreliminar(string id, InformePreliminarJSON nuevo)
        {
            JSONCollection<InformePreliminarJSON> objJSON = new JSONCollection<InformePreliminarJSON>();
            int ID_EVENTO_EMPRESA = int.Parse(id);
            try
            {

                TBL_EVENTO_EMPRESA existeEventoEmpresa = (from evento_empresa in bd.TBL_EVENTO_EMPRESA
                                                          where evento_empresa.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                                          select evento_empresa).Single<TBL_EVENTO_EMPRESA>();
                #region [CLASIFICACION] Elimino todos las evaluacionesy agrego las nuevas
                try
                {
                    var evaluacionesIncidente = (from variable in bd.TBL_EVALUACION_INCIDENTE
                                                 where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA
                                                 select variable).ToList();
                    bd.TBL_EVALUACION_INCIDENTE.DeleteAllOnSubmit(evaluacionesIncidente);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                if (nuevo.CLASIFICACION_TRABAJADOR != 0)
                {
                    TBL_EVALUACION_INCIDENTE evaluacionIncidenteTrabajador = new TBL_EVALUACION_INCIDENTE()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        AFECTA = 1,
                        CALIFICACION = nuevo.CLASIFICACION_TRABAJADOR
                    };
                    bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteTrabajador);
                    bd.SubmitChanges();
                }
                if (nuevo.CLASIFICACION_PATRIMONIO != 0)
                {
                    TBL_EVALUACION_INCIDENTE evaluacionIncidentePatrimonio = new TBL_EVALUACION_INCIDENTE()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        AFECTA = 2,
                        CALIFICACION = nuevo.CLASIFICACION_PATRIMONIO
                    };
                    bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidentePatrimonio);
                    bd.SubmitChanges();
                }
                if (nuevo.CLASIFICACION_MEDIO_AMBIENTE != 0)
                {
                    TBL_EVALUACION_INCIDENTE evaluacionIncidenteMedioAmbiente = new TBL_EVALUACION_INCIDENTE()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        AFECTA = 3,
                        CALIFICACION = nuevo.CLASIFICACION_MEDIO_AMBIENTE
                    };
                    bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteMedioAmbiente);
                    bd.SubmitChanges();
                }
                if (nuevo.CLASIFICACION_PERDIDA_PROCESO != 0)
                {
                    TBL_EVALUACION_INCIDENTE evaluacionIncidentePerdidaProceso = new TBL_EVALUACION_INCIDENTE()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        AFECTA = 4,
                        CALIFICACION = nuevo.CLASIFICACION_PERDIDA_PROCESO
                    };
                    bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidentePerdidaProceso);
                    bd.SubmitChanges();
                }
                if (nuevo.CLASIFICACION_IMAGEN != 0)
                {
                    TBL_EVALUACION_INCIDENTE evaluacionIncidenteImagen = new TBL_EVALUACION_INCIDENTE()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        AFECTA = 5,
                        CALIFICACION = nuevo.CLASIFICACION_IMAGEN
                    };
                    bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteImagen);
                    bd.SubmitChanges();
                }
                #endregion
                #region [TIPO_INCIDENTE_PATRIMONIO] Elimino los tipos de incidente de patrimonio que existieran y agrego los nuevas
                try
                {
                    var peligrosPatrimonio = (from variable in bd.TBL_PELIGRO_EVENTO_TRABAJADOR
                                              join peligro in bd.TBL_PELIGRO on variable.ID_PELIGRO equals peligro.ID_PELIGRO
                                              where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && peligro.TIPO_PELIGRO == 2
                                              select variable).ToList();
                    bd.TBL_PELIGRO_EVENTO_TRABAJADOR.DeleteAllOnSubmit(peligrosPatrimonio);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idPeligroPatrimonio in nuevo.TIPO_INCIDENTE_PATRIMONIO)
                {
                    TBL_PELIGRO_EVENTO_TRABAJADOR nuevaPeligroPatrimonio = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_PELIGRO = idPeligroPatrimonio
                    };
                    bd.TBL_PELIGRO_EVENTO_TRABAJADOR.InsertOnSubmit(nuevaPeligroPatrimonio);
                    bd.SubmitChanges();
                }
                #endregion
                #region [TIPO_INCIDENTE_PERSONA] Elimino los tipos de incidente de persona que existieran y agrego los nuevas
                try
                {
                    var peligrosPersona = (from variable in bd.TBL_PELIGRO_EVENTO_TRABAJADOR
                                           join peligro in bd.TBL_PELIGRO on variable.ID_PELIGRO equals peligro.ID_PELIGRO
                                           where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && peligro.TIPO_PELIGRO == 1
                                           select variable).ToList();
                    bd.TBL_PELIGRO_EVENTO_TRABAJADOR.DeleteAllOnSubmit(peligrosPersona);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idPeligroPersona in nuevo.TIPO_INCIDENTE_PERSONA)
                {
                    TBL_PELIGRO_EVENTO_TRABAJADOR nuevaPeligroPersona = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_PELIGRO = idPeligroPersona
                    };
                    bd.TBL_PELIGRO_EVENTO_TRABAJADOR.InsertOnSubmit(nuevaPeligroPersona);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_INMEDIATA_ACCION_PATRIMONIO] Elimino todos las causas inmediatas del informe preliminar y agrego las nuevas
                try
                {
                    var causaInmediata = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                          join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                          where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_CONDICION
                                          select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaInmediata);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaCondicion in nuevo.CAUSA_INMEDIATA_ACCION_PATRIMONIO)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaCondicion
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_ABUSO_MALTRATO] Elimino todos las causas abuso maltrato del informe preliminar y agrego las nuevas
                try
                {
                    var causaAbusoMaltrato = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                              join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                              where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FACTORES_ABUSO
                                              select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaAbusoMaltrato);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaAbusoMaltrato in nuevo.CAUSA_LISTA_FACTORES_ABUSO_MALTRATO)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaAbusoMaltrato = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaAbusoMaltrato
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaAbusoMaltrato);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_ING_INADECUADA] Elimino todos las causas ingeniería inadecuada del informe preliminar y agrego las nuevas
                try
                {
                    var causaIngInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                              join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                              where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_ING_INADECUADA
                                              select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaIngInadecuada);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaIngInadecuada in nuevo.CAUSA_LISTA_FACTORES_ING_INADECUADA)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaIngInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaIngInadecuada
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaIngInadecuada);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA] Elimino todos las causas compras inadecuadas del informe preliminar y agrego las nuevas
                try
                {
                    var causaComprasInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                                  join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                  where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_COMPRAS_INADECUADAS
                                                  select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaComprasInadecuada);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaComprasInadecuada in nuevo.CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaComprasInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaComprasInadecuada
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaComprasInadecuada);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA] Elimino todos las causas mantenimiento inadecuadas del informe preliminar y agrego las nuevas
                try
                {
                    var causaMantenimientoInadecuado = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                                        join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                        where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_MANTENIMIENTO_INADECUADO
                                                        select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaMantenimientoInadecuado);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaMantenimientoInadecuado in nuevo.CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaMantenimientoInadecuado = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaMantenimientoInadecuado
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaMantenimientoInadecuado);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO] Elimino todos las causas herramientas y equipos inadecuados del informe preliminar y agrego las nuevas
                try
                {
                    var causaHerramientaEquipoInadecuado = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                                            join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                            where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_HERR_EQUI_INADECUADO
                                                            select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaHerramientaEquipoInadecuado);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaHerramientaEquipoInadecuado in nuevo.CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaHerramientaEquipoInadecuado = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaHerramientaEquipoInadecuado
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaHerramientaEquipoInadecuado);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_USO_DESGASTE] Elimino todos las causas uso desgaste inadecuadas del informe preliminar y agrego las nuevas
                try
                {
                    var causaUsoDesgaste = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                            join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                            where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_USO_DESGASTE
                                            select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaUsoDesgaste);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaUsoDesgaste in nuevo.CAUSA_LISTA_FACTORES_USO_DESGASTE)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaCausaUsoDesgaste = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaUsoDesgaste
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaCausaUsoDesgaste);
                    bd.SubmitChanges();
                }
                #endregion
                #region [CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO] Elimino todos las causas falta de liderazgo del informe preliminar y agrego las nuevas
                try
                {
                    var causaFaltaLiderazgo = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                               join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                               where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_LIDERAZGO
                                               select variable).ToList();
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaFaltaLiderazgo);
                    bd.SubmitChanges();
                }
                catch (Exception ex) { }
                foreach (int idCausaFaltaLiderazgo in nuevo.CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO)
                {
                    TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFaltaLiderazgo = new TBL_CAUSA_INFORME_PRELIMIANAR()
                    {
                        ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                        ID_CAUSA = idCausaFaltaLiderazgo
                    };
                    bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFaltaLiderazgo);
                    bd.SubmitChanges();
                }
                #endregion

                InformePreliminarJSON informePreliminar = new InformePreliminarJSON()
                {
                    ID_INFORME_PRELIMINAR = ID_EVENTO_EMPRESA,
                    ID_EVENTO_EMPRESA = ID_EVENTO_EMPRESA,
                    CLASIFICACION_TRABAJADOR = nuevo.CLASIFICACION_TRABAJADOR,
                    CLASIFICACION_PATRIMONIO = nuevo.CLASIFICACION_PATRIMONIO,
                    CLASIFICACION_MEDIO_AMBIENTE = nuevo.CLASIFICACION_MEDIO_AMBIENTE,
                    CLASIFICACION_PERDIDA_PROCESO = nuevo.CLASIFICACION_PERDIDA_PROCESO,
                    CLASIFICACION_IMAGEN = nuevo.CLASIFICACION_IMAGEN,
                    TIPO_INCIDENTE_PATRIMONIO = nuevo.TIPO_INCIDENTE_PATRIMONIO,
                    TIPO_INCIDENTE_PERSONA = nuevo.TIPO_INCIDENTE_PERSONA,
                    CAUSA_INMEDIATA_ACCION_PATRIMONIO = nuevo.CAUSA_INMEDIATA_ACCION_PATRIMONIO,
                    CAUSA_LISTA_FACTORES_ABUSO_MALTRATO = nuevo.CAUSA_LISTA_FACTORES_ABUSO_MALTRATO,
                    CAUSA_LISTA_FACTORES_ING_INADECUADA = nuevo.CAUSA_LISTA_FACTORES_ING_INADECUADA,
                    CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA = nuevo.CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA,
                    CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA = nuevo.CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA,
                    CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO = nuevo.CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO,
                    CAUSA_LISTA_FACTORES_USO_DESGASTE = nuevo.CAUSA_LISTA_FACTORES_USO_DESGASTE,
                    CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO = nuevo.CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO
                };
                objJSON.items = informePreliminar;
                objJSON.success = true;
                objJSON.totalCount = 1;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }


        [WebInvoke(UriTemplate = "preliminar", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<InformePreliminarJSON> AddInformacionPreliminar(
            int ID_EVENTO_EMPRESA,

            int CLASIFICACION_TRABAJADOR,
            int CLASIFICACION_PATRIMONIO,
            int CLASIFICACION_MEDIO_AMBIENTE,
            int CLASIFICACION_PERDIDA_PROCESO,
            int CLASIFICACION_IMAGEN,

            int[] TIPO_INCIDENTE_PATRIMONIO,
            int[] TIPO_INCIDENTE_PERSONA,

            int[] CAUSA_INMEDIATA_ACCION_PATRIMONIO,

            int[] CAUSA_LISTA_FACTORES_ABUSO_MALTRATO,
            int[] CAUSA_LISTA_FACTORES_ING_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO,
            int[] CAUSA_LISTA_FACTORES_USO_DESGASTE,
            int[] CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO
        )
        {
            #region Si no viene la ID_EMPRESA , declaro por defecto ERBB
            int ID_EMPRESA = 1;

            #endregion

            JSONCollection<InformePreliminarJSON> objJSON = new JSONCollection<InformePreliminarJSON>();

            TBL_EVENTO_EMPRESA existeEventoEmpresa = (from evento_empresa in bd.TBL_EVENTO_EMPRESA
                                                      where evento_empresa.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                                      select evento_empresa).Single<TBL_EVENTO_EMPRESA>();
            #region [CLASIFICACION] Elimino todos las evaluacionesy agrego las nuevas
            try
            {
                var evaluacionesIncidente = (from variable in bd.TBL_EVALUACION_INCIDENTE
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA
                                      select variable).ToList();
                bd.TBL_EVALUACION_INCIDENTE.DeleteAllOnSubmit(evaluacionesIncidente);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            if (CLASIFICACION_TRABAJADOR != 0)
            {
                TBL_EVALUACION_INCIDENTE evaluacionIncidenteTrabajador = new TBL_EVALUACION_INCIDENTE()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    AFECTA = 1,
                    CALIFICACION = CLASIFICACION_TRABAJADOR
                };
                bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteTrabajador);
                bd.SubmitChanges();
            }
            if (CLASIFICACION_PATRIMONIO != 0)
            {
                TBL_EVALUACION_INCIDENTE evaluacionIncidentePatrimonio = new TBL_EVALUACION_INCIDENTE()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    AFECTA = 2,
                    CALIFICACION = CLASIFICACION_PATRIMONIO
                };
                bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidentePatrimonio);
                bd.SubmitChanges();
            }
            if (CLASIFICACION_MEDIO_AMBIENTE != 0)
            {
                TBL_EVALUACION_INCIDENTE evaluacionIncidenteMedioAmbiente = new TBL_EVALUACION_INCIDENTE()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    AFECTA = 3,
                    CALIFICACION = CLASIFICACION_MEDIO_AMBIENTE
                };
                bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteMedioAmbiente);
                bd.SubmitChanges();
            }
            if (CLASIFICACION_PERDIDA_PROCESO != 0)
            {
                TBL_EVALUACION_INCIDENTE evaluacionIncidentePerdidaProceso = new TBL_EVALUACION_INCIDENTE()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    AFECTA = 4,
                    CALIFICACION = CLASIFICACION_PERDIDA_PROCESO
                };
                bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidentePerdidaProceso);
                bd.SubmitChanges();
            }
            if (CLASIFICACION_IMAGEN != 0)
            {
                TBL_EVALUACION_INCIDENTE evaluacionIncidenteImagen = new TBL_EVALUACION_INCIDENTE()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    AFECTA = 5,
                    CALIFICACION = CLASIFICACION_IMAGEN
                };
                bd.TBL_EVALUACION_INCIDENTE.InsertOnSubmit(evaluacionIncidenteImagen);
                bd.SubmitChanges();
            }
            #endregion
            #region [TIPO_INCIDENTE_PATRIMONIO] Elimino los tipos de incidente de patrimonio que existieran y agrego los nuevas
            try
            {
                var peligrosPatrimonio = (from variable in bd.TBL_PELIGRO_EVENTO_TRABAJADOR
                                      join peligro in bd.TBL_PELIGRO on variable.ID_PELIGRO equals peligro.ID_PELIGRO
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && peligro.TIPO_PELIGRO == 2
                                      select variable).ToList();
                bd.TBL_PELIGRO_EVENTO_TRABAJADOR.DeleteAllOnSubmit(peligrosPatrimonio);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idPeligroPatrimonio in TIPO_INCIDENTE_PATRIMONIO)
            {
                TBL_PELIGRO_EVENTO_TRABAJADOR nuevaPeligroPatrimonio = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_PELIGRO = idPeligroPatrimonio
                };
                bd.TBL_PELIGRO_EVENTO_TRABAJADOR.InsertOnSubmit(nuevaPeligroPatrimonio);
                bd.SubmitChanges();
            }
            #endregion
            #region [TIPO_INCIDENTE_PERSONA] Elimino los tipos de incidente de persona que existieran y agrego los nuevas
            try
            {
                var peligrosPersona = (from variable in bd.TBL_PELIGRO_EVENTO_TRABAJADOR
                                          join peligro in bd.TBL_PELIGRO on variable.ID_PELIGRO equals peligro.ID_PELIGRO
                                          where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && peligro.TIPO_PELIGRO == 1
                                          select variable).ToList();
                bd.TBL_PELIGRO_EVENTO_TRABAJADOR.DeleteAllOnSubmit(peligrosPersona);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idPeligroPersona in TIPO_INCIDENTE_PERSONA)
            {
                TBL_PELIGRO_EVENTO_TRABAJADOR nuevaPeligroPersona = new TBL_PELIGRO_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_PELIGRO = idPeligroPersona
                };
                bd.TBL_PELIGRO_EVENTO_TRABAJADOR.InsertOnSubmit(nuevaPeligroPersona);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_INMEDIATA_ACCION_PATRIMONIO] Elimino todos las causas inmediatas del informe preliminar y agrego las nuevas
            try
            {
                var causaInmediata = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_CONDICION
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaInmediata);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaCondicion in CAUSA_INMEDIATA_ACCION_PATRIMONIO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaCondicion
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_ABUSO_MALTRATO] Elimino todos las causas abuso maltrato del informe preliminar y agrego las nuevas
            try
            {
                var causaAbusoMaltrato = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FACTORES_ABUSO
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaAbusoMaltrato);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaAbusoMaltrato in CAUSA_LISTA_FACTORES_ABUSO_MALTRATO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaAbusoMaltrato = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaAbusoMaltrato
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaAbusoMaltrato);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_ING_INADECUADA] Elimino todos las causas ingeniería inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var causaIngInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_ING_INADECUADA
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaIngInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaIngInadecuada in CAUSA_LISTA_FACTORES_ING_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaIngInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaIngInadecuada
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaIngInadecuada);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA] Elimino todos las causas compras inadecuadas del informe preliminar y agrego las nuevas
            try
            {
                var causaComprasInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_COMPRAS_INADECUADAS
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaComprasInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaComprasInadecuada in CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaComprasInadecuada = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaComprasInadecuada
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaComprasInadecuada);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA] Elimino todos las causas mantenimiento inadecuadas del informe preliminar y agrego las nuevas
            try
            {
                var causaMantenimientoInadecuado = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_MANTENIMIENTO_INADECUADO
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaMantenimientoInadecuado);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaMantenimientoInadecuado in CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaMantenimientoInadecuado = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaMantenimientoInadecuado
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaMantenimientoInadecuado);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO] Elimino todos las causas herramientas y equipos inadecuados del informe preliminar y agrego las nuevas
            try
            {
                var causaHerramientaEquipoInadecuado = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_HERR_EQUI_INADECUADO
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaHerramientaEquipoInadecuado);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaHerramientaEquipoInadecuado in CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaHerramientaEquipoInadecuado = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaHerramientaEquipoInadecuado
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaHerramientaEquipoInadecuado);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_USO_DESGASTE] Elimino todos las causas uso desgaste inadecuadas del informe preliminar y agrego las nuevas
            try
            {
                var causaUsoDesgaste = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_USO_DESGASTE
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaUsoDesgaste);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaUsoDesgaste in CAUSA_LISTA_FACTORES_USO_DESGASTE)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaCausaUsoDesgaste = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaUsoDesgaste
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaCausaUsoDesgaste);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO] Elimino todos las causas falta de liderazgo del informe preliminar y agrego las nuevas
            try
            {
                var causaFaltaLiderazgo = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_LIDERAZGO
                                      select variable).ToList();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteAllOnSubmit(causaFaltaLiderazgo);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaFaltaLiderazgo in CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaFaltaLiderazgo = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaFaltaLiderazgo
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaFaltaLiderazgo);
                bd.SubmitChanges();
            }
            #endregion

            InformePreliminarJSON informePreliminar = new InformePreliminarJSON()
            {
                ID_INFORME_PRELIMINAR = ID_EVENTO_EMPRESA,
                ID_EVENTO_EMPRESA = ID_EVENTO_EMPRESA,
                CLASIFICACION_TRABAJADOR = CLASIFICACION_TRABAJADOR,
                CLASIFICACION_PATRIMONIO = CLASIFICACION_PATRIMONIO,
                CLASIFICACION_MEDIO_AMBIENTE = CLASIFICACION_MEDIO_AMBIENTE,
                CLASIFICACION_PERDIDA_PROCESO = CLASIFICACION_PERDIDA_PROCESO,
                CLASIFICACION_IMAGEN = CLASIFICACION_IMAGEN,
                TIPO_INCIDENTE_PATRIMONIO = TIPO_INCIDENTE_PATRIMONIO,
                TIPO_INCIDENTE_PERSONA = TIPO_INCIDENTE_PERSONA,
                CAUSA_INMEDIATA_ACCION_PATRIMONIO = CAUSA_INMEDIATA_ACCION_PATRIMONIO,
                CAUSA_LISTA_FACTORES_ABUSO_MALTRATO = CAUSA_LISTA_FACTORES_ABUSO_MALTRATO,
                CAUSA_LISTA_FACTORES_ING_INADECUADA = CAUSA_LISTA_FACTORES_ING_INADECUADA,
                CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA = CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA,
                CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA = CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA,
                CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO = CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO,
                CAUSA_LISTA_FACTORES_USO_DESGASTE = CAUSA_LISTA_FACTORES_USO_DESGASTE,
                CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO = CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO
            };
            objJSON.items = informePreliminar;
            objJSON.totalCount = 1;
            objJSON.success = true;
            return objJSON;
        }
        [WebInvoke(UriTemplate = "trabajadores", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TrabajadorInvolucradoJSON> AddTrabajadorInvolucrado(
            // Evento 
            int ID_EVENTO,
            int ID_EVENTO_EMPRESA,

            // Datos Trabajador 
            string RUT_TRABAJADOR,
            string NOMBRES,
            string APELLIDO_MATERNO,
            string APELLIDO_PATERNO,
            int ANOS_EXPERIENCIA_CARGO,
            int ANOS_EXPERIENCIA_LABORAL,
            int ID_CARGO,
            int ID_MATRIZ,
            bool IS_CTP,
            // Causa Inmediata Acción
            int[] CAUSA_INMEDIATA_ACCION,
            // Factores de la persona
            int[] CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA,
            int[] CAUSA_LISTA_FATORES_TENSION_FISICA,
            int[] CAUSA_LISTA_FATORES_TENSION_MENTAL,
            int[] CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO,
            int[] CAUSA_LISTA_FATORES_FALTA_HABILIDAD,
            int[] CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA,
            int[] CAUSA_LISTA_FATORES_AUTOCUIDADO,
            int[] CAUSA_LISTA_FACTORES_ERRORES
        )
        {
            JSONCollection<TrabajadorInvolucradoJSON> objJSON = new JSONCollection<TrabajadorInvolucradoJSON>();

            #region Si no viene la ID_EMPRESA , declaro por defecto ERBB
            int ID_EMPRESA = 1;
            
            #endregion

            TBL_EVENTO_EMPRESA existeEventoEmpresa = (from evento_empresa in bd.TBL_EVENTO_EMPRESA
                                                      where evento_empresa.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                                      select evento_empresa).Single<TBL_EVENTO_EMPRESA>();

            #region Busco si existe un trabajador en el sistema, osino lo creo
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
                    ANOS_EXPERIENCIA_CARGO = ANOS_EXPERIENCIA_CARGO,
                    ID_CARGO = ID_CARGO,
                    ANOS_EXPERIENCIA_LABORAL = ANOS_EXPERIENCIA_LABORAL
                };
                bd.TBL_TRABAJADOR.InsertOnSubmit(nuevoTrabajador);
                bd.SubmitChanges();
            }
            #endregion

            #region Busco si existe un trabajador en un evento trabajador, osino lo creo
            TBL_EVENTO_TRABAJADOR existeEventoTrabajador = null;
            try
            {
                existeEventoTrabajador = (from evento_trabajador in bd.TBL_EVENTO_TRABAJADOR
                                          where evento_trabajador.ID_TRABAJADOR == nuevoTrabajador.ID_TRABAJADOR && evento_trabajador.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA
                                          select evento_trabajador).Single<TBL_EVENTO_TRABAJADOR>();
            }
            catch (Exception ex) { }
            if (existeEventoTrabajador == null)
            {
                existeEventoTrabajador = new TBL_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_TRABAJADOR = nuevoTrabajador.ID_TRABAJADOR,
                    IS_CTP = IS_CTP
                };
                if (ID_MATRIZ != null && ID_MATRIZ > 0)
                {
                    existeEventoTrabajador.ID_MATRIZ = ID_MATRIZ;
                }
                bd.TBL_EVENTO_TRABAJADOR.InsertOnSubmit(existeEventoTrabajador);
                bd.SubmitChanges();
            }
            #endregion

            #region [CAUSA_INMEDIATA_ACCION] Elimino todos las causas inmediatas del informe preliminar y agrego las nuevas
            try
            {
                var causaInmediata = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_ACCION
                                      select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(causaInmediata);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in CAUSA_INMEDIATA_ACCION)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA] Elimino todos las causas de  Capaciadad fisica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capFisicaInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                           join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                           where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_CAP_FISICA_INADECUADA
                                           select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(capFisicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA] Elimino todos las causas de  Capaciadad psicologica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var cappsicologicaInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                                join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_CAP_PSICOLOGICA_INADECUADA
                                                select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(cappsicologicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_TENSION_FISICA] Elimino todos las causas de TENSIÓN FISICA inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capMental = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                 join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                 where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                 select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(capMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_TENSION_FISICA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_TENSION_MENTAL] Elimino todos las causas de  tensión mental del informe preliminar y agrego las nuevas
            try
            {
                var tensionMental = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                     join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                     where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                     select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(tensionMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_TENSION_MENTAL)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO] Elimino todos las causas de  falta de conocimiento del informe preliminar y agrego las nuevas
            try
            {
                var faltaConocimiento = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                         join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                         where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_CONOCIMIENTO
                                         select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(faltaConocimiento);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_HABILIDAD] Elimino todos las causas de  falta de habilidad del informe preliminar y agrego las nuevas
            try
            {
                var faltaHabilidad = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_HABILIDAD
                                      select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(faltaHabilidad);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_FALTA_HABILIDAD)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA] Elimino todos las causas de motivacion inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var motivacionInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                            join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                            where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_MOTIVACION_INADECUADA
                                            select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(motivacionInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_AUTOCUIDADO] Elimino todos las causas de autocuidado del informe preliminar y agrego las nuevas
            try
            {
                var autoCuidado = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                   join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                   where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_AUTO_CUIDADO
                                   select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(autoCuidado);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_AUTOCUIDADO)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_ERRORES] Elimino todos las causas de errores del informe preliminar y agrego las nuevas
            try
            {
                var errores = (from variable in bd.TBL_CAUSA_TRABAJADOR
                               join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                               where variable.ID_EVENTO_TRABAJADOR == existeEventoTrabajador.ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_ERRORES
                               select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(errores);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_ERRORES)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion

            TrabajadorInvolucradoJSON trabajadorInvolucrado = new TrabajadorInvolucradoJSON()
            {
                ID_EVENTO_EMPRESA = (int)existeEventoTrabajador.ID_EVENTO_EMPRESA,
                ID_EVENTO_TRABAJADOR = existeEventoTrabajador.ID_EVENTO_TRABAJADOR,
                RUT_TRABAJADOR = RUT_TRABAJADOR,
                NOMBRES = NOMBRES,
                APELLIDO_PATERNO =APELLIDO_PATERNO,
                APELLIDO_MATERNO = APELLIDO_MATERNO,
                ANOS_EXPERIENCIA_LABORAL = (int)ANOS_EXPERIENCIA_LABORAL,
                ANOS_EXPERIENCIA_CARGO = ANOS_EXPERIENCIA_CARGO,
                ID_CARGO = ID_CARGO,
                IS_CTP = IS_CTP,
                CAUSA_INMEDIATA_ACCION = CAUSA_INMEDIATA_ACCION,
                CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA = CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA,
                CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA = CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA,
                CAUSA_LISTA_FATORES_TENSION_FISICA = CAUSA_LISTA_FATORES_TENSION_FISICA,
                CAUSA_LISTA_FATORES_TENSION_MENTAL = CAUSA_LISTA_FATORES_TENSION_MENTAL,
                CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO = CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO,
                CAUSA_LISTA_FATORES_FALTA_HABILIDAD = CAUSA_LISTA_FATORES_FALTA_HABILIDAD,
                CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA = CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA,
                CAUSA_LISTA_FATORES_AUTOCUIDADO = CAUSA_LISTA_FATORES_AUTOCUIDADO,
                CAUSA_LISTA_FACTORES_ERRORES = CAUSA_LISTA_FACTORES_ERRORES
            };
            if (ID_MATRIZ != null && ID_MATRIZ != 0)
            {
                trabajadorInvolucrado.ID_MATRIZ = ID_MATRIZ;
            }
            objJSON.items = trabajadorInvolucrado;
            objJSON.totalCount = 1;
            objJSON.success = true;
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<sp_get_eventos_listResult> Create(int ID_DEPARTAMENTO_ORGANIZACION,
                int ID_EMPRESA,
                string DESCRIPCION_GENERAL,
                string FECHA_HORA_EVENTO,
                string FECHA_INGRESO,
                string HORA_EVENTO,
                double LAT_EVENTO,
                double LNG_EVENTO,
                string LUGAR_EXACTO,
                string NOMBRE_DEPARTAMENTO)
        {
            if (ID_EMPRESA == 0)
            {
                /* ENAP */
                ID_EMPRESA = 1;
            }
            JSONCollection<sp_get_eventos_listResult> objJSON = new JSONCollection<sp_get_eventos_listResult>();
            //try
            DateTime _fech_hora_evento = DateTime.Parse(FECHA_HORA_EVENTO);
            TimeSpan _hora_evento = TimeSpan.Parse(HORA_EVENTO + ":00");
            DateTime fecha_hora_evento = _fech_hora_evento;
            fecha_hora_evento = fecha_hora_evento.Add(_hora_evento);

            TBL_EVENTO inserted = new TBL_EVENTO()
            {
                ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION,
                LAT_EVENTO = LAT_EVENTO,
                LNG_EVENTO = LNG_EVENTO,
                LUGAR_EXACTO = LUGAR_EXACTO,
                DESCRIPCION_GENERAL = DESCRIPCION_GENERAL,
                FECHA_HORA_EVENTO = fecha_hora_evento,
                FECHA_INGRESO = DateTime.Now
            };

            bd.TBL_EVENTO.InsertOnSubmit(inserted);
            bd.SubmitChanges();

            #region Busco si existe el evento de la empresa ( Para posteriormente agregar información ), osino lo creo
            TBL_EVENTO_EMPRESA existeEventoEmpresa = null;
            try
            {
                existeEventoEmpresa = (from evento_empresa in bd.TBL_EVENTO_EMPRESA
                                       where evento_empresa.ID_EVENTO == inserted.ID_EVENTO && evento_empresa.ID_EMPRESA == ID_EMPRESA
                                       select evento_empresa).Single<TBL_EVENTO_EMPRESA>();
            }
            catch (Exception ex) { }
            if (existeEventoEmpresa == null)
            {
                existeEventoEmpresa = new TBL_EVENTO_EMPRESA()
                {
                    ID_EVENTO = inserted.ID_EVENTO,
                    ID_EMPRESA = ID_EMPRESA,
                    ESTADO = true
                };
                bd.TBL_EVENTO_EMPRESA.InsertOnSubmit(existeEventoEmpresa);
                bd.SubmitChanges();
            }
            #endregion
            sp_get_eventos_listResult nuevo = new sp_get_eventos_listResult()
            {
                ID_EVENTO = inserted.ID_EVENTO,
                ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION,
                LAT_EVENTO = LAT_EVENTO,
                LNG_EVENTO = LNG_EVENTO,
                LUGAR_EXACTO = LUGAR_EXACTO,
                DESCRIPCION_GENERAL = DESCRIPCION_GENERAL,
                FECHA_HORA_EVENTO = FECHA_HORA_EVENTO,
                HORA_EVENTO = HORA_EVENTO,
                NOMBRE_DEPARTAMENTO = NOMBRE_DEPARTAMENTO
            };


            objJSON.items = nuevo;

            objJSON.totalCount = bd.TBL_EVENTO.Count();
            objJSON.success = true;
            //} catch (Exception e) { objJSON.success = false; }
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVENTO> Get(string id)
        {
            JSONCollection<TBL_EVENTO> objJSON = new JSONCollection<TBL_EVENTO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVENTO where variable.ID_EVENTO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVENTO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "trabajadores/{_ID_EVENTO_TRABAJADOR}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TrabajadorInvolucradoJSON> UpdateTrabajadorInvolucrado(string _ID_EVENTO_TRABAJADOR,TrabajadorInvolucradoJSON updateTrabajador)
        {
            JSONCollection<TrabajadorInvolucradoJSON> objJSON = new JSONCollection<TrabajadorInvolucradoJSON>();
            try
            {
                int ID_EVENTO_TRABAJADOR = int.Parse(_ID_EVENTO_TRABAJADOR);
                var objetoEventoTrabajador = (from eventoTrabajador in bd.TBL_EVENTO_TRABAJADOR
                                                where eventoTrabajador.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR
                                                select eventoTrabajador).Single();
                objetoEventoTrabajador.IS_CTP = updateTrabajador.IS_CTP;
                if (updateTrabajador.ID_MATRIZ != null && updateTrabajador.ID_MATRIZ != 0)
                {
                    objetoEventoTrabajador.ID_MATRIZ = updateTrabajador.ID_MATRIZ;
                }
                var objetoTrabajador = (from trabajador in bd.TBL_TRABAJADOR
                                        join eventoTrabajador in bd.TBL_EVENTO_TRABAJADOR on trabajador.ID_TRABAJADOR equals eventoTrabajador.ID_EVENTO_TRABAJADOR
                                        where eventoTrabajador.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR
                                        select trabajador).Single();
                objetoTrabajador.NOMBRES = updateTrabajador.NOMBRES;
                objetoTrabajador.APELLIDO_PATERNO = updateTrabajador.APELLIDO_PATERNO;
                objetoTrabajador.APELLIDO_MATERNO = updateTrabajador.APELLIDO_MATERNO;
                objetoTrabajador.ID_CARGO = updateTrabajador.ID_CARGO;
                objetoTrabajador.ANOS_EXPERIENCIA_LABORAL = updateTrabajador.ANOS_EXPERIENCIA_LABORAL;
                objetoTrabajador.ANOS_EXPERIENCIA_CARGO = updateTrabajador.ANOS_EXPERIENCIA_CARGO;
                try
            {
                var causaInmediata = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_ACCION
                                      select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(causaInmediata);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in updateTrabajador.CAUSA_INMEDIATA_ACCION)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #region [CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA] Elimino todos las causas de  Capaciadad fisica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capFisicaInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                           join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                           where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_CAP_FISICA_INADECUADA
                                           select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(capFisicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA] Elimino todos las causas de  Capaciadad psicologica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var cappsicologicaInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                                join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_CAP_PSICOLOGICA_INADECUADA
                                                select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(cappsicologicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_TENSION_FISICA] Elimino todos las causas de TENSIÓN FISICA inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capMental = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                 join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                 where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                 select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(capMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_TENSION_FISICA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_TENSION_MENTAL] Elimino todos las causas de  tensión mental del informe preliminar y agrego las nuevas
            try
            {
                var tensionMental = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                     join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                     where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                     select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(tensionMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_TENSION_MENTAL)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO] Elimino todos las causas de  falta de conocimiento del informe preliminar y agrego las nuevas
            try
            {
                var faltaConocimiento = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                         join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                         where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_CONOCIMIENTO
                                         select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(faltaConocimiento);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_HABILIDAD] Elimino todos las causas de  falta de habilidad del informe preliminar y agrego las nuevas
            try
            {
                var faltaHabilidad = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_HABILIDAD
                                      select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(faltaHabilidad);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_FALTA_HABILIDAD)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA] Elimino todos las causas de motivacion inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var motivacionInadecuada = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                            join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                            where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_MOTIVACION_INADECUADA
                                            select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(motivacionInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_AUTOCUIDADO] Elimino todos las causas de autocuidado del informe preliminar y agrego las nuevas
            try
            {
                var autoCuidado = (from variable in bd.TBL_CAUSA_TRABAJADOR
                                   join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                   where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_AUTO_CUIDADO
                                   select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(autoCuidado);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FATORES_AUTOCUIDADO)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_ERRORES] Elimino todos las causas de errores del informe preliminar y agrego las nuevas
            try
            {
                var errores = (from variable in bd.TBL_CAUSA_TRABAJADOR
                               join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                               where variable.ID_EVENTO_TRABAJADOR == ID_EVENTO_TRABAJADOR && causa.TIPO_CAUSA == e0063.CAUSA_ERRORES
                               select variable).ToList();
                bd.TBL_CAUSA_TRABAJADOR.DeleteAllOnSubmit(errores);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in updateTrabajador.CAUSA_LISTA_FACTORES_ERRORES)
            {
                TBL_CAUSA_TRABAJADOR nuevaCausaInmediata = new TBL_CAUSA_TRABAJADOR()
                {
                    ID_EVENTO_TRABAJADOR = ID_EVENTO_TRABAJADOR,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_TRABAJADOR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            }
            catch (Exception ex) { }

            objJSON.items = updateTrabajador;
            objJSON.totalCount = 1;
            objJSON.success = true;
            return objJSON;
        }
        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVENTO> Update(string id, TBL_EVENTO nuevo)
        {

            JSONCollection<TBL_EVENTO> objJSON = new JSONCollection<TBL_EVENTO>();
            try
            {
                var objeto = (from variable in bd.TBL_EVENTO
                              where variable.ID_EVENTO == int.Parse(id)
                              select variable).Single();
                objeto.ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION;
                objeto.FECHA_HORA_EVENTO = nuevo.FECHA_HORA_EVENTO;
                objeto.FECHA_INGRESO = nuevo.FECHA_INGRESO;
                objeto.LAT_EVENTO = nuevo.LAT_EVENTO;
                objeto.LNG_EVENTO = nuevo.LNG_EVENTO;
                objeto.LUGAR_EXACTO = nuevo.LUGAR_EXACTO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVENTO.Count();
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
            var objeto = (from variable in bd.TBL_EVENTO
                          where variable.ID_EVENTO == int.Parse(id)
                          select variable).First();

            bd.TBL_EVENTO.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(ExtJSSort _sort)
        {
            if (_sort != null)
            {
                if (_sort.property.Equals("NOMBRE_DEPARTAMENTO"))
                {
                    return "NOMBRE_DEPARTAMENTO " + _sort.direction;
                }
                if (_sort.property.Equals("HORA_EVENTO"))
                {
                    return "HORA_EVENTO " + _sort.direction;
                }
                if (_sort.property.Equals("ID_DEPARTAMENTO_ORGANIZACION"))
                {
                    return "ID_DEPARTAMENTO_ORGANIZACION " + _sort.direction;
                }
                if (_sort.property.Equals("OCURRIO"))
                {
                    return "OCURRIO " + _sort.direction;
                }
                if (_sort.property.Equals("FECHA_HORA_EVENTO"))
                {
                    return "FECHA_HORA_EVENTO " + _sort.direction;
                }
                if (_sort.property.Equals("FECHA_INGRESO"))
                {
                    return "FECHA_INGRESO " + _sort.direction;
                }
                if (_sort.property.Equals("LAT_EVENTO"))
                {
                    return "LAT_EVENTO " + _sort.direction;
                }
                if (_sort.property.Equals("LNG_EVENTO"))
                {
                    return "LNG_EVENTO " + _sort.direction;
                }
                if (_sort.property.Equals("TIPO_EVENTO"))
                {
                    return "TIPO_EVENTO " + _sort.direction;
                }
                if (_sort.property.Equals("LUGAR_EXACTO"))
                {
                    return "LUGAR_EXACTO " + _sort.direction;
                }
                if (_sort.property.Equals("COUNT_TRABAJADORES"))
                {
                    return "COUNT_TRABAJADORES " + _sort.direction;
                }
                if (_sort.property.Equals("COUNT_IPRELIMINAR"))
                {
                    return "COUNT_IPRELIMINAR " + _sort.direction;
                }
                if (_sort.property.Equals("ID_EVENTO"))
                {
                    return "ID_EVENTO " + _sort.direction;
                }
            }
            return "FECHA_HORA_EVENTO DESC";
        }
    }
}