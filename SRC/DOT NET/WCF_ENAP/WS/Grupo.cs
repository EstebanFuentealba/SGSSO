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
	public class Grupo
	{
		private DataClassesEnapDataContext bd;

		public Grupo()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_GRUPO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_GRUPO>> objJSON = new JSONCollection<List<TBL_GRUPO>>();
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
                var query = bd.TBL_GRUPO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_GRUPO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_GRUPO.Count<TBL_GRUPO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_GRUPO> Create(string NOMBRE_GRUPO, string DESCRIPCION_GRUPO)
		{
            JSONCollection<TBL_GRUPO> objJSON = new JSONCollection<TBL_GRUPO>();
            try
            {
                TBL_GRUPO nuevo = new TBL_GRUPO()
                {
                    NOMBRE_GRUPO = NOMBRE_GRUPO, 
					DESCRIPCION_GRUPO = DESCRIPCION_GRUPO
                };
                bd.TBL_GRUPO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_GRUPO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_GRUPO> Get(string id)
		{
            JSONCollection<TBL_GRUPO> objJSON = new JSONCollection<TBL_GRUPO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_GRUPO where variable.ID_GRUPO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_GRUPO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_GRUPO> Update(string id, TBL_GRUPO nuevo)
		{

            JSONCollection<TBL_GRUPO> objJSON = new JSONCollection<TBL_GRUPO>();
            try
            {
                var objeto = (from variable in bd.TBL_GRUPO
                              where variable.ID_GRUPO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_GRUPO = nuevo.NOMBRE_GRUPO;
				objeto.DESCRIPCION_GRUPO = nuevo.DESCRIPCION_GRUPO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_GRUPO.Count();
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
			var objeto = (from variable in bd.TBL_GRUPO
							where variable.ID_GRUPO == int.Parse(id)
							select variable).First();

			bd.TBL_GRUPO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_GRUPO")){
					return "NOMBRE_GRUPO";
				}
				if (_sort.Equals("DESCRIPCION_GRUPO")){
					return "DESCRIPCION_GRUPO";
				}

			}
			return "ID_GRUPO";
		}
	}
}