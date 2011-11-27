Ext.define('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
    extend: 'Ext.form.Panel',
    height: 572,
    bodyPadding: 10,
    id: 'form_programa_anual',
    border: 0,
    recordParent: null,
    constructor: function () {
        Ext.applyIf(this, arguments);
        this.callParent(arguments);
    },
    initComponent: function () {
        var me = this,
            winActividadProgramaAnualPrevencion,
            meses = [{ name: 'Enero', value: 1 },
		        { name: 'Febrero', value: 2 },
		        { name: 'Marzo', value: 3 },
		        { name: 'Abril', value: 4 },
		        { name: 'Mayo', value: 5 },
		        { name: 'Junio', value: 6 },
		        { name: 'Julio', value: 7 },
		        { name: 'Agosto', value: 8 },
		        { name: 'Septiembre', value: 9 },
		        { name: 'Octubre', value: 10 },
		        { name: 'Noviembre', value: 11 },
		        { name: 'Diciembre', value: 12 }
	        ],
            meses_columns = [],
            showSummary = true,
            VAL_MES_INICIO = me.recordParent.get('MES_INICIO'),
            VAL_ANO_INICIO = me.recordParent.get('ANO_INICIO');
        Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').load({
            params: { 'ID_PROGRAMA_ANUAL': me.recordParent.get('ID_PROGRAMA_ANUAL') },
            callback: function (records, operation, success) {
                //console.log(records);
            }
        });
        for (var i = VAL_MES_INICIO - 1, x = VAL_ANO_INICIO, j = 0; j < 12; i++, j++) {
            var objMes = {};
            var varName = meses[i].name.toLowerCase();
            var renderFunction = eval("(function(value, metaData, record, rowIdx, colIdx, store, view) { var x = Math.round(((record.get('" + varName.toLocaleUpperCase() + "_R') * 1)/ record.get('" + varName.toLocaleUpperCase() + "_P'))*100); return '<b>'+(isNaN(x)?0:x)+'%</b>'; })");
            var sumaryTypeFunction = eval("(function(records){ var total = 0; Ext.each(records, function (record) { var programado = 0, realizado = 0; try { programado = record.get('" + varName.toLocaleUpperCase() + "_P'); } catch (ex) { }; try { realizado = record.get('" + varName.toLocaleUpperCase() + "_R'); } catch (ex) { }; if (programado != 0 || realizado != 0) { total += Math.round(((realizado * 1) / programado) * 100); } }); var x = ((total / records.length)); return (isNaN(x) ? 0 : x); })");

            objMes.header = meses[i].name + ' / ' + x;
            objMes.columns = [{
                text: 'P',
                width: 40,
                dataIndex: varName.toLocaleUpperCase() + '_P',
                editor: {
                    xtype: 'numberfield'
                }
            }, {
                text: 'R',
                width: 40,
                dataIndex: varName.toLocaleUpperCase() + '_R',
                editor: {
                    xtype: 'numberfield'
                }
            }, {
                text: '%',
                width: 60,
                sortable: false,
                groupable: false,
                renderer: renderFunction,
                summaryType: sumaryTypeFunction,
                summaryRenderer: function (value) {
                    return "<b>" + value + "%</b>";
                }
            }
		    ];
            meses_columns.push(objMes);

            if (i == meses.length - 1) {
                i = -1;
                x++;
            }
        }
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    name: 'NOMBRE_PROGRAMA',
                    fieldLabel: 'Nombre Programa',
                    labelWidth: 120,
                    anchor: '100%'
                }
                , {
                    xtype: 'gridpanel',
                    height: 500,
                    id: 'grid_programa_anual',
                    columnLines: true,
                    store: 'dsActividadProgramaAnualPrevencion',
                    title: 'Programa Prevención de Riesgos',
                    listeners: {
                        'afterrender': function (cmp, opt) {
                            cmp.doLayout();
                        },
                        'selectionchange': function (selModel, selections) {
                            this.down('#btn_delete_actividad_programa').setDisabled(selections.length === 0);
                        }
                    },
                    columns: [
                    {
                        xtype: 'gridcolumn',
                        text: 'Información General',
                        columns: [

                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'TIPO_FRECUENCIA',
                                text: 'Frecuencia',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var arrayFrecuencia = ["Diario", "Semanal", "Mensual", "Anual"];
                                    return record.get('CANTIDAD_FRECUENCIA') + ' ' + arrayFrecuencia[value - 1];

                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'ID_EVIDENCIA',
                                text: 'Evidencia',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var storeCargo = Ext.StoreManager.lookup('dsEvidencia');
                                    var idx = storeCargo.find('ID_EVIDENCIA', value);
                                    return idx !== -1 ? storeCargo.getAt(idx).get('NOMBRE_EVIDENCIA') : '';
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'ID_CARGO',
                                text: 'Responsable',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var storeCargo = Ext.StoreManager.lookup('dsCargo');
                                    var idx = storeCargo.find('ID_CARGO', value);
                                    return idx !== -1 ? storeCargo.getAt(idx).get('NOMBRE_CARGO') : '';
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'TURNO',
                                text: 'Turno',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value == '0') {
                                        return 'A, B, C, D';
                                    } else {
                                        return value;
                                    }
                                }
                            }
                        ]
                    },
                    meses_columns

                ],
                    viewConfig: {
                        stripeRows: true
                    },
                    plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        listeners: {
                            beforeedit: function (event, eOpts) {
                                var enabled = event.record.get(event.field.replace('_P', '_E').replace('_R', '_E'));
                                if (!enabled) {
                                    event.column.getEditor(event.record, event.field).setDisabled(true);
                                }
                            },
                            edit: function () {
                                Ext.getCmp('grid_programa_anual').getView().refresh();
                            }
                        }
                    })
                ],
                    features: [{
                        id: 'groupAnual',
                        ftype: 'groupingsummary',
                        groupHeaderTpl: '{name}',
                        enableGroupingMenu: false
                    }],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'btn-add',
                                    text: 'Agregar Actividad',
                                    handler: function () {
                                        var form = this.up('form').getForm();
                                        var record = form.getRecord();
                                        record.set('ENERO_E', true);
                                        record.set('FEBRERO_E', true);
                                        record.set('MARZO_E', true);
                                        record.set('ABRIL_E', true);
                                        record.set('MAYO_E', true);
                                        record.set('JUNIO_E', true);
                                        record.set('JULIO_E', true);
                                        record.set('AGOSTO_E', true);
                                        record.set('SEPTIEMBRE_E', true);
                                        record.set('OCTUBRE_E', true);
                                        record.set('NOVIEMBRE_E', true);
                                        record.set('DICIEMBRE_E', true);
                                        winActividadProgramaAnualPrevencion = Ext.create("WCF_ENAP.view.ui.ActividadProgramaAnualPrevencion", {
                                            recordParent: record
                                        });
                                        var view = Ext.getCmp('grid_programa_anual').getView();
                                        showSummary = false;
                                        view.getFeature('groupAnual').toggleSummaryRow(showSummary);
                                        view.refresh();
                                        winActividadProgramaAnualPrevencion.getComponent('form_actividad_programa_anual').loadRecord(record);
                                        winActividadProgramaAnualPrevencion.show();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'btn_delete_actividad_programa',
                                    text: 'Remover Actividad Seleccionada',
                                    handler: function () {
                                        var grid = Ext.getCmp('grid_programa_anual'),
                                            store = Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion')
                                            records = grid.getSelectionModel().getSelection();
                                            store.remove(records);
                                        /* var view = Ext.getCmp('grid_programa_anual').getView(),
                                        summaryGroups = view.getFeature('groupAnual').summaryGroups,
                                        summaryData = view.getFeature('groupAnual').generateSummaryData(),
                                        total = [];
                                        // Calculo Total Avance
                                        for (var i = 0, length = summaryGroups.length; i < length; ++i) {
                                        var actividad = summaryData[summaryGroups[i].name], index = 0;
                                        for (var percent in actividad) {
                                        if (!total[index]) { total[index] = 0; }
                                        total[index] = total[index] + actividad[percent];
                                        index++;
                                        }
                                        }
                                        var avance_total_mensual = [], avance_total_programa = 0;
                                        Ext.each(total, function (objeto) {
                                        var percent_month = (objeto / summaryGroups.length);
                                        avance_total_mensual.push(percent_month);
                                        avance_total_programa += percent_month;
                                        });
                                        avance_total_programa = avance_total_programa / avance_total_mensual.length;
                                        //console.log(avance_total_mensual);
                                        //console.log(avance_total_programa);
                                        */
                                    }
                                },
                                {
                                    tooltip: 'Click Para ocultar o Mostrar el Total Mensual de Avance',
                                    text: 'Mostrar Totales de Avance',
                                    handler: function () {
                                        var view = Ext.getCmp('grid_programa_anual').getView();
                                        showSummary = !showSummary;
                                        view.getFeature('groupAnual').toggleSummaryRow(showSummary);
                                        view.refresh();
                                    }
                                }
                            ]
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                })
            }
            ]
        });

        me.callParent(arguments);
    }
});


