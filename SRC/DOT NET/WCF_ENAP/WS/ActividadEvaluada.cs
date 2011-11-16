/**
*Imports.
*/
using System;
using System.Collections;
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
    public class ActividadJSON
    {
        public int ID_ACTIVIDAD_ESPECIFICA;
        public string NOM_ACTIVIDAD_ESPECIFICA;
        public bool ESTADO;
    }
    public class ActividadJSONPOST
    {
        public int ID_MATRIZ;
        public int ID_ACTIVIDAD_EVALUADA;
        public int ID_ACTIVIDAD_GENERAL;
        public int ID_ACTIVIDAD_ESPECIFICA;
        public string NOM_ACTIVIDAD_ESPECIFICA;
        public int ID_CARGO;
        public int ID_DEPARTAMENTO_ORGANIZACION;
        public int ID_PELIGRO;
        public string NOM_PELIGRO;
        public int ID_AREA;
        public int ID_DIVISION;
        public int[] MEDIDAS;
        public int VALORACION_CONSECUENCIA;
        public int VALORACION_PROBABILIDAD;
        public int MEDIDA_VALORACION_CONSECUENCIA;
        public int MEDIDA_VALORACION_PROBABILIDAD;
        public int CONDICION;
        public string FECHA_CREACION;
        public bool ESTADO;
    }
    public class ActividadJSONGETGROUP
    {
        public int ID_MATRIZ_RIESGO;
        public int ID_ACTIVIDAD_ESPECIFICA;
        public string NOM_ACTIVIDAD_ESPECIFICA;
        public int ID_PELIGRO;
        public string NOM_PELIGRO;
        public int ID_MEDIDAS_DE_CONTROL;
        public int VALORACION_CONSECUENCIA;
        public int VALORACION_PROBABILIDAD;
        public int MEDIDA_VALORACION_CONSECUENCIA;
        public int MEDIDA_VALORACION_PROBABILIDAD;
        public bool ESTADO;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class ActividadEvaluada
	{
		private DataClassesEnapDataContext bd;

		public ActividadEvaluada()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_PELIGRO={_ID_PELIGRO}&ID_DEPARTAMENTO_ORGANIZACION={_ID_DEPARTAMENTO_ORGANIZACION}&ID_DIVISION={_ID_DIVISION}&ID_AREA={_ID_AREA}&ID_ACTIVIDAD_GENERAL={_ID_ACTIVIDAD_GENERAL}&ID_ACTIVIDAD_ESPECIFICA={_ID_ACTIVIDAD_ESPECIFICA}&ID_CARGO={_ID_CARGO}&CONDICION={_CONDICION}")]
        public JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>> GetCollection(int _page, 
                                                                            int _start, 
                                                                            int _limit, 
                                                                            string _sort, 
                                                                            string _dir,  
                                                                            int _ID_DEPARTAMENTO_ORGANIZACION, 
                                                                            int _ID_DIVISION,
                                                                            int _ID_AREA, 
                                                                            int _ID_ACTIVIDAD_GENERAL,
                                                                            int _ID_ACTIVIDAD_ESPECIFICA, 
                                                                            int _ID_CARGO,
                                                                            int _CONDICION,
                                                                            int _ID_PELIGRO)
        {
            JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>> objJSON = new JSONCollection<List<TBL_ACTIVIDAD_EVALUADA>>();
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
                var query = bd.TBL_ACTIVIDAD_EVALUADA.Skip(_start).Take(_limit);
                if ((_ID_PELIGRO != 0) && (_ID_DEPARTAMENTO_ORGANIZACION != 0) && (_ID_DIVISION != 0) && (_ID_AREA != 0) && (_ID_ACTIVIDAD_GENERAL != 0) && (_ID_ACTIVIDAD_ESPECIFICA != 0) && (_ID_CARGO != 0) && (_CONDICION != 0))
                {
                    query = query.Where(s => s.ID_DEPARTAMENTO_ORGANIZACION == (int)_ID_DEPARTAMENTO_ORGANIZACION 
                        && s.ID_DIVISION == (int)_ID_DIVISION
                        && s.ID_AREA == (int)_ID_AREA
                        && s.ID_ACTIVIDAD_GENERAL == _ID_ACTIVIDAD_GENERAL
                        && s.ID_ACTIVIDAD_ESPECIFICA == _ID_ACTIVIDAD_ESPECIFICA
                        && s.ID_CARGO == _ID_CARGO
                        && s.CONDICION == _CONDICION
                        && s.ID_PELIGRO == _ID_PELIGRO);
                }
                    query = query.OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                    List<TBL_ACTIVIDAD_EVALUADA> results = query.ToList();

                    objJSON.items = results;
                    objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count<TBL_ACTIVIDAD_EVALUADA>();
                    objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<ActividadJSONPOST> Create(int ID_ACTIVIDAD_GENERAL, 
            int ID_CARGO, 
            int ID_DIVISION, 
            int ID_ACTIVIDAD_ESPECIFICA, 
            int ID_DEPARTAMENTO_ORGANIZACION, 
            int ID_PELIGRO, 
            int ID_AREA,  
            int VALORACION_CONSECUENCIA, 
            int VALORACION_PROBABILIDAD, 
            int MEDIDA_VALORACION_CONSECUENCIA, 
            int MEDIDA_VALORACION_PROBABILIDAD, 
            int CONDICION, 
            int[] MEDIDAS,
            string NOM_PELIGRO,
            string NOM_ACTIVIDAD_ESPECIFICA)
        {
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();

            Hashtable list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null || list.Count == 0)
            {

                HttpContext.Current.Session["TempActividadEvaluada"] = new Hashtable();
                list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
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
            bd.TBL_ACTIVIDAD_EVALUADA.InsertOnSubmit(nuevo);
            bd.SubmitChanges();
            for (int i = 0; i < MEDIDAS.Length; i++)
            {
                TBL_PELIGRO_MEDIDA nuevo_peligro_medida = new TBL_PELIGRO_MEDIDA()
                {
                    ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                    ID_MEDIDAS_DE_CONTROL = MEDIDAS[i],
                    FECHA_CREACION = DateTime.Now

                };
                bd.TBL_PELIGRO_MEDIDA.InsertOnSubmit(nuevo_peligro_medida);
                bd.SubmitChanges();
            }

            json_return.ID_ACTIVIDAD_EVALUADA = (int)nuevo.ID_ACTIVIDAD_EVALUADA;
            
            json_return.ID_ACTIVIDAD_GENERAL = (int)nuevo.ID_ACTIVIDAD_GENERAL;
            json_return.ID_CARGO = (int)nuevo.ID_CARGO;

            json_return.ID_ACTIVIDAD_ESPECIFICA = (int)nuevo.ID_ACTIVIDAD_ESPECIFICA;
            json_return.NOM_ACTIVIDAD_ESPECIFICA = NOM_ACTIVIDAD_ESPECIFICA; 
            json_return.ID_DEPARTAMENTO_ORGANIZACION = (int)nuevo.ID_DEPARTAMENTO_ORGANIZACION;
            json_return.ID_PELIGRO = (int)nuevo.ID_PELIGRO;
            json_return.NOM_PELIGRO = NOM_PELIGRO; 

            json_return.VALORACION_CONSECUENCIA = (int)nuevo.VALORACION_CONSECUENCIA;
            json_return.VALORACION_PROBABILIDAD = (int)nuevo.VALORACION_PROBABILIDAD;
            json_return.MEDIDA_VALORACION_CONSECUENCIA = (int)nuevo.MEDIDA_VALORACION_CONSECUENCIA;
            json_return.MEDIDA_VALORACION_PROBABILIDAD = (int)nuevo.MEDIDA_VALORACION_PROBABILIDAD;
            json_return.CONDICION = (int)nuevo.CONDICION;
            json_return.FECHA_CREACION = nuevo.FECHA_CREACION.ToString();

            json_return.MEDIDAS = MEDIDAS;
            if (list.Contains(json_return.ID_ACTIVIDAD_EVALUADA))
            {
                list.Remove(json_return.ID_ACTIVIDAD_EVALUADA);
            }
            list.Add(json_return.ID_ACTIVIDAD_EVALUADA, json_return);
            objJSON.items = json_return;
            objJSON.totalCount = list.Count;
            objJSON.success = true;
            HttpContext.Current.Session["TempActividadEvaluada"] = list;
            return objJSON;


            /*
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();
            List<ActividadJSONPOST> list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null)
            {
                throw new Exception("No hay datos en la lista");
            }
            TBL_MATRIZ nueva_matriz = new TBL_MATRIZ()
            {
                FECHA_CREACION = DateTime.Now,
                ESTADO = true
            };
            bd.TBL_MATRIZ.InsertOnSubmit(nueva_matriz);
            bd.SubmitChanges();
            foreach (ActividadJSONPOST nueva_actividad in list)
            {
                
                TBL_ACTIVIDAD_EVALUADA nuevo = new TBL_ACTIVIDAD_EVALUADA()
                {
                    ID_ACTIVIDAD_GENERAL = nueva_actividad.ID_ACTIVIDAD_GENERAL,
                    ID_CARGO = nueva_actividad.ID_CARGO,
                    ID_ACTIVIDAD_ESPECIFICA = nueva_actividad.ID_ACTIVIDAD_ESPECIFICA,
                    ID_DEPARTAMENTO_ORGANIZACION = nueva_actividad.ID_DEPARTAMENTO_ORGANIZACION,
                    ID_PELIGRO = nueva_actividad.ID_PELIGRO,
                    VALORACION_CONSECUENCIA = nueva_actividad.VALORACION_CONSECUENCIA,
                    VALORACION_PROBABILIDAD = nueva_actividad.VALORACION_PROBABILIDAD,
                    MEDIDA_VALORACION_CONSECUENCIA = nueva_actividad.MEDIDA_VALORACION_CONSECUENCIA,
                    MEDIDA_VALORACION_PROBABILIDAD = nueva_actividad.MEDIDA_VALORACION_PROBABILIDAD,
                    CONDICION = nueva_actividad.CONDICION,
                    FECHA_CREACION = DateTime.Now
                };
                if (nueva_actividad.ID_DIVISION != 0)
                {
                    nuevo.ID_DIVISION = nueva_actividad.ID_DIVISION;
                }
                if (nueva_actividad.ID_AREA != 0)
                {
                    nuevo.ID_AREA = nueva_actividad.ID_AREA;
                }

                bd.TBL_ACTIVIDAD_EVALUADA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                for (int i = 0; i < nueva_actividad.MEDIDAS.Length; i++)
                {
                    TBL_PELIGRO_MEDIDA nuevo_peligro_medida = new TBL_PELIGRO_MEDIDA()
                    {
                        ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                        ID_MEDIDAS_DE_CONTROL = nueva_actividad.MEDIDAS[i],
                        FECHA_CREACION = DateTime.Now

                    };
                    bd.TBL_PELIGRO_MEDIDA.InsertOnSubmit(nuevo_peligro_medida);
                    bd.SubmitChanges();
                }
                TBL_MATRIZ_ACTIVIDAD matriz_actividad = new TBL_MATRIZ_ACTIVIDAD()
                {
                    FECHA_CREACION=DateTime.Now,
                    ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                    ID_MATRIZ = nueva_matriz.ID_MATRIZ
                };
                bd.TBL_MATRIZ_ACTIVIDAD.InsertOnSubmit(matriz_actividad);
                bd.SubmitChanges();
            }
            HttpContext.Current.Session["TempActividadEvaluada"] = null;
            objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
            objJSON.success = true;
            return objJSON;
            */
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
        public ActividadJSONPOST Update(string id, ActividadJSONPOST obj)
		{
            Hashtable list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null || list.Count == 0)
            {
                //HttpContext.Current.Session["TempActividadEvaluada"] = new Hashtable();
                list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
            }
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();
            var aev = (from variable in bd.TBL_ACTIVIDAD_EVALUADA
                          where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
                          select variable).Single();
            
                aev.VALORACION_PROBABILIDAD = obj.VALORACION_PROBABILIDAD;
                aev.VALORACION_CONSECUENCIA = obj.VALORACION_CONSECUENCIA;
                aev.MEDIDA_VALORACION_PROBABILIDAD = obj.MEDIDA_VALORACION_PROBABILIDAD;
                aev.MEDIDA_VALORACION_CONSECUENCIA = obj.MEDIDA_VALORACION_CONSECUENCIA;
                
                bd.SubmitChanges();
                
                var deleteMedidas = (from variable in bd.TBL_PELIGRO_MEDIDA
                           where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
                           select variable).ToList();
                bd.TBL_PELIGRO_MEDIDA.DeleteAllOnSubmit(deleteMedidas);
                bd.SubmitChanges();

                for (int i = 0; i < obj.MEDIDAS.Length; i++)
                {
                    TBL_PELIGRO_MEDIDA nuevo_peligro_medida = new TBL_PELIGRO_MEDIDA()
                    {
                        ID_ACTIVIDAD_EVALUADA = aev.ID_ACTIVIDAD_EVALUADA,
                        ID_MEDIDAS_DE_CONTROL = obj.MEDIDAS[i],
                        FECHA_CREACION = DateTime.Now

                    };
                    bd.TBL_PELIGRO_MEDIDA.InsertOnSubmit(nuevo_peligro_medida);
                    bd.SubmitChanges();
                }
                if (list.Contains(obj.ID_ACTIVIDAD_EVALUADA))
                {
                    list.Remove(obj.ID_ACTIVIDAD_ESPECIFICA);
                }
                list.Add(obj.ID_ACTIVIDAD_EVALUADA, obj);

                objJSON.items = obj;
                objJSON.totalCount = bd.TBL_NODO.Count();
                objJSON.success = true;

                return obj; 
		}
		
		[WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
		public void Delete(string id)
		{
			var objeto = (from variable in bd.TBL_ACTIVIDAD_EVALUADA
							where variable.ID_ACTIVIDAD_EVALUADA == int.Parse(id)
							select variable).First();

			bd.TBL_ACTIVIDAD_EVALUADA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_ACTIVIDAD_GENERAL")){
					return "ID_ACTIVIDAD_GENERAL";
				}
				if (_sort.Equals("ID_CARGO")){
					return "ID_CARGO";
				}
				if (_sort.Equals("ID_DIVISION")){
					return "ID_DIVISION";
				}
				if (_sort.Equals("ID_ACTIVIDAD_ESPECIFICA")){
					return "ID_ACTIVIDAD_ESPECIFICA";
				}
				if (_sort.Equals("ID_DEPARTAMENTO_ORGANIZACION")){
					return "ID_DEPARTAMENTO_ORGANIZACION";
				}
				if (_sort.Equals("ID_PELIGRO")){
					return "ID_PELIGRO";
				}
				if (_sort.Equals("ID_AREA")){
					return "ID_AREA";
				}
				if (_sort.Equals("VALORACION_CONSECUENCIA")){
					return "VALORACION_CONSECUENCIA";
				}
				if (_sort.Equals("VALORACION_PROBABILIDAD")){
					return "VALORACION_PROBABILIDAD";
				}
				if (_sort.Equals("MEDIDA_VALORACION_CONSECUENCIA")){
					return "MEDIDA_VALORACION_CONSECUENCIA";
				}
				if (_sort.Equals("MEDIDA_VALORACION_PROBABILIDAD")){
					return "MEDIDA_VALORACION_PROBABILIDAD";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}
				if (_sort.Equals("CONDICION")){
					return "CONDICION";
				}

			}
			return "ID_ACTIVIDAD_EVALUADA";
		}
        [WebGet(UriTemplate = "search?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={_ID_ORGANIZACION}&ID_DEPARTAMENTO_ORGANIZACION={_ID_DEPARTAMENTO_ORGANIZACION}&ID_DIVISION={_ID_DIVISION}&ID_AREA={_ID_AREA}&ID_ACTIVIDAD_GENERAL={_ID_ACTIVIDAD_GENERAL}&ID_ACTIVIDAD_ESPECIFICA={_ID_ACTIVIDAD_ESPECIFICA}&NOM_ACTIVIDAD_ESPECIFICA={_NOM_ACTIVIDAD_ESPECIFICA}&ID_CARGO={_ID_CARGO}&CONDICION={_CONDICION}&startdt={_STARTDT}&enddt={_ENDDT}&onlyMy={_ONLYMY}")]
        public JSONCollection<List<sp_search_actividad_evaluadaResult>> Search(int _page,
                                                                            int _start,
                                                                            int _limit,
                                                                            string _sort,
                                                                            string _dir,
                                                                            int _ID_ORGANIZACION,
                                                                            int _ID_DEPARTAMENTO_ORGANIZACION,
                                                                            int _ID_DIVISION,
                                                                            int _ID_AREA,
                                                                            int _ID_ACTIVIDAD_GENERAL,
                                                                            int _ID_ACTIVIDAD_ESPECIFICA,
                                                                            string _NOM_ACTIVIDAD_ESPECIFICA,
                                                                            int _ID_CARGO,
                                                                            int _CONDICION,
                                                                            string _STARTDT,
                                                                            string _ENDDT,
                                                                            string _ONLYMY)
        {
            JSONCollection<List<sp_search_actividad_evaluadaResult>> objJSON = new JSONCollection<List<sp_search_actividad_evaluadaResult>>();
            HttpContext.Current.Session["TempActividadEvaluada"] = null;
            Hashtable list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
            if (list == null || list.Count == 0)
            {
                HttpContext.Current.Session["TempActividadEvaluada"] = new Hashtable();
                list = (Hashtable)HttpContext.Current.Session["TempActividadEvaluada"];
            }

            DateTime startTime;
            DateTime endTime;
            EnapUser user = null; 
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
                if (_STARTDT != null)
                {
                    startTime = DateTime.Parse(_STARTDT);
                    
                }
                else
                {
                    startTime = new DateTime(2011, 1, 1,0,0,0);
                }
                if (_ENDDT != null)
                {
                    endTime = DateTime.Parse(_ENDDT);
                    endTime.AddHours(24);
                }
                else
                {
                    endTime = DateTime.Now;
                }
                if (_ONLYMY == "on")
                {
                    user = (EnapUser)HttpContext.Current.Session["enap-log"];
                } 
                _start = (_page * _limit) - _limit;
                 var query = bd.sp_search_actividad_evaluada(_ID_ORGANIZACION,
                        _ID_DEPARTAMENTO_ORGANIZACION,
                        _ID_DIVISION,
                        _ID_AREA,
                        _ID_ACTIVIDAD_GENERAL,
                        _ID_ACTIVIDAD_ESPECIFICA,
                        _NOM_ACTIVIDAD_ESPECIFICA,
                        _ID_CARGO,
                        _CONDICION,
                        startTime,
                        endTime,
                        ((user!=null)?user.Username:null)
                        ).Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                 List<sp_search_actividad_evaluadaResult> results = query.ToList < sp_search_actividad_evaluadaResult>();
                 if (_ID_ACTIVIDAD_ESPECIFICA != 0)
                 {

                     foreach (sp_search_actividad_evaluadaResult acEv in results)
                     {
                         ActividadJSONPOST obj = new ActividadJSONPOST();
                         obj.ID_MATRIZ = acEv.ID_MATRIZ;
                         obj.ID_DEPARTAMENTO_ORGANIZACION = (int)acEv.ID_DEPARTAMENTO_ORGANIZACION;
                         if (acEv.ID_DIVISION != 0)
                         {
                             obj.ID_DIVISION = (int)acEv.ID_DIVISION;
                         }
                         if (acEv.ID_AREA != 0)
                         {
                             obj.ID_AREA = (int)acEv.ID_AREA;
                         }

                         obj.ID_ACTIVIDAD_EVALUADA = acEv.ID_ACTIVIDAD_EVALUADA;

                         obj.ID_ACTIVIDAD_GENERAL = (int)acEv.ID_ACTIVIDAD_GENERAL;
                         obj.ID_CARGO = (int)acEv.ID_CARGO;

                         obj.ID_ACTIVIDAD_ESPECIFICA = (int)acEv.ID_ACTIVIDAD_ESPECIFICA;
                         obj.NOM_ACTIVIDAD_ESPECIFICA = acEv.NOM_ACTIVIDAD_ESPECIFICA;
                         obj.ID_DEPARTAMENTO_ORGANIZACION = (int)acEv.ID_DEPARTAMENTO_ORGANIZACION;
                         obj.ID_PELIGRO = (int)acEv.ID_PELIGRO;
                         obj.NOM_PELIGRO = acEv.NOM_PELIGRO;

                         obj.VALORACION_CONSECUENCIA = (int)acEv.VALORACION_CONSECUENCIA;
                         obj.VALORACION_PROBABILIDAD = (int)acEv.VALORACION_PROBABILIDAD;
                         obj.MEDIDA_VALORACION_CONSECUENCIA = (int)acEv.MEDIDA_VALORACION_CONSECUENCIA;
                         obj.MEDIDA_VALORACION_PROBABILIDAD = (int)acEv.MEDIDA_VALORACION_PROBABILIDAD;
                         obj.CONDICION = (int)acEv.CONDICION;
                         obj.FECHA_CREACION = acEv.FECHA_CREACION.ToString();

                         if (list.Contains(obj.ID_ACTIVIDAD_EVALUADA))
                         {
                             list.Remove(obj.ID_ACTIVIDAD_ESPECIFICA);
                         }
                         list.Add(obj.ID_ACTIVIDAD_EVALUADA, obj);
                     }
                 }
                    objJSON.items = results;
                    objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count<TBL_ACTIVIDAD_EVALUADA>();
                    objJSON.success = true;
                
            return objJSON;
        }
	}
}