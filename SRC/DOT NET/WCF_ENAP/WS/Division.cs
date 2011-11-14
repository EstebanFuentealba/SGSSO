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
    public class DivisionJSON
    {
        public int ID_DIVISION;
        public string NOMBRE_DIVISION;
        public int ID_DEPARTAMENTO;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class Division
	{
		private DataClassesEnapDataContext bd;

		public Division()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_DEPARTAMENTO={_id_departamento}")]
        public JSONCollection<List<DivisionJSON>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _id_departamento)
        {
            JSONCollection<List<DivisionJSON>> objJSON = new JSONCollection<List<DivisionJSON>>();
            if (_id_departamento != 0)
            {
                try
                {
                    var results = (from division in bd.TBL_DIVISION
                                   join departamento in bd.TBL_DEPARTAMENTO_ORGANIZACION on division.ID_DEPARTAMENTO_ORGANIZACION equals departamento.ID_DEPARTAMENTO_ORGANIZACION
                                   where departamento.ID_DEPARTAMENTO == _id_departamento
                                   orderby division.NOMBRE_DIVISION descending
                                   select new DivisionJSON
                                   ()
                                   {
                                       ID_DIVISION = division.ID_DIVISION,
                                       NOMBRE_DIVISION = division.NOMBRE_DIVISION,
                                       ID_DEPARTAMENTO = departamento.ID_DEPARTAMENTO
                                   }).ToList<DivisionJSON>();

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
        public JSONCollection<TBL_DIVISION> Create(string NOMBRE_DIVISION)
		{
            JSONCollection<TBL_DIVISION> objJSON = new JSONCollection<TBL_DIVISION>();
            try
            {
                TBL_DIVISION nuevo = new TBL_DIVISION()
                {
                    NOMBRE_DIVISION = NOMBRE_DIVISION
                };
                bd.TBL_DIVISION.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_DIVISION.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_DIVISION> Get(string id)
		{
            JSONCollection<TBL_DIVISION> objJSON = new JSONCollection<TBL_DIVISION>();
            try
            {
                objJSON.items = (from variable in bd.TBL_DIVISION where variable.ID_DIVISION == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_DIVISION.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_DIVISION> Update(string id, TBL_DIVISION nuevo)
		{

            JSONCollection<TBL_DIVISION> objJSON = new JSONCollection<TBL_DIVISION>();
            try
            {
                var objeto = (from variable in bd.TBL_DIVISION
                              where variable.ID_DIVISION == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_DIVISION = nuevo.NOMBRE_DIVISION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_DIVISION.Count();
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
			var objeto = (from variable in bd.TBL_DIVISION
							where variable.ID_DIVISION == int.Parse(id)
							select variable).First();

			bd.TBL_DIVISION.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOMBRE_DIVISION")){
					return "NOMBRE_DIVISION";
				}

			}
			return "ID_DIVISION";
		}
	}
}