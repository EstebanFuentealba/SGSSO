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
	public class Usuario
	{
		private DataClassesEnapDataContext bd;

		public Usuario()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_USUARIO>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_USUARIO>> objJSON = new JSONCollection<List<TBL_USUARIO>>();
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
                var query = bd.TBL_USUARIO.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_USUARIO> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_USUARIO.Count<TBL_USUARIO>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_USUARIO> Create(string PASSWORD, string EMAIL, string ID_EMPRESA, string RUT_TRABAJADOR, string NOMBRES, string APELLIDO_MATERNO, string APELLIDO_PATERNO, string TELEFONO, string ANOS_EXPERIENCIA)
		{
            JSONCollection<TBL_USUARIO> objJSON = new JSONCollection<TBL_USUARIO>();
            try
            {
                TBL_USUARIO nuevo = new TBL_USUARIO()
                {
                    PASSWORD = PASSWORD, 
					EMAIL = EMAIL, 
					ID_EMPRESA = int.Parse(ID_EMPRESA), 
					RUT_TRABAJADOR = RUT_TRABAJADOR, 
					NOMBRES = NOMBRES, 
					APELLIDO_MATERNO = APELLIDO_MATERNO, 
					APELLIDO_PATERNO = APELLIDO_PATERNO, 
					TELEFONO = TELEFONO, 
					ANOS_EXPERIENCIA = int.Parse(ANOS_EXPERIENCIA)
                };
                bd.TBL_USUARIO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_USUARIO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_USUARIO> Get(string id)
		{
            JSONCollection<TBL_USUARIO> objJSON = new JSONCollection<TBL_USUARIO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_USUARIO where variable.ID_USUARIO == id select variable).Single();
                objJSON.totalCount = bd.TBL_USUARIO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_USUARIO> Update(string id, TBL_USUARIO nuevo)
		{

            JSONCollection<TBL_USUARIO> objJSON = new JSONCollection<TBL_USUARIO>();
            try
            {
                var objeto = (from variable in bd.TBL_USUARIO
                              where variable.ID_USUARIO == id
                              select variable).Single();
                objeto.PASSWORD = nuevo.PASSWORD;
				objeto.EMAIL = nuevo.EMAIL;
				objeto.ID_EMPRESA = nuevo.ID_EMPRESA;
				objeto.RUT_TRABAJADOR = nuevo.RUT_TRABAJADOR;
				objeto.NOMBRES = nuevo.NOMBRES;
				objeto.APELLIDO_MATERNO = nuevo.APELLIDO_MATERNO;
				objeto.APELLIDO_PATERNO = nuevo.APELLIDO_PATERNO;
				objeto.TELEFONO = nuevo.TELEFONO;
				objeto.ANOS_EXPERIENCIA = nuevo.ANOS_EXPERIENCIA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_USUARIO.Count();
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
			var objeto = (from variable in bd.TBL_USUARIO
							where variable.ID_USUARIO == id
							select variable).First();

			bd.TBL_USUARIO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("PASSWORD")){
					return "PASSWORD";
				}
				if (_sort.Equals("EMAIL")){
					return "EMAIL";
				}
				if (_sort.Equals("ID_EMPRESA")){
					return "ID_EMPRESA";
				}
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

			}
			return "ID_USUARIO";
		}
	}
}