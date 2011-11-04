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
        public JSONCollection<List<TBL_ACTIVIDAD>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int ID_PROGRAMA_ANUAL)
        {
            JSONCollection<List<TBL_ACTIVIDAD>> objJSON = new JSONCollection<List<TBL_ACTIVIDAD>>();
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
                var query = bd.TBL_ACTIVIDAD.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir);
                if (ID_PROGRAMA_ANUAL != 0)
                {
                    query = query.Where(w => w.ID_PROGRAMA_ANUAL == ID_PROGRAMA_ANUAL);
                }
                query = query.Select(r => r);
                List<TBL_ACTIVIDAD> results = query.ToList();
                objJSON.items = results;
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
        public JSONCollection<TBL_ACTIVIDAD> Create(string NOMBRE_ACTIVIDAD,
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
            bool DICIEMBRE_E)
        {
            JSONCollection<TBL_ACTIVIDAD> objJSON = new JSONCollection<TBL_ACTIVIDAD>();
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
                    MES_INICIO = MES_INICIO
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
                bd.TBL_ACTIVIDAD.InsertOnSubmit(nuevo);
                bd.SubmitChanges();

                objJSON.items = nuevo;
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
        public JSONCollection<TBL_ACTIVIDAD> Update(string id, TBL_ACTIVIDAD nuevo)
        {

            JSONCollection<TBL_ACTIVIDAD> objJSON = new JSONCollection<TBL_ACTIVIDAD>();
            try
            {
                var objeto = (from variable in bd.TBL_ACTIVIDAD
                              where variable.ID_ACTIVIDAD == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_ACTIVIDAD = nuevo.NOMBRE_ACTIVIDAD;
                objeto.ID_EVIDENCIA = nuevo.ID_EVIDENCIA;
                objeto.TIPO_FRECUENCIA = nuevo.TIPO_FRECUENCIA;
                objeto.CANTIDAD_FRECUENCIA = nuevo.CANTIDAD_FRECUENCIA;
                objeto.ENERO_P = nuevo.ENERO_P;
                objeto.ENERO_R = nuevo.ENERO_R;
                objeto.FEBRERO_P = nuevo.FEBRERO_P;
                objeto.FEBRERO_R = nuevo.FEBRERO_R;
                objeto.MARZO_P = nuevo.MARZO_P;
                objeto.MARZO_R = nuevo.MARZO_R;
                objeto.ABRIL_P = nuevo.ABRIL_P;
                objeto.ABRIL_R = nuevo.ABRIL_R;
                objeto.MAYO_P = nuevo.MAYO_P;
                objeto.MAYO_R = nuevo.MAYO_R;
                objeto.JUNIO_P = nuevo.JUNIO_P;
                objeto.JUNIO_R = nuevo.JUNIO_R;
                objeto.JULIO_P = nuevo.JULIO_P;
                objeto.JULIO_R = nuevo.JULIO_R;
                objeto.AGOSTO_P = nuevo.AGOSTO_P;
                objeto.AGOSTO_R = nuevo.AGOSTO_R;
                objeto.SEPTIEMBRE_P = nuevo.SEPTIEMBRE_P;
                objeto.SEPTIEMBRE_R = nuevo.SEPTIEMBRE_R;
                objeto.OCTUBRE_P = nuevo.OCTUBRE_P;
                objeto.OCTUBRE_R = nuevo.OCTUBRE_R;
                objeto.NOVIEMBRE_P = nuevo.NOVIEMBRE_P;
                objeto.NOVIEMBRE_R = nuevo.NOVIEMBRE_R;
                objeto.DICIEMBRE_P = nuevo.DICIEMBRE_P;
                objeto.DICIEMBRE_R = nuevo.DICIEMBRE_R;
                objeto.MES_INICIO = nuevo.MES_INICIO;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACCION.Count();
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