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
    public class Stores
    {
        private DataClassesEnapDataContext bd;

        public Stores()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_STORE>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<TBL_STORE>> objJSON = new JSONCollection<List<TBL_STORE>>();
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
                var query = bd.TBL_STORE.Skip(_start).Take(_limit).OrderBy("NOMBRE_STORE " + _dir).Select(r => r);
                List<TBL_STORE> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_STORE.Count<TBL_STORE>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ACCION> Create(string NOMBRE_ACCION)
        {
            throw new Exception("No implementado");
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACCION> Get(string id)
        {
            throw new Exception("No implementado");
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACCION> Update(string id, TBL_ACCION nuevo)
        {
            throw new Exception("No implementado");
        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
        public void Delete(string id)
        {
            throw new Exception("No implementado");
        }
    }
}