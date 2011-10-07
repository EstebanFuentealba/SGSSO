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
	public class MedidaDeControl
	{
		private DataClassesEnapDataContext bd;

		public MedidaDeControl()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_MEDIDA_DE_CONTROL>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_MEDIDA_DE_CONTROL>> objJSON = new JSONCollection<List<TBL_MEDIDA_DE_CONTROL>>();
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
                var query = bd.TBL_MEDIDA_DE_CONTROL.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_MEDIDA_DE_CONTROL> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_MEDIDA_DE_CONTROL.Count<TBL_MEDIDA_DE_CONTROL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_MEDIDA_DE_CONTROL> Create(string NOM_MEDIDA_DE_CONTROL)
		{
            JSONCollection<TBL_MEDIDA_DE_CONTROL> objJSON = new JSONCollection<TBL_MEDIDA_DE_CONTROL>();
            try
            {
                TBL_MEDIDA_DE_CONTROL nuevo = new TBL_MEDIDA_DE_CONTROL()
                {
                    NOM_MEDIDA_DE_CONTROL = NOM_MEDIDA_DE_CONTROL
                };
                bd.TBL_MEDIDA_DE_CONTROL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_MEDIDA_DE_CONTROL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_MEDIDA_DE_CONTROL> Get(string id)
		{
            JSONCollection<TBL_MEDIDA_DE_CONTROL> objJSON = new JSONCollection<TBL_MEDIDA_DE_CONTROL>();
            try
            {
                objJSON.items = (from variable in bd.TBL_MEDIDA_DE_CONTROL where variable.ID_MEDIDAS_DE_CONTROL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_MEDIDA_DE_CONTROL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_MEDIDA_DE_CONTROL> Update(string id, TBL_MEDIDA_DE_CONTROL nuevo)
		{

            JSONCollection<TBL_MEDIDA_DE_CONTROL> objJSON = new JSONCollection<TBL_MEDIDA_DE_CONTROL>();
            try
            {
                var objeto = (from variable in bd.TBL_MEDIDA_DE_CONTROL
                              where variable.ID_MEDIDAS_DE_CONTROL == int.Parse(id)
                              select variable).Single();
                objeto.NOM_MEDIDA_DE_CONTROL = nuevo.NOM_MEDIDA_DE_CONTROL;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_MEDIDA_DE_CONTROL.Count();
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
			var objeto = (from variable in bd.TBL_MEDIDA_DE_CONTROL
							where variable.ID_MEDIDAS_DE_CONTROL == int.Parse(id)
							select variable).First();

			bd.TBL_MEDIDA_DE_CONTROL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("NOM_MEDIDA_DE_CONTROL")){
					return "NOM_MEDIDA_DE_CONTROL";
				}

			}
			return "ID_MEDIDAS_DE_CONTROL";
		}
	}
}