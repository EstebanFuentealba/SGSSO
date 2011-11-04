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
        public JSONCollection<List<TBL_I_PRELIMINAR>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_I_PRELIMINAR>> objJSON = new JSONCollection<List<TBL_I_PRELIMINAR>>();
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
                var query = bd.TBL_I_PRELIMINAR.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_I_PRELIMINAR> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count<TBL_I_PRELIMINAR>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
<<<<<<< HEAD
        public JSONCollection<TBL_I_PRELIMINAR> Create(string ID_INFORME_PRELIMINAR, string ID_EVENTO_EMPRESA, string FECHA_INGRESO, string CLASIFICACION)
=======
        public JSONCollection<TBL_I_PRELIMINAR> Create(string E00_ID_INFORME, string ID_EVENTO_EMPRESA, string FECHA_INGRESO, string CLASIFICACION)
>>>>>>> 2ef980ec12d7594fc6269c8567c8f7cdaf32a0ef
		{
            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                TBL_I_PRELIMINAR nuevo = new TBL_I_PRELIMINAR()
                {
<<<<<<< HEAD
                    ID_INFORME_PRELIMINAR = int.Parse(ID_INFORME_PRELIMINAR), 
=======
                    ID_INFORME_PRELIMINAR = int.Parse(E00_ID_INFORME), 
>>>>>>> 2ef980ec12d7594fc6269c8567c8f7cdaf32a0ef
					ID_EVENTO_EMPRESA = int.Parse(ID_EVENTO_EMPRESA), 
					FECHA_INGRESO = DateTime.Parse(FECHA_INGRESO), 
					CLASIFICACION = int.Parse(CLASIFICACION)
                };
                bd.TBL_I_PRELIMINAR.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_I_PRELIMINAR> Get(string id)
		{
            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                objJSON.items = (from variable in bd.TBL_I_PRELIMINAR where variable.ID_INFORME_PRELIMINAR == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_I_PRELIMINAR> Update(string id, TBL_I_PRELIMINAR nuevo)
		{

            JSONCollection<TBL_I_PRELIMINAR> objJSON = new JSONCollection<TBL_I_PRELIMINAR>();
            try
            {
                var objeto = (from variable in bd.TBL_I_PRELIMINAR
                              where variable.ID_INFORME_PRELIMINAR == int.Parse(id)
                              select variable).Single();
                objeto.ID_INFORME_PRELIMINAR = nuevo.ID_INFORME_PRELIMINAR;
				objeto.ID_EVENTO_EMPRESA = nuevo.ID_EVENTO_EMPRESA;
				objeto.FECHA_INGRESO = nuevo.FECHA_INGRESO;
				objeto.CLASIFICACION = nuevo.CLASIFICACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_I_PRELIMINAR.Count();
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
			var objeto = (from variable in bd.TBL_I_PRELIMINAR
                          where variable.ID_INFORME_PRELIMINAR == int.Parse(id)
							select variable).First();

<<<<<<< HEAD
            bd.TBL_I_PRELIMINAR.DeleteOnSubmit(objeto);
=======
			bd.TBL_I_PRELIMINAR.DeleteOnSubmit(objeto);
>>>>>>> 2ef980ec12d7594fc6269c8567c8f7cdaf32a0ef
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
                if (_sort.Equals("ID_INFORME_PRELIMINAR"))
                {
<<<<<<< HEAD
                    return "ID_INFORME_PRELIMINAR";
=======
					return "E00_ID_INFORME";
>>>>>>> 2ef980ec12d7594fc6269c8567c8f7cdaf32a0ef
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
            return "ID_INFORME_PRELIMINAR";
		}
	}
}