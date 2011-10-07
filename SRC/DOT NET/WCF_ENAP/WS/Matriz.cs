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
	public class Matriz
	{
		private DataClassesEnapDataContext bd;

		public Matriz()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_MATRIZ>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_MATRIZ>> objJSON = new JSONCollection<List<TBL_MATRIZ>>();
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
                var query = bd.TBL_MATRIZ.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_MATRIZ> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_MATRIZ.Count<TBL_MATRIZ>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_MATRIZ> Create(string ID_USUARIO, string FECHA_CREACION)
		{
            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            try
            {
                TBL_MATRIZ nuevo = new TBL_MATRIZ()
                {
                    ID_USUARIO = int.Parse(ID_USUARIO), 
					FECHA_CREACION = DateTime.Parse(FECHA_CREACION)
                };
                bd.TBL_MATRIZ.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_MATRIZ.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_MATRIZ> Get(string id)
		{
            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            try
            {
                objJSON.items = (from variable in bd.TBL_MATRIZ where variable.ID_MATRIZ == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_MATRIZ.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_MATRIZ> Update(string id, TBL_MATRIZ nuevo)
		{

            JSONCollection<TBL_MATRIZ> objJSON = new JSONCollection<TBL_MATRIZ>();
            try
            {
                var objeto = (from variable in bd.TBL_MATRIZ
                              where variable.ID_MATRIZ == int.Parse(id)
                              select variable).Single();
                objeto.ID_USUARIO = nuevo.ID_USUARIO;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_MATRIZ.Count();
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
			var objeto = (from variable in bd.TBL_MATRIZ
							where variable.ID_MATRIZ == int.Parse(id)
							select variable).First();

			bd.TBL_MATRIZ.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_USUARIO")){
					return "ID_USUARIO";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}

			}
			return "ID_MATRIZ";
		}
	}
}