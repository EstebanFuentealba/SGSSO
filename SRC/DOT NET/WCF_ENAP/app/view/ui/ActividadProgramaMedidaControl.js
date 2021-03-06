﻿Ext.define('WCF_ENAP.view.ui.ActividadProgramaMedidaControl', {
    requires: [
        'Ext.ux.form.field.ClearButton'
    ],
    extend: 'Ext.panel.Panel',
    width: 781,
    autoScroll: true,
    title: 'Crea Actividad de Programa desde Medida de Control',
    id: 'panel-ActividadProgramaMedidaControl',
    initComponent: function () {
        var me = this, 
            winAddCargo, 
            winAddEvidencia;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: 0,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'panel',
                            border: 0,
                            margin: '0 0 5 0',
                            layout: {
                                type: 'column'
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    margin: '0 5 0 0',
                                    title: 'Lugar',
                                    columnWidth: 0.5,
                                    items: [{
                                        xtype: 'combobox',
                                        margin: '5 5 5 5',
                                        labelWidth: 120,
                                        iconCls: 'no-icon',
                                        plugins: ['clearbutton'],
                                        name: 'ID_ORGANIZACION',
                                        fieldLabel: 'Organización',
                                        displayField: 'NOMBRE_ORGANIZACION',
                                        store: 'dsOrganizacion',
                                        emptyText: 'Organización',
                                        valueField: 'ID_ORGANIZACION',
                                        queryMode: 'local',
                                        anchor: '100%',
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
                                    margin: '5 5 5 5',
                                    labelWidth: 120,
                                    fieldLabel: 'Departamento',
                                    name: 'ID_DEPARTAMENTO_ORGANIZACION',
                                    displayField: 'NOMBRE_DEPARTAMENTO',
                                    store: 'dsDepartamento',
                                    valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                                    emptyText: 'Departamento',
                                    queryMode: 'local',
                                    anchor: '100%',
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
                                                store.setProxy(Ext.apply(store.getProxy(), {
                                                    extraParams: {
                                                        'ANO_INICIO': 0,
                                                        'TEMPLATE': false,
                                                        'ID_DEPARTAMENTO_ORGANIZACION': newValue,
                                                        'ID_DIVISION': 0
                                                    }
                                                }))
                                                store.load();
                                            } else {
                                                cmbDiv.setDisabled(true);
                                                store.setProxy(Ext.apply(store.getProxy(), {
                                                    extraParams: {
                                                        'ANO_INICIO': 0,
                                                        'TEMPLATE': false,
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
                                    fieldLabel: 'División',
                                    margin: '5 5 5 5',
                                    labelWidth: 120,
                                    name: 'ID_DIVISION',
                                    displayField: 'NOMBRE_DIVISION',
                                    store: 'dsDivision',
                                    valueField: 'ID_DIVISION',
                                    emptyText: 'División',
                                    anchor: '100%',
                                    queryMode: 'local',
                                    listeners: {
                                        'change': function (cmb, newValue, oldValue, eOpts) {
                                            var store = Ext.StoreManager.lookup('dsProgramaAnual'),
                                                cmbDept = this.prev('combobox'),
                                                cmbProg = Ext.getCmp('cmb_programa_medida');
                                            if (!Ext.isEmpty(newValue) && Ext.isNumber(newValue)) {
                                                store.setProxy(Ext.apply(store.getProxy(), {
                                                    extraParams: {
                                                        'ANO_INICIO': 0,
                                                        'TEMPLATE': false,
                                                        'ID_DIVISION': newValue
                                                    }
                                                }))
                                                store.load({
                                                    callback: function (records, operation, success) {
                                                        cmbProg.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                                    }
                                                });
                                            } else {
                                                cmbProg.setDisabled(true);
                                                store.setProxy(Ext.apply(store.getProxy(), {
                                                    extraParams: {
                                                        'ANO_INICIO': 0,
                                                        'TEMPLATE': false,
                                                        'ID_DEPARTAMENTO_ORGANIZACION': cmbDept.getValue(),
                                                        'ID_DIVISION': 0
                                                    }
                                                }))
                                                store.load();
                                            }
                                        }
                                    }
                                }]
                                },
                                {
                                    xtype: 'form',
                                    title: 'My Panel',
                                    columnWidth: 0.5,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            disabled: true,
                                            plugins: ['clearbutton'],
                                            id: 'cmb_programa_medida',
                                            fieldLabel: 'Asignar a Programa',
                                            margin: '5 5 5 5',
                                            labelWidth: 120,
                                            displayField: 'PROGRAMA',
                                            store: 'dsProgramaAnual',
                                            valueField: 'ID_DIVISION',
                                            anchor: '100%',
                                            pageSize: 10,
                                            listeners: {
                                                change: function (cmb, newValue, oldValue, eOpts) {
                                                    var cmbMCC = this.next('combobox');
                                                    cmbMCC.setDisabled(!(!Ext.isEmpty(newValue) && Ext.isNumber(newValue)));
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            disabled: true,
                                            plugins: ['clearbutton'],
                                            fieldLabel: 'MRCC',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: [
							                        { "name": "ID_PROBABILIDAD", "type": "string" },
							                        { "name": "NOMBRE_PROBABILIDAD", "type": "string" }
						                        ],
                                                data: [
							                        { "ID_PROBABILIDAD": 'B', "NOMBRE_PROBABILIDAD": "Bajo" },
							                        { "ID_PROBABILIDAD": 'M', "NOMBRE_PROBABILIDAD": "Medio" },
							                        { "ID_PROBABILIDAD": 'A', "NOMBRE_PROBABILIDAD": "Alto" }
						                        ]
                                            }),
                                            displayField: 'NOMBRE_PROBABILIDAD',
                                            valueField: 'ID_PROBABILIDAD',
                                            anchor: '100%',
                                            margin: '5 5 5 5',
                                            labelWidth: 120,
                                            name: 'MRCC',
                                            listeners: {
                                                change: function (cmb, newValue, oldValue, eOpts) {

                                                }
                                            }
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: 0,
                            layout: {
                                type: 'column'
                            },
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    margin: '0 5 0 0',
                                    height: 400,
                                    title: 'Medidas de Control asignadas al Departamento',
                                    store: 'dsMedidaDeControl',
                                    columnWidth: 0.5,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'NOM_MEDIDA_DE_CONTROL',
                                            flex: 1,
                                            text: 'String'
                                        }
                                    ],
                                    viewConfig: {

                                }
                            },
                                {
                                    xtype: 'form',
                                    id: 'form_actividad_programa_anual',
                                    bodyPadding: 10,
                                    columnWidth: 0.5,
                                    title: 'Información de la Actividad',
                                    items: [
										{
										    xtype: 'hiddenfield',
										    name: 'ID_PROGRAMA_ANUAL',
										    anchor: '100%'
										},
										{
										    xtype: 'textareafield',
										    fieldLabel: 'Actividad',
										    name: 'NOMBRE_ACTIVIDAD',
										    labelWidth: 120,
										    anchor: '100%'
										},
										{
										    xtype: 'hiddenfield',
										    name: 'ANO_INICIO'
										},
										{
										    xtype: 'combobox',
										    fieldLabel: 'Mes',
										    store: 'dsMeses',
										    valueField: 'ID_MES',
										    labelWidth: 120,
										    anchor: '100%',
										    displayField: 'NOMBRE_MES',
										    queryMode: 'local',
										    name: 'MES_INICIO'
										},
										{
										    xtype: 'panel',
										    border: 0,
										    layout: {
										        type: 'column'
										    },
										    items: [
												{
												    xtype: 'hiddenfield',
												    name: 'ENERO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'FEBRERO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'MARZO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'ABRIL_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'MAYO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'JUNIO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'JULIO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'AGOSTO_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'SEPTIEMBRE_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'OCTUBRE_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'NOVIEMBRE_E'
												},
												{
												    xtype: 'hiddenfield',
												    name: 'DICIEMBRE_E'
												},
												{
												    xtype: 'numberfield',
												    fieldLabel: 'Frecuencia',
												    name: 'CANTIDAD_FRECUENCIA',
												    labelWidth: 120,
												    columnWidth: 0.44
												},
												{
												    xtype: 'hiddenfield',
												    name: 'NOMBRE_FRECUENCIA',
												    id: 'hdd_nombre_frecuencia'
												},
												{
												    xtype: 'combobox',
												    margin: '0 0 0 5',
												    labelWidth: 120,
												    displayField: 'NOMBRE_FRECUENCIA',
												    store: 'dsFrecuencia',
												    valueField: 'ID_FRECUENCIA',
												    columnWidth: 0.5,
												    name: 'TIPO_FRECUENCIA',
												    listeners: {
												        'change': function (cmb, newValue, oldValue, eOpts) {
												            /* Anual */
												            if (newValue == 4) {
												                var winMesesEvaluados = Ext.create('Ext.window.Window', {
												                    modal: true,
												                    height: 188,
												                    width: 762,
												                    title: 'Meses en que se Realizará',
												                    items: [
																			{
																			    xtype: 'form',
																			    margin: '5 5 5 5',
																			    bodyPadding: 10,
																			    items: [
																					{
																					    xtype: 'checkboxgroup',
																					    id: 'chk_group_month_selected',
																					    layout: {
																					        type: 'column'
																					    },
																					    fieldLabel: 'Meses',
																					    columns: 2,
																					    items: [
																							{
																							    xtype: 'checkboxfield',
																							    name: 'ENERO_E',
																							    boxLabel: 'Enero',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'FEBRERO_E',
																							    boxLabel: 'Febrero',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'MARZO_E',
																							    boxLabel: 'Marzo',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'ABRIL_E',
																							    boxLabel: 'Abril',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'MAYO_E',
																							    boxLabel: 'Mayo',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'JUNIO_E',
																							    boxLabel: 'Junio',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'JULIO_E',
																							    boxLabel: 'Julio',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'AGOSTO_E',
																							    boxLabel: 'Agosto',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'SEPTIEMBRE_E',
																							    boxLabel: 'Septiembre',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'OCTUBRE_E',
																							    boxLabel: 'Octubre',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'NOVIEMBRE_E',
																							    boxLabel: 'Noviembre',
																							    columnWidth: 0.25
																							},
																							{
																							    xtype: 'checkboxfield',
																							    name: 'DICIEMBRE_E',
																							    boxLabel: 'Diciembre',
																							    columnWidth: 0.25
																							}

																						],
																					    listeners: {
																					        change: function (field, newValue, oldValue, eOpts) {
																					            var record = Ext.getCmp('form_actividad_programa_anual').getForm().getRecord();
																					            record.set('ENERO_E', false);
																					            record.set('FEBRERO_E', false);
																					            record.set('MARZO_E', false);
																					            record.set('ABRIL_E', false);
																					            record.set('MAYO_E', false);
																					            record.set('JUNIO_E', false);
																					            record.set('JULIO_E', false);
																					            record.set('AGOSTO_E', false);
																					            record.set('SEPTIEMBRE_E', false);
																					            record.set('OCTUBRE_E', false);
																					            record.set('NOVIEMBRE_E', false);
																					            record.set('DICIEMBRE_E', false);
																					            Ext.each(Ext.getCmp('chk_group_month_selected').getChecked(), function (checkbox) {
																					                record.set(checkbox.name, checkbox.value);
																					            });
																					            Ext.getCmp('form_actividad_programa_anual').getForm().loadRecord(record);
																					        }
																					    }
																					}
																				]
																			}
																		]
												                });
												                winMesesEvaluados.show();

												            }
												        }
												    }
												},
												{
												    xtype: 'button',
												    margin: '0 0 0 5',
												    iconCls: 'btn-add',
												    text: '',
												    columnWidth: 0.06
												}
											]
										},
										{
										    xtype: 'panel',
										    border: 0,
										    layout: {
										        type: 'column'
										    },
										    anchor: '100%',
										    items: [
												{
												    xtype: 'combobox',
												    name: 'ID_EVIDENCIA',
												    fieldLabel: 'Evidencia',
												    store: 'dsEvidencia',
												    labelWidth: 120,
												    displayField: 'NOMBRE_EVIDENCIA',
												    valueField: 'ID_EVIDENCIA',
												    columnWidth: 0.94,
												    listeners: {
												        change: function (element, newValue, oldValue, options) {
												            if (!Ext.isEmpty(newValue)) {
												                var record = this.store.getById(newValue);
												                Ext.getCmp('hdd_nombre_evidencia').setValue(record.get('NOMBRE_EVIDENCIA'));
												            }
												        }
												    }
												},
												{
												    xtype: 'hiddenfield',
												    name: 'NOMBRE_EVIDENCIA',
												    id: 'hdd_nombre_evidencia'
												},
												{
												    xtype: 'button',
												    margin: '0 0 0 5',
												    iconCls: 'btn-add',
												    columnWidth: 0.06,
												    handler: function () {
												        if (!winAddEvidencia) {
												            winAddEvidencia = Ext.create('Ext.window.Window', {
												                modal: true,
												                closeAction: 'hide',
												                title: 'Agrega Evidencia',
												                width: 600,
												                items: [{
												                    xtype: 'form',
												                    id: 'Form_Evidencia',
												                    margin: '5 5 5 5',
												                    bodyPadding: 10,
												                    title: 'Datos de Evidencia',
												                    items: [
																		{
																		    "xtype": "textfield",
																		    "fieldLabel": "Nombre Evidencia",
																		    "anchor": "100%",
																		    "name": "NOMBRE_EVIDENCIA",
																		    "labelWidth": 120
																		}
																	],
												                    buttons: [{
												                        text: 'Agregar',
												                        handler: function () {
												                            var new_object,
																				errors,
																				form;

												                            form = this.up('form').getForm();
												                            new_object = Ext.create('WCF_ENAP.model.Evidencia', form.getValues());
												                            errors = new_object.validate();

												                            if (errors.isValid() && form.isValid()) {
												                                this.disable(true);
												                                Ext.data.StoreManager.lookup('dsEvidencia').insert(0, new_object);
												                                form.reset();
												                            } else {
												                                form.markInvalid(errors);
												                            }
												                            this.enable(true);
												                        }
												                    }]
												                }]
												            });
												        }
												        winAddEvidencia.show();
												    }
												}
											]
										},
										{
										    xtype: 'panel',
										    border: 0,
										    layout: {
										        type: 'column'
										    },
										    items: [
												{
												    xtype: 'combobox',
												    fieldLabel: 'Cargo Responsable',
												    labelWidth: 120,
												    displayField: 'NOMBRE_CARGO',
												    store: 'dsCargo',
												    valueField: 'ID_CARGO',
												    columnWidth: 0.94,
												    name: 'ID_CARGO',
												    listeners: {
												        change: function (element, newValue, oldValue, options) {
												            if (!Ext.isEmpty(newValue)) {
												                var record = this.store.getById(newValue);
												                Ext.getCmp('hdd_nombre_cargo').setValue(record.get('NOMBRE_CARGO'));
												            }
												        }
												    }
												},
												{
												    xtype: 'hiddenfield',
												    name: 'NOMBRE_CARGO',
												    id: 'hdd_nombre_cargo'
												},
												{
												    xtype: 'button',
												    margin: '0 0 0 5',
												    iconCls: 'btn-add',
												    columnWidth: 0.06,
												    handler: function () {
												        if (!winAddCargo) {
												            winAddCargo = Ext.create('Ext.window.Window', {
												                modal: true,
												                closeAction: 'hide',
												                title: 'Agrega Cargo',
												                width: 600,
												                items: [
																	{
																	    xtype: 'form',

																	    id: 'Form_Cargo',
																	    margin: '5 5 5 5',
																	    bodyPadding: 10,
																	    title: 'Datos del Cargo',
																	    items: [{ "xtype": "textfield", "fieldLabel": "Nombre Cargo", "anchor": "100%", "name": "NOMBRE_CARGO", "labelWidth": 120}],
																	    buttons: [{
																	        text: 'Agregar',
																	        handler: function () {
																	            var new_object,
																					errors,
																					form;

																	            form = this.up('form').getForm();
																	            new_object = Ext.create('WCF_ENAP.model.Cargo', form.getValues());
																	            errors = new_object.validate();

																	            if (errors.isValid() && form.isValid()) {
																	                this.disable(true);
																	                Ext.data.StoreManager.lookup('dsCargo').insert(0, new_object);
																	                form.reset();
																	            } else {
																	                form.markInvalid(errors);
																	            }
																	            this.enable(true);
																	        }
																	    }]
																	}
																]

												            });

												        }
												        winAddCargo.show();
												    }
												}
											]
										},
										{
										    xtype: 'radiogroup',
										    fieldLabel: 'Turnos',
										    labelWidth: 120,
										    items: [
												{
												    xtype: 'radiofield',
												    boxLabel: 'Evaluar por Separado',
												    name: 'ALL_TURNO',
												    inputValue: 1,
												    listeners: {
												        change: function (field, newValue, oldValue, eOpts) {
												            Ext.getCmp('chk_group_turno_list').setVisible(newValue);
												        }
												    }
												},
												{
												    xtype: 'radiofield',
												    boxLabel: 'Evaluar a todos Juntos',
												    name: 'ALL_TURNO',
												    inputValue: 2
												}
											]
										},
										{
										    xtype: 'checkboxgroup',
										    hidden: true,
										    id: 'chk_group_turno_list',
										    fieldLabel: 'Turnos',
										    items: [
												{
												    xtype: 'checkboxfield',
												    name: 'chk_turno',
												    boxLabel: 'A',
												    checked: true,
												    inputValue: 'A'
												},
												{
												    xtype: 'checkboxfield',
												    name: 'chk_turno',
												    boxLabel: 'B',
												    checked: true,
												    inputValue: 'B'
												},
												{
												    xtype: 'checkboxfield',
												    boxLabel: 'C',
												    name: 'chk_turno',
												    checked: true,
												    inputValue: 'C'
												},
												{
												    xtype: 'checkboxfield',
												    name: 'chk_turno',
												    boxLabel: 'D',
												    checked: true,
												    inputValue: 'D'
												}
											]
										}
									],
                                    buttons: [{
                                        xtype: 'button',
                                        text: 'Guardar',
                                        iconCls: 'btn-add',
                                        handler: function () {
                                            var new_object,
												errors,
												form;

                                            form = Ext.getCmp('form_actividad_programa_anual').getForm();
                                            new_object = Ext.create('WCF_ENAP.model.ActividadProgramaAnualPrevencion', form.getValues());
                                            errors = new_object.validate();
                                            var tipo_turno = new_object.get('ALL_TURNO');


                                            if (errors.isValid() && form.isValid()) {
                                                //this.disable(true);
                                                if (tipo_turno == 1) {
                                                    var records = [];
                                                    var chks = Ext.getCmp('chk_group_turno_list').getValue();
                                                    Ext.each(chks.chk_turno, function (name, index, turnoSelf) {
                                                        var c_new_object = Ext.create('WCF_ENAP.model.ActividadProgramaAnualPrevencion', form.getValues());
                                                        c_new_object.set('TURNO', name);
                                                        records.push(c_new_object);
                                                    });
                                                    Ext.data.StoreManager.lookup('dsActividadProgramaAnualPrevencion').insert(0, records);
                                                } else {
                                                    new_object.set('TURNO', '0');
                                                    Ext.data.StoreManager.lookup('dsActividadProgramaAnualPrevencion').insert(0, new_object);
                                                }
                                                form.reset();
                                                this.up('window').destroy();
                                            } else {
                                                form.markInvalid(errors);
                                            }
                                            //this.enable(true);


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
    }
});