using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.DirectoryServices;
using System.ServiceModel;
using System.ServiceModel.Activation;

namespace WCF_ENAP
{
    public class LDAP
    {

        public static AuthenticationTypes AT = AuthenticationTypes.Secure;
        
        public static string GetProperty(SearchResult srSearchResult, string strPropertyName) {
            string result = string.Empty;

            if (srSearchResult.Properties.Contains(strPropertyName))
            {
                result = srSearchResult.Properties[strPropertyName][0].ToString();
            }
            else
            {
                result = "Attribute not found";
            }

            return result;
        }

        public static SearchResult IsInActiveDirectory(string userName, string passWord)
        {
            DirectoryEntry directoryEntry = new DirectoryEntry(System.Configuration.ConfigurationManager.ConnectionStrings["ldapConnectionString"].ConnectionString,
                                                        userName,
                                                        passWord,
                                                        LDAP.AT);
            string result = string.Empty;
            SearchResult srResult = null;

            try
            {
                DirectorySearcher ds = new DirectorySearcher(directoryEntry);
                ds.Filter = "(&(objectClass=user)(objectCategory=person)(sAMAccountName=" + directoryEntry.Username + "))";

                srResult = ds.FindOne();

                if (srResult != null)
                {
                    return srResult;
                }
            }
            catch (Exception ex)
            {
                //Console.WriteLine(ex.Message);
                result = ex.Message;
            }
            return null;
        }
        
        public static bool IsGroupMember(string strLDAPPath, string strGroupName, string userName, string passWord)
        {
            DirectoryEntry directoryEntry = new DirectoryEntry(System.Configuration.ConfigurationManager.ConnectionStrings["ldapConnectionString"].ConnectionString,
                                                        userName,
                                                        passWord,
                                                        LDAP.AT);
            SearchResultCollection srcResults = null;
            SearchResult srResult = null;
            ResultPropertyValueCollection rpvcResult = null;

            try
            {
                DirectorySearcher ds = new DirectorySearcher(directoryEntry);

                ds.Filter = "(&(objectClass=user)(objectCategory=person)(sAMAccountName=" + directoryEntry.Username + "))";

                srResult = ds.FindOne();

                // Create a ResultPropertyValueCollection object to get the values for the
                // memberOf attribute for this user.
                string propertyName = "memberOf";
                rpvcResult = srResult.Properties[propertyName];
                List<string> groups = new List<string>();

                foreach (Object propertyValue in rpvcResult)
                {
                    if (!groups.Contains(propertyValue.ToString()))
                    {
                        groups.Add(propertyValue.ToString());
                    }
                    if (propertyValue.ToString() == strGroupName)
                    {
                        return true;
                    }
                }
            }

            catch (Exception t)
            {
                //Console.WriteLine(t.Message);
            }

            finally
            {
                // To prevent memory leaks, call SearchResultCollection.Dispose() manually
                if (srcResults != null)
                {
                    srcResults.Dispose();
                    srcResults = null;
                }
            }

            return false;
        }

        public static List<string> GetGroupsMember(string userName, string passWord)
        {
            DirectoryEntry directoryEntry = new DirectoryEntry(System.Configuration.ConfigurationManager.ConnectionStrings["ldapConnectionString"].ConnectionString,
                                                        userName,
                                                        passWord,
                                                        LDAP.AT);
            SearchResultCollection srcResults = null;
            SearchResult srResult = null;
            ResultPropertyValueCollection rpvcResult = null;
            List<string> groups = new List<string>();
            try
            {
                DirectorySearcher ds = new DirectorySearcher(directoryEntry);

                ds.Filter = "(&(objectClass=user)(objectCategory=person)(sAMAccountName=" + directoryEntry.Username + "))";

                srResult = ds.FindOne();

                // Create a ResultPropertyValueCollection object to get the values for the
                // memberOf attribute for this user.
                string propertyName = "memberOf";
                rpvcResult = srResult.Properties[propertyName];
                

                foreach (Object propertyValue in rpvcResult)
                {
                    if (!groups.Contains(propertyValue.ToString()))
                    {
                        groups.Add(propertyValue.ToString());
                    }
                }
            }

            catch (Exception t)
            {
                //Console.WriteLine(t.Message);
            }

            finally
            {
                // To prevent memory leaks, call SearchResultCollection.Dispose() manually
                if (srcResults != null)
                {
                    srcResults.Dispose();
                    srcResults = null;
                }
            }

            return groups;
        }
    }
}