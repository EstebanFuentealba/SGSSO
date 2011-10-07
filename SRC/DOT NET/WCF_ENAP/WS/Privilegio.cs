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
	public class Privilegio
	{
		private DataClassesEnapDataContext bd;

		public Privilegio()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_PRIVILEGIO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_PRIVILEGIO>> objJSON = new JSONCollection<List<TBL_PRIVILEGIO>>();
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
                var query = bd.TBL_PRIVILEGIO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_PRIVILEGIO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PRIVILEGIO.Count<TBL_PRIVILEGIO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_PRIVILEGIO> Create(string NOMBRE_PRIVILEGIO)
		{
            JSONCollection<TBL_PRIVILEGIO> objJSON = new JSONCollection<TBL_PRIVILEGIO>();
            try
            {
                TBL_PRIVILEGIO nuevo = new TBL_PRIVILEGIO()
                {
                    NOMBRE_PRIVILEGIO = NOMBRE_PRIVILEGIO
                };
                bd.TBL_PRIVILEGIO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_PRIVILEGIO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PRIVILEGIO> Get(string id)
		{
            JSONCollection<TBL_PRIVILEGIO> objJSON = new JSONCollection<TBL_PRIVILEGIO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PRIVILEGIO where variable.ID_PRIVILEGIO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PRIVILEGIO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PRIVILEGIO> Update(string id, TBL_PRIVILEGIO nuevo)
		{

            JSONCollection<TBL_PRIVILEGIO> objJSON = new JSONCollection<TBL_PRIVILEGIO>();
            try
            {
                var objeto = (from variable in bd.TBL_PRIVILEGIO
                              where variable.ID_PRIVILEGIO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_PRIVILEGIO = nuevo.NOMBRE_PRIVILEGIO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PRIVILEGIO.Count();
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
			var objeto = (from variable in bd.TBL_PRIVILEGIO
							where variable.ID_PRIVILEGIO == int.Parse(id)
							select variable).First();

			bd.TBL_PRIVILEGIO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_PRIVILEGIO")){
					return "NOMBRE_PRIVILEGIO";
				}

			}
			return "ID_PRIVILEGIO";
		}
	}
}