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
	public class Trabajador
	{
		private DataClassesEnapDataContext bd;

		public Trabajador()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_TRABAJADOR>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_TRABAJADOR>> objJSON = new JSONCollection<List<TBL_TRABAJADOR>>();
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
                var query = bd.TBL_TRABAJADOR.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_TRABAJADOR> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_TRABAJADOR.Count<TBL_TRABAJADOR>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_TRABAJADOR> Create(string RUT_TRABAJADOR, string NOMBRES, string APELLIDO_MATERNO, string APELLIDO_PATERNO, string TELEFONO, int ANOS_EXPERIENCIA_CARGO, int ANOS_EXPERIENCIA_LABORAL, string ID_CARGO)
		{
            JSONCollection<TBL_TRABAJADOR> objJSON = new JSONCollection<TBL_TRABAJADOR>();
            try
            {
                TBL_TRABAJADOR nuevo = new TBL_TRABAJADOR()
                {
                    RUT_TRABAJADOR = RUT_TRABAJADOR, 
					NOMBRES = NOMBRES, 
					APELLIDO_MATERNO = APELLIDO_MATERNO, 
					APELLIDO_PATERNO = APELLIDO_PATERNO, 
					TELEFONO = TELEFONO, 
					ANOS_EXPERIENCIA_CARGO = ANOS_EXPERIENCIA_CARGO,
                    ANOS_EXPERIENCIA_LABORAL = ANOS_EXPERIENCIA_LABORAL,
					ID_CARGO = int.Parse(ID_CARGO)
                };
                bd.TBL_TRABAJADOR.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_TRABAJADOR.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_TRABAJADOR> Get(string id)
		{
            JSONCollection<TBL_TRABAJADOR> objJSON = new JSONCollection<TBL_TRABAJADOR>();
            try
            {
                objJSON.items = (from variable in bd.TBL_TRABAJADOR where variable.ID_TRABAJADOR == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_TRABAJADOR.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_TRABAJADOR> Update(string id, TBL_TRABAJADOR nuevo)
		{

            JSONCollection<TBL_TRABAJADOR> objJSON = new JSONCollection<TBL_TRABAJADOR>();
            try
            {
                var objeto = (from variable in bd.TBL_TRABAJADOR
                              where variable.ID_TRABAJADOR == int.Parse(id)
                              select variable).Single();
                objeto.RUT_TRABAJADOR = nuevo.RUT_TRABAJADOR;
				objeto.NOMBRES = nuevo.NOMBRES;
				objeto.APELLIDO_MATERNO = nuevo.APELLIDO_MATERNO;
				objeto.APELLIDO_PATERNO = nuevo.APELLIDO_PATERNO;
				objeto.TELEFONO = nuevo.TELEFONO;
                objeto.ANOS_EXPERIENCIA_CARGO = nuevo.ANOS_EXPERIENCIA_CARGO;
                objeto.ANOS_EXPERIENCIA_LABORAL = nuevo.ANOS_EXPERIENCIA_LABORAL; 
                objeto.ID_CARGO = nuevo.ID_CARGO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_TRABAJADOR.Count();
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
			var objeto = (from variable in bd.TBL_TRABAJADOR
							where variable.ID_TRABAJADOR == int.Parse(id)
							select variable).First();

			bd.TBL_TRABAJADOR.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("RUT_TRABAJADOR")){
					return "RUT_TRABAJADOR";
				}
				if (_sort.Equals("NOMBRES")){
					return "NOMBRES";
				}
				if (_sort.Equals("APELLIDO_MATERNO")){
					return "APELLIDO_MATERNO";
				}
				if (_sort.Equals("APELLIDO_PATERNO")){
					return "APELLIDO_PATERNO";
				}
				if (_sort.Equals("TELEFONO")){
					return "TELEFONO";
				}
				if (_sort.Equals("ANOS_EXPERIENCIA")){
					return "ANOS_EXPERIENCIA";
				}
				if (_sort.Equals("ID_CARGO")){
					return "ID_CARGO";
				}

			}
			return "ID_TRABAJADOR";
		}
	}
}