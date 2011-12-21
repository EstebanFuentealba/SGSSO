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
using System.Web;
using System.Web.Script.Serialization;

namespace WCF_ENAP
{
    public class GraphProgramaAnualByIdJSON
    {
        public int ID_DIVISION;
        public string NOMBRE_DIVISION;
        public float PRC_MES_R;
        public string NOMBRE_MES_R;
        public int PROGRAMADO;
        public int REALIZADO;
    }
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class GraphAvanceProgramaAnual
    {
        private DataClassesEnapDataContext bd;

        public GraphAvanceProgramaAnual()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ANO_INICIO={_ANO_INICIO}")]
        public JSONCollection<List<sp_indicadores_all_programa_anualResult>> GetCollection(int _page, 
            int _start, 
            int _limit, 
            string _sort, 
            string _dir,
            int _ANO_INICIO)
        {
            ExtJSSort sort = null;
            if (_sort != null)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                sort = ser.Deserialize<ExtJSSort>(_sort.Replace("[", "").Replace("]", ""));
            }

            if (sort != null && sort.direction == null)
            {
                sort.direction = "DESC";
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
            JSONCollection<List<sp_indicadores_all_programa_anualResult>> objJSON = new JSONCollection<List<sp_indicadores_all_programa_anualResult>>();
            var query = bd.sp_indicadores_all_programa_anual(_ANO_INICIO, _start, _limit);
            objJSON.items = query.ToList<sp_indicadores_all_programa_anualResult>();
            objJSON.success = true;
            return objJSON;
        }
        [WebGet(UriTemplate = "getById?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_PROGRAMA_ANUAL={_ID_PROGRAMA_ANUAL}")]
        public JSONCollection<List<GraphProgramaAnualByIdJSON>> getById(int _page,
            int _start,
            int _limit,
            string _sort,
            string _dir,
            int _ID_PROGRAMA_ANUAL)
        {
            ExtJSSort sort = null;
            if (_sort != null)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                sort = ser.Deserialize<ExtJSSort>(_sort.Replace("[", "").Replace("]", ""));
            }

            if (sort != null && sort.direction == null)
            {
                sort.direction = "DESC";
            }
            if (_page == 0)
            {
                _page = 1;
            }
            if (_limit == 0)
            {
                _limit = 10;
            }
            JSONCollection<List<GraphProgramaAnualByIdJSON>> objJSON = new JSONCollection<List<GraphProgramaAnualByIdJSON>>();
            if (_ID_PROGRAMA_ANUAL != 0)
            {
                _start = (_page * _limit) - _limit;
                var query = bd.sp_indicadores_by_programa_anual(_ID_PROGRAMA_ANUAL, _start, _limit);
                List<sp_indicadores_by_programa_anualResult> list = query.ToList<sp_indicadores_by_programa_anualResult>();
                List<GraphProgramaAnualByIdJSON> listaReturn = new List<GraphProgramaAnualByIdJSON>();
                foreach(sp_indicadores_by_programa_anualResult data in list) {
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Enero", PRC_MES_R = (float)data.PCR_ENERO_R, PROGRAMADO = (int)data.ENERO_P, REALIZADO = (int)data.ENERO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Febrero", PRC_MES_R = (float)data.PCR_FEBRERO_R, PROGRAMADO = (int)data.FEBRERO_P, REALIZADO = (int)data.FEBRERO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Marzo", PRC_MES_R = (float)data.PCR_MARZO_R, PROGRAMADO = (int)data.MARZO_P, REALIZADO = (int)data.MARZO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Abril", PRC_MES_R = (float)data.PCR_ABRIL_R, PROGRAMADO = (int)data.ABRIL_P, REALIZADO = (int)data.ABRIL_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Mayo", PRC_MES_R = (float)data.PCR_MAYO_R, PROGRAMADO = (int)data.MAYO_P, REALIZADO = (int)data.MAYO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Junio", PRC_MES_R = (float)data.PCR_JUNIO_R, PROGRAMADO = (int)data.JUNIO_P, REALIZADO = (int)data.JUNIO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Julio", PRC_MES_R = (float)data.PCR_JULIO_R, PROGRAMADO = (int)data.JULIO_P, REALIZADO = (int)data.JULIO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Agosto", PRC_MES_R = (float)data.PCR_AGOSTO_R, PROGRAMADO = (int)data.AGOSTO_P, REALIZADO = (int)data.AGOSTO_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Septiembre", PRC_MES_R = (float)data.PCR_SEPTIEMBRE_R, PROGRAMADO = (int)data.SEPTIEMBRE_P, REALIZADO = (int)data.SEPTIEMBRE_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Octubre", PRC_MES_R = (float)data.PCR_OCTUBRE_R, PROGRAMADO = (int)data.OCTUBRE_P, REALIZADO = (int)data.OCTUBRE_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Noviembre", PRC_MES_R = (float)data.PCR_NOVIEMBRE_R, PROGRAMADO = (int)data.NOVIEMBRE_P, REALIZADO = (int)data.NOVIEMBRE_R });
                    listaReturn.Add(new GraphProgramaAnualByIdJSON() { ID_DIVISION = (int)data.ID_DIVISION, NOMBRE_DIVISION = data.NOMBRE_DIVISION, NOMBRE_MES_R = "Diciembre", PRC_MES_R = (float)data.PCR_DICIEMBRE_R, PROGRAMADO = (int)data.DICIEMBRE_P, REALIZADO = (int)data.DICIEMBRE_R });
                }
                objJSON.items = listaReturn;
                objJSON.success = true;
            }
            return objJSON;
        }
    }
}