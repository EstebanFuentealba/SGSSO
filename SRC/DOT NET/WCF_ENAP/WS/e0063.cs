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
    public class e0063
    {
/* 
Tipos de Causa: 
2	Acción
3	Condición
4	Cap. Fisica Inadecuada
5	Cap. Psicologica Inadecuada
6	Tensión Física o Fisiológica
7	Tensión Mental o Psicológica
8	Falta Conocimiento
9	Falta Habilidad
10	Motivación Deficiente
11	Liderazgo Deficiente
12	Ingeniería Inadecuada
13	Deficiencia de Adquisiciones
15	Mantención Deficiente
-	Estándares de Trabajo inadecuados
16	Herramientas y Equipos Inadecuados
17	Uso y Desgaste
18	Abuso o Maltrato
19	Autocuidado
20	Errores
*/
        public static int CAUSA_ACCION = 2;
        public static int CAUSA_CONDICION = 3;

        public static int CAUSA_CAP_FISICA_INADECUADA = 4;
        public static int CAUSA_CAP_PSICOLOGICA_INADECUADA = 5;

        public static int CAUSA_TENSION_FISICA = 6; 
        public static int CAUSA_TENSION_MENTAL = 7;

        public static int CAUSA_FALTA_CONOCIMIENTO = 8;
        public static int CAUSA_FALTA_HABILIDAD = 9;

        public static int CAUSA_MOTIVACION_INADECUADA = 10;
        public static int CAUSA_AUTO_CUIDADO = 19;
        public static int CAUSA_ERRORES = 20;

        public static int CAUSA_FALTA_LIDERAZGO = 11;
        public static int CAUSA_ING_INADECUADA = 12;

        public static int CAUSA_COMPRAS_INADECUADAS = 13;
        public static int CAUSA_MANTENIMIENTO_INADECUADO = 15;
        
        public static int CAUSA_HERR_EQUI_INADECUADO = 16;
        public static int CAUSA_USO_DESGASTE = 17;
        public static int CAUSA_FACTORES_ABUSO = 18;
        

        private DataClassesEnapDataContext bd;

        public e0063()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_EVENTO_EMPRESA>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<TBL_EVENTO_EMPRESA>> objJSON = new JSONCollection<List<TBL_EVENTO_EMPRESA>>();
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
                var query = bd.TBL_EVENTO_EMPRESA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_EVENTO_EMPRESA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count<TBL_EVENTO_EMPRESA>();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }   


        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_EVENTO_EMPRESA> Get(string id)
        {
            JSONCollection<TBL_EVENTO_EMPRESA> objJSON = new JSONCollection<TBL_EVENTO_EMPRESA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_EVENTO_EMPRESA where variable.ID_EVENTO_EMPRESA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_EVENTO_EMPRESA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

        string orderBy(string _sort)
        {
            if (_sort != null)
            {
                if (_sort.Equals("ID_INFORME_PRELIMINAR"))
                {
                    return "E00_ID_INFORME";
                }
                if (_sort.Equals("ID_EVENTO_EMPRESA"))
                {
                    return "ID_EVENTO_EMPRESA";
                }
                if (_sort.Equals("FECHA_INGRESO"))
                {
                    return "FECHA_INGRESO";
                }
                if (_sort.Equals("CLASIFICACION"))
                {
                    return "CLASIFICACION";
                }

            }
            return "ID_INFORME_PRELIMINAR";
        }
    }
}