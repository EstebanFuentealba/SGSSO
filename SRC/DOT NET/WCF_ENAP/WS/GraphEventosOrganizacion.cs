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
    public class GraphEventosOrganizacion
    {
        private DataClassesEnapDataContext bd;

        public GraphEventosOrganizacion()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={ID_ORGANIZACION}&ANO={ANO}")]
        public JSONCollection<List<sp_get_eventos_departamento_by_organizacionResult>> GetCollection(int _page, 
                int _start, 
                int _limit, 
                string _sort, 
                string _dir,
                int ID_ORGANIZACION,
                int ANO)
        {
            JSONCollection<List<sp_get_eventos_departamento_by_organizacionResult>> objJSON = new JSONCollection<List<sp_get_eventos_departamento_by_organizacionResult>>();
            if (ID_ORGANIZACION == 0)
            {
                ID_ORGANIZACION = 1;
            }
            if (ANO == 0)
            {
                ANO = DateTime.Now.Year;
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
                var query = bd.sp_get_eventos_departamento_by_organizacion(ID_ORGANIZACION, ANO, _start, _limit);
            objJSON.items = query.ToList<sp_get_eventos_departamento_by_organizacionResult>();
            objJSON.success = true;
            return objJSON;
        }
    }
}