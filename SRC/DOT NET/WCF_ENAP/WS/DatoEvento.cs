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
	public class DatoEvento
	{
		private DataClassesEnapDataContext bd;

		public DatoEvento()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_DATO_EVENTO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_DATO_EVENTO>> objJSON = new JSONCollection<List<TBL_DATO_EVENTO>>();
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
                var query = bd.TBL_DATO_EVENTO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_DATO_EVENTO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_DATO_EVENTO.Count<TBL_DATO_EVENTO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_DATO_EVENTO> Create(string NOMBRE_TIPO_EVENTO, string TIPO)
		{
            JSONCollection<TBL_DATO_EVENTO> objJSON = new JSONCollection<TBL_DATO_EVENTO>();
            try
            {
                TBL_DATO_EVENTO nuevo = new TBL_DATO_EVENTO()
                {
                    NOMBRE_TIPO_EVENTO = NOMBRE_TIPO_EVENTO, 
					TIPO = int.Parse(TIPO)
                };
                bd.TBL_DATO_EVENTO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_DATO_EVENTO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_DATO_EVENTO> Get(string id)
		{
            JSONCollection<TBL_DATO_EVENTO> objJSON = new JSONCollection<TBL_DATO_EVENTO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_DATO_EVENTO where variable.ID_TIPO_EVENTO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_DATO_EVENTO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_DATO_EVENTO> Update(string id, TBL_DATO_EVENTO nuevo)
		{

            JSONCollection<TBL_DATO_EVENTO> objJSON = new JSONCollection<TBL_DATO_EVENTO>();
            try
            {
                var objeto = (from variable in bd.TBL_DATO_EVENTO
                              where variable.ID_TIPO_EVENTO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_TIPO_EVENTO = nuevo.NOMBRE_TIPO_EVENTO;
				objeto.TIPO = nuevo.TIPO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_DATO_EVENTO.Count();
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
			var objeto = (from variable in bd.TBL_DATO_EVENTO
							where variable.ID_TIPO_EVENTO == int.Parse(id)
							select variable).First();

			bd.TBL_DATO_EVENTO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_TIPO_EVENTO")){
					return "NOMBRE_TIPO_EVENTO";
				}
				if (_sort.Equals("TIPO")){
					return "TIPO";
				}

			}
			return "ID_TIPO_EVENTO";
		}
	}
}