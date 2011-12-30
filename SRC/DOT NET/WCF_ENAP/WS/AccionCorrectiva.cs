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

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    public class AccionCorrectivaJSON
    {
        public int ID_ACCION_CORRECTIVA;
        public int ID_EVENTO_EMPRESA;
        public int ID_ACCION;
        public string NOMBRE_ACCION;
        public string FECHA_COMIENZO;
        public string FECHA_PLAZO;
        public string FECHA_EJECUCION;
        public string DESCRIPCION;
        public string FECHA_CREACION;
        public int[] RESPONSABLE;

    }
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class AccionCorrectiva
    {
        private DataClassesEnapDataContext bd;

        public AccionCorrectiva()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_EVENTO_EMPRESA={ID_EVENTO_EMPRESA}")]
        public JSONCollection<List<AccionCorrectivaJSON>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int ID_EVENTO_EMPRESA)
        {
            JSONCollection<List<AccionCorrectivaJSON>> objJSON = new JSONCollection<List<AccionCorrectivaJSON>>();
            //try{
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
                var accionesCorrectivas = (from ac in bd.TBL_ACCION_CORRECTIVA
                                        join acc in bd.TBL_ACCION on ac.ID_ACCION equals acc.ID_ACCION
                                        join ra in bd.TBL_RESPONSABLE_ACCION on ac.ID_ACCION_CORRECTIVA equals ra.ID_ACCION_CORRECTIVA
                                        join ca in bd.TBL_CARGO on ra.ID_CARGO equals ca.ID_CARGO
                                           where ac.ID_EVENTO_EMPRESA == ID_EVENTO_EMPRESA
                                        orderby ac.ID_ACCION_CORRECTIVA ascending
                                        select new
                                        {
                                            ac.ID_ACCION_CORRECTIVA,
                                            ac.ID_ACCION,
                                            ac.ID_EVENTO_EMPRESA,
                                            ac.FECHA_CREACION,
                                            ac.FECHA_COMIENZO,
                                            ac.FECHA_PLAZO,
                                            ac.FECHA_EJECUCION,
                                            ac.DESCRIPCION,
                                            acc.NOMBRE_ACCION,
                                            ca.ID_CARGO,
                                            ca.NOMBRE_CARGO
                                        }).Skip(_start).Take(_limit);
                int lastId = 0;
                List<AccionCorrectivaJSON> acciones = new List<AccionCorrectivaJSON>();
                AccionCorrectivaJSON accion = new AccionCorrectivaJSON();
                List<int> cargosId = new List<int>();
                int index = 0;
                foreach (var accionCorrectiva in accionesCorrectivas)
                {
                    
                    if (lastId != 0 && lastId != accionCorrectiva.ID_ACCION_CORRECTIVA)
                    {

                        acciones.Add(accion);
                        accion.RESPONSABLE = cargosId.ToArray();
                        cargosId = new List<int>();
                        index++;
                    }
                    cargosId.Add(accionCorrectiva.ID_CARGO);
                    accion = new AccionCorrectivaJSON()
                    {
                        ID_ACCION_CORRECTIVA = accionCorrectiva.ID_ACCION_CORRECTIVA,
                        ID_ACCION = (int)accionCorrectiva.ID_ACCION,
                        ID_EVENTO_EMPRESA = (int)accionCorrectiva.ID_EVENTO_EMPRESA,
                        DESCRIPCION = accionCorrectiva.DESCRIPCION,
                        FECHA_CREACION = String.Format("{0:dd-MM-yyyy}", accionCorrectiva.FECHA_CREACION),
                        FECHA_COMIENZO = String.Format("{0:dd-MM-yyyy}", accionCorrectiva.FECHA_COMIENZO),
                        FECHA_PLAZO = String.Format("{0:dd-MM-yyyy}", accionCorrectiva.FECHA_PLAZO),
                        NOMBRE_ACCION = accionCorrectiva.NOMBRE_ACCION
                    };
                    if (accionCorrectiva.FECHA_EJECUCION != null)
                    {
                        accion.FECHA_EJECUCION = String.Format("{0:dd-MM-yyyy}", accionCorrectiva.FECHA_EJECUCION);
                    }
                    lastId = accionCorrectiva.ID_ACCION_CORRECTIVA;
                    
                }
                if (!acciones.Contains(accion))
                {
                    accion.RESPONSABLE = cargosId.ToArray();
                    acciones.Add(accion);
                }
                List<AccionCorrectivaJSON> results = acciones;
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count<TBL_ACCION_CORRECTIVA>();
                objJSON.success = true;
            /*}
            catch (Exception ex)
            {
                objJSON.success = false;
            }*/
            return objJSON;
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<AccionCorrectivaJSON> Create(
            int ID_EVENTO_EMPRESA,
            int ID_ACCION,
            string NOMBRE_ACCION,
            string FECHA_COMIENZO,
            string FECHA_PLAZO,
            string DESCRIPCION,
            int[] RESPONSABLE
        )  {
            JSONCollection<AccionCorrectivaJSON> objJSON = new JSONCollection<AccionCorrectivaJSON>();
            //try{
                TBL_ACCION_CORRECTIVA nuevo = new TBL_ACCION_CORRECTIVA()
                {
                    ID_ACCION = (int)ID_ACCION,
                    ID_EVENTO_EMPRESA = (int)ID_EVENTO_EMPRESA,
                    DESCRIPCION = DESCRIPCION,
                    FECHA_COMIENZO = DateTime.Parse(FECHA_COMIENZO),
                    FECHA_PLAZO = DateTime.Parse(FECHA_PLAZO),
                    FECHA_CREACION = DateTime.Now
                };
                bd.TBL_ACCION_CORRECTIVA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                foreach (int idCargoResponsable in RESPONSABLE)
                {
                    TBL_RESPONSABLE_ACCION responsable = new TBL_RESPONSABLE_ACCION()
                    {
                        ID_ACCION_CORRECTIVA = nuevo.ID_ACCION_CORRECTIVA,
                        ID_CARGO = idCargoResponsable,
                        ESTADO = 1
                    };
                    bd.TBL_RESPONSABLE_ACCION.InsertOnSubmit(responsable);
                    bd.SubmitChanges();
                }
                AccionCorrectivaJSON retorna = new AccionCorrectivaJSON()
                {
                    ID_ACCION_CORRECTIVA = nuevo.ID_ACCION_CORRECTIVA,
                    ID_ACCION = (int)nuevo.ID_ACCION,
                    NOMBRE_ACCION = NOMBRE_ACCION,
                    ID_EVENTO_EMPRESA = (int)nuevo.ID_EVENTO_EMPRESA,
                    FECHA_COMIENZO = FECHA_COMIENZO,
                    FECHA_PLAZO = FECHA_PLAZO,
                    RESPONSABLE = RESPONSABLE
                };
                objJSON.items = retorna;
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count();
                objJSON.success = true; 
            /*}
            catch (Exception e)
            {
                objJSON.success = false;
            }*/
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACCION_CORRECTIVA> Get(string id)
        {
            JSONCollection<TBL_ACCION_CORRECTIVA> objJSON = new JSONCollection<TBL_ACCION_CORRECTIVA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACCION_CORRECTIVA where variable.ID_ACCION_CORRECTIVA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{ID_ACCION_CORRECTIVA}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<AccionCorrectivaJSON> Update(string ID_ACCION_CORRECTIVA, AccionCorrectivaJSON nuevo)
        {
            JSONCollection<AccionCorrectivaJSON> objJSON = new JSONCollection<AccionCorrectivaJSON>();
            TBL_ACCION_CORRECTIVA existeActividadCorrectiva = (from ac in bd.TBL_ACCION_CORRECTIVA
                                                      where ac.ID_ACCION_CORRECTIVA == int.Parse(ID_ACCION_CORRECTIVA)
                                                      select ac).Single<TBL_ACCION_CORRECTIVA>();
            existeActividadCorrectiva.ID_ACCION = nuevo.ID_ACCION;
            existeActividadCorrectiva.DESCRIPCION = nuevo.DESCRIPCION;
            existeActividadCorrectiva.FECHA_COMIENZO = DateTime.Parse(nuevo.FECHA_COMIENZO);
            existeActividadCorrectiva.FECHA_PLAZO = DateTime.Parse(nuevo.FECHA_PLAZO);
            if (nuevo.FECHA_EJECUCION != null)
            {
                existeActividadCorrectiva.FECHA_EJECUCION = DateTime.Parse(nuevo.FECHA_EJECUCION);
            }
            bd.SubmitChanges();
            var responsablesAccion = (from variable in bd.TBL_RESPONSABLE_ACCION
                                      where variable.ID_ACCION_CORRECTIVA == existeActividadCorrectiva.ID_ACCION_CORRECTIVA
                                         select variable).ToList();
            bd.TBL_RESPONSABLE_ACCION.DeleteAllOnSubmit(responsablesAccion);
            bd.SubmitChanges();
            foreach (int idResponsable in nuevo.RESPONSABLE)
            {
                TBL_RESPONSABLE_ACCION nuevoResponsable = new TBL_RESPONSABLE_ACCION()
                {
                    ID_CARGO = idResponsable,
                    ID_ACCION_CORRECTIVA = existeActividadCorrectiva.ID_ACCION_CORRECTIVA,
                    ESTADO = 1
                };
                bd.TBL_RESPONSABLE_ACCION.InsertOnSubmit(nuevoResponsable);
                bd.SubmitChanges();
            }
            objJSON.items = nuevo;
            objJSON.success = true;
            objJSON.totalCount = 1;
            return objJSON;
        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]
        public void Delete(string id)
        {
            var objeto = (from variable in bd.TBL_ACCION_CORRECTIVA
                          where variable.ID_ACCION_CORRECTIVA == int.Parse(id)
                          select variable).First();

            bd.TBL_ACCION_CORRECTIVA.DeleteOnSubmit(objeto);
            bd.SubmitChanges();
        }
        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("ID_USUARIO"))
                {
                    return "ID_USUARIO";
                }
                if (_sort.Equals("ID_INFORME"))
                {
                    return "ID_INFORME";
                }
                if (_sort.Equals("ID_ACCION"))
                {
                    return "ID_ACCION";
                }
                if (_sort.Equals("FECHA_PLAZO"))
                {
                    return "FECHA_PLAZO";
                }
                if (_sort.Equals("FECHA_REALIZACION"))
                {
                    return "FECHA_REALIZACION";
                }
                if (_sort.Equals("PORCENTAJE_CUMPLIMIENTO"))
                {
                    return "PORCENTAJE_CUMPLIMIENTO";
                }
                if (_sort.Equals("DESCRIPCION"))
                {
                    return "DESCRIPCION";
                }
                if (_sort.Equals("FECHA_CREACION"))
                {
                    return "FECHA_CREACION";
                }

            }
            return "ID_ACCION_CORRECTIVA";
        }
    }
}