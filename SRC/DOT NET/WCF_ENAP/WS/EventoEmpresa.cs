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
	public class EventoEmpresa
	{
		private DataClassesEnapDataContext bd;

		public EventoEmpresa()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVENTO_EMPRESA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVENTO_EMPRESA>> objJSON = new JSONCollection<List<TBL_EVENTO_EMPRESA>>();
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
                var query = bd.TBL_EVENTO_EMPRESA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVENTO_EMPRESA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count<TBL_EVENTO_EMPRESA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVENTO_EMPRESA> Create(string ID_EVENTO, string ID_EMPRESA, string DESCRIPCION)
		{
            JSONCollection<TBL_EVENTO_EMPRESA> objJSON = new JSONCollection<TBL_EVENTO_EMPRESA>();
            try
            {
                TBL_EVENTO_EMPRESA nuevo = new TBL_EVENTO_EMPRESA()
                {
                    ID_EVENTO = int.Parse(ID_EVENTO), 
					ID_EMPRESA = int.Parse(ID_EMPRESA), 
					DESCRIPCION = DESCRIPCION
                };
                bd.TBL_EVENTO_EMPRESA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVENTO_EMPRESA> Get(string id)
		{
            JSONCollection<TBL_EVENTO_EMPRESA> objJSON = new JSONCollection<TBL_EVENTO_EMPRESA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVENTO_EMPRESA where variable.ID_EVENTO_EMPRESA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVENTO_EMPRESA> Update(string id, TBL_EVENTO_EMPRESA nuevo)
		{

            JSONCollection<TBL_EVENTO_EMPRESA> objJSON = new JSONCollection<TBL_EVENTO_EMPRESA>();
            try
            {
                var objeto = (from variable in bd.TBL_EVENTO_EMPRESA
                              where variable.ID_EVENTO_EMPRESA == int.Parse(id)
                              select variable).Single();
                objeto.ID_EVENTO = nuevo.ID_EVENTO;
				objeto.ID_EMPRESA = nuevo.ID_EMPRESA;
				objeto.DESCRIPCION = nuevo.DESCRIPCION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count();
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
			var objeto = (from variable in bd.TBL_EVENTO_EMPRESA
							where variable.ID_EVENTO_EMPRESA == int.Parse(id)
							select variable).First();

			bd.TBL_EVENTO_EMPRESA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_EVENTO")){
					return "ID_EVENTO";
				}
				if (_sort.Equals("ID_EMPRESA")){
					return "ID_EMPRESA";
				}
				if (_sort.Equals("DESCRIPCION")){
					return "DESCRIPCION";
				}

			}
			return "ID_EVENTO_EMPRESA";
		}
	}
}