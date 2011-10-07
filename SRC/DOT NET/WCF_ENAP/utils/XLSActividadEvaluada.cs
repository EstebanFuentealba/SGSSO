using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WCF_ENAP.utils
{
    public class XLSMedidaControl
    {
        private string nombre_medida_control;

        public string Nombre_medida_control
        {
            get { return nombre_medida_control; }
            set { nombre_medida_control = value; }
        }
    }
    public class XLSPeligro {
        public XLSPeligro()
        {
            this.medidasControl = new List<XLSMedidaControl>();
        }
        private string nombre_peligro;

        public string Nombre_peligro
        {
            get { return nombre_peligro; }
            set { nombre_peligro = value; }
        }
        private string consecuencia;

        public string Consecuencia
        {
            get { return consecuencia; }
            set { consecuencia = value; }
        }
        private string valoracion_consecuencia;

        public string Valoracion_consecuencia
        {
            get { return valoracion_consecuencia; }
            set { valoracion_consecuencia = value; }
        }
        private string valoracion_probabilidad;

        public string Valoracion_probabilidad
        {
            get { return valoracion_probabilidad; }
            set { valoracion_probabilidad = value; }
        }
        private int valoracion_consecuencia_value;

        public int Valoracion_consecuencia_value
        {
            get { return valoracion_consecuencia_value; }
            set { valoracion_consecuencia_value = value; }
        }
        private int valoracion_probabilidad_value;

        public int Valoracion_probabilidad_value
        {
            get { return valoracion_probabilidad_value; }
            set { valoracion_probabilidad_value = value; }
        }
        private string magnitud_riesgo_puro;

        public string Magnitud_riesgo_puro
        {
            get { return magnitud_riesgo_puro; }
            set { magnitud_riesgo_puro = value; }
        }
        List<XLSMedidaControl> medidasControl;

        public List<XLSMedidaControl> MedidasControl
        {
            get { return medidasControl; }
            set { medidasControl = value; }
        }
        private string medida_valoracion_consecuencia;

        public string Medida_valoracion_consecuencia
        {
            get { return medida_valoracion_consecuencia; }
            set { medida_valoracion_consecuencia = value; }
        }
        private string medida_valoracion_probabilidad;

        public string Medida_valoracion_probabilidad
        {
            get { return medida_valoracion_probabilidad; }
            set { medida_valoracion_probabilidad = value; }
        }
        private int medida_valoracion_consecuencia_value;

        public int Medida_valoracion_consecuencia_value
        {
            get { return medida_valoracion_consecuencia_value; }
            set { medida_valoracion_consecuencia_value = value; }
        }
        private int medida_valoracion_probabilidad_value;

        public int Medida_valoracion_probabilidad_value
        {
            get { return medida_valoracion_probabilidad_value; }
            set { medida_valoracion_probabilidad_value = value; }
        }
        private string magnitud_riesgo_con_control;

        public string Magnitud_riesgo_con_control
        {
            get { return magnitud_riesgo_con_control; }
            set { magnitud_riesgo_con_control = value; }
        }
    }
    public class XLSActividadEvaluada
    {
        public XLSActividadEvaluada() {
            this.peligros = new List<XLSPeligro>();
        }
        private string actividad_general;

        public string Actividad_general
        {
            get { return actividad_general; }
            set { actividad_general = value; }
        }
        private string actividad_especifica;

        public string Actividad_especifica
        {
            get { return actividad_especifica; }
            set { actividad_especifica = value; }
        }
        private string rol;

        public string Rol
        {
            get { return rol; }
            set { rol = value; }
        }
        private string condicion;

        public string Condicion
        {
            get { return condicion; }
            set { condicion = value; }
        }
        List<XLSPeligro> peligros;

        public List<XLSPeligro> Peligros
        {
            get { return peligros; }
            set { peligros = value; }
        }
    }
}