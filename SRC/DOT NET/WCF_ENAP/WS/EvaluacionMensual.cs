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
	public class EvaluacionMensual
	{
		private DataClassesEnapDataContext bd;

		public EvaluacionMensual()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVALUACION_MENSUAL>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVALUACION_MENSUAL>> objJSON = new JSONCollection<List<TBL_EVALUACION_MENSUAL>>();
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
                var query = bd.TBL_EVALUACION_MENSUAL.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVALUACION_MENSUAL> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVALUACION_MENSUAL.Count<TBL_EVALUACION_MENSUAL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVALUACION_MENSUAL> Create(string ID_EVALUACION_MENSUAL, string ID_SUB_ACTIVIDAD, string PROGRAMADO, string REALIZADO, string FECHA_EVALUACION)
		{
            JSONCollection<TBL_EVALUACION_MENSUAL> objJSON = new JSONCollection<TBL_EVALUACION_MENSUAL>();
            try
            {
                TBL_EVALUACION_MENSUAL nuevo = new TBL_EVALUACION_MENSUAL()
                {
                    ID_EVALUACION_MENSUAL = int.Parse(ID_EVALUACION_MENSUAL), 
					ID_SUB_ACTIVIDAD = int.Parse(ID_SUB_ACTIVIDAD), 
					PROGRAMADO = int.Parse(PROGRAMADO), 
					REALIZADO = int.Parse(REALIZADO), 
					FECHA_EVALUACION = DateTime.Parse(FECHA_EVALUACION)
                };
                bd.TBL_EVALUACION_MENSUAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EVALUACION_MENSUAL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVALUACION_MENSUAL> Get(string id)
		{
            JSONCollection<TBL_EVALUACION_MENSUAL> objJSON = new JSONCollection<TBL_EVALUACION_MENSUAL>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVALUACION_MENSUAL where variable.ID_EVALUACION_MENSUAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVALUACION_MENSUAL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVALUACION_MENSUAL> Update(string id, TBL_EVALUACION_MENSUAL nuevo)
		{

            JSONCollection<TBL_EVALUACION_MENSUAL> objJSON = new JSONCollection<TBL_EVALUACION_MENSUAL>();
            try
            {
                var objeto = (from variable in bd.TBL_EVALUACION_MENSUAL
                              where variable.ID_EVALUACION_MENSUAL == int.Parse(id)
                              select variable).Single();
                objeto.ID_SUB_ACTIVIDAD = nuevo.ID_SUB_ACTIVIDAD;
				objeto.PROGRAMADO = nuevo.PROGRAMADO;
				objeto.REALIZADO = nuevo.REALIZADO;
				objeto.FECHA_EVALUACION = nuevo.FECHA_EVALUACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVALUACION_MENSUAL.Count();
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
			var objeto = (from variable in bd.TBL_EVALUACION_MENSUAL
							where variable.ID_EVALUACION_MENSUAL == int.Parse(id)
							select variable).First();

			bd.TBL_EVALUACION_MENSUAL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_SUB_ACTIVIDAD")){
					return "ID_SUB_ACTIVIDAD";
				}
				if (_sort.Equals("PROGRAMADO")){
					return "PROGRAMADO";
				}
				if (_sort.Equals("REALIZADO")){
					return "REALIZADO";
				}
				if (_sort.Equals("FECHA_EVALUACION")){
					return "FECHA_EVALUACION";
				}

			}
			return "ID_EVALUACION_MENSUAL";
		}
	}
}