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
    public class NodoJSON
    {
        public int[] STORE_LIST;
        public int TIPO_NODO;
        public int ID_NODO;
        public int N_ORDER;
        public int NODO_PADRE;
        public string ICONCLS;
        public string ID_COMPONENTE;
        public string text;
        public string iconCls;
        public string NOMBRE_MODULO;
        public bool expanded;
        public List<NodoJSON> children;
    }
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class Nodo
	{
		private DataClassesEnapDataContext bd;

        public Nodo()
		{
			bd = new DataClassesEnapDataContext();
		}
        [WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<NodoJSON>> GetCollection(int _page, int _start, int _limit, string _sort, string _dir)
        {
            JSONCollection<List<NodoJSON>> objJSON = new JSONCollection<List<NodoJSON>>();
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
            var results = (from p in bd.TBL_NODO
                           select new
                           {
                               ID_NODO = p.ID_NODO,
                               NODO_PADRE = p.NODO_PADRE == null ? 0 : p.NODO_PADRE,
                               NOMBRE_MODULO = p.NOMBRE_MODULO,
                               ID_COMPONENTE = p.ID_COMPONENTE,
                               TIPO_NODO = p.TIPO_NODO,
                               ICONCLS = p.ICONCLS,
                               N_ORDER = p.N_ORDER
                           }).OrderBy("NODO_PADRE, N_ORDER ASC");
            List<NodoJSON> ret = new List<NodoJSON>();
            foreach (var nodo in results)
            {
                List<int> stores = bd.TBL_MODULO_STORE.Where(w => w.ID_NODO == nodo.ID_NODO).Select(s => s.ID_STORE).ToList<int>();
                NodoJSON nodoJSON = new NodoJSON();
                nodoJSON.text = nodo.NOMBRE_MODULO;
                nodoJSON.iconCls = nodo.ICONCLS;
                nodoJSON.expanded = false;
                nodoJSON.children = new List<NodoJSON>();
                nodoJSON.ID_NODO = nodo.ID_NODO;
                nodoJSON.ICONCLS = nodo.ICONCLS;
                nodoJSON.TIPO_NODO = (int)((nodo.TIPO_NODO == null) ? 1 : nodo.TIPO_NODO);
                nodoJSON.NOMBRE_MODULO = nodo.NOMBRE_MODULO;
                nodoJSON.ID_COMPONENTE = nodo.ID_COMPONENTE;
                nodoJSON.N_ORDER = (int)((nodo.N_ORDER == null) ? 1 : nodo.N_ORDER);
                nodoJSON.STORE_LIST = stores.ToArray();
                if (nodo.NODO_PADRE != 0)
                {
                    int idPadre = int.Parse(nodo.NODO_PADRE.ToString());
                    nodoJSON.NODO_PADRE = idPadre;
                }
                ret.Add(nodoJSON);
            }

            objJSON.items = ret;
            objJSON.success = true;
            objJSON.totalCount = bd.TBL_NODO.Count();
            return objJSON;
        }
		[WebGet(UriTemplate = "nodes?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public NodoJSON GetCollections(int _page, int _start, int _limit, string _sort, string _dir)
        {


            var results = (from p in bd.TBL_NODO   
                           select new
                           {
                               ID_NODO = p.ID_NODO,
                               NODO_PADRE = p.NODO_PADRE == null ? 0 : p.NODO_PADRE,
                               NOMBRE_MODULO = p.NOMBRE_MODULO,
                               ID_COMPONENTE = p.ID_COMPONENTE,
                               TIPO_NODO = p.TIPO_NODO,
                               ICONCLS = p.ICONCLS,
                               N_ORDER = p.N_ORDER
                           }).OrderBy("NODO_PADRE, N_ORDER ASC");
                

                Hashtable nodos = new Hashtable();
                
                foreach (var nodo in results)
                {
                    List<int> stores = bd.TBL_MODULO_STORE.Where(w => w.ID_NODO == nodo.ID_NODO).Select(s => s.ID_STORE).ToList<int>();
                    NodoJSON nodoJSON = new NodoJSON();
                    nodoJSON.text = nodo.NOMBRE_MODULO;
                    nodoJSON.iconCls = nodo.ICONCLS;
                    nodoJSON.expanded = false;
                    nodoJSON.children = new List<NodoJSON>();
                    nodoJSON.ID_NODO = nodo.ID_NODO;
                    nodoJSON.ICONCLS = nodo.ICONCLS;
                    nodoJSON.TIPO_NODO = (int)((nodo.TIPO_NODO == null) ? 1 : nodo.TIPO_NODO);
                    nodoJSON.NOMBRE_MODULO = nodo.NOMBRE_MODULO;
                    nodoJSON.ID_COMPONENTE = nodo.ID_COMPONENTE;
                    nodoJSON.N_ORDER = (int)((nodo.N_ORDER == null) ? 1 : nodo.N_ORDER);
                    nodoJSON.STORE_LIST = stores.ToArray();
                    nodos.Add(nodo.ID_NODO, nodoJSON);
                    if (nodo.NODO_PADRE != 0)
                    {
                        int idPadre = int.Parse(nodo.NODO_PADRE.ToString());
                        NodoJSON padre = ((NodoJSON)nodos[idPadre]);
                        nodoJSON.NODO_PADRE = idPadre;
                        padre.children.Add(nodoJSON);
                    }
                }
                return ((NodoJSON)nodos[1]);
        }
        [WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_NODO> Get(string id)
        {
            JSONCollection<TBL_NODO> objJSON = new JSONCollection<TBL_NODO>();
            try
            {
                objJSON.items = (from variable in bd.TBL_NODO where variable.ID_NODO == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_NODO.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_NODO> Create(string NOMBRE_MODULO, string ID_COMPONENTE, string ICONCLS, int TIPO_NODO, int NODO_PADRE, int N_ORDER,int[] STORE_LIST)
		{
            JSONCollection<TBL_NODO> objJSON = new JSONCollection<TBL_NODO>();
            try
            {
                TBL_NODO nuevo = new TBL_NODO()
                {
                    NOMBRE_MODULO = NOMBRE_MODULO,
                    ID_COMPONENTE = ID_COMPONENTE,
                    ICONCLS = ICONCLS,
                    TIPO_NODO = TIPO_NODO,
                    ESTADO = true,
                    N_ORDER = N_ORDER
                };
                if (NODO_PADRE != 0)
                {
                    nuevo.NODO_PADRE = NODO_PADRE;
                }
                bd.TBL_NODO.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
                for (int i = 0; i < STORE_LIST.Length; i++ )
                {
                    TBL_MODULO_STORE modulo = new TBL_MODULO_STORE()
                    {
                        ID_NODO = nuevo.ID_NODO,
                        ID_STORE = STORE_LIST[i]
                    };
                    bd.TBL_MODULO_STORE.InsertOnSubmit(modulo);
                }
                bd.SubmitChanges();
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_NODO.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}


		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_NODO> Update(string id, NodoJSON nuevo)
		{
            JSONCollection<TBL_NODO> objJSON = new JSONCollection<TBL_NODO>();
            try
            {
                var objeto = (from variable in bd.TBL_NODO
                              where variable.ID_NODO == int.Parse(id)
                              select variable).Single();
                objeto.NOMBRE_MODULO = nuevo.NOMBRE_MODULO;
                objeto.ID_COMPONENTE = nuevo.ID_COMPONENTE;
                objeto.ICONCLS = nuevo.ICONCLS;
                objeto.TIPO_NODO = nuevo.TIPO_NODO;
                objeto.N_ORDER = nuevo.N_ORDER;
                bd.SubmitChanges();

                var delete = (from variable in bd.TBL_MODULO_STORE
                              where variable.ID_NODO == int.Parse(id)
                              select variable).Select(s => s);
                bd.TBL_MODULO_STORE.DeleteAllOnSubmit(delete);

                for (int i = 0; i < nuevo.STORE_LIST.Length; i++)
                {
                    TBL_MODULO_STORE modulo = new TBL_MODULO_STORE()
                    {
                        ID_NODO = nuevo.ID_NODO,
                        ID_STORE = nuevo.STORE_LIST[i]
                    };
                    bd.TBL_MODULO_STORE.InsertOnSubmit(modulo);
                }

                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_NODO.Count();
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
            var objeto = (from variable in bd.TBL_NODO
							where variable.ID_NODO == int.Parse(id)
							select variable).First();

            bd.TBL_NODO.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		
	}
}