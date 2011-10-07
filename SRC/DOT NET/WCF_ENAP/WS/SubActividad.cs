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
	public class SubActividad
	{
		private DataClassesEnapDataContext bd;

		public SubActividad()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_SUB_ACTIVIDAD>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_SUB_ACTIVIDAD>> objJSON = new JSONCollection<List<TBL_SUB_ACTIVIDAD>>();
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
                var query = bd.TBL_SUB_ACTIVIDAD.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_SUB_ACTIVIDAD> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_SUB_ACTIVIDAD.Count<TBL_SUB_ACTIVIDAD>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_SUB_ACTIVIDAD> Create(string ID_EVIDENCIA, string ID_PROGRAMA_ACTIVIDAD, string NOMBRE_SUB_ACTIVIDAD, string TIPO_FRECUENCIA, string CANTIDAD_ACTIVIDADES)
		{
            JSONCollection<TBL_SUB_ACTIVIDAD> objJSON = new JSONCollection<TBL_SUB_ACTIVIDAD>();
            try
            {
                TBL_SUB_ACTIVIDAD nuevo = new TBL_SUB_ACTIVIDAD()
                {
                    ID_EVIDENCIA = int.Parse(ID_EVIDENCIA), 
					ID_PROGRAMA_ACTIVIDAD = int.Parse(ID_PROGRAMA_ACTIVIDAD), 
					NOMBRE_SUB_ACTIVIDAD = NOMBRE_SUB_ACTIVIDAD, 
					TIPO_FRECUENCIA = int.Parse(TIPO_FRECUENCIA), 
					CANTIDAD_ACTIVIDADES = CANTIDAD_ACTIVIDADES
                };
                bd.TBL_SUB_ACTIVIDAD.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_SUB_ACTIVIDAD.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_SUB_ACTIVIDAD> Get(string id)
		{
            JSONCollection<TBL_SUB_ACTIVIDAD> objJSON = new JSONCollection<TBL_SUB_ACTIVIDAD>();
            try
            {
                objJSON.items = (from variable in bd.TBL_SUB_ACTIVIDAD where variable.ID_SUB_ACTIVIDAD == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_SUB_ACTIVIDAD.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_SUB_ACTIVIDAD> Update(string id, TBL_SUB_ACTIVIDAD nuevo)
		{

            JSONCollection<TBL_SUB_ACTIVIDAD> objJSON = new JSONCollection<TBL_SUB_ACTIVIDAD>();
            try
            {
                var objeto = (from variable in bd.TBL_SUB_ACTIVIDAD
                              where variable.ID_SUB_ACTIVIDAD == int.Parse(id)
                              select variable).Single();
                objeto.ID_EVIDENCIA = nuevo.ID_EVIDENCIA;
				objeto.ID_PROGRAMA_ACTIVIDAD = nuevo.ID_PROGRAMA_ACTIVIDAD;
				objeto.NOMBRE_SUB_ACTIVIDAD = nuevo.NOMBRE_SUB_ACTIVIDAD;
				objeto.TIPO_FRECUENCIA = nuevo.TIPO_FRECUENCIA;
				objeto.CANTIDAD_ACTIVIDADES = nuevo.CANTIDAD_ACTIVIDADES;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_SUB_ACTIVIDAD.Count();
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
			var objeto = (from variable in bd.TBL_SUB_ACTIVIDAD
							where variable.ID_SUB_ACTIVIDAD == int.Parse(id)
							select variable).First();

			bd.TBL_SUB_ACTIVIDAD.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_EVIDENCIA")){
					return "ID_EVIDENCIA";
				}
				if (_sort.Equals("ID_PROGRAMA_ACTIVIDAD")){
					return "ID_PROGRAMA_ACTIVIDAD";
				}
				if (_sort.Equals("NOMBRE_SUB_ACTIVIDAD")){
					return "NOMBRE_SUB_ACTIVIDAD";
				}
				if (_sort.Equals("TIPO_FRECUENCIA")){
					return "TIPO_FRECUENCIA";
				}
				if (_sort.Equals("CANTIDAD_ACTIVIDADES")){
					return "CANTIDAD_ACTIVIDADES";
				}

			}
			return "ID_SUB_ACTIVIDAD";
		}
	}
}