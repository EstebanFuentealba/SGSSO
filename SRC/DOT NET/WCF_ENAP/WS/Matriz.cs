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
	public class Matriz
	{
		private DataClassesEnapDataContext bd;

		public Matriz()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_MATRIZ>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_MATRIZ>> objJSON = new JSONCollection<List<TBL_MATRIZ>>();
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
                var query = bd.TBL_MATRIZ.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_MATRIZ> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_MATRIZ.Count<TBL_MATRIZ>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_MATRIZ> Create(int ID_ACTIVIDAD_GENERAL, int ID_CARGO, int ID_DIVISION, int ID_ACTIVIDAD_ESPECIFICA, int ID_DEPARTAMENTO_ORGANIZACION, int ID_PELIGRO, int ID_AREA, int VALORACION_CONSECUENCIA, int VALORACION_PROBABILIDAD, int MEDIDA_VALORACION_CONSECUENCIA, int MEDIDA_VALORACION_PROBABILIDAD, int CONDICION, int[] MEDIDAS)
        {
            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            List<ActividadJSONPOST> list = (List<ActividadJSONPOST>)HttpContext.Current.Session["TempActividadEvaluada"];
            EnapUser user = (EnapUser)HttpContext.Current.Session["enap-log"];
           
            if (list == null)
            {
                throw new Exception("No hay datos en la lista");
            }
            TBL_MATRIZ nueva_matriz = new TBL_MATRIZ()
            {
                FECHA_CREACION = DateTime.Now,
                ESTADO = true
            };
            if (user != null)
            {
                nueva_matriz.ID_USUARIO = user.Username;
            }
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
                    FECHA_CREACION = DateTime.Now,
                    ID_ACTIVIDAD_EVALUADA = nuevo.ID_ACTIVIDAD_EVALUADA,
                    ID_MATRIZ = nueva_matriz.ID_MATRIZ
                };
                bd.TBL_MATRIZ_ACTIVIDAD.InsertOnSubmit(matriz_actividad);
                bd.SubmitChanges();
            }



            /*
            JSONCollection<ActividadJSONPOST> objJSON = new JSONCollection<ActividadJSONPOST>();
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
            json_return.ID_DEPARTAMENTO_ORGANIZACION = (int)nuevo.ID_DEPARTAMENTO_ORGANIZACION;
            json_return.ID_PELIGRO = (int)nuevo.ID_PELIGRO;
            
            json_return.VALORACION_CONSECUENCIA = (int)nuevo.VALORACION_CONSECUENCIA;
            json_return.VALORACION_PROBABILIDAD = (int)nuevo.VALORACION_PROBABILIDAD;
            json_return.MEDIDA_VALORACION_CONSECUENCIA = (int)nuevo.MEDIDA_VALORACION_CONSECUENCIA;
            json_return.MEDIDA_VALORACION_PROBABILIDAD = (int)nuevo.MEDIDA_VALORACION_PROBABILIDAD;
            json_return.CONDICION = (int)nuevo.CONDICION;
            json_return.FECHA_CREACION = (DateTime)nuevo.FECHA_CREACION;

            json_return.MEDIDAS = MEDIDAS;
            objJSON.items = json_return;
            objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
            objJSON.success = true;
            */

            HttpContext.Current.Session["TempActividadEvaluada"] = null;
            objJSON.items = nueva_matriz;
            objJSON.totalCount = bd.TBL_ACTIVIDAD_EVALUADA.Count();
            objJSON.success = true;
            return objJSON;
        }

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_MATRIZ> Get(string id)
		{
            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            try
            {
                objJSON.items = (from variable in bd.TBL_MATRIZ where variable.ID_MATRIZ == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_MATRIZ.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_MATRIZ> Update(string id, TBL_MATRIZ nuevo)
		{

            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            try
            {
                var objeto = (from variable in bd.TBL_MATRIZ
                              where variable.ID_MATRIZ == int.Parse(id)
                              select variable).Single();
                objeto.ID_USUARIO = nuevo.ID_USUARIO;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_MATRIZ.Count();
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
			var objeto = (from variable in bd.TBL_MATRIZ
							where variable.ID_MATRIZ == int.Parse(id)
							select variable).First();

			bd.TBL_MATRIZ.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_USUARIO")){
					return "ID_USUARIO";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}

			}
			return "ID_MATRIZ";
		}
        
	}
}