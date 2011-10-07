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
	public class PuntoGeografico
	{
		private DataClassesEnapDataContext bd;

		public PuntoGeografico()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_PUNTO_GEOGRAFICO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_PUNTO_GEOGRAFICO>> objJSON = new JSONCollection<List<TBL_PUNTO_GEOGRAFICO>>();
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
                var query = bd.TBL_PUNTO_GEOGRAFICO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_PUNTO_GEOGRAFICO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PUNTO_GEOGRAFICO.Count<TBL_PUNTO_GEOGRAFICO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_PUNTO_GEOGRAFICO> Create(string ID_DEPARTAMENTO_ORGANIZACION, string LAT_PUNTO, string LNG_PUNTO)
		{
            JSONCollection<TBL_PUNTO_GEOGRAFICO> objJSON = new JSONCollection<TBL_PUNTO_GEOGRAFICO>();
            try
            {
                TBL_PUNTO_GEOGRAFICO nuevo = new TBL_PUNTO_GEOGRAFICO()
                {
                    ID_DEPARTAMENTO_ORGANIZACION = int.Parse(ID_DEPARTAMENTO_ORGANIZACION), 
					LAT_PUNTO = double.Parse(LAT_PUNTO), 
					LNG_PUNTO = double.Parse(LNG_PUNTO)
                };
                bd.TBL_PUNTO_GEOGRAFICO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_PUNTO_GEOGRAFICO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PUNTO_GEOGRAFICO> Get(string id)
		{
            JSONCollection<TBL_PUNTO_GEOGRAFICO> objJSON = new JSONCollection<TBL_PUNTO_GEOGRAFICO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PUNTO_GEOGRAFICO where variable.ID_PUNTO_GEOGRAFICA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PUNTO_GEOGRAFICO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PUNTO_GEOGRAFICO> Update(string id, TBL_PUNTO_GEOGRAFICO nuevo)
		{

            JSONCollection<TBL_PUNTO_GEOGRAFICO> objJSON = new JSONCollection<TBL_PUNTO_GEOGRAFICO>();
            try
            {
                var objeto = (from variable in bd.TBL_PUNTO_GEOGRAFICO
                              where variable.ID_PUNTO_GEOGRAFICA == int.Parse(id)
                              select variable).Single();
                objeto.ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION;
				objeto.LAT_PUNTO = nuevo.LAT_PUNTO;
				objeto.LNG_PUNTO = nuevo.LNG_PUNTO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PUNTO_GEOGRAFICO.Count();
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
			var objeto = (from variable in bd.TBL_PUNTO_GEOGRAFICO
							where variable.ID_PUNTO_GEOGRAFICA == int.Parse(id)
							select variable).First();

			bd.TBL_PUNTO_GEOGRAFICO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_DEPARTAMENTO_ORGANIZACION")){
					return "ID_DEPARTAMENTO_ORGANIZACION";
				}
				if (_sort.Equals("LAT_PUNTO")){
					return "LAT_PUNTO";
				}
				if (_sort.Equals("LNG_PUNTO")){
					return "LNG_PUNTO";
				}

			}
			return "ID_PUNTO_GEOGRAFICA";
		}
	}
}