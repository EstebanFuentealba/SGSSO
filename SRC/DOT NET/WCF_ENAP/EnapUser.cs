using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.DirectoryServices;

namespace WCF_ENAP
{
    public class EnapMember
    {
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
    }
    public class EnapUser
    {
        private List<sp_get_privilegios_by_usuarioResult> privilegios;

        public List<sp_get_privilegios_by_usuarioResult> Privilegios
        {
            get { return privilegios; }
            set { privilegios = value; }
        }
        public EnapUser()
        {
            this.Memberof = new List<string>();
            this.privilegios = new List<sp_get_privilegios_by_usuarioResult>();
        }
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        private bool isLogued = false;

        public bool IsLogued
        {
            get { return isLogued; }
            set { isLogued = value; }
        }
        private string username;

        public string Username
        {
            get { return username; }
            set { username = value; }
        }
        private List<string> memberof;

        public List<string> Memberof
        {
            get { return memberof; }
            set { memberof = value; }
        }
    }
}