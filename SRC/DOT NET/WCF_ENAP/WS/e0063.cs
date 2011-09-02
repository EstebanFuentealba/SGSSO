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
	public class e0063
	{
		private DataClassesEnapDataContext bd;

		public e0063()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<E006_3>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<E006_3>> objJSON = new JSONCollection<List<E006_3>>();
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
                var query = bd.E006_3.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<E006_3> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.E006_3.Count<E006_3>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<E006_3> Create(string E00_ID_INFORME, string ID_EVENTO_EMPRESA, string FECHA_INGRESO, string CLASIFICACION)
		{
            JSONCollection<E006_3> objJSON = new JSONCollection<E006_3>();
            try
            {
                E006_3 nuevo = new E006_3()
                {
                    ID_INFORME = int.Parse(E00_ID_INFORME), 
					ID_EVENTO_EMPRESA = int.Parse(ID_EVENTO_EMPRESA), 
					FECHA_INGRESO = DateTime.Parse(FECHA_INGRESO), 
					CLASIFICACION = int.Parse(CLASIFICACION)
                };
                bd.E006_3.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.E006_3.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<E006_3> Get(string id)
		{
            JSONCollection<E006_3> objJSON = new JSONCollection<E006_3>();
            try
            {
                objJSON.items = (from variable in bd.E006_3 where variable.ID_INFORME == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.E006_3.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<E006_3> Update(string id, E006_3 nuevo)
		{

            JSONCollection<E006_3> objJSON = new JSONCollection<E006_3>();
            try
            {
                var objeto = (from variable in bd.E006_3
                              where variable.ID_INFORME == int.Parse(id)
                              select variable).Single();
                objeto.ID_INFORME = nuevo.ID_INFORME;
				objeto.ID_EVENTO_EMPRESA = nuevo.ID_EVENTO_EMPRESA;
				objeto.FECHA_INGRESO = nuevo.FECHA_INGRESO;
				objeto.CLASIFICACION = nuevo.CLASIFICACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.E006_3.Count();
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
			var objeto = (from variable in bd.E006_3
							where variable.ID_INFORME == int.Parse(id)
							select variable).First();

			bd.E006_3.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("E00_ID_INFORME")){
					return "E00_ID_INFORME";
				}
				if (_sort.Equals("ID_EVENTO_EMPRESA")){
					return "ID_EVENTO_EMPRESA";
				}
				if (_sort.Equals("FECHA_INGRESO")){
					return "FECHA_INGRESO";
				}
				if (_sort.Equals("CLASIFICACION")){
					return "CLASIFICACION";
				}

			}
			return "ID_INFORME";
		}
	}
}