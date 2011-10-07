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
	public class historialInforme
	{
		private DataClassesEnapDataContext bd;

		public historialInforme()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<HISTORIAL_INFORME>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<HISTORIAL_INFORME>> objJSON = new JSONCollection<List<HISTORIAL_INFORME>>();
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
                var query = bd.HISTORIAL_INFORME.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<HISTORIAL_INFORME> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.HISTORIAL_INFORME.Count<HISTORIAL_INFORME>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<HISTORIAL_INFORME> Create(string ID_INFORME, string FECHA_MODIFICACION, string DESCRIPCION_MODIFICACION)
		{
            JSONCollection<HISTORIAL_INFORME> objJSON = new JSONCollection<HISTORIAL_INFORME>();
            try
            {
                HISTORIAL_INFORME nuevo = new HISTORIAL_INFORME()
                {
                    ID_INFORME = int.Parse(ID_INFORME), 
					FECHA_MODIFICACION = DateTime.Parse(FECHA_MODIFICACION), 
					DESCRIPCION_MODIFICACION = DESCRIPCION_MODIFICACION
                };
                bd.HISTORIAL_INFORME.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.HISTORIAL_INFORME.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<HISTORIAL_INFORME> Get(string id)
		{
            JSONCollection<HISTORIAL_INFORME> objJSON = new JSONCollection<HISTORIAL_INFORME>();
            try
            {
                objJSON.items = (from variable in bd.HISTORIAL_INFORME where variable.ID_HISTORIAL_INFORME == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.HISTORIAL_INFORME.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<HISTORIAL_INFORME> Update(string id, HISTORIAL_INFORME nuevo)
		{

            JSONCollection<HISTORIAL_INFORME> objJSON = new JSONCollection<HISTORIAL_INFORME>();
            try
            {
                var objeto = (from variable in bd.HISTORIAL_INFORME
                              where variable.ID_HISTORIAL_INFORME == int.Parse(id)
                              select variable).Single();
                objeto.ID_INFORME = nuevo.ID_INFORME;
				objeto.FECHA_MODIFICACION = nuevo.FECHA_MODIFICACION;
				objeto.DESCRIPCION_MODIFICACION = nuevo.DESCRIPCION_MODIFICACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.HISTORIAL_INFORME.Count();
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
			var objeto = (from variable in bd.HISTORIAL_INFORME
							where variable.ID_HISTORIAL_INFORME == int.Parse(id)
							select variable).First();

			bd.HISTORIAL_INFORME.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_INFORME")){
					return "ID_INFORME";
				}
				if (_sort.Equals("FECHA_MODIFICACION")){
					return "FECHA_MODIFICACION";
				}
				if (_sort.Equals("DESCRIPCION_MODIFICACION")){
					return "DESCRIPCION_MODIFICACION";
				}

			}
			return "ID_HISTORIAL_INFORME";
		}
	}
}