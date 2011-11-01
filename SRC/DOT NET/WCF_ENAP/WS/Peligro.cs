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
    public class Peligro
    {
        private DataClassesEnapDataContext bd;

        public Peligro()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&TIPO_PELIGRO={_tipo_peligro}")]
        public JSONCollection<List<TBL_PELIGRO>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _tipo_peligro)
        {

            JSONCollection<List<TBL_PELIGRO>> objJSON = new JSONCollection<List<TBL_PELIGRO>>();
            try
            {
                if (_dir == null)
                {
                    _dir = "ASC";
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
                var query = bd.TBL_PELIGRO.OrderBy(orderBy(_sort) + " " + _dir);
                if (_tipo_peligro == 0)
                {
                    query = query.Where(w => w.TIPO_PELIGRO == 1);
                }
                else
                {
                    query = query.Where(w => w.TIPO_PELIGRO == _tipo_peligro);
                }
                query = query.Skip(_start).Take(_limit).Select(r => r);
                List<TBL_PELIGRO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PELIGRO.Count<TBL_PELIGRO>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_PELIGRO> Create(string NOM_PELIGRO, int TIPO_PELIGRO)
        {
            JSONCollection<TBL_PELIGRO> objJSON = new JSONCollection<TBL_PELIGRO>();
            try
            {
                TBL_PELIGRO nuevo = new TBL_PELIGRO()
                {
                    NOM_PELIGRO = NOM_PELIGRO,
                    TIPO_PELIGRO = TIPO_PELIGRO
                };
                bd.TBL_PELIGRO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();

                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_PELIGRO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PELIGRO> Get(string id)
        {
            JSONCollection<TBL_PELIGRO> objJSON = new JSONCollection<TBL_PELIGRO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PELIGRO where variable.ID_PELIGRO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PELIGRO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }
        //actualiza
        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PELIGRO> Update(string id, TBL_PELIGRO nuevo)
        {

            JSONCollection<TBL_PELIGRO> objJSON = new JSONCollection<TBL_PELIGRO>();
            try
            {
                var objeto = (from variable in bd.TBL_PELIGRO
                              where variable.ID_PELIGRO == int.Parse(id)
                              select variable).Single();
                objeto.NOM_PELIGRO = nuevo.NOM_PELIGRO;
                //objeto.TIPO_PELIGRO = nuevo.TIPO_PELIGRO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PELIGRO.Count();
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
            var objeto = (from variable in bd.TBL_PELIGRO
                          where variable.ID_PELIGRO == int.Parse(id)
                          select variable).First();

            bd.TBL_PELIGRO.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("NOM_PELIGRO"))
                {
                    return "NOM_PELIGRO";
                }

            }
            return "ID_PELIGRO";
        }
    }
}