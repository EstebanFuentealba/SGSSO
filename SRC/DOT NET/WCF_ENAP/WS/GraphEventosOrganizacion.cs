/**
*Imports.
*/
using System;
using System.Collections;
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
    public class GraphJsonResumenMensual {
        public int ID_MES;
        public int ACUMULADO_MENSUAL;
    }
    public class GraphJsonResumen
    {
        public int ID_DEPARTAMENTO;
        public string NOMBRE_DEPARTAMENTO;
        public int ENERO_ACUMULADO;
        public int FEBRERO_ACUMULADO;
        public int MARZO_ACUMULADO;
        public int ABRIL_ACUMULADO;
        public int MAYO_ACUMULADO;
        public int JUNIO_ACUMULADO;
        public int JULIO_ACUMULADO;
        public int AGOSTO_ACUMULADO;
        public int SEPTIEMBRE_ACUMULADO;
        public int OCTUBRE_ACUMULADO;
        public int NOVIEMBRE_ACUMULADO;
        public int DICIEMBRE_ACUMULADO;
        //public List<GraphJsonResumenMensual> Acumulados = new List<GraphJsonResumenMensual>();
    }
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
        [WebGet(UriTemplate = "graphResumen?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={ID_ORGANIZACION}&ANO={ANO}")]
        public JSONCollection<List<GraphJsonResumen>> GetCollectionGraph(int _page,
                int _start,
                int _limit,
                string _sort,
                string _dir,
                int ID_ORGANIZACION,
                int ANO)
        {
            JSONCollection<List<GraphJsonResumen>> objJSON = new JSONCollection<List<GraphJsonResumen>>();
            if (ID_ORGANIZACION == 0)
            {
                ID_ORGANIZACION = 1;
            }
            if (ANO == 0)
            {
                ANO = DateTime.Now.Year;
            }
            Hashtable resumenes = new Hashtable();
            for (int i = 1; i < 13; i++ )
            {
                var query = bd.sp_get_informe_tipos_eventos(ID_ORGANIZACION, ANO, i);
                List<sp_get_informe_tipos_eventosResult> resultados = query.ToList<sp_get_informe_tipos_eventosResult>();
                
                foreach(sp_get_informe_tipos_eventosResult result in resultados) {
                    GraphJsonResumen test = new GraphJsonResumen();
                    test.ID_DEPARTAMENTO = result.ID_DEPARTAMENTO_ORGANIZACION;
                    test.NOMBRE_DEPARTAMENTO = result.NOMBRE_DEPARTAMENTO;
                    
                    if (!resumenes.ContainsKey(test.ID_DEPARTAMENTO))
                    {
                        if (i == 1)
                        {
                            test.ENERO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 2)
                        {
                            test.FEBRERO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 3)
                        {
                            test.MARZO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 4)
                        {
                            test.ABRIL_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 5)
                        {
                            test.MAYO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 6)
                        {
                            test.JUNIO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 7)
                        {
                            test.JULIO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 8)
                        {
                            test.AGOSTO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 9)
                        {
                            test.SEPTIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 10)
                        {
                            test.OCTUBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 11)
                        {
                            test.NOVIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 12)
                        {
                            test.DICIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        resumenes.Add(test.ID_DEPARTAMENTO, test);
                    }
                    else
                    {
                        if (i == 1)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).ENERO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 2)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).FEBRERO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 3)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).MARZO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 4)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).ABRIL_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 5)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).MAYO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 6)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).JUNIO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 7)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).JULIO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 8)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).AGOSTO_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 9)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).SEPTIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 10)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).OCTUBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 11)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).NOVIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                        else if (i == 12)
                        {
                            ((GraphJsonResumen)resumenes[test.ID_DEPARTAMENTO]).DICIEMBRE_ACUMULADO = (int)result.ACUMULADO_MENSUAL;
                        }
                    }
                }
            }
            List<GraphJsonResumen> list = new List<GraphJsonResumen>();

            foreach (int key in resumenes.Keys)
            {

                list.Add((GraphJsonResumen)resumenes[key]);

            }

            objJSON.items = list;
            return objJSON;
        }
        [WebGet(UriTemplate = "resumenEvento?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_ORGANIZACION={ID_ORGANIZACION}&ID_DEPARTAMENTO={ID_DEPARTAMENTO}&ANO_INICIO={ANO}&MES_INICIO={MES}")]
        public JSONCollection<List<sp_get_informe_tipos_eventosResult>> GetCollectionResumen(int _page,
                int _start,
                int _limit,
                string _sort,
                string _dir,
                int ID_ORGANIZACION,
                int ID_DEPARTAMENTO,
                int ANO,
                int MES)
        {
            JSONCollection<List<sp_get_informe_tipos_eventosResult>> objJSON = new JSONCollection<List<sp_get_informe_tipos_eventosResult>>();
            if (ID_ORGANIZACION == 0)
            {
                ID_ORGANIZACION = 1;
            }
            if (ANO == 0)
            {
                ANO = DateTime.Now.Year;
            }
            if (MES == 0)
            {
                MES = DateTime.Now.Month;
            }
            
            var query = bd.sp_get_informe_tipos_eventos(ID_ORGANIZACION, ANO, MES);

            if (ID_DEPARTAMENTO != 0)
            {
                objJSON.items = query.ToList<sp_get_informe_tipos_eventosResult>().Where(a => a.ID_DEPARTAMENTO_ORGANIZACION == ID_DEPARTAMENTO).ToList();
            }
            else
            {
                objJSON.items = query.ToList<sp_get_informe_tipos_eventosResult>();
            }
            objJSON.success = true;
            return objJSON;
        }
    }
}