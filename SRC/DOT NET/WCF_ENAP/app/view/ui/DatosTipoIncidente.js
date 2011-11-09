Ext.define('WCF_ENAP.view.ui.DatosTipoIncidente', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    maximizable: true,
    cmpPadre: null,
    title: 'Agregar Datos Tipo Incidente',
    initComponent: function () {
        var me = this,
        winAcciones,
        dsPeligroListaTipoIncidentePatrimonio,
        dsCausaListaCondcion,
        dsCausaListaFactoresIngInadecuada,
        dsCausaListaFactoresComprasInadecuadas,
        dsCausaListaFactoresMantenimientoInadecuado,
        dsCausaListaFactoresEstTrabajoInadecuado,
        dsCausaListaFactoresHerrEquioInadecuado,
        dsCausaListaFactoresUsoDesgaste,
        dsCausaListaFactoresAbuso,
        dsCausaListaFactoresErrores;

        dsPeligroListaTipoIncidentePatrimonio = Ext.create('WCF_ENAP.store.dsPeligro', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaCondcion = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresFaltaLiderazgo = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresIngInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresComprasInadecuadas = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresMantenimientoInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresEstTrabajoInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresHerrEquioInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresUsoDesgaste = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresAbuso = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresErrores = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        })


        me.items = [
		                {
                                xtype: 'form',
                                margin: '5 5 5 5',
                                bodyPadding: 10,
                                collapsible: true,
                                layout: 'column',
                                id: 'panel-DatosTipoIncidente',
                                title: 'no personas',
                                 items: [
                                            {
				                                xtype: 'tabpanel',
				                                margin: '0 5 0 0',
				                                bodyPadding: 10,
								                columnWidth: 0.5,
				                                title: 'Datos Trabajador',
				                                items: [
                                                
                                                    {
                                                        xtype: 'panel',
                                                        title: 'Tipo de Incidente a Patrimonio Proceso Medio Ambiente',
                                                        id: 'panel_Tipo_Incidente_PPMA',
                                                        anchor: '100%',
                                                        layout: 'anchor',
                                                        tabIndex: 2,
                                                        items: [
                                                                    {
                                                                        xtype: 'form',
                                                                        margin: '5 5 5 5',
                                                                        bodyPadding: 10,
                                                                        collapsible: true,
                                                                        layout: 'anchor',
                                                                        id: 'panel-TipoIncidentePPMA',
                                                                        title: 'Tipo de Incidente a Patrimonio Proceso Medio Ambiente',
                                                                        items: [
                                                                                   {
                                                                                       xtype: 'itemselector',
                                                                                       id: 'STORE_LIST_TRES',
                                                                                       store: dsPeligroListaTipoIncidentePatrimonio,
                                                                                       anchor: '100%',
                                                                                       displayField: 'NOM_PELIGRO',
                                                                                       valueField: 'ID_PELIGRO'
                                                                                   }
                                                                                ]
                                                                    }
                                                              ]
                                    
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        title: 'Causa Inmediatas Accion',
                                                        id: 'panel_Causas_Inmediatas_Condiciones',
                                                        anchor: '100%',
                                                        layout: 'anchor',
                                                        tabIndex: 2,
                                                        items: [
                                                                    {
                                                                        xtype: 'form',
                                                                        margin: '5 5 5 5',
                                                                        bodyPadding: 10,
                                                                        collapsible: true,
                                                                        layout: 'anchor',
                                                                        id: 'panel-CausaInmediatasCondicion',
                                                                        title: 'Causas Inmediatas Condiciones',
                                                                        items: [
                                                                                   {
                                                                                       xtype: 'itemselector',
                                                                                       id: 'STORE_LIST_CINCO',
                                                                                       store: dsCausaListaCondcion,
                                                                                       anchor: '100%',
                                                                                       displayField: 'DESCRIPCION',
                                                                                       valueField: 'ID_CAUSA'
                                                                                   }
                                                                                ]
                                                                    }
                                                              ]
                                    
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        title: 'Causa Basicas Factores del Trabajo',
                                                        id: 'panel_Causa_Basicas_Factores_del_Trabajo',
                                                        anchor: '100%',
                                                        layout: 'anchor',
                                                        tabIndex: 2,
                                                        items: [
                                                                    {
                                                                        xtype: 'form',
                                                                        margin: '0 0 0 5',
                                                                        bodyPadding: 10,
                                                                        columnWidth: 0.5,
                                                                        title: 'Factores del Trabajo',
                                                                        items: [
                                                                                    {
                                                                                        //11
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresFaltaLiderazgo,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Supervisión Deficientes',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //12
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresIngInadecuada,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Ingeniería Inadecuada',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //13
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresComprasInadecuadas,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Deficiencia en las Adquisiciones',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //14
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresMantenimientoInadecuado,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Mantención Deficiente',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //15
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresHerrEquioInadecuado,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Herramientas y equipos inadecuada',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //16
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresUsoDesgaste,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Uso y Desgaste',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //17
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresAbuso,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'Abuso o Maltrato',
                                                                                        queryMode: 'local'
                                                                                    },
                                                                                    {
                                                                                        //18
                                                                                        xtype: 'combobox',
                                                                                        labelAlign: 'top',
                                                                                        emptyText: 'Seleccione la o las ',
                                                                                        margin: '5 5 5 5',
                                                                                        anchor: '100%',
                                                                                        name: 'ID_CAUSA',
                                                                                        store: dsCausaListaFactoresErrores,
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_CAUSA',
                                                                                        multiSelect: true,
                                                                                        fieldLabel: 'ERRORES',
                                                                                        queryMode: 'local'
                                                                                    }
                                                                                ]
                                                                    }
                                                                    
                                                              ]

                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        title: 'ACCIONES CORRECTIVAS / PREVENTIVAS TOMADAS Y/O RECOMENDADAS',
                                                        id: 'panel_Acciones_Correctivas',
                                                        anchor: '100%',
                                                        layout: 'anchor',
                                                        tabIndex: 2,
                                                        items: [
                                                                  {
                                                                      xtype: 'form',
                                                                      margin: '5 5 5 5',
                                                                      bodyPadding: 10,
                                                                      columnWidth: 0.4,
                                                                      title: 'Acción Correctiva',
                                                                      items: [
                                                                                   {
                                                                                       xtype: 'panel',
                                                                                       border: 0,
                                                                                       layout: {
                                                                                           type: 'column'
                                                                                       },
                                                                                       items: [
		                                                                                     {
		                                                                                         xtype: 'combobox',
		                                                                                         margin: '5 5 5 5',
		                                                                                         name: 'ID_ACCION',
		                                                                                         store: 'dsAccion',
		                                                                                         displayField: 'NOMBRE_ACCION',
		                                                                                         valueField: 'ID_ACCION',
		                                                                                         fieldLabel: 'Acciones',
		                                                                                         emptyText: 'Listado de Acciones Correctivas',
		                                                                                         multiSelect: true,
		                                                                                         allowBlank: false,
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
																					                                            emptyText: 'Accion Correctiva',
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
                                                                                        fieldLabel: 'Responsable',
                                                                                        emptyText: 'Responsable',
                                                                                        allowBlank: false
                                                                                    },
                                                                                    {
                                                                                        xtype: 'panel',
                                                                                        border: 0,
                                                                                        layout: {
                                                                                            type: 'column'
                                                                                        },
                                                                                        items: [
                                                                                            {
                                                                                                xtype: 'datefield',
                                                                                                labelAlign: 'top',
                                                                                                name: 'ID_ACCION_CORRECTIVA',
                                                                                                displayField: 'FECHA_CREACION',
                                                                                                margin: '5 5 5 5',
                                                                                                fieldLabel: 'Fecha Inicio',
                                                                                                anchor: '100%',
                                                                                                store: 'dsAccionCorrectiva',
                                                                                                emptyText: 'Fecha Inicio',
                                                                                                allowBlank: false,
                                                                                                columnWidth: 0.5
                                                                                            },
                                                                                            {
                                                                                                xtype: 'datefield',
                                                                                                labelAlign: 'top',
                                                                                                name: 'ID_ACCION_CORRECTIVA',
                                                                                                displayField: 'FECHA_PLAZO',
                                                                                                margin: '5 5 5 5',
                                                                                                fieldLabel: 'Fecha Plazo',
                                                                                                anchor: '100%',
                                                                                                store: 'dsAccionCorrectiva',
                                                                                                emptyText: 'Fecha Finalizacion',
                                                                                                allowBlank: false,
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
                                                                                        store: 'dsAccionCorrectiva',
                                                                                        displayField: 'DESCRIPCION',
                                                                                        valueField: 'ID_ACCION_CORRECTIVA',
                                                                                        style: 'background-color: white;',
                                                                                        fieldLabel: 'Descripcion de la o las acciones Correctivas',
                                                                                        anchor: '100%'
                                                                                    }
						                                                        ],
                                                                                  buttons: [{
                                                                                      text: 'Agregar',
                                                                                      handler: function () {
                                                                                          var new_object,
                                                                                                                errors,
                                                                                                                form;

                                                                                          form = this.up('form').getForm();
                                                                                          new_object = Ext.create('WCF_ENAP.model.AccionCorrectiva', form.getValues());
                                                                                          errors = new_object.validate();

                                                                                          if (errors.isValid() && form.isValid()) {
                                                                                              this.disable(true);
                                                                                              Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
                                                                                              form.reset();
                                                                                          } else {
                                                                                              form.markInvalid(errors);
                                                                                          }
                                                                                          this.enable(true);
                                                                                      }
                                                                                  }]

                                                                  }

                                                              ]
                                                    }

                                                    ],
                                                    listeners: {
                                                        tabchange: function(tabPanel, newCard, oldCard, options ){
                                                            if (newCard.getId() == 'panel_Tipo_Incidente_PPMA') {
                                                                dsPeligroListaTipoIncidentePatrimonio.load();
                                                            }
                                                            if (newCard.getId() == 'panel_Causas_Inmediatas_Condiciones') {
                                                                dsCausaListaCondcion.load();
                                                            }
                                                            if (newCard.getId() == 'panel_Causa_Basicas_Factores_del_Trabajo') {
                                                                dsCausaListaFactoresIngInadecuada.load();
                                                                dsCausaListaFactoresComprasInadecuadas.load();
                                                                dsCausaListaFactoresMantenimientoInadecuado.load();
                                                                dsCausaListaFactoresEstTrabajoInadecuado.load();
                                                                dsCausaListaFactoresHerrEquioInadecuado.load();
                                                                dsCausaListaFactoresUsoDesgaste.load();
                                                                dsCausaListaFactoresAbuso.load();
                                                                dsCausaListaFactoresErrores.load();
                                                            }
                                                            
                                                        }
                                                    }
                                            }//,
                                            /*{
                                                xtype: 'gridpanel',
                                                margin: '0 0 0 5',
                                                title: 'Listado ...',
                                                columnWidth: 0.5,
                                                store: '',
                                                columns: [
                                                            
                    
                                                        ]
                                           }    */
                                       ] 
                            }   
			];
        me.callParent(arguments);
    }
});