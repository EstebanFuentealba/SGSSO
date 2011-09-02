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
using System.Web;

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class TempActividadEvaluada
    {
        private DataClassesEnapDataContext bd;

        public TempActividadEvaluada()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={_ID_ORGANIZACION}&ID_DEPARTAMENTO_ORGANIZACION={_ID_DEPARTAMENTO_ORGANIZACION}&ID_DIVISION={_ID_DIVISION}&ID_AREA={_ID_AREA}&ID_ACTIVIDAD_GENERAL={_ID_ACTIVIDAD_GENERAL}&NOM_ACTIVIDAD_ESPECIFICA={_NOM_ACTIVIDAD_ESPECIFICA}&ID_CARGO={_ID_CARGO}&CONDICION={_CONDICION}")]
        public JSONCollection<List<ActividadJSONPOST>> GetCollection(int _page,
                                                                            int _start,
                                                                            int _limit,
                                                                            string _sort,
                                                                            string _dir,
                                                                            int _ID_ORGANIZACION,
                                                                            int _ID_DEPARTAMENTO_ORGANIZACION,
                                                                            int _ID_DIVISION,
                                                                            int _ID_AREA,
                                                                            int _ID_ACTIVIDAD_GENERAL,
                                                                            string _NOM_ACTIVIDAD_ESPECIFICA,
                                                                            int _ID_CARGO,
                                                                            int _CONDICION)
        {
            JSONCollection<List<ActividadJSONPOST>> objJSON = new JSONCollection<List<ActividadJSONPOST>>();
            List<ActividadJSONPOST> list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null)
            {
                HttpContext.Current.Session["TempActividadEvaluada"] = new List<ActividadJSONPOST>();
                list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            }
            objJSON.items = list;
            objJSON.totalCount = list.Count;
            objJSON.success = true;
            return objJSON;
            
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<ActividadJSONPOST> Create(int ID_ACTIVIDAD_GENERAL, int ID_CARGO, int ID_DIVISION, int ID_ACTIVIDAD_ESPECIFICA, int ID_DEPARTAMENTO_ORGANIZACION, int ID_PELIGRO, int ID_AREA, int VALORACION_CONSECUENCIA, int VALORACION_PROBABILIDAD, int MEDIDA_VALORACION_CONSECUENCIA, int MEDIDA_VALORACION_PROBABILIDAD, int CONDICION, int[] MEDIDAS)
        {
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();

            List<ActividadJSONPOST> list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null)
            {
                HttpContext.Current.Session["TempActividadEvaluada"] = new List<ActividadJSONPOST>();
                list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            }
            TBL_ACTIVIDAD_EVALUADA nuevo = new TBL_ACTIVIDAD_EVALUADA()
            {
                ID_ACTIVIDAD_GENERAL = ID_ACTIVIDAD_GENERAL,
                ID_CARGO = ID_CARGO,
                ID_ACTIVIDAD_ESPECIFICA = ID_ACTIVIDAD_ESPECIFICA,
                ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION,
                ID_PELIGRO = ID_PELIGRO,
                VALORACION_CONSECUENCIA = VALORACION_CONSECUENCIA,
                VALORACION_PROBABILIDAD = VALORACION_PROBABILIDAD,
                MEDIDA_VALORACION_CONSECUENCIA = MEDIDA_VALORACION_CONSECUENCIA,
                MEDIDA_VALORACION_PROBABILIDAD = MEDIDA_VALORACION_PROBABILIDAD,
                CONDICION = CONDICION,
                FECHA_CREACION = DateTime.Now
            };
            ActividadJSONPOST json_return = new ActividadJSONPOST();
            if (ID_DIVISION != 0)
            {
                nuevo.ID_DIVISION = ID_DIVISION;
                json_return.ID_DIVISION = (int)nuevo.ID_DIVISION;
            }
            if (ID_AREA != 0)
            {
                nuevo.ID_AREA = ID_AREA;
                json_return.ID_AREA = (int)nuevo.ID_AREA;
            }
            //json_return.ID_ACTIVIDAD_EVALUADA = (int)nuevo.ID_ACTIVIDAD_EVALUADA;
            json_return.ID_ACTIVIDAD_EVALUADA = (int)list.Count;
            json_return.ID_ACTIVIDAD_GENERAL = (int)nuevo.ID_ACTIVIDAD_GENERAL;
            json_return.ID_CARGO = (int)nuevo.ID_CARGO;

            json_return.ID_ACTIVIDAD_ESPECIFICA = (int)nuevo.ID_ACTIVIDAD_ESPECIFICA;
            json_return.ID_DEPARTAMENTO_ORGANIZACION = (int)nuevo.ID_DEPARTAMENTO_ORGANIZACION;
            json_return.ID_PELIGRO = (int)nuevo.ID_PELIGRO;

            json_return.VALORACION_CONSECUENCIA = (int)nuevo.VALORACION_CONSECUENCIA;
            json_return.VALORACION_PROBABILIDAD = (int)nuevo.VALORACION_PROBABILIDAD;
            json_return.MEDIDA_VALORACION_CONSECUENCIA = (int)nuevo.MEDIDA_VALORACION_CONSECUENCIA;
            json_return.MEDIDA_VALORACION_PROBABILIDAD = (int)nuevo.MEDIDA_VALORACION_PROBABILIDAD;
            json_return.CONDICION = (int)nuevo.CONDICION;
            json_return.FECHA_CREACION = (DateTime)nuevo.FECHA_CREACION;

            json_return.MEDIDAS = MEDIDAS;
            list.Add(json_return);
            objJSON.items = json_return;
            objJSON.totalCount = list.Count;
            objJSON.success = true;
            HttpContext.Current.Session["TempActividadEvaluada"] = list;
            return objJSON;
           
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACTIVIDAD_EVALUADA> Get(string id)
        {
            JSONCollection<TBL_ACTIVIDAD_EVALUADA> objJSON = new JSONCollection<TBL_ACTIVIDAD_EVALUADA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACTIVIDAD_EVALUADA where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACTIVIDAD_EVALUADA> Update(string id, TBL_ACTIVIDAD_EVALUADA nuevo)
        {

            JSONCollection<TBL_ACTIVIDAD_EVALUADA> objJSON = new JSONCollection<TBL_ACTIVIDAD_EVALUADA>();
            try
            {
                var objeto = (from variable in bd.TBL_ACTIVIDAD_EVALUADA
                              where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
                              select variable).Single();
                objeto.ID_ACTIVIDAD_GENERAL = nuevo.ID_ACTIVIDAD_GENERAL;
                objeto.ID_CARGO = nuevo.ID_CARGO;
                objeto.ID_DIVISION = nuevo.ID_DIVISION;
                objeto.ID_ACTIVIDAD_ESPECIFICA = nuevo.ID_ACTIVIDAD_ESPECIFICA;
                objeto.ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION;
                objeto.ID_PELIGRO = nuevo.ID_PELIGRO;
                objeto.ID_AREA = nuevo.ID_AREA;
                objeto.VALORACION_CONSECUENCIA = nuevo.VALORACION_CONSECUENCIA;
                objeto.VALORACION_PROBABILIDAD = nuevo.VALORACION_PROBABILIDAD;
                objeto.MEDIDA_VALORACION_CONSECUENCIA = nuevo.MEDIDA_VALORACION_CONSECUENCIA;
                objeto.MEDIDA_VALORACION_PROBABILIDAD = nuevo.MEDIDA_VALORACION_PROBABILIDAD;
                objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
                objeto.CONDICION = nuevo.CONDICION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
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
            HttpContext.Current.Session["TempActividadEvaluada"] = null;
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("ID_ACTIVIDAD_GENERAL"))
                {
                    return "ID_ACTIVIDAD_GENERAL";
                }
                if (_sort.Equals("ID_CARGO"))
                {
                    return "ID_CARGO";
                }
                if (_sort.Equals("ID_DIVISION"))
                {
                    return "ID_DIVISION";
                }
                if (_sort.Equals("ID_ACTIVIDAD_ESPECIFICA"))
                {
                    return "ID_ACTIVIDAD_ESPECIFICA";
                }
                if (_sort.Equals("ID_DEPARTAMENTO_ORGANIZACION"))
                {
                    return "ID_DEPARTAMENTO_ORGANIZACION";
                }
                if (_sort.Equals("ID_PELIGRO"))
                {
                    return "ID_PELIGRO";
                }
                if (_sort.Equals("ID_AREA"))
                {
                    return "ID_AREA";
                }
                if (_sort.Equals("VALORACION_CONSECUENCIA"))
                {
                    return "VALORACION_CONSECUENCIA";
                }
                if (_sort.Equals("VALORACION_PROBABILIDAD"))
                {
                    return "VALORACION_PROBABILIDAD";
                }
                if (_sort.Equals("MEDIDA_VALORACION_CONSECUENCIA"))
                {
                    return "MEDIDA_VALORACION_CONSECUENCIA";
                }
                if (_sort.Equals("MEDIDA_VALORACION_PROBABILIDAD"))
                {
                    return "MEDIDA_VALORACION_PROBABILIDAD";
                }
                if (_sort.Equals("FECHA_CREACION"))
                {
                    return "FECHA_CREACION";
                }
                if (_sort.Equals("CONDICION"))
                {
                    return "CONDICION";
                }

            }
            return "ID_ACTIVIDAD_EVALUADA";
        }
    }
}