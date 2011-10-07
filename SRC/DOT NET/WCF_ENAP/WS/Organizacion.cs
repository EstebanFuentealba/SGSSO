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
	public class Organizacion
	{
		private DataClassesEnapDataContext bd;

		public Organizacion()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ORGANIZACION>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ORGANIZACION>> objJSON = new JSONCollection<List<TBL_ORGANIZACION>>();
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
                var query = bd.TBL_ORGANIZACION.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ORGANIZACION> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ORGANIZACION.Count<TBL_ORGANIZACION>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ORGANIZACION> Create(string NOMBRE_ORGANIZACION)
		{
            JSONCollection<TBL_ORGANIZACION> objJSON = new JSONCollection<TBL_ORGANIZACION>();
            try
            {
                TBL_ORGANIZACION nuevo = new TBL_ORGANIZACION()
                {
                    NOMBRE_ORGANIZACION = NOMBRE_ORGANIZACION
                };
                bd.TBL_ORGANIZACION.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ORGANIZACION.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ORGANIZACION> Get(string id)
		{
            JSONCollection<TBL_ORGANIZACION> objJSON = new JSONCollection<TBL_ORGANIZACION>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ORGANIZACION where variable.ID_ORGANIZACION == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ORGANIZACION.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ORGANIZACION> Update(string id, TBL_ORGANIZACION nuevo)
		{

            JSONCollection<TBL_ORGANIZACION> objJSON = new JSONCollection<TBL_ORGANIZACION>();
            try
            {
                var objeto = (from variable in bd.TBL_ORGANIZACION
                              where variable.ID_ORGANIZACION == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_ORGANIZACION = nuevo.NOMBRE_ORGANIZACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ORGANIZACION.Count();
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
			var objeto = (from variable in bd.TBL_ORGANIZACION
							where variable.ID_ORGANIZACION == int.Parse(id)
							select variable).First();

			bd.TBL_ORGANIZACION.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_ORGANIZACION")){
					return "NOMBRE_ORGANIZACION";
				}

			}
			return "ID_ORGANIZACION";
		}
	}
}