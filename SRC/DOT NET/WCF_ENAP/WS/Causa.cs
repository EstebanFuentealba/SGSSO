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
    public class Causa
    {
        private DataClassesEnapDataContext bd;

        public Causa()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "getAll?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&TIPO_CAUSA={_tipo_causa}")]
        public JSONCollection<List<TBL_CAUSA>> GetAllCollection(int _page, int _start, int _limit, string _sort, string _dir, int _tipo_causa)
        {
            JSONCollection<List<TBL_CAUSA>> objJSON = new JSONCollection<List<TBL_CAUSA>>();
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
            var query = bd.TBL_CAUSA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
            foreach(TBL_CAUSA causa in query.ToList()) {

            }
            List<TBL_CAUSA> results = query.ToList();
            objJSON.items = results;
            objJSON.totalCount = bd.TBL_CAUSA.Count<TBL_CAUSA>();
            objJSON.success = true;
            return objJSON;
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&TIPO_CAUSA={_tipo_causa}")]
        public JSONCollection<List<TBL_CAUSA>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _tipo_causa)
        {
            JSONCollection<List<TBL_CAUSA>> objJSON = new JSONCollection<List<TBL_CAUSA>>();
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
                var query = bd.TBL_CAUSA.OrderBy(orderBy(_sort) + " " + _dir);
                if (_tipo_causa == 0)
                {
                    query = query.Where(w => w.TIPO_CAUSA == 2);
                }
                else
                {
                    query = query.Where(w => w.TIPO_CAUSA == _tipo_causa);
                }
                query = query.Skip(_start).Take(_limit).Select(r => r);
                List<TBL_CAUSA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_CAUSA.Count<TBL_CAUSA>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_CAUSA> Create(string ID_INFORME, string DESCRIPCION, string TIPO_CAUSA)
        {
            JSONCollection<TBL_CAUSA> objJSON = new JSONCollection<TBL_CAUSA>();
            try
            {
                TBL_CAUSA nuevo = new TBL_CAUSA()
                {
                    //ID_INFORME = int.Parse(ID_INFORME), 
                    DESCRIPCION = DESCRIPCION,
                    TIPO_CAUSA = int.Parse(TIPO_CAUSA)
                };
                bd.TBL_CAUSA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();

                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_CAUSA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_CAUSA> Get(string id)
        {
            JSONCollection<TBL_CAUSA> objJSON = new JSONCollection<TBL_CAUSA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_CAUSA where variable.ID_CAUSA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_CAUSA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_CAUSA> Update(string id, TBL_CAUSA nuevo)
        {

            JSONCollection<TBL_CAUSA> objJSON = new JSONCollection<TBL_CAUSA>();
            try
            {
                var objeto = (from variable in bd.TBL_CAUSA
                              where variable.ID_CAUSA == int.Parse(id)
                              select variable).Single();
                //objeto.ID_INFORME = nuevo.ID_INFORME;
                objeto.DESCRIPCION = nuevo.DESCRIPCION;
                objeto.TIPO_CAUSA = nuevo.TIPO_CAUSA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_CAUSA.Count();
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
            var objeto = (from variable in bd.TBL_CAUSA
                          where variable.ID_CAUSA == int.Parse(id)
                          select variable).First();

            bd.TBL_CAUSA.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("ID_INFORME"))
                {
                    return "ID_INFORME";
                }
                if (_sort.Equals("DESCRIPCION"))
                {
                    return "DESCRIPCION";
                }
                if (_sort.Equals("TIPO_CAUSA"))
                {
                    return "TIPO_CAUSA";
                }

            }
            return "ID_CAUSA";
        }
    }
}