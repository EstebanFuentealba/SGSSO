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
	public class Modulo
	{
		private DataClassesEnapDataContext bd;

		public Modulo()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_MODULO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_MODULO>> objJSON = new JSONCollection<List<TBL_MODULO>>();
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
                var query = bd.TBL_MODULO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_MODULO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_MODULO.Count<TBL_MODULO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_MODULO> Create(string NOMBRE_MODULO, string DESCRIPCION_MODULO, string URL_MODULO)
		{
            JSONCollection<TBL_MODULO> objJSON = new JSONCollection<TBL_MODULO>();
            try
            {
                TBL_MODULO nuevo = new TBL_MODULO()
                {
                    NOMBRE_MODULO = NOMBRE_MODULO, 
					DESCRIPCION_MODULO = DESCRIPCION_MODULO, 
					URL_MODULO = URL_MODULO
                };
                bd.TBL_MODULO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_MODULO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_MODULO> Get(string id)
		{
            JSONCollection<TBL_MODULO> objJSON = new JSONCollection<TBL_MODULO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_MODULO where variable.ID_MODULO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_MODULO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_MODULO> Update(string id, TBL_MODULO nuevo)
		{

            JSONCollection<TBL_MODULO> objJSON = new JSONCollection<TBL_MODULO>();
            try
            {
                var objeto = (from variable in bd.TBL_MODULO
                              where variable.ID_MODULO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_MODULO = nuevo.NOMBRE_MODULO;
				objeto.DESCRIPCION_MODULO = nuevo.DESCRIPCION_MODULO;
				objeto.URL_MODULO = nuevo.URL_MODULO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_MODULO.Count();
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
			var objeto = (from variable in bd.TBL_MODULO
							where variable.ID_MODULO == int.Parse(id)
							select variable).First();

			bd.TBL_MODULO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_MODULO")){
					return "NOMBRE_MODULO";
				}
				if (_sort.Equals("DESCRIPCION_MODULO")){
					return "DESCRIPCION_MODULO";
				}
				if (_sort.Equals("URL_MODULO")){
					return "URL_MODULO";
				}

			}
			return "ID_MODULO";
		}
	}
}