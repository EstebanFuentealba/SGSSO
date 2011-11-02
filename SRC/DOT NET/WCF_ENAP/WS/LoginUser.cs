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
using System.Security.Cryptography;

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
        public static string GetMD5(string str)
        {
            MD5 md5 = MD5CryptoServiceProvider.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
        [WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<EnapUser> LogIn(string USERNAME, string PASSWORD)
        {
            JSONCollection<EnapUser> objJSON = new JSONCollection<EnapUser>();
            try{
                EnapUser user;
                TBL_USUARIO userLogin = null;
                try{
                    userLogin = (from variable in bd.TBL_USUARIO
                                  where variable.ID_USUARIO == USERNAME && variable.PASSWORD == LoginUser.GetMD5(PASSWORD)
                                  select variable).Single<TBL_USUARIO>();
                }catch(Exception ex){}
                if (userLogin != null)
                {
                    user = new EnapUser();
                    user.Username = USERNAME;
                    user.IsLogued = true;
                    userLogin.IS_LOGUED = true;
                    user.Name = userLogin.NOMBRES + " " + userLogin.APELLIDO_PATERNO + " " + userLogin.APELLIDO_MATERNO;
                    bd.SubmitChanges(); 
                    objJSON.items = user;
                    objJSON.success = true;
                    Session["enap-log"] = user;
                }else{
                    SearchResult rs = LDAP.IsInActiveDirectory(USERNAME, PASSWORD);
                    if (rs != null)
                    {
                        user = new EnapUser();
                        List<string> groups = LDAP.GetGroupsMember(USERNAME, PASSWORD);
                        user.Memberof = groups;
                        user.Username = USERNAME;
                        /*
                        List<sp_get_privilegios_by_usuarioResult> privilegios = bd.sp_get_privilegios_by_usuario(user.Username).ToList<sp_get_privilegios_by_usuarioResult>();
                        foreach (sp_get_privilegios_by_usuarioResult privilegio in privilegios)
                        {
                        
                        }*/
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
                        user_update.IS_LOGUED = true;
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
                
                
            } catch (Exception e) { objJSON.success = false; }
            return objJSON;
        }
        [WebGet(UriTemplate = "")]
        public JSONCollection<string> LogOut()
        {
            try
            {
                EnapUser user = (EnapUser)Session["enap-log"];
                TBL_USUARIO objeto = (from variable in bd.TBL_USUARIO
                                      where variable.ID_USUARIO == user.Username
                                      select variable).Single<TBL_USUARIO>();
                objeto.IS_LOGUED = false;
                bd.SubmitChanges();
            }
            catch (Exception ex) { }
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