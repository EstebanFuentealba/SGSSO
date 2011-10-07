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
	public class ActividadGeneral
	{
		private DataClassesEnapDataContext bd;

		public ActividadGeneral()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ACTIVIDAD_GENERAL>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ACTIVIDAD_GENERAL>> objJSON = new JSONCollection<List<TBL_ACTIVIDAD_GENERAL>>();
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
                var query = bd.TBL_ACTIVIDAD_GENERAL.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ACTIVIDAD_GENERAL> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_GENERAL.Count<TBL_ACTIVIDAD_GENERAL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ACTIVIDAD_GENERAL> Create(string NOM_ACTIVIDAD_GENERAL)
		{
            JSONCollection<TBL_ACTIVIDAD_GENERAL> objJSON = new JSONCollection<TBL_ACTIVIDAD_GENERAL>();
            try
            {
                TBL_ACTIVIDAD_GENERAL nuevo = new TBL_ACTIVIDAD_GENERAL()
                {
                    NOM_ACTIVIDAD_GENERAL = NOM_ACTIVIDAD_GENERAL
                };
                bd.TBL_ACTIVIDAD_GENERAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_GENERAL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACTIVIDAD_GENERAL> Get(string id)
		{
            JSONCollection<TBL_ACTIVIDAD_GENERAL> objJSON = new JSONCollection<TBL_ACTIVIDAD_GENERAL>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACTIVIDAD_GENERAL where variable.ID_ACTIVIDAD_GENERAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACTIVIDAD_GENERAL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACTIVIDAD_GENERAL> Update(string id, TBL_ACTIVIDAD_GENERAL nuevo)
		{

            JSONCollection<TBL_ACTIVIDAD_GENERAL> objJSON = new JSONCollection<TBL_ACTIVIDAD_GENERAL>();
            try
            {
                var objeto = (from variable in bd.TBL_ACTIVIDAD_GENERAL
                              where variable.ID_ACTIVIDAD_GENERAL == int.Parse(id)
                              select variable).Single();
                objeto.NOM_ACTIVIDAD_GENERAL = nuevo.NOM_ACTIVIDAD_GENERAL;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_GENERAL.Count();
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
			var objeto = (from variable in bd.TBL_ACTIVIDAD_GENERAL
							where variable.ID_ACTIVIDAD_GENERAL == int.Parse(id)
							select variable).First();

			bd.TBL_ACTIVIDAD_GENERAL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOM_ACTIVIDAD_GENERAL")){
					return "NOM_ACTIVIDAD_GENERAL";
				}

			}
			return "ID_ACTIVIDAD_GENERAL";
		}
	}
}