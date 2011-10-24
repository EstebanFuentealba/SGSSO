Ext.define('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
    extend: 'Ext.form.Panel',
    height: 572,
    bodyPadding: 10,
    id: 'form_programa_anual',
    border: 0,
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
            grouping = Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: 'Actividad: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
            });

        for (var i = 0; i < meses.length; i++) {
            var objMes = {};
            var varName = meses[i].name.toLowerCase();
            var renderFunction = eval("(function(value, metaData, record, rowIdx, colIdx, store, view) { var x = Math.round(((record.get('" + varName.toLocaleUpperCase() + "_R') * 1)/ record.get('" + varName.toLocaleUpperCase() + "_P'))*100); return isNaN(x)?0:x; })");
            var sumaryTypeFunction = eval("(function(records){ var i = 0,length = records.length,total = 0,record; for (; i < length; ++i) { record = records[i]; total += ((record.get('" + varName.toLocaleUpperCase() + "_R') * 1)/ record.get('" + varName.toLocaleUpperCase() + "_P')); }; var x = Math.round((total/length)*100); return isNaN(x)?0:x; })");

            objMes.header = meses[i].name;
            objMes.columns = [{
                text: 'P',
                dataIndex: varName.toLocaleUpperCase() + '_P',
                editor: {
                    xtype: 'numberfield'
                }
            }, {
                text: 'R',
                dataIndex: varName.toLocaleUpperCase() + '_R',
                editor: {
                    xtype: 'numberfield'
                }
            }, {
                text: '%',
                sortable: false,
                groupable: false,
                renderer: renderFunction,
                summaryType: sumaryTypeFunction
            }
		];
            meses_columns.push(objMes);
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
                    columns: [
                    {
                        xtype: 'gridcolumn',
                        flex: 1,
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
                                dataIndex: 'ID_EVIDENCIA',
                                flex: 0.2,
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
                                flex: 0.2,
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
                                flex: 0.1,
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
                    {
                        xtype: 'gridcolumn',
                        flex: 0.35,
                        text: 'Meses',
                        columns: meses_columns
                    }
                ],
                viewConfig: {
                        stripeRows: true
                },
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        listeners: {
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
                                        if (!winActividadProgramaAnualPrevencion) {
                                            winActividadProgramaAnualPrevencion = Ext.create("WCF_ENAP.view.ui.ActividadProgramaAnualPrevencion");
                                        }
                                        winActividadProgramaAnualPrevencion.getComponent('form_actividad_programa_anual').loadRecord(record);
                                        winActividadProgramaAnualPrevencion.show();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Remover Actividad Seleccionada'
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