/*
Ext.define('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
extend: 'Ext.grid.Panel',
height: 350,
width: 900,
columnLines: true,
title: 'Programa Prevención de Riesgos',
store: 'dsActividadProgramaAnualPrevencion',
initComponent: function () {
var me = this, winActividadProgramaAnualPrevencion;
Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').on('load', function ( store,  records, successful, operation,  eOpts ) {
console.log(store);
});
Ext.applyIf(me, {

columns: [
{
xtype: 'gridcolumn',
flex: 0.65,
text: 'Información General',

columns: [

{
xtype: 'gridcolumn',
dataIndex: 'TIPO_FRECUENCIA',
flex: 0.2,
text: 'Frecuencia'
},
{
xtype: 'gridcolumn',
dataIndex: 'NOMBRE_EVIDENCIA',
flex: 0.2,
text: 'Evidencia'
},
{
xtype: 'gridcolumn',
dataIndex: 'NOMBRE_RESPONSABLE',
flex: 0.2,
text: 'Responsable'
},
{
xtype: 'gridcolumn',
dataIndex: 'TURNO',
flex: 0.1,
text: 'Turno'
}
]
},
{
xtype: 'gridcolumn',
flex: 0.35,
text: 'Meses',
columns: [
{
xtype: 'gridcolumn',
dataIndex: 'ENERO_P',
editor: {
type: 'numberfield'
},
text: 'MyColumn6'
},
{
xtype: 'gridcolumn',
dataIndex: 'ENERO_R',
text: 'MyColumn7'
},
{
xtype: 'gridcolumn',
dataIndex: 'ENERO_A',
text: 'MyColumn9'
}
]
}
],
viewConfig: {
},
plugins: [
Ext.create('Ext.grid.plugin.CellEditing', {

})
],
features: [Ext.create('Ext.grid.feature.Grouping', {
groupHeaderTpl: 'Actividad: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
})],
dockedItems: [
{
xtype: 'toolbar',
dock: 'top',
items: [
{
xtype: 'button',
iconCls: 'btn-add',
text: 'Agregar Actividad',
handler: function () {
if (!winActividadProgramaAnualPrevencion) {
winActividadProgramaAnualPrevencion = Ext.create("WCF_ENAP.view.ui.ActividadProgramaAnualPrevencion");
}
winActividadProgramaAnualPrevencion.show();
}
},
{
xtype: 'button',
text: 'Remover Actividad Seleccionada'
}
]
}
],
selModel: Ext.create('Ext.selection.RowModel', {

})
});

me.callParent(arguments);
}
});
*/