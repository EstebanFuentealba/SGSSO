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
	public class Archivo
	{
		private DataClassesEnapDataContext bd;

		public Archivo()
		{
            
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ARCHIVO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ARCHIVO>> objJSON = new JSONCollection<List<TBL_ARCHIVO>>();
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
                var query = bd.TBL_ARCHIVO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ARCHIVO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ARCHIVO.Count<TBL_ARCHIVO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ARCHIVO> Create(string ID_INFORME, string NOMBRE_ARCHIVO, string PATH)
		{
            JSONCollection<TBL_ARCHIVO> objJSON = new JSONCollection<TBL_ARCHIVO>();
            try
            {
                TBL_ARCHIVO nuevo = new TBL_ARCHIVO()
                {
                    ID_INFORME = int.Parse(ID_INFORME), 
					NOMBRE_ARCHIVO = NOMBRE_ARCHIVO, 
					PATH = PATH
                };
                bd.TBL_ARCHIVO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ARCHIVO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ARCHIVO> Get(string id)
		{
            JSONCollection<TBL_ARCHIVO> objJSON = new JSONCollection<TBL_ARCHIVO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ARCHIVO where variable.ID_ARCHIVO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ARCHIVO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ARCHIVO> Update(string id, TBL_ARCHIVO nuevo)
		{

            JSONCollection<TBL_ARCHIVO> objJSON = new JSONCollection<TBL_ARCHIVO>();
            try
            {
                var objeto = (from variable in bd.TBL_ARCHIVO
                              where variable.ID_ARCHIVO == int.Parse(id)
                              select variable).Single();
                objeto.ID_INFORME = nuevo.ID_INFORME;
				objeto.NOMBRE_ARCHIVO = nuevo.NOMBRE_ARCHIVO;
				objeto.PATH = nuevo.PATH;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ARCHIVO.Count();
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
			var objeto = (from variable in bd.TBL_ARCHIVO
							where variable.ID_ARCHIVO == int.Parse(id)
							select variable).First();

			bd.TBL_ARCHIVO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_INFORME")){
					return "ID_INFORME";
				}
				if (_sort.Equals("NOMBRE_ARCHIVO")){
					return "NOMBRE_ARCHIVO";
				}
				if (_sort.Equals("PATH")){
					return "PATH";
				}

			}
			return "ID_ARCHIVO";
		}
	}
}