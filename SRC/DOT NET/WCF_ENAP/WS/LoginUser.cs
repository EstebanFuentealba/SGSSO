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

/**
  *NameSpace.
  */
namespace WCF_ENAP
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class LoginUser : System.Web.UI.Page
    {
        private DataClassesEnapDataContext bd;

        public LoginUser()
        {
            bd = new DataClassesEnapDataContext();
        }

        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<EnapUser> LogIn(string USERNAME, string PASSWORD)
        {
            JSONCollection<EnapUser> objJSON = new JSONCollection<EnapUser>();
            try
            {
                EnapUser user;
                SearchResult rs = LDAP.IsInActiveDirectory(USERNAME, PASSWORD);
                if (rs != null)
                {
                    user = new EnapUser();
                    List<string> groups = LDAP.GetGroupsMember(USERNAME, PASSWORD);
                    user.Memberof = groups;
                    user.Username = USERNAME;
                    user.IsLogued = true;
                    try
                    {
                        user.Name = rs.Properties["name"][0].ToString();
                    }
                    catch (Exception ex) { }
                    TBL_USUARIO user_update = null;
                    var objeto = (from variable in bd.TBL_USUARIO
                                  where variable.ID_USUARIO == USERNAME
                                  select variable).ToList<TBL_USUARIO>();
                    
                    if (objeto.Count == 0)
                    {
                        user_update = new TBL_USUARIO()
                        {
                            ID_USUARIO = user.Username,
                            NOMBRES = user.Name
                        };

                        bd.TBL_USUARIO.InsertOnSubmit(user_update);
                        bd.SubmitChanges();
                    }
                    else
                    {
                        user_update = objeto[0];
                    }
                    foreach (string nombre_grupo in user.Memberof)
                    {
                        try
                        {
                            TBL_GRUPO nuevo_grupo = null;
                            var lista = (from variable in bd.TBL_GRUPO
                                         where variable.NOMBRE_GRUPO.Equals(nombre_grupo)
                                         select variable).ToList<TBL_GRUPO>();
                            if (lista.Count == 0)
                            {
                                nuevo_grupo = new TBL_GRUPO()
                                {
                                    NOMBRE_GRUPO = nombre_grupo
                                };
                                bd.TBL_GRUPO.InsertOnSubmit(nuevo_grupo);
                                bd.SubmitChanges();
                            }
                            else
                            {
                                nuevo_grupo = lista[0];
                            }
                            TBL_USUARIO_GRUPO usuario_grupo = new TBL_USUARIO_GRUPO()
                            {
                                ID_USUARIO = user_update.ID_USUARIO,
                                ID_GRUPO = nuevo_grupo.ID_GRUPO
                            };
                            bd.TBL_USUARIO_GRUPO.InsertOnSubmit(usuario_grupo);
                            bd.SubmitChanges();
                        }
                        catch (Exception ex) { }
                    }
                    objJSON.items = user;
                    objJSON.success = true;

                    Session["enap-log"] = user;
                }
                else
                {
                    objJSON.success = false;
                }
                
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
        }
        [WebGet(UriTemplate = "")]
        public JSONCollection<string> LogOut()
        {
            Session["enap-log"] = null; 
            JSONCollection<string> objJSON = new JSONCollection<string>();
            objJSON.items = "LogOff";
            objJSON.success = true;
            
            return objJSON;
        }

        [WebGet(UriTemplate = "{id}")]
        public SampleItem Get(string id)
        {
            // TODO: Return the instance of SampleItem with the given id
            throw new NotImplementedException();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT")]
        public SampleItem Update(string id, SampleItem instance)
        {
            // TODO: Update the given instance of SampleItem in the collection
            throw new NotImplementedException();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE")]
        public void Delete(string id)
        {
            // TODO: Remove the instance of SampleItem with the given id from the collection
            throw new NotImplementedException();
        }
    }
}