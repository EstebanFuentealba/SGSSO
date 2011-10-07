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
	public class Accion
	{
		private DataClassesEnapDataContext bd;

		public Accion()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ACCION>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ACCION>> objJSON = new JSONCollection<List<TBL_ACCION>>();
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
                var query = bd.TBL_ACCION.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ACCION> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ACCION.Count<TBL_ACCION>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ACCION> Create(string NOMBRE_ACCION)
		{
            JSONCollection<TBL_ACCION> objJSON = new JSONCollection<TBL_ACCION>();
            try
            {
                TBL_ACCION nuevo = new TBL_ACCION()
                {
                    NOMBRE_ACCION = NOMBRE_ACCION
                };
                bd.TBL_ACCION.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ACCION.Count();
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
            JSONCollection<TBL_ACCION> objJSON = new JSONCollection<TBL_ACCION>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACCION where variable.ID_ACCION == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACCION.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACCION> Update(string id, TBL_ACCION nuevo)
		{

            JSONCollection<TBL_ACCION> objJSON = new JSONCollection<TBL_ACCION>();
            try
            {
                var objeto = (from variable in bd.TBL_ACCION
                              where variable.ID_ACCION == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_ACCION = nuevo.NOMBRE_ACCION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACCION.Count();
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
			var objeto = (from variable in bd.TBL_ACCION
							where variable.ID_ACCION == int.Parse(id)
							select variable).First();

			bd.TBL_ACCION.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_ACCION")){
					return "NOMBRE_ACCION";
				}

			}
			return "ID_ACCION";
		}
	}
}