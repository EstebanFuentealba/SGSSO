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
	public class Consecuencia
	{
		private DataClassesEnapDataContext bd;

		public Consecuencia()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_CONSECUENCIA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_CONSECUENCIA>> objJSON = new JSONCollection<List<TBL_CONSECUENCIA>>();
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
                var query = bd.TBL_CONSECUENCIA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_CONSECUENCIA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_CONSECUENCIA.Count<TBL_CONSECUENCIA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_CONSECUENCIA> Create(string NOMBRE_CONSECUENCIA)
		{
            JSONCollection<TBL_CONSECUENCIA> objJSON = new JSONCollection<TBL_CONSECUENCIA>();
            try
            {
                TBL_CONSECUENCIA nuevo = new TBL_CONSECUENCIA()
                {
					NOMBRE_CONSECUENCIA = NOMBRE_CONSECUENCIA
                };
                bd.TBL_CONSECUENCIA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_CONSECUENCIA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_CONSECUENCIA> Get(string id)
		{
            JSONCollection<TBL_CONSECUENCIA> objJSON = new JSONCollection<TBL_CONSECUENCIA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_CONSECUENCIA where variable.ID_CONSECUENCIA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_CONSECUENCIA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_CONSECUENCIA> Update(string id, TBL_CONSECUENCIA nuevo)
		{

            JSONCollection<TBL_CONSECUENCIA> objJSON = new JSONCollection<TBL_CONSECUENCIA>();
            try
            {
                var objeto = (from variable in bd.TBL_CONSECUENCIA
                              where variable.ID_CONSECUENCIA == int.Parse(id)
                              select variable).Single();
				objeto.NOMBRE_CONSECUENCIA = nuevo.NOMBRE_CONSECUENCIA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_CONSECUENCIA.Count();
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
			var objeto = (from variable in bd.TBL_CONSECUENCIA
							where variable.ID_CONSECUENCIA == int.Parse(id)
							select variable).First();

			bd.TBL_CONSECUENCIA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_PELIGRO")){
					return "ID_PELIGRO";
				}
				if (_sort.Equals("NOMBRE_CONSECUENCIA")){
					return "NOMBRE_CONSECUENCIA";
				}

			}
			return "ID_CONSECUENCIA";
		}
	}
}