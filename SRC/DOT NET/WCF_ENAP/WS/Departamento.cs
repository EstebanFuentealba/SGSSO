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
    public class DepartamentoJSON
    {
        public int ID_DEPARTAMENTO_ORGANIZACION;
        public int ID_DEPARTAMENTO ;
        public string NOMBRE_DEPARTAMENTO;
        public int ID_ORGANIZACION;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class Departamento
	{
		private DataClassesEnapDataContext bd;

		public Departamento()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={_id_organizacion}")]
        public JSONCollection<List<DepartamentoJSON>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _id_organizacion)
        {
            JSONCollection<List<DepartamentoJSON>> objJSON = new JSONCollection<List<DepartamentoJSON>>();
            if (_id_organizacion != 0)
            {
                try
                {
                    var results = (from departamento in bd.TBL_DEPARTAMENTO
                                   join organizacion in bd.TBL_DEPARTAMENTO_ORGANIZACION on departamento.ID_DEPARTAMENTO equals organizacion.ID_DEPARTAMENTO
                                   where organizacion.ID_ORGANIZACION == _id_organizacion
                                   orderby departamento.NOMBRE_DEPARTAMENTO descending
                                   select new DepartamentoJSON
                                   ()
                                   {
                                       ID_DEPARTAMENTO = departamento.ID_DEPARTAMENTO,
                                       NOMBRE_DEPARTAMENTO = departamento.NOMBRE_DEPARTAMENTO,
                                       ID_ORGANIZACION = organizacion.ID_ORGANIZACION,
                                       ID_DEPARTAMENTO_ORGANIZACION = organizacion.ID_DEPARTAMENTO_ORGANIZACION
                                   }).ToList<DepartamentoJSON>();

                    objJSON.items = results;
                    objJSON.totalCount = results.Count;
                    objJSON.success = true;
                }
                catch (Exception ex)
                {
                    objJSON.success = false;
                }
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_DEPARTAMENTO> Create(string NOMBRE_DEPARTAMENTO, string LAT, string LNG)
		{
            JSONCollection<TBL_DEPARTAMENTO> objJSON = new JSONCollection<TBL_DEPARTAMENTO>();
            try
            {
                TBL_DEPARTAMENTO nuevo = new TBL_DEPARTAMENTO()
                {
                    NOMBRE_DEPARTAMENTO = NOMBRE_DEPARTAMENTO
                };
                bd.TBL_DEPARTAMENTO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_DEPARTAMENTO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_DEPARTAMENTO> Get(string id)
		{
            JSONCollection<TBL_DEPARTAMENTO> objJSON = new JSONCollection<TBL_DEPARTAMENTO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_DEPARTAMENTO where variable.ID_DEPARTAMENTO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_DEPARTAMENTO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_DEPARTAMENTO> Update(string id, TBL_DEPARTAMENTO nuevo)
		{

            JSONCollection<TBL_DEPARTAMENTO> objJSON = new JSONCollection<TBL_DEPARTAMENTO>();
            try
            {
                var objeto = (from variable in bd.TBL_DEPARTAMENTO
                              where variable.ID_DEPARTAMENTO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_DEPARTAMENTO = nuevo.NOMBRE_DEPARTAMENTO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_DEPARTAMENTO.Count();
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
			var objeto = (from variable in bd.TBL_DEPARTAMENTO
							where variable.ID_DEPARTAMENTO == int.Parse(id)
							select variable).First();

			bd.TBL_DEPARTAMENTO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_DEPARTAMENTO")){
					return "NOMBRE_DEPARTAMENTO";
				}
				if (_sort.Equals("LAT")){
					return "LAT";
				}
				if (_sort.Equals("LNG")){
					return "LNG";
				}

			}
			return "ID_DEPARTAMENTO";
		}
	}
}