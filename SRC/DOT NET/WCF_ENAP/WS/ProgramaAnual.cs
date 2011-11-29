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
using System.Web.Script.Serialization;

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
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ANO_INICIO={_ANO_INICIO}&ID_DIVISION={_ID_DIVISION}&TEMPLATE={_TEMPLATE}")]
        public JSONCollection<List<sp_get_programas_anualesResult>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int _ANO_INICIO, int _ID_DIVISION, bool _TEMPLATE)
        {
            JSONCollection<List<sp_get_programas_anualesResult>> objJSON = new JSONCollection<List<sp_get_programas_anualesResult>>();
            try
            {
                List<ExtJSSort> sort = null;
                if (_sort != null)
                {
                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    sort = ser.Deserialize<List<ExtJSSort>>(_sort);
                }
                if (sort[sort.Count - 1] != null && sort[sort.Count - 1].direction == null)
                {
                    sort[sort.Count - 1].direction = "DESC";
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
                var query = bd.sp_get_programas_anuales(_ANO_INICIO, _ID_DIVISION,_TEMPLATE, _start, _limit).OrderBy(orderBy(sort[sort.Count - 1])).Select(r => r);
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
        public JSONCollection<sp_get_programas_anualesResult> Create(
            int ID_DEPARTAMENTO_ORGANIZACION, 
            string NOMBRE_DIVISION, 
            int ID_DIVISION, 
            string OBJETIVO_META, 
            string FECHA_CREACION, 
            string NOMBRE_PROGRAMA, 
            int MES_INICIO, 
            int ANO_INICIO,
            string IS_TEMPLATE,
            int ID_TEMPLATE,
            string ACTION,
            int ID_ORGANIZACION)
		{
            JSONCollection<sp_get_programas_anualesResult> objJSON = new JSONCollection<sp_get_programas_anualesResult>();
            //try{
            if (ID_ORGANIZACION == 0)
            {
                ID_ORGANIZACION = 1;
            }
            if (ID_TEMPLATE != 0 && ACTION == "stack")
            {
                var results = (from dp in bd.TBL_DIVISION
                 join dpor in bd.TBL_DEPARTAMENTO_ORGANIZACION on dp.ID_DEPARTAMENTO_ORGANIZACION equals dpor.ID_DEPARTAMENTO_ORGANIZACION
                 where dpor.ID_DEPARTAMENTO_ORGANIZACION == ID_ORGANIZACION
                 select new { dpor.ID_DEPARTAMENTO_ORGANIZACION, dp.ID_DIVISION, dp.NOMBRE_DIVISION }).ToList();
                foreach (var data in results)
                {
                    TBL_PROGRAMA_ANUAL nuevoP = new TBL_PROGRAMA_ANUAL()
                    {
                        NOMBRE_PROGRAMA = "["+ANO_INICIO+"] "+data.NOMBRE_DIVISION,
                        OBJETIVO_META = OBJETIVO_META,
                        FECHA_CREACION = DateTime.Now,
                        MES_INICIO = MES_INICIO,
                        ANO_INICIO = ANO_INICIO,
                        ID_DEPARTAMENTO_ORGANIZACION = data.ID_DEPARTAMENTO_ORGANIZACION,
                        ID_DIVISION = data.ID_DIVISION
                    };
                    bd.TBL_PROGRAMA_ANUAL.InsertOnSubmit(nuevoP);
                    bd.SubmitChanges();
                }
            }
            else
            {
                TBL_PROGRAMA_ANUAL nuevo = new TBL_PROGRAMA_ANUAL()
                {
                    NOMBRE_PROGRAMA = NOMBRE_PROGRAMA,
                    OBJETIVO_META = OBJETIVO_META,
                    FECHA_CREACION = DateTime.Now,
                    MES_INICIO = MES_INICIO,
                    ANO_INICIO = ANO_INICIO
                };
                if (IS_TEMPLATE == "on")
                {
                    nuevo.IS_TEMPLATE = true;
                    nuevo.ID_TEMPLATE = ID_TEMPLATE;
                }
                else
                {
                    nuevo.IS_TEMPLATE = false;
                    nuevo.ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION;
                    nuevo.ID_DIVISION = ID_DIVISION;
                }
                bd.TBL_PROGRAMA_ANUAL.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                sp_get_programas_anualesResult temp = new sp_get_programas_anualesResult()
                    {
                        NOMBRE_PROGRAMA = nuevo.NOMBRE_PROGRAMA,
                        ID_PROGRAMA_ANUAL = nuevo.ID_PROGRAMA_ANUAL,
                        NOMBRE_DIVISION = NOMBRE_DIVISION,
                        PROGRAMA = "[" + nuevo.ANO_INICIO + "] " + NOMBRE_DIVISION,
                        OBJETIVO_META = nuevo.OBJETIVO_META,
                        FECHA_CREACION = nuevo.FECHA_CREACION,
                        MES_INICIO = nuevo.MES_INICIO,
                        ANO_INICIO = nuevo.ANO_INICIO
                    };
                if (IS_TEMPLATE != "on")
                {
                    temp.ID_DEPARTAMENTO_ORGANIZACION = ID_DEPARTAMENTO_ORGANIZACION;
                    temp.ID_DIVISION = ID_DIVISION;
                }
                objJSON.items = temp;
                objJSON.totalCount = bd.TBL_PROGRAMA_ANUAL.Count();
                objJSON.success = true;
                //} catch (Exception e) { objJSON.success = false; }
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
                objeto.OBJETIVO_META = nuevo.OBJETIVO_META;
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
        string orderBy(ExtJSSort _sort)
        {
            if (_sort != null)
            {
                if (_sort.property.Equals("NOMBRE_PROGRAMA"))
                {
                    return "NOMBRE_PROGRAMA " + _sort.direction;
                }
                if (_sort.property.Equals("ID_DIVISION"))
                {
                    return "ID_DIVISION " + _sort.direction;
                }
                if (_sort.property.Equals("PERCENT_TOTAL"))
                {
                    return "PERCENT_TOTAL " + _sort.direction;
                }
            }
            return "ID_PROGRAMA_ANUAL DESC";
        }
	}
}