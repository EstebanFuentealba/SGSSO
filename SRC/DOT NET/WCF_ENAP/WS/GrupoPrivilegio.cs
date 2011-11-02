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
    public class GrupoPrivilegio
    {
        private DataClassesEnapDataContext bd;

        public GrupoPrivilegio()
        {
            bd = new DataClassesEnapDataContext();
        }
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}&ID_NODO={ID_NODO}")]
        public JSONCollection<List<TBL_GRUPO_PRIVILEGIO>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir, int ID_NODO)
        {
            JSONCollection<List<TBL_GRUPO_PRIVILEGIO>> objJSON = new JSONCollection<List<TBL_GRUPO_PRIVILEGIO>>();
            try {
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
                
               
                var query = bd.TBL_GRUPO_PRIVILEGIO.Select(w => w).Skip(_start).Take(_limit);
                if (ID_NODO != 0)
                {
                    query = query.Where(w => w.ID_NODO == ID_NODO);
                }
                objJSON.items = query.Select(r => r).ToList<TBL_GRUPO_PRIVILEGIO>(); 
                objJSON.success = true;
                objJSON.totalCount = bd.TBL_GRUPO_PRIVILEGIO.Count();
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }
        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_GRUPO_PRIVILEGIO> Create(string ID_GRUPO_PRIVILEGIO, int ID_NODO, int ID_GRUPO, bool ALLOW_READ, bool ALLOW_WRITE, bool ALLOW_EDIT, bool ALLOW_DELETE, bool ALLOW_PRINT, bool ALLOW_CRUD)
        {
            JSONCollection<TBL_GRUPO_PRIVILEGIO> objJSON = new JSONCollection<TBL_GRUPO_PRIVILEGIO>();
            try
            {
                TBL_GRUPO_PRIVILEGIO nuevo = new TBL_GRUPO_PRIVILEGIO()
                {
                    ID_NODO = ID_NODO,
                    ID_GRUPO = ID_GRUPO,
                    ESTADO = true,
                    ALLOW_READ = ALLOW_READ,
                    ALLOW_WRITE = ALLOW_WRITE,
                    ALLOW_EDIT = ALLOW_EDIT,
                    ALLOW_DELETE = ALLOW_DELETE,
                    ALLOW_PRINT = ALLOW_PRINT,
                    ALLOW_CRUD = ALLOW_CRUD
                };
                
                bd.TBL_GRUPO_PRIVILEGIO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();

                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_GRUPO_PRIVILEGIO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }
        [WebInvoke(UriTemplate = "{ID_NODO}_{ID_GRUPO}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_GRUPO_PRIVILEGIO> Update(string ID_NODO, string ID_GRUPO, TBL_GRUPO_PRIVILEGIO nuevo)
        {

            JSONCollection<TBL_GRUPO_PRIVILEGIO> objJSON = new JSONCollection<TBL_GRUPO_PRIVILEGIO>();
            try
            {
                var objeto = (from variable in bd.TBL_GRUPO_PRIVILEGIO
                              where variable.ID_NODO == int.Parse(ID_NODO) && variable.ID_GRUPO == int.Parse(ID_GRUPO)
                              select variable).Single();
                    objeto.ALLOW_READ = bool.Parse(nuevo.ALLOW_READ.ToString());
                    objeto.ALLOW_WRITE = bool.Parse(nuevo.ALLOW_WRITE.ToString());
                    objeto.ALLOW_EDIT = bool.Parse(nuevo.ALLOW_EDIT.ToString());
                    objeto.ALLOW_DELETE = bool.Parse(nuevo.ALLOW_DELETE.ToString());
                    objeto.ALLOW_PRINT = bool.Parse(nuevo.ALLOW_PRINT.ToString());
                    objeto.ALLOW_CRUD = bool.Parse(nuevo.ALLOW_CRUD.ToString());

                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_GRUPO_PRIVILEGIO.Count();
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