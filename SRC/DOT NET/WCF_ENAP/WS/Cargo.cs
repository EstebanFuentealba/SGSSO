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
	public class Cargo
	{
		private DataClassesEnapDataContext bd;

		public Cargo()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_CARGO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_CARGO>> objJSON = new JSONCollection<List<TBL_CARGO>>();
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
                var query = bd.TBL_CARGO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_CARGO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_CARGO.Count<TBL_CARGO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_CARGO> Create(string NOMBRE_CARGO)
		{
            JSONCollection<TBL_CARGO> objJSON = new JSONCollection<TBL_CARGO>();
            try
            {
                TBL_CARGO nuevo = new TBL_CARGO()
                {
                    NOMBRE_CARGO = NOMBRE_CARGO
                };
                bd.TBL_CARGO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_CARGO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_CARGO> Get(string id)
		{
            JSONCollection<TBL_CARGO> objJSON = new JSONCollection<TBL_CARGO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_CARGO where variable.ID_CARGO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_CARGO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_CARGO> Update(string id, TBL_CARGO nuevo)
		{

            JSONCollection<TBL_CARGO> objJSON = new JSONCollection<TBL_CARGO>();
            try
            {
                var objeto = (from variable in bd.TBL_CARGO
                              where variable.ID_CARGO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_CARGO = nuevo.NOMBRE_CARGO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_CARGO.Count();
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
			var objeto = (from variable in bd.TBL_CARGO
							where variable.ID_CARGO == int.Parse(id)
							select variable).First();

			bd.TBL_CARGO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_CARGO")){
					return "NOMBRE_CARGO";
				}

			}
			return "ID_CARGO";
		}
	}
}