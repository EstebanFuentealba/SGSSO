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

namespace WCF_ENAP
{
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
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<sp_indicadores_all_programa_anualResult>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<sp_indicadores_all_programa_anualResult>> objJSON = new JSONCollection<List<sp_indicadores_all_programa_anualResult>>();
            var query = bd.sp_indicadores_all_programa_anual();
            objJSON.items = query.ToList<sp_indicadores_all_programa_anualResult>();
            objJSON.success = true;
            return objJSON;
        }
    }
}