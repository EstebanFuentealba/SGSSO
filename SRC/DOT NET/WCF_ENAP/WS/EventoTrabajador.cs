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
	public class EventoTrabajador
	{
		private DataClassesEnapDataContext bd;

		public EventoTrabajador()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVENTO_TRABAJADOR>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVENTO_TRABAJADOR>> objJSON = new JSONCollection<List<TBL_EVENTO_TRABAJADOR>>();
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
                var query = bd.TBL_EVENTO_TRABAJADOR.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVENTO_TRABAJADOR> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVENTO_TRABAJADOR.Count<TBL_EVENTO_TRABAJADOR>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_EVENTO_TRABAJADOR> Create(string ID_EVENTO_EMPRESA, string ID_TRABAJADOR, string ID_MATRIZ, string FECHA_PRESENTACION_HOSPITAL, string FECHA_ALTA_MEDICA, string TIPO_LESION)
		{
            JSONCollection<TBL_EVENTO_TRABAJADOR> objJSON = new JSONCollection<TBL_EVENTO_TRABAJADOR>();
            try
            {
                TBL_EVENTO_TRABAJADOR nuevo = new TBL_EVENTO_TRABAJADOR()
                {
                    ID_EVENTO_EMPRESA = int.Parse(ID_EVENTO_EMPRESA), 
					ID_TRABAJADOR = int.Parse(ID_TRABAJADOR), 
					ID_MATRIZ = int.Parse(ID_MATRIZ), 
					FECHA_PRESENTACION_HOSPITAL = DateTime.Parse(FECHA_PRESENTACION_HOSPITAL), 
					FECHA_ALTA_MEDICA = DateTime.Parse(FECHA_ALTA_MEDICA), 
					TIPO_LESION = int.Parse(TIPO_LESION)
                };
                bd.TBL_EVENTO_TRABAJADOR.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_EVENTO_TRABAJADOR.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVENTO_TRABAJADOR> Get(string id)
		{
            JSONCollection<TBL_EVENTO_TRABAJADOR> objJSON = new JSONCollection<TBL_EVENTO_TRABAJADOR>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVENTO_TRABAJADOR where variable.ID_EVENTO_TRABAJADOR == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVENTO_TRABAJADOR.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_EVENTO_TRABAJADOR> Update(string id, TBL_EVENTO_TRABAJADOR nuevo)
		{

            JSONCollection<TBL_EVENTO_TRABAJADOR> objJSON = new JSONCollection<TBL_EVENTO_TRABAJADOR>();
            try
            {
                var objeto = (from variable in bd.TBL_EVENTO_TRABAJADOR
                              where variable.ID_EVENTO_TRABAJADOR == int.Parse(id)
                              select variable).Single();
                objeto.ID_EVENTO_EMPRESA = nuevo.ID_EVENTO_EMPRESA;
				objeto.ID_TRABAJADOR = nuevo.ID_TRABAJADOR;
				objeto.ID_MATRIZ = nuevo.ID_MATRIZ;
				objeto.FECHA_PRESENTACION_HOSPITAL = nuevo.FECHA_PRESENTACION_HOSPITAL;
				objeto.FECHA_ALTA_MEDICA = nuevo.FECHA_ALTA_MEDICA;
				objeto.TIPO_LESION = nuevo.TIPO_LESION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_EVENTO_TRABAJADOR.Count();
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
			var objeto = (from variable in bd.TBL_EVENTO_TRABAJADOR
							where variable.ID_EVENTO_TRABAJADOR == int.Parse(id)
							select variable).First();

			bd.TBL_EVENTO_TRABAJADOR.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_EVENTO_EMPRESA")){
					return "ID_EVENTO_EMPRESA";
				}
				if (_sort.Equals("ID_TRABAJADOR")){
					return "ID_TRABAJADOR";
				}
				if (_sort.Equals("ID_MATRIZ")){
					return "ID_MATRIZ";
				}
				if (_sort.Equals("FECHA_PRESENTACION_HOSPITAL")){
					return "FECHA_PRESENTACION_HOSPITAL";
				}
				if (_sort.Equals("FECHA_ALTA_MEDICA")){
					return "FECHA_ALTA_MEDICA";
				}
				if (_sort.Equals("TIPO_LESION")){
					return "TIPO_LESION";
				}

			}
			return "ID_EVENTO_TRABAJADOR";
		}
	}
}