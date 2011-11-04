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
using System.DirectoryServices;
using System.Collections;

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class TreeData : System.Web.UI.Page
	{
		private DataClassesEnapDataContext bd;

        public TreeData()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "")]
        public NodoJSON GetCollection()
        {
            EnapUser user;
            if (Session["enap-log"] != null)
            {
                //try{
                    user = (EnapUser)Session["enap-log"];
                    List<sp_get_privilegios_by_usuarioResult> results = bd.sp_get_privilegios_by_usuario(user.Username).ToList();
                    return this.CreateTree(results,true);
                //}catch (Exception ex) { }
            }
            else
            {
                List<sp_get_privilegios_by_usuarioResult> results = bd.sp_get_privilegios_by_usuario("").ToList();
                return this.CreateTree(results,false);
            }
            return null;
        }
        private NodoJSON CreateTree(List<sp_get_privilegios_by_usuarioResult> results,bool isLogued)
        {
            Hashtable nodos = new Hashtable();
            foreach (sp_get_privilegios_by_usuarioResult nodo in results)
            {

                List<sp_get_stores_by_nodoResult> stores = bd.sp_get_stores_by_nodo(nodo.ID_NODO).ToList();
                List<int> stores_ids = new List<int>();
                List<string> stores_str = new List<string>();
                foreach (sp_get_stores_by_nodoResult st in stores)
                {
                    stores_ids.Add(st.ID_STORE);
                    stores_str.Add(st.NOMBRE_STORE);
                }
                NodoJSON nodoJSON = new NodoJSON();
                nodoJSON.text = nodo.NOMBRE_MODULO;
                nodoJSON.iconCls = nodo.ICONCLS;
                nodoJSON.expanded = false;
                nodoJSON.children = new List<NodoJSON>();
                nodoJSON.ID_NODO = nodo.ID_NODO;
                nodoJSON.ICONCLS = nodo.ICONCLS;
                nodoJSON.TIPO_NODO = (int)((nodo.TIPO_NODO == null) ? 1 : nodo.TIPO_NODO);
                if (nodo.TIPO_NODO == 2)
                {
                    nodoJSON.leaf = true;
                }
                if (nodo.TIPO_DISPLAY == 2)
                {
                    nodoJSON.iswin = true;
                }
                if (nodo.TIPO_DISPLAY == null)
                {
                    nodo.TIPO_DISPLAY = 1;
                }
                nodoJSON.TIPO_DISPLAY = (int)nodo.TIPO_DISPLAY;
                nodoJSON.NOMBRE_MODULO = nodo.NOMBRE_MODULO;
                nodoJSON.ID_COMPONENTE = nodo.ID_COMPONENTE;
                nodoJSON.N_ORDER = (int)((nodo.N_ORDER == null) ? 1 : nodo.N_ORDER);
                nodoJSON.STORE_LIST = stores_ids.ToArray();
                nodoJSON.STORE_LIST_TEXT = stores_str.ToArray();
                if (!nodos.ContainsKey(nodo.ID_NODO))
                {
                    nodos.Add(nodo.ID_NODO, nodoJSON);
               

                    if (nodo.NODO_PADRE != 0 && nodo.NODO_PADRE != null)
                    {
                        int idPadre = int.Parse(nodo.NODO_PADRE.ToString());
                        NodoJSON padre = ((NodoJSON)nodos[idPadre]);
                        nodoJSON.NODO_PADRE = idPadre;

                        
                        if (nodo.GROUP_ID != null)
                        {
                            if (isLogued && nodo.SHOW_ON_LOGUED == true)
                            {
                                padre.children.Add(nodoJSON);
                            } 
                            else if (!isLogued && nodo.SHOW_ON_NOLOGUED == true)
                            {
                                padre.children.Add(nodoJSON);
                            }
                        }
                        else
                        {
                            padre.children.Add(nodoJSON);
                        }
                        //padre.children.Add(nodoJSON);
                        
                    
                    }
                }
            }
            return ((NodoJSON)nodos[1]);
        }

	}
}