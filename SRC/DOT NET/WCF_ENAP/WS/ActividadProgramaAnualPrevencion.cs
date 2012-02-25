using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using WCF_ENAP.WS;
namespace WCF_ENAP
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class ActividadProgramaAnualPrevencion
    {
        private DataClassesEnapDataContext bd;

        public ActividadProgramaAnualPrevencion()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_PROGRAMA_ANUAL={ID_PROGRAMA_ANUAL}")]
        public JSONCollection<List<sp_get_actividades_by_programaResult>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int ID_PROGRAMA_ANUAL)
        {
            JSONCollection<List<sp_get_actividades_by_programaResult>> objJSON = new JSONCollection<List<sp_get_actividades_by_programaResult>>();
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
                
                if (ID_PROGRAMA_ANUAL != 0)
                {
                    var query = bd.sp_get_actividades_by_programa(ID_PROGRAMA_ANUAL, _start, _limit).OrderBy(orderBy(_sort) + " " + _dir);
                
                    List<sp_get_actividades_by_programaResult> results = query.ToList();
                    objJSON.items = results;
                }
                objJSON.totalCount = bd.TBL_ACTIVIDAD.Count<TBL_ACTIVIDAD>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<sp_get_actividades_by_programaResult> Create(string NOMBRE_ACTIVIDAD,
                                                    int ID_EVIDENCIA,
            int ID_PROGRAMA_ANUAL,
            int ID_CARGO,
            int TIPO_FRECUENCIA,
            int CANTIDAD_FRECUENCIA,
            char TURNO,
            int MES_INICIO,
            int ANO_INICIO,
            bool ENERO_E,
            bool FEBRERO_E,
            bool MARZO_E,
            bool ABRIL_E,
            bool MAYO_E,
            bool JUNIO_E,
            bool JULIO_E,
            bool AGOSTO_E,
            bool SEPTIEMBRE_E,
            bool OCTUBRE_E,
            bool NOVIEMBRE_E,
            bool DICIEMBRE_E,
            string NOMBRE_EVIDENCIA,
            string NOMBRE_CARGO)
        {
            JSONCollection<sp_get_actividades_by_programaResult> objJSON = new JSONCollection<sp_get_actividades_by_programaResult>();
            //try {
                TBL_ACTIVIDAD nuevo = new TBL_ACTIVIDAD()
                {
                    NOMBRE_ACTIVIDAD = NOMBRE_ACTIVIDAD,
                    ID_CARGO = ID_CARGO,
                    TURNO = TURNO,
                    ID_EVIDENCIA = ID_EVIDENCIA,
                    ID_PROGRAMA_ANUAL = ID_PROGRAMA_ANUAL,
                    TIPO_FRECUENCIA = TIPO_FRECUENCIA,
                    CANTIDAD_FRECUENCIA = CANTIDAD_FRECUENCIA,
                    MES_INICIO = MES_INICIO,
                    TOTAL = 0
                };
                nuevo.ENERO_E = true;
                nuevo.FEBRERO_E = true;
                nuevo.MARZO_E = true;
                nuevo.ABRIL_E = true;
                nuevo.MAYO_E = true;
                nuevo.JUNIO_E = true;
                nuevo.JULIO_E = true;
                nuevo.AGOSTO_E = true;
                nuevo.SEPTIEMBRE_E = true;
                nuevo.OCTUBRE_E = true;
                nuevo.NOVIEMBRE_E = true;
                nuevo.DICIEMBRE_E = true;


                nuevo.ENERO_P = 0;
                nuevo.FEBRERO_P = 0;
                nuevo.MARZO_P = 0;
                nuevo.ABRIL_P = 0;
                nuevo.MAYO_P = 0;
                nuevo.JUNIO_P = 0;
                nuevo.JULIO_P = 0;
                nuevo.AGOSTO_P = 0;
                nuevo.SEPTIEMBRE_P = 0;
                nuevo.OCTUBRE_P = 0;
                nuevo.NOVIEMBRE_P = 0;
                nuevo.DICIEMBRE_P = 0;

                nuevo.ENERO_R = 0;
                nuevo.FEBRERO_R = 0;
                nuevo.MARZO_R = 0;
                nuevo.ABRIL_R = 0;
                nuevo.MAYO_R = 0;
                nuevo.JUNIO_R = 0;
                nuevo.JULIO_R = 0;
                nuevo.AGOSTO_R = 0;
                nuevo.SEPTIEMBRE_R = 0;
                nuevo.OCTUBRE_R = 0;
                nuevo.NOVIEMBRE_R = 0;
                nuevo.DICIEMBRE_R = 0;

                if (TIPO_FRECUENCIA == 1)
                {
                    /*Diario*/
                    
                    nuevo.ENERO_P = (DateTime.DaysInMonth(ANO_INICIO, 1) * CANTIDAD_FRECUENCIA);
                    nuevo.FEBRERO_P = (DateTime.DaysInMonth(ANO_INICIO, 2) * CANTIDAD_FRECUENCIA);
                    nuevo.MARZO_P = (DateTime.DaysInMonth(ANO_INICIO, 3) * CANTIDAD_FRECUENCIA);
                    nuevo.ABRIL_P = (DateTime.DaysInMonth(ANO_INICIO, 4) * CANTIDAD_FRECUENCIA);
                    nuevo.MAYO_P = (DateTime.DaysInMonth(ANO_INICIO, 5) * CANTIDAD_FRECUENCIA);
                    nuevo.JUNIO_P = (DateTime.DaysInMonth(ANO_INICIO, 6) * CANTIDAD_FRECUENCIA);
                    nuevo.JULIO_P = (DateTime.DaysInMonth(ANO_INICIO, 7) * CANTIDAD_FRECUENCIA);
                    nuevo.AGOSTO_P = (DateTime.DaysInMonth(ANO_INICIO, 8) * CANTIDAD_FRECUENCIA);
                    nuevo.SEPTIEMBRE_P = (DateTime.DaysInMonth(ANO_INICIO, 9) * CANTIDAD_FRECUENCIA);
                    nuevo.OCTUBRE_P = (DateTime.DaysInMonth(ANO_INICIO, 10) * CANTIDAD_FRECUENCIA);
                    nuevo.NOVIEMBRE_P = (DateTime.DaysInMonth(ANO_INICIO, 11) * CANTIDAD_FRECUENCIA);
                    nuevo.DICIEMBRE_P = (DateTime.DaysInMonth(ANO_INICIO, 12) * CANTIDAD_FRECUENCIA);
                }
                else if (TIPO_FRECUENCIA == 2)
                {
                    /*Semanal*/
                    nuevo.ENERO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.FEBRERO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.MARZO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.ABRIL_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.MAYO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.JUNIO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.JULIO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.AGOSTO_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.SEPTIEMBRE_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.OCTUBRE_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.NOVIEMBRE_P = (4 * CANTIDAD_FRECUENCIA);
                    nuevo.DICIEMBRE_P = (4 * CANTIDAD_FRECUENCIA);
                }
                else if (TIPO_FRECUENCIA == 3)
                {
                    /*Mensual*/
                    nuevo.ENERO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.FEBRERO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.MARZO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.ABRIL_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.MAYO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.JUNIO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.JULIO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.AGOSTO_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.SEPTIEMBRE_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.OCTUBRE_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.NOVIEMBRE_P = (1 * CANTIDAD_FRECUENCIA);
                    nuevo.DICIEMBRE_P = (1 * CANTIDAD_FRECUENCIA);
                }
                else if (TIPO_FRECUENCIA == 4)
                {
                    /*Anual*/
                    if (!ENERO_E) {
                        nuevo.ENERO_E = false;
                    } else
                    {
                        nuevo.ENERO_E = true;
                        nuevo.ENERO_P = 1;
                    }
                    if (!FEBRERO_E)
                    {
                        nuevo.FEBRERO_E = false;
                        
                    }
                    else
                    {
                        nuevo.FEBRERO_E = true;
                        nuevo.FEBRERO_P = 1;
                    }
                    if (!MARZO_E)
                    {
                        nuevo.MARZO_E = false;
                        
                    }
                    else
                    {
                        nuevo.MARZO_E = true;
                        nuevo.MARZO_P = 1;
                    }
                    if (!ABRIL_E)
                    {
                        nuevo.ABRIL_E = false;
                        
                    }
                    else
                    {
                        nuevo.ABRIL_E = true;
                        nuevo.ABRIL_P = 1;
                    }
                    if (!MAYO_E)
                    {
                        nuevo.MAYO_E = false;
                        
                    }
                    else
                    {
                        nuevo.MAYO_E = true;
                        nuevo.MAYO_P = 1;
                    }
                    if (!JUNIO_E)
                    {
                        nuevo.JUNIO_E = false;
                        
                    }
                    else
                    {
                        nuevo.JUNIO_E = true;
                        nuevo.JUNIO_P = 1;
                    }
                    if (!JULIO_E)
                    {
                        nuevo.JULIO_E = false;
                        
                    }
                    else
                    {
                        nuevo.JULIO_E = true;
                        nuevo.JULIO_P = 1;
                    }
                    if (!AGOSTO_E)
                    {
                        nuevo.AGOSTO_E = false;
                        
                    }
                    else
                    {
                        nuevo.AGOSTO_E = true;
                        nuevo.AGOSTO_P = 1;
                    }
                    if (!SEPTIEMBRE_E)
                    {
                        nuevo.SEPTIEMBRE_E = false;
                        
                    }
                    else
                    {
                        nuevo.SEPTIEMBRE_E = true;
                        nuevo.SEPTIEMBRE_P = 1;
                    }
                    if (!OCTUBRE_E)
                    {
                        nuevo.OCTUBRE_E = false;
                    }
                    else
                    {
                        nuevo.OCTUBRE_E = true;
                        nuevo.OCTUBRE_P = 1;
                    }
                    if (!NOVIEMBRE_E)
                    {
                        nuevo.NOVIEMBRE_E = false;
                    }
                    else
                    {
                        nuevo.NOVIEMBRE_E = true;
                        nuevo.NOVIEMBRE_P = 1;
                    }
                    if (!DICIEMBRE_E)
                    {
                        nuevo.DICIEMBRE_E = false;
                    }
                    else
                    {
                        nuevo.DICIEMBRE_E = true;
                        nuevo.DICIEMBRE_P = 1;
                    }
                }
                else if (TIPO_FRECUENCIA == 5)
                {
                    nuevo.ENERO_E = false;
                    nuevo.FEBRERO_E = false;
                    nuevo.MARZO_E = false;
                    nuevo.ABRIL_E = false;
                    nuevo.MAYO_E = false;
                    nuevo.JUNIO_E = false;
                    nuevo.JULIO_E = false;
                    nuevo.AGOSTO_E = false;
                    nuevo.SEPTIEMBRE_E = false;
                    nuevo.OCTUBRE_E = false;
                    nuevo.NOVIEMBRE_E = false;
                    nuevo.DICIEMBRE_E = false;
                    int finSemestreUno = (((int)nuevo.MES_INICIO) + 6);
                    if (finSemestreUno > 12)
                    {
                        finSemestreUno = finSemestreUno - 12;
                    }
                    int finSemestreDos = (finSemestreUno + 5);
                    if (finSemestreDos > 12)
                    {
                        finSemestreDos = finSemestreDos - 12;
                    }
                    if (finSemestreUno == 1 || finSemestreDos == 1)
                    {
                        nuevo.ENERO_E = true;
                        nuevo.ENERO_P = 1;
                    }
                    if (finSemestreUno == 2 || finSemestreDos == 2)
                    {
                        nuevo.FEBRERO_E = true;
                        nuevo.FEBRERO_P = 1;
                    }
                    if (finSemestreUno == 3 || finSemestreDos == 3)
                    {
                        nuevo.MARZO_E = true;
                        nuevo.MARZO_P = 1;
                    }
                    if (finSemestreUno == 4 || finSemestreDos == 4)
                    {
                        nuevo.ABRIL_E = true;
                        nuevo.ABRIL_P = 1;
                    }
                    if (finSemestreUno == 5 || finSemestreDos == 5)
                    {
                        nuevo.MAYO_E = true;
                        nuevo.MAYO_P = 1;
                    }
                    if (finSemestreUno == 6 || finSemestreDos == 6)
                    {
                        nuevo.JUNIO_E = true;
                        nuevo.JUNIO_P = 1;
                    }
                    if (finSemestreUno == 7 || finSemestreDos == 7)
                    {
                        nuevo.JULIO_E = true;
                        nuevo.JULIO_P = 1;
                    }
                    if (finSemestreUno == 8 || finSemestreDos == 8)
                    {
                        nuevo.AGOSTO_E = true;
                        nuevo.AGOSTO_P = 1;
                    }
                    if (finSemestreUno == 9 || finSemestreDos == 9)
                    {
                        nuevo.SEPTIEMBRE_E = true;
                        nuevo.SEPTIEMBRE_P = 1;
                    }
                    if (finSemestreUno == 10 || finSemestreDos == 10)
                    {
                        nuevo.OCTUBRE_E = true;
                        nuevo.OCTUBRE_P = 1;
                    }
                    if (finSemestreUno == 11 || finSemestreDos == 11)
                    {
                        nuevo.NOVIEMBRE_E = true;
                        nuevo.NOVIEMBRE_P = 1;
                    }
                    if (finSemestreUno == 12 || finSemestreDos == 12)
                    {
                        nuevo.DICIEMBRE_E = true;
                        nuevo.DICIEMBRE_P = 1;
                    }
                }
                bd.TBL_ACTIVIDAD.InsertOnSubmit(nuevo);
                bd.SubmitChanges();



                sp_get_actividades_by_programaResult returnObject = new sp_get_actividades_by_programaResult()
                {
                    ID_ACTIVIDAD = nuevo.ID_ACTIVIDAD,
                    ID_EVIDENCIA = nuevo.ID_EVIDENCIA,
                    ID_PROGRAMA_ANUAL = nuevo.ID_PROGRAMA_ANUAL,
                    ID_CARGO = nuevo.ID_CARGO,
                    NOMBRE_ACTIVIDAD = nuevo.NOMBRE_ACTIVIDAD,
                    TIPO_FRECUENCIA = nuevo.TIPO_FRECUENCIA,
                    CANTIDAD_FRECUENCIA = nuevo.CANTIDAD_FRECUENCIA,
                    ENERO_P = nuevo.ENERO_P,
                    ENERO_R = nuevo.ENERO_R,
                    ENERO_E = nuevo.ENERO_E,
                    FEBRERO_P = nuevo.FEBRERO_P,
                    FEBRERO_R = nuevo.FEBRERO_R,
                    FEBRERO_E = nuevo.FEBRERO_E,
                    MARZO_P = nuevo.MARZO_P,
                    MARZO_R = nuevo.MARZO_R,
                    MARZO_E = nuevo.MARZO_E,
                    ABRIL_P = nuevo.ABRIL_P,
                    ABRIL_R = nuevo.ABRIL_R,
                    ABRIL_E = nuevo.ABRIL_E,
                    MAYO_P = nuevo.MAYO_P,
                    MAYO_R = nuevo.MAYO_R,
                    MAYO_E = nuevo.MAYO_E,
                    JUNIO_P = nuevo.JUNIO_P,
                    JUNIO_R = nuevo.JUNIO_R,
                    JUNIO_E = nuevo.JUNIO_E,
                    JULIO_P = nuevo.JULIO_P,
                    JULIO_R = nuevo.JULIO_R,
                    JULIO_E = nuevo.JULIO_E,
                    AGOSTO_P = nuevo.AGOSTO_P,
                    AGOSTO_R = nuevo.AGOSTO_R,
                    AGOSTO_E = nuevo.AGOSTO_E,
                    SEPTIEMBRE_P = nuevo.SEPTIEMBRE_P,
                    SEPTIEMBRE_R = nuevo.SEPTIEMBRE_R,
                    SEPTIEMBRE_E = nuevo.SEPTIEMBRE_E,
                    OCTUBRE_P = nuevo.OCTUBRE_P,
                    OCTUBRE_R = nuevo.OCTUBRE_R,
                    OCTUBRE_E = nuevo.OCTUBRE_E,
                    NOVIEMBRE_P = nuevo.NOVIEMBRE_P,
                    NOVIEMBRE_R = nuevo.NOVIEMBRE_R,
                    NOVIEMBRE_E = nuevo.NOVIEMBRE_E,
                    DICIEMBRE_P = nuevo.DICIEMBRE_P,
                    DICIEMBRE_R = nuevo.DICIEMBRE_R,
                    DICIEMBRE_E = nuevo.DICIEMBRE_E,
                    TURNO = nuevo.TURNO,
                    MES_INICIO = nuevo.MES_INICIO,
                    NOMBRE_EVIDENCIA = NOMBRE_EVIDENCIA,
                    NOMBRE_CARGO = NOMBRE_CARGO
                };
                objJSON.items = returnObject;
                objJSON.totalCount = bd.TBL_ACCION.Count();
                objJSON.success = true;
            /*}
            catch (Exception e)
            {
                objJSON.success = false;
            }*/
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACTIVIDAD> Get(string id)
        {
            JSONCollection<TBL_ACTIVIDAD> objJSON = new JSONCollection<TBL_ACTIVIDAD>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACTIVIDAD where variable.ID_ACTIVIDAD == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACTIVIDAD.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<sp_get_actividades_by_programaResult> Update(string id, sp_get_actividades_by_programaResult nuevo)
        {

            JSONCollection<sp_get_actividades_by_programaResult> objJSON = new JSONCollection<sp_get_actividades_by_programaResult>();
            //try{
                var objeto = (from variable in bd.TBL_ACTIVIDAD
                              where variable.ID_ACTIVIDAD == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_ACTIVIDAD = nuevo.NOMBRE_ACTIVIDAD;
                objeto.ID_EVIDENCIA = nuevo.ID_EVIDENCIA;
                objeto.TIPO_FRECUENCIA = nuevo.TIPO_FRECUENCIA;
                objeto.CANTIDAD_FRECUENCIA = nuevo.CANTIDAD_FRECUENCIA;
                if (objeto.TIPO_FRECUENCIA == 1)
                {
                    /*Diario*/

                    objeto.ENERO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 1) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.FEBRERO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 2) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MARZO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 3) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.ABRIL_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 4) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MAYO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 5) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JUNIO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 6) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JULIO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 7) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.AGOSTO_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 8) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.SEPTIEMBRE_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 9) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.OCTUBRE_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 10) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.NOVIEMBRE_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 11) * objeto.CANTIDAD_FRECUENCIA);
                    objeto.DICIEMBRE_P = (DateTime.DaysInMonth((int)nuevo.ANO_INICIO, 12) * objeto.CANTIDAD_FRECUENCIA);
                }
                else if (objeto.TIPO_FRECUENCIA == 2)
                {
                    /*Semanal*/
                    objeto.ENERO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.FEBRERO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MARZO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.ABRIL_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MAYO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JUNIO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JULIO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.AGOSTO_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.SEPTIEMBRE_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.OCTUBRE_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.NOVIEMBRE_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.DICIEMBRE_P = (4 * objeto.CANTIDAD_FRECUENCIA);
                }
                else if (objeto.TIPO_FRECUENCIA == 3)
                {
                    /*Mensual*/
                    objeto.ENERO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.FEBRERO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MARZO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.ABRIL_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.MAYO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JUNIO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.JULIO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.AGOSTO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.SEPTIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.OCTUBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.NOVIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    objeto.DICIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                }
                else if (objeto.TIPO_FRECUENCIA == 4)
                {
                    /*Anual*/
                    if (!(bool)objeto.ENERO_E)
                    {
                        objeto.ENERO_E = false;
                    }
                    else
                    {
                        objeto.ENERO_E = true;
                        objeto.ENERO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.FEBRERO_E)
                    {
                        objeto.FEBRERO_E = false;

                    }
                    else
                    {
                        objeto.FEBRERO_E = true;
                        objeto.FEBRERO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.MARZO_E)
                    {
                        objeto.MARZO_E = false;

                    }
                    else
                    {
                        objeto.MARZO_E = true;
                        objeto.MARZO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.ABRIL_E)
                    {
                        objeto.ABRIL_E = false;

                    }
                    else
                    {
                        objeto.ABRIL_E = true;
                        objeto.ABRIL_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.MAYO_E)
                    {
                        objeto.MAYO_E = false;

                    }
                    else
                    {
                        objeto.MAYO_E = true;
                        objeto.MAYO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.JUNIO_E)
                    {
                        objeto.JUNIO_E = false;

                    }
                    else
                    {
                        objeto.JUNIO_E = true;
                        objeto.JUNIO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.JULIO_E)
                    {
                        objeto.JULIO_E = false;

                    }
                    else
                    {
                        objeto.JULIO_E = true;
                        objeto.JULIO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.AGOSTO_E)
                    {
                        objeto.AGOSTO_E = false;

                    }
                    else
                    {
                        objeto.AGOSTO_E = true;
                        objeto.AGOSTO_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.SEPTIEMBRE_E)
                    {
                        objeto.SEPTIEMBRE_E = false;

                    }
                    else
                    {
                        objeto.SEPTIEMBRE_E = true;
                        objeto.SEPTIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.OCTUBRE_E)
                    {
                        objeto.OCTUBRE_E = false;
                    }
                    else
                    {
                        objeto.OCTUBRE_E = true;
                        objeto.OCTUBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.NOVIEMBRE_E)
                    {
                        objeto.NOVIEMBRE_E = false;
                    }
                    else
                    {
                        objeto.NOVIEMBRE_E = true;
                        objeto.NOVIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                    if (!(bool)objeto.DICIEMBRE_E)
                    {
                        objeto.DICIEMBRE_E = false;
                    }
                    else
                    {
                        objeto.DICIEMBRE_E = true;
                        objeto.DICIEMBRE_P = (1 * objeto.CANTIDAD_FRECUENCIA);
                    }
                }

                objeto.ENERO_R = (objeto.ENERO_P < nuevo.ENERO_R) ? objeto.ENERO_P : objeto.ENERO_R;
                objeto.FEBRERO_R = (objeto.FEBRERO_P < nuevo.FEBRERO_R) ? objeto.FEBRERO_P : nuevo.FEBRERO_R;
                objeto.MARZO_R = (objeto.MARZO_P < nuevo.MARZO_R) ? objeto.MARZO_P : nuevo.MARZO_R;
                objeto.ABRIL_R = (objeto.ABRIL_P < nuevo.ABRIL_R) ? objeto.ABRIL_P : nuevo.ABRIL_R;
                objeto.MAYO_R = (objeto.MAYO_P < nuevo.MAYO_R) ? objeto.MAYO_P : nuevo.MAYO_R;
                objeto.JUNIO_R = (objeto.JUNIO_P < nuevo.JUNIO_R) ? objeto.JUNIO_P : nuevo.JUNIO_R;
                objeto.JULIO_R = (objeto.JULIO_P < nuevo.JULIO_R) ? objeto.JULIO_P : nuevo.JULIO_R;
                objeto.AGOSTO_R = (objeto.AGOSTO_P < nuevo.AGOSTO_R) ? objeto.AGOSTO_P : nuevo.AGOSTO_R;
                objeto.SEPTIEMBRE_R = (objeto.SEPTIEMBRE_P < nuevo.SEPTIEMBRE_R) ? objeto.SEPTIEMBRE_P : nuevo.SEPTIEMBRE_R;
                objeto.OCTUBRE_R = (objeto.OCTUBRE_P < nuevo.OCTUBRE_R) ? objeto.OCTUBRE_P : nuevo.OCTUBRE_R;
                objeto.NOVIEMBRE_R = (objeto.NOVIEMBRE_P < nuevo.NOVIEMBRE_R) ? objeto.NOVIEMBRE_P : nuevo.NOVIEMBRE_R;
                objeto.DICIEMBRE_R = (objeto.DICIEMBRE_P < nuevo.DICIEMBRE_R) ? objeto.DICIEMBRE_P : nuevo.DICIEMBRE_R;
                
                objeto.MES_INICIO = nuevo.MES_INICIO;
                bd.SubmitChanges();
                var returnObject = bd.sp_get_actividades_by_programa(objeto.ID_PROGRAMA_ANUAL, 0, 10).Where(w => w.ID_ACTIVIDAD == objeto.ID_ACTIVIDAD).Single < sp_get_actividades_by_programaResult>();

                objJSON.items = returnObject;
                objJSON.totalCount = bd.TBL_ACTIVIDAD.Count();
                objJSON.success = true;
            //} catch (Exception ex) {objJSON.success = false;}
            return objJSON;

        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
        public void Delete(string id)
        {
            var objeto = (from variable in bd.TBL_ACTIVIDAD
                          where variable.ID_ACTIVIDAD == int.Parse(id)
                          select variable).First();

            bd.TBL_ACTIVIDAD.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("NOMBRE_ACTIVIDAD"))
                {
                    return "NOMBRE_ACTIVIDAD";
                }

            }
            return "ID_ACTIVIDAD";
        }
    }
}