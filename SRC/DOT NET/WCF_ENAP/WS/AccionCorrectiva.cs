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
	public class AccionCorrectiva
	{
		private DataClassesEnapDataContext bd;

		public AccionCorrectiva()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<TBL_ACCION_CORRECTIVA>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<TBL_ACCION_CORRECTIVA>> objJSON = new JSONCollection<List<TBL_ACCION_CORRECTIVA>>();
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
                var query = bd.TBL_ACCION_CORRECTIVA.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<TBL_ACCION_CORRECTIVA> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count<TBL_ACCION_CORRECTIVA>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<TBL_ACCION_CORRECTIVA> Create(string ID_USUARIO, string ID_INFORME, string ID_ACCION, string FECHA_PLAZO, string FECHA_REALIZACION, string PORCENTAJE_CUMPLIMIENTO, string DESCRIPCION, string FECHA_CREACION)
		{
            JSONCollection<TBL_ACCION_CORRECTIVA> objJSON = new JSONCollection<TBL_ACCION_CORRECTIVA>();
            try
            {
                TBL_ACCION_CORRECTIVA nuevo = new TBL_ACCION_CORRECTIVA()
                {
                    ID_USUARIO = ID_USUARIO,
                    ID_INFORME_PRELIMINAR = int.Parse(ID_INFORME), 
					ID_ACCION = int.Parse(ID_ACCION), 
					FECHA_PLAZO = DateTime.Parse(FECHA_PLAZO), 
					FECHA_REALIZACION = DateTime.Parse(FECHA_REALIZACION), 
					PORCENTAJE_CUMPLIMIENTO = int.Parse(PORCENTAJE_CUMPLIMIENTO), 
					DESCRIPCION = DESCRIPCION, 
					FECHA_CREACION = DateTime.Parse(FECHA_CREACION)
                };
                bd.TBL_ACCION_CORRECTIVA.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<TBL_ACCION_CORRECTIVA> Get(string id)
		{
            JSONCollection<TBL_ACCION_CORRECTIVA> objJSON = new JSONCollection<TBL_ACCION_CORRECTIVA>();
            try
            {
                objJSON.items = (from variable in bd.TBL_ACCION_CORRECTIVA where variable.ID_ACCION_CORRECTIVA == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<TBL_ACCION_CORRECTIVA> Update(string id, TBL_ACCION_CORRECTIVA nuevo)
		{

            JSONCollection<TBL_ACCION_CORRECTIVA> objJSON = new JSONCollection<TBL_ACCION_CORRECTIVA>();
            try
            {
                var objeto = (from variable in bd.TBL_ACCION_CORRECTIVA
                              where variable.ID_ACCION_CORRECTIVA == int.Parse(id)
                              select variable).Single();
                objeto.ID_USUARIO = nuevo.ID_USUARIO;
                objeto.ID_INFORME_PRELIMINAR = nuevo.ID_INFORME_PRELIMINAR;
				objeto.ID_ACCION = nuevo.ID_ACCION;
				objeto.FECHA_PLAZO = nuevo.FECHA_PLAZO;
				objeto.FECHA_REALIZACION = nuevo.FECHA_REALIZACION;
				objeto.PORCENTAJE_CUMPLIMIENTO = nuevo.PORCENTAJE_CUMPLIMIENTO;
				objeto.DESCRIPCION = nuevo.DESCRIPCION;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.TBL_ACCION_CORRECTIVA.Count();
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
			var objeto = (from variable in bd.TBL_ACCION_CORRECTIVA
							where variable.ID_ACCION_CORRECTIVA == int.Parse(id)
							select variable).First();

			bd.TBL_ACCION_CORRECTIVA.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("ID_USUARIO")){
					return "ID_USUARIO";
				}
				if (_sort.Equals("ID_INFORME")){
					return "ID_INFORME";
				}
				if (_sort.Equals("ID_ACCION")){
					return "ID_ACCION";
				}
				if (_sort.Equals("FECHA_PLAZO")){
					return "FECHA_PLAZO";
				}
				if (_sort.Equals("FECHA_REALIZACION")){
					return "FECHA_REALIZACION";
				}
				if (_sort.Equals("PORCENTAJE_CUMPLIMIENTO")){
					return "PORCENTAJE_CUMPLIMIENTO";
				}
				if (_sort.Equals("DESCRIPCION")){
					return "DESCRIPCION";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}

			}
			return "ID_ACCION_CORRECTIVA";
		}
	}
}