Ext.define('WCF_ENAP.view.ui.DatosAcionesCorrectivas', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    maximizable: true,
    cmpRecord: null,
    title: 'Agregar Datos de Acciones Correctivas',
    initComponent: function () {

        var me = this,
        winAcciones;
        me.items = [
					    {
					        xtype: 'panel',
					        id: 'form_datos_acciones_correctivas',
					        items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'ID_EVENTO',
                                            value: me.cmpRecord.get('ID_EVENTO')
                                        },
                                        {
                                            xtype: 'form',
                                            title: 'Medidas Correctivas o Preventivas',
                                            id: 'panel_Acciones_Correctivas',
                                            anchor: '100%',
                                            margin: '5 5 5 5',
                                            bodyPadding: 10,
                                            layout: 'anchor',
                                            tabIndex: 5,
                                            items: [
												        {
												            xtype: 'form',
												            border: 0,
												            layout: 'column',
												            items: [
															        {
															            xtype: 'combobox',
															            margin: '5 5 5 5',
															            name: 'ID_ACCION',
															            store: 'dsAccion',
															            displayField: 'NOMBRE_ACCION',
															            valueField: 'ID_ACCION',
															            fieldLabel: 'Acción Correctiva',
															            //emptyText: 'Listado de Acciones Correctivas',
															            //allowBlank: false,
															            anchor: '100%',
															            columnWidth: 0.94
															        },
														            {
														                xtype: 'button',
														                margin: '5 5 5 0',
														                iconCls: 'btn-add',
														                columnWidth: 0.06,
														                handler: function () {
														                    if (!winAcciones) {
														                        winAcciones = Ext.create('Ext.window.Window', {
														                            width: 673,
														                            closeAction: 'hide',
														                            title: 'Ingresa una nueva Empresa',
														                            modal: true,
														                            items: [
														                            // ...Formulario ...
																				            {
																				            xtype: 'form',
																				            id: 'Form_NewAccion',
																				            collapsible: true,
																				            margin: '5 5 5 5',
																				            bodyPadding: 10,
																				            title: 'Ingrese nueva Accion',
																				            items: [
																						                {
																						                    xtype: 'textfield',
																						                    labelAlign: 'top',
																						                    margin: '5 5 5 5',
																						                    name: 'NOMBRE_ACCION',
																						                    store: 'dsAccion',
																						                    anchor: '100%',
																						                    displayField: 'NOMBRE_ACCION',
																						                    valueField: 'ID_ACCION',
																						                    fieldLabel: 'Accion',
																						                    emptyText: 'Acción Correctiva',
																						                    allowBlank: false
																						                }

																					                ],
																				            buttons: [{
																				                text: 'Agregar',
																				                handler: function () {
																				                    var new_object,
																								            errors,
																								            form;

																				                    form = this.up('form').getForm();
																				                    new_object = Ext.create('WCF_ENAP.model.Accion', form.getValues());
																				                    errors = new_object.validate();

																				                    if (errors.isValid() && form.isValid()) {
																				                        this.disable(true);
																				                        Ext.data.StoreManager.lookup('dsAccion').insert(0, new_object);
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
														                    winAcciones.show();
														                }
														            }
													            ]
												        },
												        {
												            xtype: 'combobox',
												            margin: '5 5 5 5',
												            anchor: '100%',
												            name: 'ID_CARGO',
												            store: 'dsCargo',
												            displayField: 'NOMBRE_CARGO',
												            valueField: 'ID_CARGO',
												            multiSelect: true,
												            fieldLabel: 'Responsable(s)',
												            emptyText: 'Selecciona Responsable(s)',
												            allowBlank: false
												        },
												        {
												            xtype: 'form',
												            border: 0,
												            items: [
														                {
														                    xtype: 'datefield',
														                    labelAlign: 'top',
														                    name: 'FECHA_PLAZO',
														                    margin: '5 5 5 5',
														                    fieldLabel: 'Fecha de Ejecución',
														                    anchor: '100%',
														                    emptyText: 'Fecha de Ejecución',
														                    columnWidth: 0.5
														                }
													                ]
												        },
												        {
												            xtype: 'htmleditor',
												            labelAlign: 'top',
												            height: 150,
												            margin: '5 5 5 5',
												            name: 'ID_ACCION_CORRECTIVA',
												            style: 'background-color: white;',
												            fieldLabel: 'Descripción de la o las acciones Correctivas',
												            anchor: '100%'
												        }
									],
                                            buttons: [
	                                                {
	                                                    text: 'Guardar',
	                                                    handler: function () {
	                                                        var new_object,
															errors,
															form,
		                                                    values;
	                                                        values = Ext.getCmp('form_datos_acciones_correctivas').getForm().getValues();
	                                                       	                                                       
                                                            new_object = Ext.create('WCF_ENAP.model.DatosAcionesCorrectivas', formValues);
	                                                        Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
	                                                    }
	                                                }
												]
                                        }
                            ]
					    }
			];
        me.callParent(arguments);
    }
});
