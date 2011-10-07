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
	public class Empresa
	{
		private DataClassesEnapDataContext bd;

		public Empresa()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EMPRESA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EMPRESA>> objJSON = new JSONCollection<List<TBL_EMPRESA>>();
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
                var query = bd.TBL_EMPRESA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EMPRESA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EMPRESA.Count<TBL_EMPRESA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EMPRESA> Create(string NOMBRE_EMPRESA, string DIRECCION_EMPRESA, string FONO_EMPRESA, string EMAIL_EMPRESA, string NOMBRE_CONTRATO)
		{
            JSONCollection<TBL_EMPRESA> objJSON = new JSONCollection<TBL_EMPRESA>();
            try
            {
                TBL_EMPRESA nuevo = new TBL_EMPRESA()
                {
                    NOMBRE_EMPRESA = NOMBRE_EMPRESA, 
					DIRECCION_EMPRESA = DIRECCION_EMPRESA, 
					FONO_EMPRESA = FONO_EMPRESA, 
					EMAIL_EMPRESA = EMAIL_EMPRESA, 
					NOMBRE_CONTRATO = NOMBRE_CONTRATO
                };
                bd.TBL_EMPRESA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EMPRESA> Get(string id)
		{
            JSONCollection<TBL_EMPRESA> objJSON = new JSONCollection<TBL_EMPRESA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EMPRESA where variable.ID_EMPRESA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EMPRESA> Update(string id, TBL_EMPRESA nuevo)
		{

            JSONCollection<TBL_EMPRESA> objJSON = new JSONCollection<TBL_EMPRESA>();
            try
            {
                var objeto = (from variable in bd.TBL_EMPRESA
                              where variable.ID_EMPRESA == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_EMPRESA = nuevo.NOMBRE_EMPRESA;
				objeto.DIRECCION_EMPRESA = nuevo.DIRECCION_EMPRESA;
				objeto.FONO_EMPRESA = nuevo.FONO_EMPRESA;
				objeto.EMAIL_EMPRESA = nuevo.EMAIL_EMPRESA;
				objeto.NOMBRE_CONTRATO = nuevo.NOMBRE_CONTRATO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EMPRESA.Count();
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
			var objeto = (from variable in bd.TBL_EMPRESA
							where variable.ID_EMPRESA == int.Parse(id)
							select variable).First();

			bd.TBL_EMPRESA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_EMPRESA")){
					return "NOMBRE_EMPRESA";
				}
				if (_sort.Equals("DIRECCION_EMPRESA")){
					return "DIRECCION_EMPRESA";
				}
				if (_sort.Equals("FONO_EMPRESA")){
					return "FONO_EMPRESA";
				}
				if (_sort.Equals("EMAIL_EMPRESA")){
					return "EMAIL_EMPRESA";
				}
				if (_sort.Equals("NOMBRE_CONTRATO")){
					return "NOMBRE_CONTRATO";
				}

			}
			return "ID_EMPRESA";
		}
	}
}