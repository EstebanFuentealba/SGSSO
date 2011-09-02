using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;
using System.Reflection;
using Microsoft.Office.Interop.Excel;

namespace WCF_ENAP.utils
{
    public partial class Export_Planilla : System.Web.UI.Page
    {
        public static int N_ROW = 1;
        public static int ACTIVIDAD_GENERAL = 2;
        public static int ACTIVIDAD_ESPECIFICA = 3;
        public static int ROL = 4;
        public static int CONDICION = 5;
        public static int PELIGRO = 6;
        public static int CONSECUENCIA = 7;
        public static int VALORACION_CONSECUENCIA = 8;
        public static int VALORACION_PROBABILIDAD = 9;
        public static int VALORACION_CONSECUENCIA_VALUE = 10;
        public static int VALORACION_PROBABILIDAD_VALUE = 11;
        public static int MAGNITUD_RIESGO = 12;
        public static int MEDIDAS = 14;        
        public static int MEDIDA_VALORACION_CONSECUENCIA = 15;
        public static int MEDIDA_VALORACION_PROBABILIDAD = 16;
        public static int MEDIDA_VALORACION_CONSECUENCIA_VALUE = 17;
        public static int MEDIDA_VALORACION_PROBABILIDAD_VALUE = 18;

        private DataClassesEnapDataContext bd;

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                int idMatriz = int.Parse(Request.Params["ID_MATRIZ"].ToString());
                bd = new DataClassesEnapDataContext();

                string temp_name = Guid.NewGuid() + "-" + (new Random()).Next(1, 1000) + "-planilla.xls";
                string dir_temp_file = @"D:\temporal\" + temp_name;
                FileStream plantilla = File.OpenRead(@"D:\temporal\E-020-00 Planilla.xls");

                var fileStream = File.Create(dir_temp_file);
                plantilla.CopyTo(fileStream);
                fileStream.Close();
                plantilla.Close();

                Microsoft.Office.Interop.Excel.Application app = new Application();
                Microsoft.Office.Interop.Excel.Workbook workBook = app.Workbooks.Open(dir_temp_file,
                                                            0,
                                                            false,
                                                            5,
                                                            "",
                                                            "",
                                                            true,
                                                            Microsoft.Office.Interop.Excel.XlPlatform.xlWindows,
                                                            "\t",
                                                            false,
                                                            false,
                                                            0,
                                                            true,
                                                            1,
                                                            0);
                Worksheet workSheet = (Worksheet)workBook.ActiveSheet;
                int rowStart = 58, rowIndex = rowStart;

                var query = bd.sp_get_matriz_by_id(idMatriz);
                string nombre_actividad_general = "",
                    nombre_actividad_especifica = "",
                    nombre_rol = "",
                    condicion = "",
                    peligro = "";
                int index = 1;
                List<XLSActividadEvaluada> matriz = new List<XLSActividadEvaluada>();
                XLSActividadEvaluada actividad = new XLSActividadEvaluada();
                XLSPeligro nuevo_peligro = new XLSPeligro();
                XLSMedidaControl medida = new XLSMedidaControl();
                string nombre_organizacion="", nombre_departamento="", nombre_division="";
                #region Arma el objeto a imprimir
                foreach (sp_get_matriz_by_idResult m in query.ToList())
                {
                    nombre_organizacion = m.NOMBRE_ORGANIZACION;
                    nombre_departamento = m.NOMBRE_DEPARTAMENTO;
                    nombre_division = m.NOMBRE_DIVISION;
                    actividad.Actividad_general = m.NOM_ACTIVIDAD_GENERAL;

                    if (m.NOM_ACTIVIDAD_ESPECIFICA != nombre_actividad_especifica)
                    {
                        actividad = new XLSActividadEvaluada();
                        actividad.Actividad_general = m.NOM_ACTIVIDAD_GENERAL;
                        actividad.Condicion = m.CONDICION;
                        actividad.Actividad_especifica = m.NOM_ACTIVIDAD_ESPECIFICA;
                        actividad.Rol = m.NOMBRE_CARGO;
                        matriz.Add(actividad);
                    }
                    if (m.NOM_PELIGRO != peligro)
                    {
                        nuevo_peligro = new XLSPeligro()
                        {
                            Nombre_peligro = m.NOM_PELIGRO,
                            Consecuencia = m.NOMBRE_CONSECUENCIA,

                            Valoracion_consecuencia = m.CONSECUENCIA,
                            Valoracion_consecuencia_value = (int)m.VALORACION_CONSECUENCIA,
                            Valoracion_probabilidad = m.PROBABILIDAD,
                            Valoracion_probabilidad_value = (int)m.VALORACION_PROBABILIDAD,
                            Magnitud_riesgo_puro = m.MRP,
                            Medida_valoracion_consecuencia = m.MEDIDA_CONSECUENCIA,
                            Medida_valoracion_consecuencia_value = (int)m.MEDIDA_VALORACION_CONSECUENCIA,
                            Medida_valoracion_probabilidad = m.MEDIDA_PROBABILIDAD,
                            Medida_valoracion_probabilidad_value = (int)m.MEDIDA_VALORACION_PROBABILIDAD,
                            Magnitud_riesgo_con_control = m.MRCC
                        };
                        if (!actividad.Peligros.Contains(nuevo_peligro))
                        {
                            actividad.Peligros.Add(nuevo_peligro);
                        }
                    }
                    medida = new XLSMedidaControl()
                    {
                        Nombre_medida_control = m.NOM_MEDIDA_DE_CONTROL
                    };
                    if (!nuevo_peligro.MedidasControl.Contains(medida))
                    {
                        nuevo_peligro.MedidasControl.Add(medida);
                    }
                    nombre_actividad_general = m.NOM_ACTIVIDAD_GENERAL;
                    nombre_actividad_especifica = m.NOM_ACTIVIDAD_ESPECIFICA;
                    nombre_rol = m.NOMBRE_CARGO;
                    condicion = m.CONDICION;
                    peligro = m.NOM_PELIGRO;


                    index++;
                }
                if (!matriz.Contains(actividad))
                {
                    matriz.Add(actividad);
                }
                #endregion

