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
	public class RecursoComprometido
	{
		private DataClassesEnapDataContext bd;

		public RecursoComprometido()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_RECURSO_COMPROMETIDO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_RECURSO_COMPROMETIDO>> objJSON = new JSONCollection<List<TBL_RECURSO_COMPROMETIDO>>();
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
                var query = bd.TBL_RECURSO_COMPROMETIDO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_RECURSO_COMPROMETIDO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_RECURSO_COMPROMETIDO.Count<TBL_RECURSO_COMPROMETIDO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_RECURSO_COMPROMETIDO> Create(string NOMBRE_RECURSO, string DESCRIPCION)
		{
            JSONCollection<TBL_RECURSO_COMPROMETIDO> objJSON = new JSONCollection<TBL_RECURSO_COMPROMETIDO>();
            try
            {
                TBL_RECURSO_COMPROMETIDO nuevo = new TBL_RECURSO_COMPROMETIDO()
                {
                    NOMBRE_RECURSO = NOMBRE_RECURSO, 
					DESCRIPCION = DESCRIPCION
                };
                bd.TBL_RECURSO_COMPROMETIDO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_RECURSO_COMPROMETIDO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_RECURSO_COMPROMETIDO> Get(string id)
		{
            JSONCollection<TBL_RECURSO_COMPROMETIDO> objJSON = new JSONCollection<TBL_RECURSO_COMPROMETIDO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_RECURSO_COMPROMETIDO where variable.ID_RECURSO_COMPROMETIDO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_RECURSO_COMPROMETIDO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_RECURSO_COMPROMETIDO> Update(string id, TBL_RECURSO_COMPROMETIDO nuevo)
		{

            JSONCollection<TBL_RECURSO_COMPROMETIDO> objJSON = new JSONCollection<TBL_RECURSO_COMPROMETIDO>();
            try
            {
                var objeto = (from variable in bd.TBL_RECURSO_COMPROMETIDO
                              where variable.ID_RECURSO_COMPROMETIDO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_RECURSO = nuevo.NOMBRE_RECURSO;
				objeto.DESCRIPCION = nuevo.DESCRIPCION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_RECURSO_COMPROMETIDO.Count();
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
			var objeto = (from variable in bd.TBL_RECURSO_COMPROMETIDO
							where variable.ID_RECURSO_COMPROMETIDO == int.Parse(id)
							select variable).First();

			bd.TBL_RECURSO_COMPROMETIDO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_RECURSO")){
					return "NOMBRE_RECURSO";
				}
				if (_sort.Equals("DESCRIPCION")){
					return "DESCRIPCION";
				}

			}
			return "ID_RECURSO_COMPROMETIDO";
		}
	}
}