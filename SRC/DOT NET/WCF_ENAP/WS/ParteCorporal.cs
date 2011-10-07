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
	public class ParteCorporal
	{
		private DataClassesEnapDataContext bd;

		public ParteCorporal()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_PARTE_CORPORAL>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_PARTE_CORPORAL>> objJSON = new JSONCollection<List<TBL_PARTE_CORPORAL>>();
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
                var query = bd.TBL_PARTE_CORPORAL.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_PARTE_CORPORAL> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PARTE_CORPORAL.Count<TBL_PARTE_CORPORAL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_PARTE_CORPORAL> Create(string NOMBRE_PARTE_CORPORAL)
		{
            JSONCollection<TBL_PARTE_CORPORAL> objJSON = new JSONCollection<TBL_PARTE_CORPORAL>();
            try
            {
                TBL_PARTE_CORPORAL nuevo = new TBL_PARTE_CORPORAL()
                {
                    NOMBRE_PARTE_CORPORAL = NOMBRE_PARTE_CORPORAL
                };
                bd.TBL_PARTE_CORPORAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_PARTE_CORPORAL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PARTE_CORPORAL> Get(string id)
		{
            JSONCollection<TBL_PARTE_CORPORAL> objJSON = new JSONCollection<TBL_PARTE_CORPORAL>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PARTE_CORPORAL where variable.ID_PARTE_CORPORAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PARTE_CORPORAL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PARTE_CORPORAL> Update(string id, TBL_PARTE_CORPORAL nuevo)
		{

            JSONCollection<TBL_PARTE_CORPORAL> objJSON = new JSONCollection<TBL_PARTE_CORPORAL>();
            try
            {
                var objeto = (from variable in bd.TBL_PARTE_CORPORAL
                              where variable.ID_PARTE_CORPORAL == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_PARTE_CORPORAL = nuevo.NOMBRE_PARTE_CORPORAL;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PARTE_CORPORAL.Count();
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
			var objeto = (from variable in bd.TBL_PARTE_CORPORAL
							where variable.ID_PARTE_CORPORAL == int.Parse(id)
							select variable).First();

			bd.TBL_PARTE_CORPORAL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_PARTE_CORPORAL")){
					return "NOMBRE_PARTE_CORPORAL";
				}

			}
			return "ID_PARTE_CORPORAL";
		}
	}
}