                int indexRow = 0, nexRowIndex = rowIndex + 1;

                #region Crea Filas Necesarias
                foreach (XLSActividadEvaluada ac in matriz)
                {
                    for (int j = ((nexRowIndex == rowStart + 1) ? 1 : 0); j < ac.Peligros.Count; j++)
                    {
                        for (int i = 1; i < 10; i++)
                        {
                            Range r = ((Range)workSheet.Cells[rowStart, i]);

                            r.Copy(((Range)workSheet.Cells[nexRowIndex, i]));

                        }
                        nexRowIndex++;
                    }
                }
                #endregion

                #region Completa la información
                
                foreach (XLSActividadEvaluada ac in matriz)
                {
                    ((Range)workSheet.Cells[55, 2]).Value2 = ac.Actividad_general;
                    ((Range)workSheet.Cells[rowIndex + indexRow, 1]).Value2 = ac.Actividad_especifica;
                    foreach (XLSPeligro op in ac.Peligros)
                    {
                        ((Range)workSheet.Cells[rowIndex + indexRow, 2]).Value2 = op.Nombre_peligro;
                        ((Range)workSheet.Cells[rowIndex + indexRow, 3]).Value2 = op.Valoracion_consecuencia;
                        ((Range)workSheet.Cells[rowIndex + indexRow, 4]).Value2 = op.Valoracion_probabilidad;
                        string medidas_formato = "";
                        foreach (XLSMedidaControl md in op.MedidasControl)
                        {
                            medidas_formato += "●" + md.Nombre_medida_control + "\r\n";
                        }
                        ((Range)workSheet.Cells[rowIndex + indexRow, 9]).Value2 = medidas_formato;
                        indexRow++;
                    }
                }

                
                #endregion
                ((Range)workSheet.Cells[52, 2]).Value2 = nombre_organizacion ;
                ((Range)workSheet.Cells[54, 2]).Value2 = nombre_division;
                
                workSheet.PageSetup.PrintArea = "$A$50:$I$" + (rowIndex + indexRow);
                
                workBook.Save();
                workBook.Close();
                app.Quit();
                
                Response.ClearContent();
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.ContentEncoding = System.Text.Encoding.Unicode;
                Response.ContentType = "application/excel";
                Response.AddHeader("Content-Disposition", "attachment; filename=\"Planilla-" + DateTime.Now.Ticks + "-.xls\"");
                Response.WriteFile(dir_temp_file);
                //File.Delete(dir_temp_file);
                Response.End();

                
            }catch (Exception ex) { Response.Write("ERROR " + DateTime.Now.Ticks); }
        }
        
    }
}