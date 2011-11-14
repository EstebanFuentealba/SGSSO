Ext.define('WCF_ENAP.view.ui.BuscaMatrizRiesgoV2', {
    requires: [
        'Ext.ux.grid.feature.CheckGrouping',
        'Ext.ux.form.field.ClearButton',
        'Ext.ux.RowExpander'
    ],
    extend: 'Ext.panel.Panel',
    maximizable: true,
    modal: true,
    bodyPadding: 10,
    autoScroll: true,
    title: 'Busca Matriz de Riesgo',
    id: 'panel-BuscaMatrizRiesgoV2',
    initComponent: function () {
        var me = this,
            pnlLugar,
            checkGroup;

        pnlLugar = Ext.create('WCF_ENAP.view.ui.PanelLugar', {
            title: 'Lugar de la Actividad',
            columnWidth: .5
        });

        me.items = [
        /* Formulario de Busqueda */
		{
		xtype: 'form',
		title: 'Busca Actividad Específica',
		collapsible: true,
		margin: '0 0 5 0',
		layout: 'column',
		anchor: '100%',
		items: [
		/* [LUGAR ACTIVIDAD] */
				pnlLugar,
		/*  	
		[/LUGAR ACTIVIDAD]
		[DATOS ACTIVIDAD] 
		*/
				{
				xtype: 'panel',
				columnWidth: 1 / 2,
				margin: '5 5 5 5',
				layout: 'anchor',
				bodyPadding: 10,
				title: 'Datos de Actividad',
				items: [
						{
						    xtype: 'combobox',
						    fieldLabel: 'General',
						    displayField: 'NOM_ACTIVIDAD_GENERAL',
						    plugins: ['clearbutton'],
						    store: 'dsActividadGeneral',
						    valueField: 'ID_ACTIVIDAD_GENERAL',
						    name: 'ID_ACTIVIDAD_GENERAL',
						    anchor: '100%'
						},
						{
						    xtype: 'textfield',
						    fieldLabel: 'Específica',
						    plugins: ['clearbutton'],
						    anchor: '100%',
						    name: 'NOM_ACTIVIDAD_ESPECIFICA'
						},
						{
						    xtype: 'combobox',
						    plugins: ['clearbutton'],
						    fieldLabel: 'Cargo',
						    store: 'dsCargo',
						    displayField: 'NOMBRE_CARGO',
						    valueField: 'ID_CARGO',
						    anchor: '100%',
						    name: 'ID_CARGO'
						},
						{
						    xtype: 'radiogroup',
						    fieldLabel: 'Es',
						    items: [
								{
								    xtype: 'radiofield',
								    name: 'CONDICION',
								    boxLabel: 'Rutinario',
								    inputValue: 1
								},
								{
								    xtype: 'radiofield',
								    name: 'CONDICION',
								    boxLabel: 'No Rutinario',
								    inputValue: 2
								},
								{
								    xtype: 'radiofield',
								    name: 'CONDICION',
								    fieldLabel: '',
								    boxLabel: 'Emergencia',
								    inputValue: 3
								}
							]
						},
						{
						    xtype: 'panel',
						    border: 0,
						    layout: 'column',
						    fieldDefaults: {
						        msgTarget: 'side',
						        autoFitErrors: false
						    },
						    defaultType: 'datefield',
						    items: [
								{
								    fieldLabel: 'Evaluada Entre',
								    plugins: ['clearbutton'],
								    columnWidth: 0.5,
								    name: 'startdt',
								    id: 'startdt',
								    vtype: 'daterange',
								    endDateField: 'enddt'
								},
								{
								    fieldLabel: 'Y',
								    plugins: ['clearbutton'],
								    columnWidth: 0.5,
								    margin: '0 0 0 5',
								    name: 'enddt',
								    id: 'enddt',
								    vtype: 'daterange',
								    startDateField: 'startdt'
								}
							]
						}
					]
}
		/* 
		[/DATOS ACTIVIDAD] 
		*/
			],
		/* 
		[BOTONES] 
		*/
		buttons: [{
		    text: 'Limpiar',
		    handler: function () {
		        var form = this.up('form').getForm();
		        form.reset();
		    }
		},
        {
            text: 'Buscar',
            iconCls: 'btn-search',
            handler: function () {

                var record,
                    form = this.up('form').getForm(),
					values = form.getValues();
                record = Ext.create('WCF_ENAP.model.ActividadEvaluada', values);
                Ext.data.StoreManager.lookup('dsActividadEvaluada').load({
                    params: record.data,
                    callback: function (records, operation, success) {
                        if (records.length == 0) {
                            Ext.MessageBox.confirm('Confirm', 'No existe ninguna Matriz con esos Datos, ¿Desea Crearla?', function (btn) {
                                /* [CREA MATRIZ] */
                                Ext.application({
                                    name: 'WCF_ENAP',
                                    stores: [],
                                    launch: function () {
                                        Ext.QuickTips.init();
                                        var addMatriz = Ext.create('WCF_ENAP.view.ui.EV2', {});
                                        var winAddMatriz = Ext.create('Ext.window.Window', {
                                            width: '600',
                                            maximizable: true,
                                            title: 'Ingresa una nueva Matriz',
                                            modal: true,
                                            items: [
													addMatriz
												]
                                        });
                                        winAddMatriz.show();
                                    }
                                });
                                /* [/CREA MATRIZ] */
                            })
                        }
                    }
                });
            }
        }]
		/* [/BOTONES] */
},
        /* [GRID] */
		{
		xtype: 'gridpanel',
		collapsible: true,
		title: 'Listado de Matrices Evaluadas',
		anchor: '100%',
		store: 'dsActividadEvaluada',
		autoScroll: true,
		features: [
		    Ext.create('Ext.ux.grid.feature.CheckGrouping', {
		        id: 'grouping',
		        groupHeaderTpl: '{name}',
		        selectionMode: "SINGLE"
		    })
		],
		plugins: [
            {
                ptype: 'rowexpander',
                pluginId: 'rowexpander',
                rowBodyTpl: [
                    '<div style="margin-left: 15px;"><div style="margin-left: 15px; float:left;">		<h3>Medidas de Control:</h3><ol><tpl for="MEDIDAS_NAME">			<li style="margin-left: 15px">{#}. {NOM_MEDIDA_DE_CONTROL}</li>			</tpl>		</ol><br />	</div></div>'
                ]
            },
			Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })
		],
		listeners: {
		    afterrender: function (component, eOpts) {
		        var me = this,
                plugin = component.getPlugin('rowexpander'),
                view = plugin.view;
		        view.on('collapsebody', function (rowNode, record, nextBd) {
		            me.doLayout();
		        });
		        view.on('expandbody', function (rowNode, record, nextBd) {
		            if (!Ext.isDefined(rowNode.isLoaded) || rowNode.isLoaded == false) {
		                me.setLoading(true);
		                /* aGREGAR DS MEDIDADECONTROL */
		                Ext.StoreManager.lookup('dsMedidaDeControl').load({
		                    params: { 'ID_ACTIVIDAD_EVALUADA': record.get('ID_ACTIVIDAD_EVALUADA') },
		                    callback: function (records, operation, success) {
		                        var dsRecord = me.store.getById(record.get('ID_ACTIVIDAD_EVALUADA'));
		                        dsRecord.set('MEDIDAS_NAME', Ext.Array.map(records, function (record) {
		                            return { 'NOM_MEDIDA_DE_CONTROL': record.get('NOM_MEDIDA_DE_CONTROL') };
		                        }));
		                        me.setLoading(false);
		                        me.doLayout();
		                        rowNode.isLoaded = true;
		                    }
		                });
		            }
		        });
		    }
		},
		//selModel: Ext.create('Ext.selection.CheckboxModel', { checkOnly: true }),
		columns: [
				{
				    xtype: 'gridcolumn',
				    dataIndex: 'NOM_ACTIVIDAD_ESPECIFICA',
				    flex: 0.2,
				    text: 'Actividad Especifica'
				},
				{
				    xtype: 'gridcolumn',
				    dataIndex: 'ID_PELIGRO',
				    flex: 0.3,
				    text: 'Peligro',
				    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
				        return record.get('NOM_PELIGRO');
				    }
				},
				{

				    xtype: 'gridcolumn',
				    align: 'center',
				    text: 'Evaluación del Riesgo',
				    columns: [
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'VALORACION_PROBABILIDAD',
					    text: 'P',
					    "field": {
					        xtype: "combo",
					        displayField: "NOMBRE_PROBABILIDAD",
					        valueField: "ID_PROBABILIDAD",
					        anchor: "100%",
					        queryMode: 'local',
					        store: Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_PROBABILIDAD", "type": "int" },
									{ "name": "NOMBRE_PROBABILIDAD", "type": "string" }
								],
					            data: [
									{ "ID_PROBABILIDAD": 1, "NOMBRE_PROBABILIDAD": "Bajo" },
									{ "ID_PROBABILIDAD": 2, "NOMBRE_PROBABILIDAD": "Medio" },
									{ "ID_PROBABILIDAD": 3, "NOMBRE_PROBABILIDAD": "Alto" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Medio";
					                break;
					            case '3':
					                return "Alto";
					                break;
					            default:
					                return "Bajo";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'VALORACION_CONSECUENCIA',
					    text: 'C',
					    "field": {
					        "xtype": "combo",
					        "displayField": "NOMBRE_CONSECUENCIA",
					        "valueField": "ID_CONSECUENCIA",
					        "anchor": "100%",
					        queryMode: 'local',
					        "store": Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_CONSECUENCIA", "type": "int" },
									{ "name": "NOMBRE_CONSECUENCIA", "type": "string" }
								],
					            data: [
									{ "ID_CONSECUENCIA": 1, "NOMBRE_CONSECUENCIA": "Ligeramente Dañino" },
									{ "ID_CONSECUENCIA": 2, "NOMBRE_CONSECUENCIA": "Dañino" },
									{ "ID_CONSECUENCIA": 3, "NOMBRE_CONSECUENCIA": "Extremadamente Dañino" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Dañino";
					                break;
					            case '3':
					                return "Extremadamente Dañino";
					                break;
					            default:
					                return "Ligeramente Dañino";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    text: 'MR',
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        var indicador_riesgo = parseInt(record.get('VALORACION_CONSECUENCIA')) * parseInt(record.get('VALORACION_PROBABILIDAD'));
					        if (indicador_riesgo < 3) {
					            return "<span style='display: block; background-color:green;'><center><b>Bajo</b></center></span>";
					        } else if (indicador_riesgo > 5) {
					            return "<span style='display: block; background-color:red;'><center><b>Alto</b></center></span>";
					        } else {
					            return "<span style='display: block; background-color:yellow;'><center><b>Medio</b></center></span>";
					        }
					    }
					}
					]
				},
				{
				    xtype: 'gridcolumn',
				    text: 'Re Evaluación del Riesgo',
				    align: 'center',
				    columns: [
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'MEDIDA_VALORACION_PROBABILIDAD',
					    text: 'P',
					    "field": {
					        "xtype": "combo",
					        "displayField": "NOMBRE_PROBABILIDAD",
					        "valueField": "ID_PROBABILIDAD",
					        "anchor": "100%",
					        queryMode: 'local',
					        "store": Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_PROBABILIDAD", "type": "int" },
									{ "name": "NOMBRE_PROBABILIDAD", "type": "string" }
								],
					            data: [
									{ "ID_PROBABILIDAD": 1, "NOMBRE_PROBABILIDAD": "Bajo" },
									{ "ID_PROBABILIDAD": 2, "NOMBRE_PROBABILIDAD": "Medio" },
									{ "ID_PROBABILIDAD": 3, "NOMBRE_PROBABILIDAD": "Alto" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Medio";
					                break;
					            case '3':
					                return "Alto";
					                break;
					            default:
					                return "Bajo";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'MEDIDA_VALORACION_CONSECUENCIA',
					    text: 'C',
					    "field": {
					        xtype: "combo",
					        displayField: "NOMBRE_CONSECUENCIA",
					        valueField: "ID_CONSECUENCIA",
					        anchor: "100%",
					        queryMode: 'local',
					        store: Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_CONSECUENCIA", "type": "int" },
									{ "name": "NOMBRE_CONSECUENCIA", "type": "string" }
								],
					            data: [
									{ "ID_CONSECUENCIA": 1, "NOMBRE_CONSECUENCIA": "Ligeramente Dañino" },
									{ "ID_CONSECUENCIA": 2, "NOMBRE_CONSECUENCIA": "Dañino" },
									{ "ID_CONSECUENCIA": 3, "NOMBRE_CONSECUENCIA": "Extremadamente Dañino" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Dañino";
					                break;
					            case '3':
					                return "Extremadamente Dañino";
					                break;
					            default:
					                return "Ligeramente Dañino";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    text: 'MRCC',
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        var indicador_riesgo_controlado = parseInt(record.get('MEDIDA_VALORACION_CONSECUENCIA')) * parseInt(record.get('MEDIDA_VALORACION_PROBABILIDAD'));
					        if (indicador_riesgo_controlado < 3) {
					            return "<span style='display: block; background-color:green;'><center><b>Bajo</b></center></span>";
					        } else if (indicador_riesgo_controlado > 5) {
					            return "<span style='display: block; background-color:red;'><center><b>Alto</b></center></span>";
					        } else {
					            return "<span style='display: block; background-color:yellow;'><center><b>Medio</b></center></span>";
					        }
					    }
					}]
				}
			],
		dockedItems: [
				{
				    xtype: 'pagingtoolbar',
				    displayInfo: true,
				    store: 'dsActividadEvaluada',
				    dock: 'bottom'
				},
				{
				    xtype: 'toolbar',
				    dock: 'top',
				    anchor: '100%',
				    items: [
						{
						    xtype: 'button',
						    text: 'Exportar Seleccionadas',
						    iconCls: 'excel-icon',
						    menu: {
						        xtype: 'menu',
						        items: [
									{
									    xtype: 'menuitem',
									    text: 'Planilla de Reconocimiento de Riesgo',
									    iconCls: 'matriz-icon',
									    handler: function () {

									        var grid = me.down('gridpanel'),
                                                sm = grid.getView().getFeature('grouping').getSelectionModel();

									        if (sm.getCount() == 0) {
									            Ext.Msg.alert('Advertencia', 'No ha checkeado ninguna fila');
									            return;
									        }
									        var data = sm.getSelection();
									        window.location = "/utils/Export-Planilla.aspx?ID_MATRIZ=" + data[0].get('ID_MATRIZ');
									        Ext.Msg.alert('Advertencia', 'Espera un momento mientras se genera el documento, ésto puede tardar varios segundos.');

									    }
									},
									{
									    xtype: 'menuitem',
									    text: 'Matriz de Riesgo',
									    iconCls: 'matriz-icon',
									    handler: function () {
									        var grid = me.down('gridpanel'),
                                                sm = grid.getView().getFeature('grouping').getSelectionModel();

									        if (sm.getCount() == 0) {
									            Ext.Msg.alert('Advertencia', 'No ha checkeado ninguna fila');
									            return;
									        }
									        var data = sm.getSelection();
									        window.location = "/utils/Export-Matriz.aspx?ID_MATRIZ=" + data[0].get('ID_MATRIZ');
									        Ext.Msg.alert('Advertencia', 'Espera un momento mientras se genera el documento, ésto puede tardar varios segundos.');

									    }
									}
								]
						    }
						}
					]
				}
			]
}
        /* [/GRID] */
		];
        me.callParent(arguments);
    }
});