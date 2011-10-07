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
	public class Evento
	{
		private DataClassesEnapDataContext bd;

		public Evento()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVENTO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVENTO>> objJSON = new JSONCollection<List<TBL_EVENTO>>();
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
                var query = bd.TBL_EVENTO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVENTO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVENTO.Count<TBL_EVENTO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVENTO> Create(string ID_DEPARTAMENTO_ORGANIZACION, string OCURRIO, string FECHA_HORA_EVENTO, string FECHA_INGRESO, string LAT_EVENTO, string LNG_EVENTO, string TIPO_EVENTO, string LUGAR_EXACTO)
		{
            JSONCollection<TBL_EVENTO> objJSON = new JSONCollection<TBL_EVENTO>();
            try
            {
                TBL_EVENTO nuevo = new TBL_EVENTO()
                {
                    ID_DEPARTAMENTO_ORGANIZACION = int.Parse(ID_DEPARTAMENTO_ORGANIZACION), 
					OCURRIO = int.Parse(OCURRIO), 
					FECHA_HORA_EVENTO = DateTime.Parse(FECHA_HORA_EVENTO), 
					FECHA_INGRESO = DateTime.Parse(FECHA_INGRESO), 
					LAT_EVENTO = double.Parse(LAT_EVENTO), 
					LNG_EVENTO = double.Parse(LNG_EVENTO), 
					TIPO_EVENTO = bool.Parse(TIPO_EVENTO), 
					LUGAR_EXACTO = LUGAR_EXACTO
                };
                bd.TBL_EVENTO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EVENTO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVENTO> Get(string id)
		{
            JSONCollection<TBL_EVENTO> objJSON = new JSONCollection<TBL_EVENTO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVENTO where variable.ID_EVENTO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVENTO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVENTO> Update(string id, TBL_EVENTO nuevo)
		{

            JSONCollection<TBL_EVENTO> objJSON = new JSONCollection<TBL_EVENTO>();
            try
            {
                var objeto = (from variable in bd.TBL_EVENTO
                              where variable.ID_EVENTO == int.Parse(id)
                              select variable).Single();
                objeto.ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION;
				objeto.OCURRIO = nuevo.OCURRIO;
				objeto.FECHA_HORA_EVENTO = nuevo.FECHA_HORA_EVENTO;
				objeto.FECHA_INGRESO = nuevo.FECHA_INGRESO;
				objeto.LAT_EVENTO = nuevo.LAT_EVENTO;
				objeto.LNG_EVENTO = nuevo.LNG_EVENTO;
				objeto.TIPO_EVENTO = nuevo.TIPO_EVENTO;
				objeto.LUGAR_EXACTO = nuevo.LUGAR_EXACTO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVENTO.Count();
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
			var objeto = (from variable in bd.TBL_EVENTO
							where variable.ID_EVENTO == int.Parse(id)
							select variable).First();

			bd.TBL_EVENTO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_DEPARTAMENTO_ORGANIZACION")){
					return "ID_DEPARTAMENTO_ORGANIZACION";
				}
				if (_sort.Equals("OCURRIO")){
					return "OCURRIO";
				}
				if (_sort.Equals("FECHA_HORA_EVENTO")){
					return "FECHA_HORA_EVENTO";
				}
				if (_sort.Equals("FECHA_INGRESO")){
					return "FECHA_INGRESO";
				}
				if (_sort.Equals("LAT_EVENTO")){
					return "LAT_EVENTO";
				}
				if (_sort.Equals("LNG_EVENTO")){
					return "LNG_EVENTO";
				}
				if (_sort.Equals("TIPO_EVENTO")){
					return "TIPO_EVENTO";
				}
				if (_sort.Equals("LUGAR_EXACTO")){
					return "LUGAR_EXACTO";
				}

			}
			return "ID_EVENTO";
		}
	}
}