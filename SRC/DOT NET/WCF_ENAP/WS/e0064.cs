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
	public class e0064
	{
		private DataClassesEnapDataContext bd;

		public e0064()
		{
			bd = new DataClassesEnapDataContext();
		}
		[WebGet(UriTemplate = "?page={_page}&start={_start}&limit={_limit}&sort={_sort}&dir={_dir}")]
        public JSONCollection<List<E006_4>> GetCollection(int _page,int _start, int _limit,string _sort, string _dir)
        {
            JSONCollection<List<E006_4>> objJSON = new JSONCollection<List<E006_4>>();
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
                var query = bd.E006_4.Skip(_start).Take(_limit).OrderBy(orderBy(_sort) + " " + _dir).Select(r => r);
                List<E006_4> results = query.ToList();
                objJSON.items = results;
                objJSON.totalCount = bd.E006_4.Count<E006_4>();
                objJSON.success = true;
            }
            catch (Exception ex) {
                objJSON.success = false;
            }
            return objJSON;
        }

		[WebInvoke(UriTemplate = "", Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public JSONCollection<E006_4> Create(string E00_ID_INFORME, string DESCRIPCION_INCIDENTE, string ANTECEDENTES, string RELATO_DE_HECHO, string COMENTARIO, string FECHA_CREACION)
		{
            JSONCollection<E006_4> objJSON = new JSONCollection<E006_4>();
            try
            {
                E006_4 nuevo = new E006_4()
                {
                    E00_ID_INFORME = int.Parse(E00_ID_INFORME), 
					DESCRIPCION_INCIDENTE = DESCRIPCION_INCIDENTE, 
					ANTECEDENTES = ANTECEDENTES, 
					RELATO_DE_HECHO = RELATO_DE_HECHO, 
					COMENTARIO = COMENTARIO, 
					FECHA_CREACION = DateTime.Parse(FECHA_CREACION)
                };
                bd.E006_4.InsertOnSubmit(nuevo);
                bd.SubmitChanges();
			
                objJSON.items = nuevo;
                objJSON.totalCount = bd.E006_4.Count();
                objJSON.success = true;
            }
            catch (Exception e)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebGet(UriTemplate = "{id}")]
        public JSONCollection<E006_4> Get(string id)
		{
            JSONCollection<E006_4> objJSON = new JSONCollection<E006_4>();
            try
            {
                objJSON.items = (from variable in bd.E006_4 where variable.ID_INFORME == int.Parse(id) select variable).Single();
                objJSON.totalCount = bd.E006_4.Count();
                objJSON.success = true;
            }
            catch (Exception ex)
            {
                objJSON.success = false;
            }
            return objJSON;
		}

		[WebInvoke(UriTemplate = "{id}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]
        public JSONCollection<E006_4> Update(string id, E006_4 nuevo)
		{

            JSONCollection<E006_4> objJSON = new JSONCollection<E006_4>();
            try
            {
                var objeto = (from variable in bd.E006_4
                              where variable.ID_INFORME == int.Parse(id)
                              select variable).Single();
                objeto.E00_ID_INFORME = nuevo.E00_ID_INFORME;
				objeto.DESCRIPCION_INCIDENTE = nuevo.DESCRIPCION_INCIDENTE;
				objeto.ANTECEDENTES = nuevo.ANTECEDENTES;
				objeto.RELATO_DE_HECHO = nuevo.RELATO_DE_HECHO;
				objeto.COMENTARIO = nuevo.COMENTARIO;
				objeto.FECHA_CREACION = nuevo.FECHA_CREACION;
                bd.SubmitChanges();
                objJSON.items = objeto;
                objJSON.totalCount = bd.E006_4.Count();
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
			var objeto = (from variable in bd.E006_4
							where variable.ID_INFORME == int.Parse(id)
							select variable).First();

			bd.E006_4.DeleteOnSubmit(objeto);
			bd.SubmitChanges();
		}
		string orderBy(string _sort)
		{
			if (_sort != null)
			{
				if (_sort.Equals("E00_ID_INFORME")){
					return "E00_ID_INFORME";
				}
				if (_sort.Equals("DESCRIPCION_INCIDENTE")){
					return "DESCRIPCION_INCIDENTE";
				}
				if (_sort.Equals("ANTECEDENTES")){
					return "ANTECEDENTES";
				}
				if (_sort.Equals("RELATO_DE_HECHO")){
					return "RELATO_DE_HECHO";
				}
				if (_sort.Equals("COMENTARIO")){
					return "COMENTARIO";
				}
				if (_sort.Equals("FECHA_CREACION")){
					return "FECHA_CREACION";
				}

			}
			return "ID_INFORME";
		}
	}
}