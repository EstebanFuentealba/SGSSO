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
	public class ProgramaAnual
	{
		private DataClassesEnapDataContext bd;

		public ProgramaAnual()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<sp_get_programas_anualesResult>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<sp_get_programas_anualesResult>> objJSON = new JSONCollection<List<sp_get_programas_anualesResult>>();
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
                var query = bd.sp_get_programas_anuales().Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<sp_get_programas_anualesResult> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_PROGRAMA_ANUAL.Count<TBL_PROGRAMA_ANUAL>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<sp_get_programas_anualesResult> Create(int ID_DEPARTAMENTO_ORGANIZACION, string NOMBRE_DIVISION, int ID_DIVISION, string OBJETIVO, string META, string FECHA_CREACION, string NOMBRE_PROGRAMA, int MES_INICIO, int ANO_INICIO)
		{
            JSONCollection<sp_get_programas_anualesResult> objJSON = new JSONCollection<sp_get_programas_anualesResult>();
            try
            {
                TBL_PROGRAMA_ANUAL nuevo = new TBL_PROGRAMA_ANUAL()
                {
                    NOMBRE_PROGRAMA = NOMBRE_PROGRAMA,
                    ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION,
                    ID_DIVISION = ID_DIVISION,
                    OBJETIVO = OBJETIVO, 
					META = META, 
					FECHA_CREACION = DateTime.Now,
                    MES_INICIO = MES_INICIO,
                    ANO_INICIO = ANO_INICIO
                };
                bd.TBL_PROGRAMA_ANUAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                sp_get_programas_anualesResult temp = new sp_get_programas_anualesResult()
                {
                    NOMBRE_PROGRAMA = nuevo.NOMBRE_PROGRAMA,
                    ID_PROGRAMA_ANUAL =nuevo.ID_PROGRAMA_ANUAL,
                    ID_DEPARTAMENTO_ORGANIZACION = nuevo.ID_DEPARTAMENTO_ORGANIZACION,
                    ID_DIVISION = (int)nuevo.ID_DIVISION,
                    NOMBRE_DIVISION = NOMBRE_DIVISION,
                    OBJETIVO = nuevo.OBJETIVO,
                    META = nuevo.META,
                    FECHA_CREACION = nuevo.FECHA_CREACION,
                    MES_INICIO = nuevo.MES_INICIO,
                    ANO_INICIO = nuevo.ANO_INICIO
                };
                objJSON.items = temp;
                objJSON.totalCount = bd.TBL_PROGRAMA_ANUAL.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_PROGRAMA_ANUAL> Get(string id)
		{
            JSONCollection<TBL_PROGRAMA_ANUAL> objJSON = new JSONCollection<TBL_PROGRAMA_ANUAL>();
            try
            {
                objJSON.items = (from variable in bd.TBL_PROGRAMA_ANUAL where variable.ID_PROGRAMA_ANUAL == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_PROGRAMA_ANUAL.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_PROGRAMA_ANUAL> Update(string id, TBL_PROGRAMA_ANUAL nuevo)
		{

            JSONCollection<TBL_PROGRAMA_ANUAL> objJSON = new JSONCollection<TBL_PROGRAMA_ANUAL>();
            try
            {
                var objeto = (from variable in bd.TBL_PROGRAMA_ANUAL
                              where variable.ID_PROGRAMA_ANUAL == int.Parse(id)
                              select variable).Single();
                objeto.OBJETIVO = nuevo.OBJETIVO;
				objeto.META = nuevo.META;
                objeto.MES_INICIO = nuevo.ANO_INICIO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_PROGRAMA_ANUAL.Count();
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
			var objeto = (from variable in bd.TBL_PROGRAMA_ANUAL
							where variable.ID_PROGRAMA_ANUAL == int.Parse(id)
							select variable).First();

			bd.TBL_PROGRAMA_ANUAL.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("OBJETIVO")){
					return "OBJETIVO";
				}
				if (_sort.Equals("META")){
					return "META";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}

			}
			return "ID_PROGRAMA_ANUAL";
		}
	}
}