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
    public class SearchMarker
    {
        private DataClassesEnapDataContext bd;

        public SearchMarker()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&LAT={LAT}&LNG={LNG}&RADIO={RADIO}")]
        public JSONCollection<List<sp_search_pointResult>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, 
                decimal LAT,
                decimal LNG,
                decimal RADIO)
        {
            JSONCollection<List<sp_search_pointResult>> objJSON = new JSONCollection<List<sp_search_pointResult>>();
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
                var query = bd.sp_search_point(LAT,LNG,(RADIO / 1000)).Skip(_start).Take(_limit).Select(r => r);
                List<sp_search_pointResult> results = query.ToList<sp_search_pointResult>();
                objJSON.items = results;
                objJSON.totalCount = results.Count;
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

    }
}