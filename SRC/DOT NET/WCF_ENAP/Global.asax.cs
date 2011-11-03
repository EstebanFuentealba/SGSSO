using System;
using System.ServiceModel.Activation;
using System.Web;
using System.Web.Routing;

namespace WCF_ENAP
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            RegisterRoutes();
        }

        private void RegisterRoutes()
        {
            RouteTable.Routes.Add(new ServiceRoute("LoginUser", new WebServiceHostFactory(), typeof(LoginUser)));

            RouteTable.Routes.Add(new ServiceRoute("e0063", new WebServiceHostFactory(), typeof(e0063)));
			RouteTable.Routes.Add(new ServiceRoute("e0064", new WebServiceHostFactory(), typeof(e0064)));
			RouteTable.Routes.Add(new ServiceRoute("matrizHistorial", new WebServiceHostFactory(), typeof(matrizHistorial)));
			RouteTable.Routes.Add(new ServiceRoute("Accion", new WebServiceHostFactory(), typeof(Accion)));
			RouteTable.Routes.Add(new ServiceRoute("AccionCorrectiva", new WebServiceHostFactory(), typeof(AccionCorrectiva)));
			RouteTable.Routes.Add(new ServiceRoute("ActividadEspecifica", new WebServiceHostFactory(), typeof(ActividadEspecifica)));
			RouteTable.Routes.Add(new ServiceRoute("ActividadEvaluada", new WebServiceHostFactory(), typeof(ActividadEvaluada)));
            RouteTable.Routes.Add(new ServiceRoute("TempActividadEvaluada", new WebServiceHostFactory(), typeof(TempActividadEvaluada))); 
            RouteTable.Routes.Add(new ServiceRoute("ActividadGeneral", new WebServiceHostFactory(), typeof(ActividadGeneral)));
            RouteTable.Routes.Add(new ServiceRoute("ActividadProgramaAnualPrevencion", new WebServiceHostFactory(), typeof(ActividadProgramaAnualPrevencion)));
            RouteTable.Routes.Add(new ServiceRoute("GraphAvanceProgramaAnual", new WebServiceHostFactory(), typeof(GraphAvanceProgramaAnual)));
            RouteTable.Routes.Add(new ServiceRoute("Stores", new WebServiceHostFactory(), typeof(Stores)));
            RouteTable.Routes.Add(new ServiceRoute("GrupoPrivilegio", new WebServiceHostFactory(), typeof(GrupoPrivilegio)));
            RouteTable.Routes.Add(new ServiceRoute("ActividadTrabajador", new WebServiceHostFactory(), typeof(ActividadTrabajador)));
			RouteTable.Routes.Add(new ServiceRoute("Archivo", new WebServiceHostFactory(), typeof(Archivo)));
			RouteTable.Routes.Add(new ServiceRoute("Area", new WebServiceHostFactory(), typeof(Area)));
			RouteTable.Routes.Add(new ServiceRoute("Cargo", new WebServiceHostFactory(), typeof(Cargo)));
			RouteTable.Routes.Add(new ServiceRoute("Causa", new WebServiceHostFactory(), typeof(Causa)));
			RouteTable.Routes.Add(new ServiceRoute("Consecuencia", new WebServiceHostFactory(), typeof(Consecuencia)));
			RouteTable.Routes.Add(new ServiceRoute("DatoEvento", new WebServiceHostFactory(), typeof(DatoEvento)));
			RouteTable.Routes.Add(new ServiceRoute("Departamento", new WebServiceHostFactory(), typeof(Departamento)));
			RouteTable.Routes.Add(new ServiceRoute("Division", new WebServiceHostFactory(), typeof(Division)));
			RouteTable.Routes.Add(new ServiceRoute("Empresa", new WebServiceHostFactory(), typeof(Empresa)));
			RouteTable.Routes.Add(new ServiceRoute("Evento", new WebServiceHostFactory(), typeof(Evento)));
			RouteTable.Routes.Add(new ServiceRoute("EventoEmpresa", new WebServiceHostFactory(), typeof(EventoEmpresa)));
			RouteTable.Routes.Add(new ServiceRoute("EventoTrabajador", new WebServiceHostFactory(), typeof(EventoTrabajador)));
			RouteTable.Routes.Add(new ServiceRoute("Evidencia", new WebServiceHostFactory(), typeof(Evidencia)));
			RouteTable.Routes.Add(new ServiceRoute("Grupo", new WebServiceHostFactory(), typeof(Grupo)));
			RouteTable.Routes.Add(new ServiceRoute("HistorialEmpresa", new WebServiceHostFactory(), typeof(HistorialEmpresa)));
			RouteTable.Routes.Add(new ServiceRoute("Matriz", new WebServiceHostFactory(), typeof(Matriz)));
			RouteTable.Routes.Add(new ServiceRoute("MedidaDeControl", new WebServiceHostFactory(), typeof(MedidaDeControl)));
            RouteTable.Routes.Add(new ServiceRoute("Nodo", new WebServiceHostFactory(), typeof(Nodo)));
			RouteTable.Routes.Add(new ServiceRoute("Organizacion", new WebServiceHostFactory(), typeof(Organizacion)));
			RouteTable.Routes.Add(new ServiceRoute("ParteCorporal", new WebServiceHostFactory(), typeof(ParteCorporal)));
			RouteTable.Routes.Add(new ServiceRoute("Peligro", new WebServiceHostFactory(), typeof(Peligro)));
			RouteTable.Routes.Add(new ServiceRoute("ProgramaAnual", new WebServiceHostFactory(), typeof(ProgramaAnual)));
			RouteTable.Routes.Add(new ServiceRoute("PuntoGeografico", new WebServiceHostFactory(), typeof(PuntoGeografico)));
			RouteTable.Routes.Add(new ServiceRoute("RecursoComprometido", new WebServiceHostFactory(), typeof(RecursoComprometido)));

			RouteTable.Routes.Add(new ServiceRoute("Trabajador", new WebServiceHostFactory(), typeof(Trabajador)));
			RouteTable.Routes.Add(new ServiceRoute("Usuario", new WebServiceHostFactory(), typeof(Usuario)));
			
        }
    }
}