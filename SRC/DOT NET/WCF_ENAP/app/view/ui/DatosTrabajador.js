Ext.define('WCF_ENAP.view.ui.DatosTrabajador', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    maximizable: true,
    cmpPadre: null,
    title: 'Agregar Datos de o los Trabajadores afectados',
    initComponent: function () {
        var me = this,
        winAcciones,
        //tipo incidente persona
        dsPeligroLista,
        //causas inmediatas acciones
        dsCausaListaAccion,
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada,
        dsCausaListaFactoresCapPsicologicaInadecuada,
        dsCausaListaFactoresCapMental,
        dsCausaListaFactoresTencionMental,
        dsCausaListaFactoresFaltaConocimiento,
        dsCausaListaFactoresFaltaHabilidad,
        dsCausaListaFactoresMotivacionInadecuada,
        dsCausaListaFactoresAutocuidado;
        //tipo incidente persona
        dsPeligroLista  = Ext.create('WCF_ENAP.store.dsPeligro', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50,
            
        }),
        //causas inmediatas acciones
        dsCausaListaAccion = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50,
            
        }),
        //inicio
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50,
           
         }),
        dsCausaListaFactoresCapPsicologicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresCapMental = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
         dsCausaListaFactoresTencionMental = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresFaltaConocimiento = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
         dsCausaListaFactoresFaltaHabilidad = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
          dsCausaListaFactoresMotivacionInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresAutocuidado = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        })
        //causas basicas factores de la persona
        //fin
        me.items = [
		{
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'column',
                id: 'panel-Trabajadores',
                title: 'Trabajador',
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
                                        title: 'Datos Generales',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        items:[
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'RUT',
                                                        emptyText: 'Ingrese RUT',
                                                        name: 'RUT_TRABAJADOR',
                                                        allowBlank: false,
                                                        anchor: '100%',
                                                        vtype: 'rut'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Nombres',
                                                        name: 'NOMBRES',
                                                        emptyText: 'Ingrese los Nombres del trabajador',
                                                        allowBlank: false,
                                                        anchor: '100%'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Apellido Paterno',
                                                        emptyText: 'Ingrese Apellido Paterno del Trabajador',
                                                        name: 'APELLIDO_PATERNO',
                                                        allowBlank: false,
                                                        anchor: '100%'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Apellido Materno',
                                                        name: 'APELLIDO_MATERNO',
                                                        emptyText: 'Ingrese Apellido Materno del Trabajador',
                                                        allowBlank: false,
                                                        anchor: '100%'
                                                    },
                                                    {
				                                            xtype: 'combo',
                                                            labelAlign: 'top',
				                                            fieldLabel: 'Cargo',
				                                            name: 'ID_CARGO',
				                                            store: 'dsCargo',
                                                            emptyText: 'Seleccione el cargo del trabajador',
				                                            displayField: 'NOMBRE_CARGO',
				                                            valueField: 'ID_CARGO',
				                                            anchor: '100%',
				                                            allowBlank: false
				                                    },
                                                    {
				                                            xtype: 'radiogroup',
                                                            labelAlign: 'top',
				                                            fieldLabel: 'Calificacion',
                                                            name:'',
                                                            store:'',
                                                            displayField:'',
                                                            valueField: '',
                                                            columns: 2,
                                                            //allowBlank: false,
				                                            items: [
				                                                        { boxLabel: 'Mayor', name: 'calificacion', inputValue: '1' },
                                                                        { boxLabel: 'Leve', name: 'calificacion', inputValue: '4' },
                                                                        { boxLabel: 'Serio', name: 'calificacion', inputValue: '2' },
                                                                        { boxLabel: 'Sin Efecto', name: 'calificacion', inputValue: '5' },  
                                                                        { boxLabel: 'Relevante', name: 'calificacion', inputValue: '3' }
				                                                   ]
				                                    },
                                                    {
                                                        xtype: 'numberfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Años de experiencia Laboral en ENAP',
                                                        name: 'ANOS_EXPERIENCIA_LABORAL',
                                                        name: 'ANOS_EXPERIENCIA_LABORAL',
                                                        //allowBlank: false,
                                                        anchor: '100%',
                                                    },
                                                    {
                                                        xtype: 'numberfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Años de experiencia en el Cargo',
                                                        name: 'ANOS_EXPERIENCIA_CARGO',
                                                        //allowBlank: false,
                                                        anchor: '100%'
                                                    }  
                                                   
				                               ],
                                                buttons: [{
                                                            text: 'Guardar',
                                                            handler: function () {
                                                                var new_object,
                                                                    errors,
                                                                    form;
                        
                                                                form = this.up('form').getForm();
                                                                new_object = Ext.create('WCF_ENAP.model.Trabajador', form.getValues());
                                                                errors = new_object.validate();
                        
                                                                if (errors.isValid() && form.isValid()) {
                                                                    this.disable(true);
                                                                    Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                                    form.reset();
                                                                } else {
                                                                    form.markInvalid(errors);
                                                                }
                                                                this.enable(true);
                                                            }
                                                }]
				                    },
                                    {
                                        xtype: 'panel',
                                        title: 'Tipo de Incidente a Persona',
                                        id: 'panel_tipo_incidente_persona',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 2,
                                        items:[
                                                   {
		                                                xtype: 'form',
		                                                margin: '5 5 5 5',
		                                                bodyPadding: 10,
		                                                collapsible: true,
		                                                layout: 'anchor',
		                                                id: 'panel-TipoIncidentePersona',
		                                                title: 'Tipo de Incidente a Persona',
		                                                items: [
                                                                    {
                                                                        xtype: 'itemselector',
                                                                        id: 'STORE_LIST_DOS',
                                                                        store: dsPeligroLista,
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
                                        id: 'panel_Causa_Inmediatas_Accion',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 2,
                                        items:[
                                                  {
                                                        xtype: 'form',
                                                        margin: '5 5 5 5',
                                                        bodyPadding: 10,
                                                        collapsible: true,
                                                        layout: 'anchor',
                                                        id: 'panel-CausaInmediatasAccion',
                                                        title: 'Causas Inmediatas Acciones',
                                                        items: [
                                                                    {
                                                                        xtype: 'itemselector',
                                                                        id: 'STORE_LIST_CUATRO',
                                                                        store: dsCausaListaAccion,
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
                                        title: 'Facotores de la Personas',
                                        id: 'panel_Facotores_de_la_Personas',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 2,
                                        items:[
                                                  {
                                                        xtype: 'form',
                                                        margin: '0 5 0 0',
                                                        bodyPadding: 10,
                                                        columnWidth: 0.5,
                                                        title: 'Facotores de la Personas',
                                                        items: [    
                                                                    {
                                                                        //4
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresCapFisicaInadecuada,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Capacidad Fisica Inadecuada',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //5
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresCapPsicologicaInadecuada,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Capacidad Psicologica Inadecuada',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //6
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresCapMental,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Tencion Fisica o Fisiologica',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //7
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresTencionMental,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Tencion Mental o Psicologica',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //8
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresFaltaConocimiento,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Falta de Conocimiento',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //9
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresFaltaHabilidad,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Falta de Habilidad',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //10
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresMotivacionInadecuada,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'Motivacion Deficiente',
                                                                        queryMode: 'local'
                                                                    },
                                                                    {
                                                                        //19
                                                                        xtype: 'combobox',
                                                                        labelAlign: 'top',
                                                                        emptyText: 'Seleccione la o las ',
                                                                        margin: '5 5 5 5',
                                                                        anchor: '100%',
                                                                        name: 'ID_CAUSA',
                                                                        store: dsCausaListaFactoresAutocuidado,
                                                                        displayField: 'DESCRIPCION',
                                                                        valueField: 'ID_CAUSA',
                                                                        multiSelect: true,
                                                                        fieldLabel: 'AUTOCUIDADOS',
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
                                        items:[
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
                                            //tipo incidente persona
                                            if(newCard.getId() == 'panel_tipo_incidente_persona'){
                                                dsPeligroLista.load();
                                            }
                                            //causas inmediatas acciones
											if(newCard.getId() == 'panel_Causa_Inmediatas_Accion'){
                                                dsCausaListaAccion.load();
                                            }
                                            //causas basicas factores de la persona
                                            if(newCard.getId() == 'panel_Facotores_de_la_Personas'){
                                                dsCausaListaFactoresCapFisicaInadecuada.load();
                                                dsCausaListaFactoresCapPsicologicaInadecuada.load();
                                                dsCausaListaFactoresCapMental.load();
                                                dsCausaListaFactoresTencionMental.load();
                                                dsCausaListaFactoresFaltaConocimiento.load();
                                                dsCausaListaFactoresFaltaHabilidad.load();
                                                dsCausaListaFactoresMotivacionInadecuada.load();
                                                dsCausaListaFactoresAutocuidado.load(); 
                                            }
                                            if(newCard.getId() == 'panel_Acciones_Correctivas'){
                                                dsCausaListaAccion.load();
                                            }
                                        }
                                    }
                            },
                            {
                                xtype: 'gridpanel',
                                margin: '0 0 0 5',
                                title: 'Listado de Trabajadores',
                                columnWidth: 0.5,
                                store: 'dsTrabajador',
                                columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'RUT_TRABAJADOR',
                                                //flex: 0.12,
                                                text: 'Rut'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'NOMBRES',
                                                editor: {
                                                            xtype: 'textfield',
                                                            name: 'NOMBRES',
                                                            allowBlank: false,
                                                            vtype: 'alpha',
                                                            //flex: 0.15,
                                                            anchor: '100%'
                                                        },
                                                text: 'Nombres'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'APELLIDO_PATERNO',
                                                editor: {
                                                            xtype: 'textfield',
                                                            name: 'APELLIDO_PATERNO',
                                                            allowBlank: false,
                                                            vtype: 'alpha',
                                                            //flex: 0.14,
                                                            anchor: '100%'
                                                        },
                                                text: 'Apellido Paterno'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'APELLIDO_MATERNO',
                                                editor: {
                                                            xtype: 'textfield',
                                                            name: 'APELLIDO_MATERNO',
                                                            allowBlank: false,
                                                            vtype: 'alpha',
                                                            //flex: 0.14,
                                                            anchor: '100%'
                                                        },
                                                text: 'Apellido Materno'
                                            },
                                            {
                                                "xtype": "gridcolumn",
                                                "dataIndex": "ID_CARGO",
                                                "text": "Cargo",
                                                "sortable": true,
                                                "field": {
                                                            "xtype": "combo",
                                                            "displayField": "NOMBRE_CARGO",
                                                            "valueField": "ID_CARGO",
                                                            "anchor": "100%",
                                                            "store": "dsCargo",
                                                            "name": "ID_CARGO"
                                                        },
                                                    "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CARGO', value.toString());
                                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CARGO') : ''
                                                }
                                            },
                                            /*{
                                                "xtype": "gridcolumn",
                                                "dataIndex": "ID_EVENTO",
                                                "text": "Tipo Evento",
                                                "sortable": true,
                                                "field": {
                                                            "xtype": "combo",
                                                            "displayField": "TIPO_EVENTO",
                                                            "valueField": "ID_EVENTO",
                                                            "anchor": "100%",
                                                            "store": "dsEvento",
                                                            "name": "ID_EVENTO"
                                                        },
                                                    "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EVENTO', value.toString());
                                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('TIPO_EVENTO') : ''
                                                }
                                            },*/
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'ANOS_EXPERIENCIA_LABORAL',
                                                editor: {
                                                            xtype: 'textfield',
                                                            name: 'ANOS_EXPERIENCIA_LABORAL',
                                                            allowBlank: false,
                                                            //vtype: 'alpha',
                                                            //flex: 0.14,
                                                            anchor: '100%'
                                                        },
                                                text: 'Años Experiencia Laboral'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'ANOS_EXPERIENCIA_CARGO',
                                                editor: {
                                                            xtype: 'textfield',
                                                            name: 'ANOS_EXPERIENCIA_CARGO',
                                                            allowBlank: false,
                                                            //vtype: 'alpha',
                                                            //flex: 0.14,
                                                            anchor: '100%'
                                                        },
                                                text: 'Años Experiencia Cargo'
                                            }
                    
                                        ],
                                viewConfig: {
                                            },
                                 dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    store: 'dsTrabajador',
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                 plugins: [
                                                Ext.create('Ext.grid.plugin.RowEditing', {
                                            })
                                        ]
                        }    
                       ] 
            }   
			];
        me.callParent(arguments);
    }
});