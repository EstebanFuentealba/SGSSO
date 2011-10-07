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
	public class HistorialEmpresa
	{
		private DataClassesEnapDataContext bd;

		public HistorialEmpresa()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_HISTORIAL_EMPRESA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_HISTORIAL_EMPRESA>> objJSON = new JSONCollection<List<TBL_HISTORIAL_EMPRESA>>();
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
                var query = bd.TBL_HISTORIAL_EMPRESA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_HISTORIAL_EMPRESA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_HISTORIAL_EMPRESA.Count<TBL_HISTORIAL_EMPRESA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_HISTORIAL_EMPRESA> Create(string ID_EMPRESA, string FECHA_CREACION, string N_TRABAJADORES, string H_TRABAJADAS, string H_SOBRETIEMPO)
		{
            JSONCollection<TBL_HISTORIAL_EMPRESA> objJSON = new JSONCollection<TBL_HISTORIAL_EMPRESA>();
            try
            {
                TBL_HISTORIAL_EMPRESA nuevo = new TBL_HISTORIAL_EMPRESA()
                {
                    ID_EMPRESA = int.Parse(ID_EMPRESA), 
					FECHA_CREACION = DateTime.Parse(FECHA_CREACION), 
					N_TRABAJADORES = int.Parse(N_TRABAJADORES), 
					H_TRABAJADAS = int.Parse(H_TRABAJADAS), 
					H_SOBRETIEMPO = int.Parse(H_SOBRETIEMPO)
                };
                bd.TBL_HISTORIAL_EMPRESA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_HISTORIAL_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_HISTORIAL_EMPRESA> Get(string id)
		{
            JSONCollection<TBL_HISTORIAL_EMPRESA> objJSON = new JSONCollection<TBL_HISTORIAL_EMPRESA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_HISTORIAL_EMPRESA where variable.ID_HISTORIAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_HISTORIAL_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_HISTORIAL_EMPRESA> Update(string id, TBL_HISTORIAL_EMPRESA nuevo)
		{

            JSONCollection<TBL_HISTORIAL_EMPRESA> objJSON = new JSONCollection<TBL_HISTORIAL_EMPRESA>();
            try
            {
                var objeto = (from variable in bd.TBL_HISTORIAL_EMPRESA
                              where variable.ID_HISTORIAL == int.Parse(id)
                              select variable).Single();
                objeto.ID_EMPRESA = nuevo.ID_EMPRESA;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
				objeto.N_TRABAJADORES = nuevo.N_TRABAJADORES;
				objeto.H_TRABAJADAS = nuevo.H_TRABAJADAS;
				objeto.H_SOBRETIEMPO = nuevo.H_SOBRETIEMPO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_HISTORIAL_EMPRESA.Count();
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
			var objeto = (from variable in bd.TBL_HISTORIAL_EMPRESA
							where variable.ID_HISTORIAL == int.Parse(id)
							select variable).First();

			bd.TBL_HISTORIAL_EMPRESA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_EMPRESA")){
					return "ID_EMPRESA";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}
				if (_sort.Equals("N_TRABAJADORES")){
					return "N_TRABAJADORES";
				}
				if (_sort.Equals("H_TRABAJADAS")){
					return "H_TRABAJADAS";
				}
				if (_sort.Equals("H_SOBRETIEMPO")){
					return "H_SOBRETIEMPO";
				}

			}
			return "ID_HISTORIAL";
		}
	}
}