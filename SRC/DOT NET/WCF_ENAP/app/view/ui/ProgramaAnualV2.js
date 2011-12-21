
Ext.define('WCF_ENAP.view.ui.ProgramaAnualV2', {
    extend: 'Ext.panel.Panel',
	requires: [
        'Ext.ux.RowExpander',
        'Ext.ux.grid.column.ProgressColumn',
        'Ext.ux.form.field.ClearButton'
    ],
    height: 544,
    width: 839,
    id: 'panel-ProgramaAnualV2',
    autoScroll: true,
    title: 'Programa Anual',
	contextMenuFilters: null,
    initComponent: function() {
        var me = this,
            winActividadProgramaAnual,
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();


        for (var yInicio = (yearNow + yearStep); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        }
		
		var dsGraphAvanceProgramaAnual = Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual'),
			dsProgramaAnual = Ext.StoreManager.lookup('dsProgramaAnual'),
			dsGraphAvanceProgramaAnualById = Ext.StoreManager.lookup('dsGraphAvanceProgramaAnualById');
			
		// 	ON LOAD STORE
		dsGraphAvanceProgramaAnual.on('beforeload',function(store,operation, eOpts) {
			Ext.getCmp('graphAvanceProgramaAnual').setLoading(true);
		});
		dsGraphAvanceProgramaAnual.on('load',function(store,records, successful, operation, eOpts) {
			Ext.getCmp('graphAvanceProgramaAnual').setLoading(false);
		});
		dsProgramaAnual.on('beforeload',function(store,operation, eOpts) {
			//Ext.getCmp('grid_programas_list').setLoading(true);
		});
		dsProgramaAnual.on('load',function(store,records, successful, operation, eOpts) {
			//Ext.getCmp('grid_programas_list').setLoading(false);
		});
		dsGraphAvanceProgramaAnualById.on('beforeload',function(store,operation, eOpts) {
			Ext.getCmp('chart_prc_p_r_by_programa').setLoading(true);
		});
		dsGraphAvanceProgramaAnualById.on('load',function(store,records, successful, operation, eOpts) {
			Ext.getCmp('chart_prc_p_r_by_programa').setLoading(false);
		});
		dsGraphAvanceProgramaAnualById.getProxy().on('exception', function(proxy, response, operation, eOpts) {
			console.log('ERRROR');
		});
		var fnListenerProgramaAnual = function (store, records, index, eOpts) {
            var selectedYear = me.contextMenuFilters.getComponent(0).getValue(),
				store = Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual');
			store.setProxy(Ext.apply(store.getProxy(),{
				extraParams: {
					'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
					'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked,
					'ID_DIVISION': 0
				}
			}));
        };
		//	LISTENERS
        dsProgramaAnual.on('add', fnListenerProgramaAnual);
        dsProgramaAnual.on('load', fnListenerProgramaAnual);
		dsProgramaAnual.on('remove',fnListenerProgramaAnual);
		dsProgramaAnual.on('update',fnListenerProgramaAnual);
		
		me.contextMenuFilters = Ext.create('Ext.menu.Menu', {
            items: [
		        {
		            xtype: 'combobox',
		            store: Ext.create('Ext.data.ArrayStore', {
		                fields: ['ANO'],
		                data: yearsList
		            }),
					id: 'cmb_menu_ano',
					iconCls: 'no-icon',
		            valueField: 'ANO',
		            displayField: 'ANO',
		            name: 'ANO_INICIO',
		            listeners: {
		                change: function (field, newValue, oldValue, eOpts) {
							var store = Ext.StoreManager.lookup('dsProgramaAnual');
							store.setProxy(Ext.apply(store.getProxy(),{
								extraParams: {
									'ANO_INICIO': newValue,
									'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked
								}
							}))
							store.load();
		                }
		            }
		        },
				{
					xtype: 'menucheckitem',
					text: 'Mostrar Plantillas',
					id: 'chk_menu_show_templates',
					checked: false,
					checkHandler: function(item, checked){
						var store = Ext.StoreManager.lookup('dsProgramaAnual');
						store.setProxy(Ext.apply(store.getProxy(),{
							extraParams: {
								'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
								'TEMPLATE': checked
							}
						}))
						store.load();
					}
				},
                {
                    xtype: 'combobox',
					iconCls: 'no-icon',
                    plugins: ['clearbutton'],
                    name: 'ID_ORGANIZACION',
                    displayField: 'NOMBRE_ORGANIZACION',
                    store: 'dsOrganizacion',
                    emptyText: 'Organización',
                    valueField: 'ID_ORGANIZACION',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var cmbDepto = this.next('combobox');
                            cmbDepto.clearValue();
                            if (!Ext.isEmpty(newValue)) {
                                Ext.data.StoreManager.lookup('dsDepartamento').load({
                                    params: { 'ID_ORGANIZACION': newValue },
                                    callback: function (records, operation, success) {
                                        cmbDepto.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                    }
                                });
                            } else {
								cmbDepto.setDisabled(true);
							}
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    plugins: ['clearbutton'],
                    disabled: true,
                    name: 'ID_DEPARTAMENTO_ORGANIZACION',
                    displayField: 'NOMBRE_DEPARTAMENTO',
                    store: 'dsDepartamento',
                    valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                    emptyText: 'Departamento',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
					iconCls: 'no-icon',
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var cmbDiv = this.next('combobox'); ;
                            cmbDiv.clearValue();
							var store = Ext.StoreManager.lookup('dsProgramaAnual');
                            if (!Ext.isEmpty(newValue) && Ext.isNumber(newValue)) {
								Ext.data.StoreManager.lookup('dsDivision').load({
                                    params: { 'ID_DEPARTAMENTO': newValue },
                                    callback: function (records, operation, success) {
                                        cmbDiv.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                    }
                                });
								store.setProxy(Ext.apply(store.getProxy(),{
									extraParams: {
										'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
										'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked,
										'ID_DEPARTAMENTO_ORGANIZACION': newValue,
										'ID_DIVISION': 0
									}
								}))
								store.load();
                            } else {
								cmbDiv.setDisabled(true);
								store.setProxy(Ext.apply(store.getProxy(),{
									extraParams: {
										'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
										'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked,
										'ID_DEPARTAMENTO_ORGANIZACION': 0,
										'ID_DIVISION': 0
									}
								}))
								store.load();
								
                            }
							
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    plugins: ['clearbutton'],
                    disabled: true,
                    name: 'ID_DIVISION',
					iconCls: 'no-icon',
                    displayField: 'NOMBRE_DIVISION',
                    store: 'dsDivision',
                    valueField: 'ID_DIVISION',
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'División',
                    queryMode: 'local',
                    lastQuery: '',
                    selectOnFocus: true,
                    listeners: {
                        'change': function (cmb, newValue, oldValue, eOpts) {
                            var store = Ext.StoreManager.lookup('dsProgramaAnual');
                            if (!Ext.isEmpty(newValue) && Ext.isNumber(newValue)) {
								store.setProxy(Ext.apply(store.getProxy(),{
									extraParams: {
										'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
										'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked,
										'ID_DIVISION': newValue
									}
								}))
								store.load();
                            } else {
								store.setProxy(Ext.apply(store.getProxy(),{
									extraParams: {
										'ANO_INICIO': Ext.getCmp('cmb_menu_ano').getValue(),
										'TEMPLATE': Ext.getCmp('chk_menu_show_templates').checked,
										'ID_DIVISION': 0
									}
								}))
								store.load();
                            }
                        }
                    }
                }
	        ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 200,
                    margin: '5 5',
                    layout: {
                        type: 'fit'
                    },
                    title: 'Consolidado de Avances de Programas Por División',
                    items: [
                        {
                            xtype: 'chart',
                            shadow: true,
							id: 'graphAvanceProgramaAnual',
							store: 'dsGraphAvanceProgramaAnual',
                            animate: true,
                            insetPadding: 20,
                            axes: [
								{
									type: 'Category',
									fields: [
										'NOMBRE_DIVISION'
									],
									position: 'bottom',
									label: {
										renderer: function (v) {
											return Ext.String.ellipsis(v, 15, false);
										},
										font: '9px Arial',
										rotate: {
											degrees: 270
										}
									}
								},
								{
									type: 'Numeric',
									fields: [
										'PRC_TOTAL'
									],
									position: 'left',
									minimum: 0,
									maximum: 100,
									grid: true,
									label: {
										renderer: Ext.util.Format.numberRenderer('0,0'),
										font: '10px Arial'
									},
									title: '% Avance'
								}
							],
							series: [
								{
									type: 'column',
									display: 'insideEnd',
									'text-anchor': 'middle',
									axis: 'left',
									highlight: true,
									style: {
										fill: '#456d9f'
									},
									highlightCfg: {
										fill: '#a2b5ca'
									},
									tips: {
										trackMouse: true,
										width: 300,
										renderer: function(storeItem, item) {
											this.setTitle(storeItem.get('PROGRAMA') + ': ' + storeItem.get('PRC_TOTAL') + '%');
										}
									},
									label: {
										contrast: true,
										display: 'insideEnd',
										field: 'PRC_TOTAL',
										color: '#000',
										'text-anchor': 'middle',
										renderer: Ext.util.Format.numberRenderer('0.0%')

									},
									listeners: {
										'itemmouseup': function (item) {
											var barIdDivision = item.storeItem.get('ID_DIVISION'),
												store = Ext.StoreManager.lookup('dsProgramaAnual'),
												series = Ext.getCmp('graphAvanceProgramaAnual').series.get(0),
												selectionModel = Ext.getCmp('grid_programas_list').getSelectionModel(),
												records = [];
											store.each(function (record) {
												if (record.get('ID_DIVISION') == barIdDivision) {
													records.push(record);
												}
											});
											selectionModel.select(records);
										}
									},
									xField: 'NOMBRE_DIVISION',
									yField: [
										'PRC_TOTAL'
									]
								}
							]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: 0,
                    margin: '0 5 5 5',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 400,
                            id: 'grid_programas_list',
                            title: 'Listado de Programas',
                            store: 'dsProgramaAnual',
                            columnWidth: 0.6,
							tools: [{
								type: 'gear',
								handler: function (e, target, panelHeader, tool) {
									me.contextMenuFilters.showAt(e.getXY());
								}
							}],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_PROGRAMA',
                                    flex: 0.5,
                                    text: 'Nombre del Programa'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_DIVISION',
                                    flex: 0.3,
                                    text: 'División',
									renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        return record.get('NOMBRE_DIVISION');
                                    }
                                },
                                {
                                    xtype: 'progresscolumn',
                                    dataIndex: 'PERCENT_TOTAL',
                                    flex: 0.2,
                                    text: '% Avance'
                                }
                            ],
                            viewConfig: {

                            },
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true,
                                    store: 'dsProgramaAnual',
                                    dock: 'bottom',
									listeners: {
										change: function(paging, pageData, eOpts) {
											if(!Ext.isEmpty(pageData.currentPage) && !Ext.isEmpty(pageData.total) && Ext.isNumber(pageData.currentPage)){
												Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').loadPage(pageData.currentPage);
											}
										}
									}
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
											iconCls: 'btn-add',
                                            text: 'Agrega Programa',
											handler: function () {
												Ext.application({
													name: 'WCF_ENAP',
													stores: ['dsMeses', 'dsTemplate', 'dsProgramaAnual', 'dsDivision', 'dsDepartamento', 'dsOrganizacion'],
													launch: function () {
														Ext.QuickTips.init();
														var addNuevoPrograma = Ext.create('WCF_ENAP.view.ui.NuevoPrograma', {}),
															showWindow = Ext.create('Ext.window.Window', {
																title: 'Agrega un Nuevo Programa',
																maximizable: true,
																modal: true,
																width: 800,
																items: [addNuevoPrograma]
															});
														var groupingSummary = Ext.getCmp('grid_programas_list').getView().getFeature('groupingsummaryprograma');
														groupingSummary.expandAll();
														groupingSummary.disable();
														addNuevoPrograma.show();
														showWindow.show();
														showWindow.on('beforedestroy', function (cmp, eOpts) {
															groupingSummary.enable();
														});
														
														
													}
												});
											}
                                        },
                                        {
                                            xtype: 'button',
											disabled: true,
											iconCls: 'btn-delete',
                                            itemId: 'btn_delete_programa',
											text: 'Eliminar Seleccionado',
											handler: function () {
												var store = Ext.StoreManager.lookup('dsProgramaAnual'),
													grid = Ext.getCmp('grid_programas_list'),
													records = grid.getSelectionModel().getSelection();
												store.remove(records);
											}
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Colapsar',
											iconCls: 'toggle-minus-icon',
											handler: function () {
												var groupingSummary = Ext.getCmp('grid_programas_list').getView().getFeature('groupingsummaryprograma');
												if (this.text == 'Colapsar') {
													groupingSummary.collapseAll();
													this.setText('Expandir');
													this.setIconCls('toggle-plus-icon');
												} else {
													groupingSummary.expandAll();
													this.setText('Colapsar');
													this.setIconCls('toggle-minus-icon');
												}
											}
                                        },
                                        {
                                            xtype: 'button',
											id: 'btn_create_programa_by_template',
											disabled: true,
											iconCls: 'stack-icon',
                                            text: 'Crear a partir de Plantilla',
											handler: function () {
												var store = Ext.StoreManager.lookup('dsProgramaAnual'),
													grid = Ext.getCmp('grid_programas_list'),
													records = grid.getSelectionModel().getSelection();
												store.add(Ext.apply(records[0].data,{'ACTION':'stack','ID_PROGRAMA_ANUAL':null}));
											}
                                        }
                                    ]
                                }
                            ],
                            features: [
                                {
                                    ftype: 'groupingsummary',
									id: 'groupingsummaryprograma',
									groupHeaderTpl: '{name}'
                                }
                            ],
							plugins: [
								{
									ptype: 'rowexpander',
									pluginId: 'rowexpanderprograma',
									rowBodyTpl: [
										'<div style="margin-left: 15px;"><div style="margin-left: 15px; float:left;"><h3>Objetivo & Meta:</h3>{OBJETIVO_META}<br /></div></div>'
									]
								}
							],
							listeners: {
								itemclick: function(view, record, item, index, e, eOpts) {
									this.down('#btn_delete_programa').setDisabled(Ext.isEmpty(record));
									var json, 
										name, 
										i, 
										l, 
										items, 
										series, 
										fields,
										grid = Ext.getCmp('grid_programas_list');
									if (record) {
										if(record.get('IS_TEMPLATE')){
											Ext.getCmp('btn_create_programa_by_template').setDisabled(false);
										} else {
											Ext.getCmp('btn_create_programa_by_template').setDisabled(true);
										}
										var store = Ext.StoreManager.lookup('dsGraphAvanceProgramaAnualById');
										store.load({
											params: { 'ID_PROGRAMA_ANUAL': record.get('ID_PROGRAMA_ANUAL') },
											callback: function (records, operation, success) {
												if (records.length == 0) {
													try{
														Ext.getCmp('chart_prc_p_r_by_programa').surface.removeAll();
														Ext.getCmp('chart_prc_p_r_by_programa').redraw();
													}catch(e){
														//No hay datos en el Gráfico
													}
												}
											}
										});
										try {
											var series = Ext.getCmp('graphAvanceProgramaAnual').series.get(0),
											i, items, l;

											series.highlight = true;
											series.unHighlightItem();
											series.cleanHighlights();
											for (i = 0, items = series.items, l = items.length; i < l; i++) {
												if (records[0].get('ID_DIVISION') == items[i].storeItem.get('ID_DIVISION')) {
													selectedStoreItem = items[i].storeItem;
													series.highlightItem(items[i]);
													break;
												}
											}
											series.highlight = false;
										} catch (e) { }
									}
								},
								afterrender: function (component, eOpts) {

									var me = this,
										plugin = me.getPlugin('rowexpanderprograma'),
										groupingSummary = Ext.getCmp('grid_programas_list').getView().getFeature('groupingsummaryprograma'),
										view = groupingSummary.view,
										viewPlugin = plugin.view;
									view.on('groupcollapse', function (view, node, group, e, eOpts) {
										me.doLayout();
									});
									view.on('groupexpand', function (view, node, group, e, eOpts) {
										me.doLayout();
									});

									viewPlugin.on('groupcollapse', function (view, node, group, e, eOpts) {
										me.doLayout();
									});
									viewPlugin.on('groupexpand', function (view, node, group, e, eOpts) {
										me.doLayout();
									});
									//me.callParent(arguments);
								},
								itemdblclick: function (view, record, item, index, e, options) {
									var idProgramaAnual = record.get("ID_PROGRAMA_ANUAL");

									Ext.application({
										name: 'WCF_ENAP',
										stores: ['dsActividadProgramaAnualPrevencion','dsEvidencia','dsCargo'],
										launch: function () {
											Ext.QuickTips.init();
											var gridProgramaAnual = Ext.create('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
												recordParent: record
											}),
											winActividadProgramaAnual = Ext.create('Ext.window.Window', {
												modal: true,
												width: 850,
												maximizable: true,
												title: record.get('NOMBRE_PROGRAMA'),
												items: [gridProgramaAnual]
											});
											var formulario = winActividadProgramaAnual.getComponent('form_programa_anual');
											var form = formulario.getForm();
											form.loadRecord(record);
											winActividadProgramaAnual.show();
											var dsActividadProgramaAnualPrevencion = Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion');
											var fnListenerActividadProgramaAnual = function (store, records, index, eOpts) {
												/*var selectedYear = Ext.getCmp('panel-ProgramaAnualV2').contextMenuFilters.getComponent(0).getValue();
												Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load({
													params: { 'ANO_INICIO': selectedYear }
												});
												var records = Ext.getCmp('grid_programas_list').getSelectionModel().getSelection();
												if(records[0]){
													Ext.StoreManager.lookup('dsGraphAvanceProgramaAnualById').load({
														params: { 'ID_PROGRAMA_ANUAL': records[0].get('ID_PROGRAMA_ANUAL') },
														callback: function (records, operation, success) {
															if (records.length == 0) {
																Ext.getCmp('chart_prc_p_r_by_programa').surface.removeAll();
																Ext.getCmp('chart_prc_p_r_by_programa').redraw(); ;
															}
														}
													});
												}*/
												Ext.getCmp('grid_programas_list').getStore().load();
												
											};
											dsActividadProgramaAnualPrevencion.on('add',fnListenerActividadProgramaAnual);
											dsActividadProgramaAnualPrevencion.on('remove',fnListenerActividadProgramaAnual);
											dsActividadProgramaAnualPrevencion.on('update',fnListenerActividadProgramaAnual);
										}
									});
									
								}
							}
                        },
                        {
                            xtype: 'panel',
                            height: 400,
                            margin: '0 0 0 5',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Porcentaje de Avance Por Mes',
                            columnWidth: 0.4,
                            items: [
                                {
									xtype: 'chart',
									
									animate: false,
									id: 'chart_prc_p_r_by_programa',
									store: 'dsGraphAvanceProgramaAnualById',
									insetPadding: 30,
									gradients: [{
										angle: 90,
										id: 'bar-gradient',
										stops: {
											0: {
												color: '#99BBE8'
											},
											70: {
												color: '#77AECE'
											},
											100: {
												color: '#77AECE'
											}
										}
									}],
									legend: {
										position: 'bottom'
									},
									axes: [{
										type: 'Numeric',
										minimum: 0,
										maximum: 100,
										position: 'left',
										fields: ['PRC_MES_R'],
										title: false,
										grid: true,
										label: {
											renderer: Ext.util.Format.numberRenderer('0,0'),
											font: '10px Arial'
										}
									}, {
										type: 'Category',
										position: 'bottom',
										fields: ['NOMBRE_MES_R'],
										title: false,
										grid: true,
										label: {
											font: '11px Arial',
											renderer: function (name) {
												return name.substr(0, 3);
											}
										}
									}],
									series: [{
										type: 'column',
										axis: 'left',
										xField: 'NOMBRE_MES_R',
										yField: 'PRC_MES_R',
										style: {
											fill: 'url(#bar-gradient)',
											'stroke-width': 3
										},
										markerConfig: {
											type: 'circle',
											size: 4,
											radius: 4,
											'stroke-width': 0,
											fill: '#38B8BF',
											stroke: '#38B8BF'
										}
									}, {
										type: 'line',
										axis: 'left',
										xField: 'NOMBRE_MES_R',
										yField: 'PROGRAMADO',
										tips: {
											trackMouse: true,
											width: 130,
											height: 25,
											renderer: function (storeItem, item) {
												this.setTitle(storeItem.get('PROGRAMADO') + ' Programada(s) ');
											}
										},
										style: {
											fill: '#18428E',
											stroke: '#18428E',
											'stroke-width': 1
										},
										markerConfig: {
											type: 'circle',
											size: 4,
											radius: 4,
											'stroke-width': 0,
											fill: '#18428E',
											stroke: '#18428E'
										}
									}, {
										type: 'line',
										axis: 'left',
										xField: 'NOMBRE_MES_R',
										yField: 'REALIZADO',
										style: {
											fill: '#38B8BF'
										},
										tips: {
											trackMouse: true,
											width: 130,
											height: 25,
											renderer: function (storeItem, item) {
												this.setTitle(storeItem.get('REALIZADO') + ' realizada(s)');
											}
										}
									}]
								}
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
	afterRender: function () {
        var me = this;
        me.contextMenuFilters.getComponent(0).select((new Date()).getFullYear());
        me.contextMenuFilters.getComponent(0).checkChange();
		
		me.callParent(arguments);
    }
});