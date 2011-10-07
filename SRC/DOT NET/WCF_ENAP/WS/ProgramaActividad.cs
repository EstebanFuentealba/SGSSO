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
	public class ProgramaActividad
	{
		private DataClassesEnapDataContext bd;

		public ProgramaActividad()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_PROGRAMA_ACTIVIDAD>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_PROGRAMA_ACTIVIDAD>> objJSON = new JSONCollection<List<TBL_PROGRAMA_ACTIVIDAD>>();
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
                var query = bd.TBL_PROGRAMA_ACTIVIDAD.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_PROGRAMA_ACTIVIDAD> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PROGRAMA_ACTIVIDAD.Count<TBL_PROGRAMA_ACTIVIDAD>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_PROGRAMA_ACTIVIDAD> Create(string ID_PROGRAMA_ANUAL, string NOMBRE_PROGRAMA_ACTIVIDAD)
		{
            JSONCollection<TBL_PROGRAMA_ACTIVIDAD> objJSON = new JSONCollection<TBL_PROGRAMA_ACTIVIDAD>();
            try
            {
                TBL_PROGRAMA_ACTIVIDAD nuevo = new TBL_PROGRAMA_ACTIVIDAD()
                {
                    ID_PROGRAMA_ANUAL = int.Parse(ID_PROGRAMA_ANUAL), 
					NOMBRE_PROGRAMA_ACTIVIDAD = NOMBRE_PROGRAMA_ACTIVIDAD
                };
                bd.TBL_PROGRAMA_ACTIVIDAD.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_PROGRAMA_ACTIVIDAD.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PROGRAMA_ACTIVIDAD> Get(string id)
		{
            JSONCollection<TBL_PROGRAMA_ACTIVIDAD> objJSON = new JSONCollection<TBL_PROGRAMA_ACTIVIDAD>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PROGRAMA_ACTIVIDAD where variable.ID_PROGRAMA_ACTIVIDAD == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PROGRAMA_ACTIVIDAD.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PROGRAMA_ACTIVIDAD> Update(string id, TBL_PROGRAMA_ACTIVIDAD nuevo)
		{

            JSONCollection<TBL_PROGRAMA_ACTIVIDAD> objJSON = new JSONCollection<TBL_PROGRAMA_ACTIVIDAD>();
            try
            {
                var objeto = (from variable in bd.TBL_PROGRAMA_ACTIVIDAD
                              where variable.ID_PROGRAMA_ACTIVIDAD == int.Parse(id)
                              select variable).Single();
                objeto.ID_PROGRAMA_ANUAL = nuevo.ID_PROGRAMA_ANUAL;
				objeto.NOMBRE_PROGRAMA_ACTIVIDAD = nuevo.NOMBRE_PROGRAMA_ACTIVIDAD;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PROGRAMA_ACTIVIDAD.Count();
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
			var objeto = (from variable in bd.TBL_PROGRAMA_ACTIVIDAD
							where variable.ID_PROGRAMA_ACTIVIDAD == int.Parse(id)
							select variable).First();

			bd.TBL_PROGRAMA_ACTIVIDAD.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_PROGRAMA_ANUAL")){
					return "ID_PROGRAMA_ANUAL";
				}
				if (_sort.Equals("NOMBRE_PROGRAMA_ACTIVIDAD")){
					return "NOMBRE_PROGRAMA_ACTIVIDAD";
				}

			}
			return "ID_PROGRAMA_ACTIVIDAD";
		}
	}
}