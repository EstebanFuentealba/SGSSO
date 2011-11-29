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
    public class TemplatePrograma
    {
        private DataClassesEnapDataContext bd;

        public TemplatePrograma()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_TEMPLATE>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<TBL_TEMPLATE>> objJSON = new JSONCollection<List<TBL_TEMPLATE>>();
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
                var query = bd.TBL_TEMPLATE.Skip(_start).Take(_limit).OrderBy("ID_TEMPLATE " + _dir).Select(r => r);
                List<TBL_TEMPLATE> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_TEMPLATE.Count<TBL_TEMPLATE>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_TEMPLATE> Create(string NOMBRE_TEMPLATE)
        {
            JSONCollection<TBL_TEMPLATE> objJSON = new JSONCollection<TBL_TEMPLATE>();
            try
            {
                TBL_TEMPLATE nuevoTemplate = new TBL_TEMPLATE()
                {
                    NOMBRE_TEMPLATE = NOMBRE_TEMPLATE
                };
                bd.TBL_TEMPLATE.InsertOnSubmit(nuevoTemplate);
                bd.SubmitChanges();

                objJSON.items = nuevoTemplate;
                objJSON.totalCount = bd.TBL_TEMPLATE.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
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