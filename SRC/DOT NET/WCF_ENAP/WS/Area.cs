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
    public class AreaJSON
    {
        public int ID_AREA;
        public string NOMBRE_AREA;
        public int ID_DIVISION;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class Area
	{
		private DataClassesEnapDataContext bd;

		public Area()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_DIVISION={_id_division}")]
        public JSONCollection<List<AreaJSON>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _id_division)
        {
            JSONCollection<List<AreaJSON>> objJSON = new JSONCollection<List<AreaJSON>>();
            if (_id_division != 0)
            {
                try
                {
                    var results = (from area in bd.TBL_AREA
                                   join division in bd.TBL_DIVISION on area.ID_DIVISION equals division.ID_DIVISION
                                   where area.ID_DIVISION == _id_division
                                   orderby area.NOMBRE_AREA descending
                                   select new AreaJSON
                                   ()
                                   {
                                       ID_AREA = area.ID_AREA,
                                       NOMBRE_AREA = area.NOMBRE_AREA,
                                       ID_DIVISION = division.ID_DIVISION
                                   }).ToList<AreaJSON>();

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
        public JSONCollection<TBL_AREA> Create(string ID_DIVISION, string NOMBRE_AREA)
		{
            JSONCollection<TBL_AREA> objJSON = new JSONCollection<TBL_AREA>();
            try
            {
                TBL_AREA nuevo = new TBL_AREA()
                {
                    ID_DIVISION = int.Parse(ID_DIVISION), 
					NOMBRE_AREA = NOMBRE_AREA
                };
                bd.TBL_AREA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_AREA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_AREA> Get(string id)
		{
            JSONCollection<TBL_AREA> objJSON = new JSONCollection<TBL_AREA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_AREA where variable.ID_AREA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_AREA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_AREA> Update(string id, TBL_AREA nuevo)
		{

            JSONCollection<TBL_AREA> objJSON = new JSONCollection<TBL_AREA>();
            try
            {
                var objeto = (from variable in bd.TBL_AREA
                              where variable.ID_AREA == int.Parse(id)
                              select variable).Single();
                objeto.ID_DIVISION = nuevo.ID_DIVISION;
				objeto.NOMBRE_AREA = nuevo.NOMBRE_AREA;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_AREA.Count();
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
			var objeto = (from variable in bd.TBL_AREA
							where variable.ID_AREA == int.Parse(id)
							select variable).First();

			bd.TBL_AREA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_DIVISION")){
					return "ID_DIVISION";
				}
				if (_sort.Equals("NOMBRE_AREA")){
					return "NOMBRE_AREA";
				}

			}
			return "ID_AREA";
		}
	}
}