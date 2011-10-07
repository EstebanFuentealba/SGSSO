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
	public class matrizHistorial
	{
		private DataClassesEnapDataContext bd;

		public matrizHistorial()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<MATRIZ_HISTORIAL>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<MATRIZ_HISTORIAL>> objJSON = new JSONCollection<List<MATRIZ_HISTORIAL>>();
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
                var query = bd.MATRIZ_HISTORIAL.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<MATRIZ_HISTORIAL> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.MATRIZ_HISTORIAL.Count<MATRIZ_HISTORIAL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<MATRIZ_HISTORIAL> Create(string ID_MATRIZ, string FECHA_ACTUALIZACION, string DESCRIPCION_ACTUALIZACION)
		{
            JSONCollection<MATRIZ_HISTORIAL> objJSON = new JSONCollection<MATRIZ_HISTORIAL>();
            try
            {
                MATRIZ_HISTORIAL nuevo = new MATRIZ_HISTORIAL()
                {
                    ID_MATRIZ = int.Parse(ID_MATRIZ), 
					FECHA_ACTUALIZACION = DateTime.Parse(FECHA_ACTUALIZACION), 
					DESCRIPCION_ACTUALIZACION = DESCRIPCION_ACTUALIZACION
                };
                bd.MATRIZ_HISTORIAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.MATRIZ_HISTORIAL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<MATRIZ_HISTORIAL> Get(string id)
		{
            JSONCollection<MATRIZ_HISTORIAL> objJSON = new JSONCollection<MATRIZ_HISTORIAL>();
            try
            {
                objJSON.items = (from variable in bd.MATRIZ_HISTORIAL where variable.ID_MATRIZ_HISTORIAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.MATRIZ_HISTORIAL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<MATRIZ_HISTORIAL> Update(string id, MATRIZ_HISTORIAL nuevo)
		{

            JSONCollection<MATRIZ_HISTORIAL> objJSON = new JSONCollection<MATRIZ_HISTORIAL>();
            try
            {
                var objeto = (from variable in bd.MATRIZ_HISTORIAL
                              where variable.ID_MATRIZ_HISTORIAL == int.Parse(id)
                              select variable).Single();
                objeto.ID_MATRIZ = nuevo.ID_MATRIZ;
				objeto.FECHA_ACTUALIZACION = nuevo.FECHA_ACTUALIZACION;
				objeto.DESCRIPCION_ACTUALIZACION = nuevo.DESCRIPCION_ACTUALIZACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.MATRIZ_HISTORIAL.Count();
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
			var objeto = (from variable in bd.MATRIZ_HISTORIAL
							where variable.ID_MATRIZ_HISTORIAL == int.Parse(id)
							select variable).First();

			bd.MATRIZ_HISTORIAL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_MATRIZ")){
					return "ID_MATRIZ";
				}
				if (_sort.Equals("FECHA_ACTUALIZACION")){
					return "FECHA_ACTUALIZACION";
				}
				if (_sort.Equals("DESCRIPCION_ACTUALIZACION")){
					return "DESCRIPCION_ACTUALIZACION";
				}

			}
			return "ID_MATRIZ_HISTORIAL";
		}
	}
}