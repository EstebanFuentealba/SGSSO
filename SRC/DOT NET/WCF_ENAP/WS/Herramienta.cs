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
    public class Herramienta
    {
        private DataClassesEnapDataContext bd;

        public Herramienta()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_HERRAMIENTA>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<TBL_HERRAMIENTA>> objJSON = new JSONCollection<List<TBL_HERRAMIENTA>>();
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
                var query = bd.TBL_HERRAMIENTA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_HERRAMIENTA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_HERRAMIENTA.Count<TBL_HERRAMIENTA>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_HERRAMIENTA> Create(string NOMBRE_HERRAMIENTA)
        {
            JSONCollection<TBL_HERRAMIENTA> objJSON = new JSONCollection<TBL_HERRAMIENTA>();
            try
            {
                TBL_HERRAMIENTA nuevo = new TBL_HERRAMIENTA()
                {
                    NOMBRE_HERRAMIENTA = NOMBRE_HERRAMIENTA
                };
                bd.TBL_HERRAMIENTA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();

                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_HERRAMIENTA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_HERRAMIENTA> Get(string id)
        {
            JSONCollection<TBL_HERRAMIENTA> objJSON = new JSONCollection<TBL_HERRAMIENTA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_HERRAMIENTA where variable.ID_HERRAMIENTA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_HERRAMIENTA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_HERRAMIENTA> Update(string id, TBL_HERRAMIENTA nuevo)
        {

            JSONCollection<TBL_HERRAMIENTA> objJSON = new JSONCollection<TBL_HERRAMIENTA>();
            try
            {
                var objeto = (from variable in bd.TBL_HERRAMIENTA
                              where variable.ID_HERRAMIENTA == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_HERRAMIENTA = nuevo.NOMBRE_HERRAMIENTA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_HERRAMIENTA.Count();
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
            var objeto = (from variable in bd.TBL_HERRAMIENTA
                          where variable.ID_HERRAMIENTA == int.Parse(id)
                          select variable).First();

            bd.TBL_HERRAMIENTA.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("NOMBRE_HERRAMIENTA"))
                {
                    return "NOMBRE_HERRAMIENTA";
                }

            }
            return "ID_HERRAMIENTA";
        }
    }
}