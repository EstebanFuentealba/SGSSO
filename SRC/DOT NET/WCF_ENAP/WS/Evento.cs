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