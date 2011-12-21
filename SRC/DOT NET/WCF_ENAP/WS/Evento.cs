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
        [WebGet(UriTemplate = "trabajadores?page={_page}&start={_start}&limit={_limit}&sort={_sort}&ID_EVENTO_EMPRESA={ID_EVENTO_EMPRESA}")]
        public JSONCollection<List<sp_get_trabajadores_by_id_evento_empresaResult>> GetTrabajadores(
            int _page,
            int _start,
            int _limit,
            string _sort,
            int ID_EVENTO_EMPRESA)
        {
            JSONCollection<List<sp_get_trabajadores_by_id_evento_empresaResult>> objJSON = new JSONCollection<List<sp_get_trabajadores_by_id_evento_empresaResult>>();
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

            var query = bd.sp_get_trabajadores_by_id_evento_empresa(ID_EVENTO_EMPRESA, _start, _limit).OrderBy("RUT_TRABAJADOR ASC");
            //aki
            query = query.Select(r => r);
            List<sp_get_trabajadores_by_id_evento_empresaResult> results = query.ToList();
            objJSON.items = results;
            objJSON.totalCount = results.Count;
            objJSON.success = true;
            //} catch (Exception ex) { objJSON.success = false; }
            return objJSON;
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&ID_ORGANIZACION={ID_ORGANIZACION}&ANO={ANO}")]
        public JSONCollection<List<sp_get_eventos_listResult>> GetCollection(int _page,
            int _start,
            int _limit,
            string _sort,
            int ID_ORGANIZACION,
            int ANO)
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

            var query = bd.sp_get_eventos_list(_start, _limit, ID_ORGANIZACION, ANO).OrderBy(orderBy(sort));
            //aki
            query = query.Select(r => r);
            List<sp_get_eventos_listResult> results = query.ToList(); // :S
            objJSON.items = results;
            objJSON.totalCount = bd.TBL_EVENTO.Count<TBL_EVENTO>();
            objJSON.success = true;
            //} catch (Exception ex) { objJSON.success = false; }
            return objJSON;
        }
        [WebInvoke(UriTemplate = "trabajadores", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVENTO_EMPRESA> AddTrabajadorInvolucrado(
            // Evento 
            int ID_EVENTO,
            int ID_EVENTO_EMPRESA,

            // Datos Trabajador 
            string RUT_TRABAJADOR,
            string NOMBRES,
            string APELLIDO_MATERNO,
            string APELLIDO_PATERNO,
            string ANOS_EXPERIENCIA_CARGO,
            string ANOS_EXPERIENCIA_LABORAL,
            int ID_CARGO,

            // Causa Inmediata Acción
            int[] CAUSA_INMEDIATA_ACCION,
            // Factores de la persona
            int[] CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA,
            int[] CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA,
            int[] CAUSA_LISTA_FATORES_CAP_MENTAL,
            int[] CAUSA_LISTA_FATORES_TENSION_MENTAL,
            int[] CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO,
            int[] CAUSA_LISTA_FATORES_FALTA_HABILIDAD,
            int[] CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA,
            int[] CAUSA_LISTA_FATORES_AUTOCUIDADO,
            int[] CAUSA_LISTA_FACTORES_ERRORES
        )
        {
            JSONCollection<TBL_EVENTO_EMPRESA> objJSON = new JSONCollection<TBL_EVENTO_EMPRESA>();

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
                    ANOS_EXPERIENCIA_CARGO = int.Parse(ANOS_EXPERIENCIA_CARGO),
                    ID_CARGO = ID_CARGO,
                    ANOS_EXPERIENCIA_LABORAL = int.Parse(ANOS_EXPERIENCIA_LABORAL)
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
                    ID_TRABAJADOR = nuevoTrabajador.ID_TRABAJADOR
                };
                bd.TBL_EVENTO_TRABAJADOR.InsertOnSubmit(existeEventoTrabajador);
                bd.SubmitChanges();
            }
            #endregion

            #region [CAUSA_INMEDIATA_ACCION] Elimino todos las causas inmediatas del informe preliminar y agrego las nuevas
            try
            {
                var causaInmediata = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_ACCION
                                      select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(causaInmediata);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in CAUSA_INMEDIATA_ACCION)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA] Elimino todos las causas de  Capaciadad fisica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capFisicaInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                           join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                           where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_CAP_FISICA_INADECUADA
                                           select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(capFisicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA] Elimino todos las causas de  Capaciadad psicologica inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var cappsicologicaInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                                join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                                where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_CAP_PSICOLOGICA_INADECUADA
                                                select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(cappsicologicaInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_CAP_MENTAL] Elimino todos las causas de  Capaciadad mental inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var capMental = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                 join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                 where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                 select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(capMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_CAP_MENTAL)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_TENSION_MENTAL] Elimino todos las causas de  tensión mental del informe preliminar y agrego las nuevas
            try
            {
                var tensionMental = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                     join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                     where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_TENSION_MENTAL
                                     select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(tensionMental);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_TENSION_MENTAL)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO] Elimino todos las causas de  falta de conocimiento del informe preliminar y agrego las nuevas
            try
            {
                var faltaConocimiento = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                         join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                         where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_CONOCIMIENTO
                                         select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(faltaConocimiento);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_FALTA_HABILIDAD] Elimino todos las causas de  falta de habilidad del informe preliminar y agrego las nuevas
            try
            {
                var faltaHabilidad = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                      join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                      where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_FALTA_HABILIDAD
                                      select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(faltaHabilidad);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_FALTA_HABILIDAD)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA] Elimino todos las causas de motivacion inadecuada del informe preliminar y agrego las nuevas
            try
            {
                var motivacionInadecuada = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                            join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                            where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_MOTIVACION_INADECUADA
                                            select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(motivacionInadecuada);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FATORES_AUTOCUIDADO] Elimino todos las causas de autocuidado del informe preliminar y agrego las nuevas
            try
            {
                var autoCuidado = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                                   join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                                   where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_AUTO_CUIDADO
                                   select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(autoCuidado);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FATORES_AUTOCUIDADO)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion
            #region [CAUSA_LISTA_FACTORES_ERRORES] Elimino todos las causas de errores del informe preliminar y agrego las nuevas
            try
            {
                var errores = (from variable in bd.TBL_CAUSA_INFORME_PRELIMIANAR
                               join causa in bd.TBL_CAUSA on variable.ID_CAUSA equals causa.ID_CAUSA
                               where variable.ID_EVENTO_EMPRESA == existeEventoEmpresa.ID_EVENTO_EMPRESA && causa.TIPO_CAUSA == e0063.CAUSA_ERRORES
                               select variable).First();
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.DeleteOnSubmit(errores);
                bd.SubmitChanges();
            }
            catch (Exception ex) { }

            foreach (int idCausaInmediata in CAUSA_LISTA_FACTORES_ERRORES)
            {
                TBL_CAUSA_INFORME_PRELIMIANAR nuevaCausaInmediata = new TBL_CAUSA_INFORME_PRELIMIANAR()
                {
                    ID_EVENTO_EMPRESA = existeEventoEmpresa.ID_EVENTO_EMPRESA,
                    ID_CAUSA = idCausaInmediata
                };
                bd.TBL_CAUSA_INFORME_PRELIMIANAR.InsertOnSubmit(nuevaCausaInmediata);
                bd.SubmitChanges();
            }
            #endregion



            throw new Exception("No implementado");
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