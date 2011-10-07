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
	public class ActividadEspecifica
	{
		private DataClassesEnapDataContext bd;

		public ActividadEspecifica()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ACTIVIDAD_ESPECIFICA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ACTIVIDAD_ESPECIFICA>> objJSON = new JSONCollection<List<TBL_ACTIVIDAD_ESPECIFICA>>();
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
                var query = bd.TBL_ACTIVIDAD_ESPECIFICA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ACTIVIDAD_ESPECIFICA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_ESPECIFICA.Count<TBL_ACTIVIDAD_ESPECIFICA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> Create(string NOM_ACTIVIDAD_ESPECIFICA)
		{
            JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> objJSON = new JSONCollection<TBL_ACTIVIDAD_ESPECIFICA>();
            try
            {
                TBL_ACTIVIDAD_ESPECIFICA nuevo = new TBL_ACTIVIDAD_ESPECIFICA()
                {
                    NOM_ACTIVIDAD_ESPECIFICA = NOM_ACTIVIDAD_ESPECIFICA
                };
                bd.TBL_ACTIVIDAD_ESPECIFICA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_ESPECIFICA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> Get(string id)
		{
            JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> objJSON = new JSONCollection<TBL_ACTIVIDAD_ESPECIFICA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACTIVIDAD_ESPECIFICA where variable.ID_ACTIVIDAD_ESPECIFICA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACTIVIDAD_ESPECIFICA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> Update(string id, TBL_ACTIVIDAD_ESPECIFICA nuevo)
		{

            JSONCollection<TBL_ACTIVIDAD_ESPECIFICA> objJSON = new JSONCollection<TBL_ACTIVIDAD_ESPECIFICA>();
            try
            {
                var objeto = (from variable in bd.TBL_ACTIVIDAD_ESPECIFICA
                              where variable.ID_ACTIVIDAD_ESPECIFICA == int.Parse(id)
                              select variable).Single();
                objeto.NOM_ACTIVIDAD_ESPECIFICA = nuevo.NOM_ACTIVIDAD_ESPECIFICA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACTIVIDAD_ESPECIFICA.Count();
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
			var objeto = (from variable in bd.TBL_ACTIVIDAD_ESPECIFICA
							where variable.ID_ACTIVIDAD_ESPECIFICA == int.Parse(id)
							select variable).First();

			bd.TBL_ACTIVIDAD_ESPECIFICA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOM_ACTIVIDAD_ESPECIFICA")){
					return "NOM_ACTIVIDAD_ESPECIFICA";
				}

			}
			return "ID_ACTIVIDAD_ESPECIFICA";
		}
	}
}