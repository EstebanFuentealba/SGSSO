Ext.define('WCF_ENAP.view.ui.DatosTipoIncidente', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    maximizable: true,
    cmpRecord: null,
    title: 'Agregar Datos Tipo Incidente',
    initComponent: function () {

        var me = this,
        winAcciones,
        dsPeligroListaTipoIncidentePatrimonio,
        dsCausaListaCondcion,
        dsCausaListaFactoresIngInadecuada,
        dsCausaListaFactoresComprasInadecuadas,
        dsCausaListaFactoresMantenimientoInadecuado,
        dsCausaListaFactoresFaltaLiderazgo,
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
						    id: 'form_datos_incidente_patrimonio',
						    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'ID_EVENTO',
                                            value: me.cmpRecord.get('ID_EVENTO')
                                        },
										{
										    xtype: 'tabpanel',
										    margin: '5 5 5 5',
										    bodyPadding: 10,
										    layout: 'column',
										    id: 'panel-DatosTipoIncidente',
										    items: [
                                                            {
                                                                xtype: 'radiogroup',
                                                                labelAlign: 'top',
                                                                fieldLabel: 'Clasificacion',
                                                                columns: 2,
                                                                columnWidth: .5,
                                                                title: 'Calificacion del Incidente',
                                                                items: [
																			{ boxLabel: 'Mayor', name: 'CLASIFICACION', inputValue: '1' },
																			{ boxLabel: 'Leve', name: 'CLASIFICACION', inputValue: '4' },
																			{ boxLabel: 'Serio', name: 'CLASIFICACION', inputValue: '2' },
																			{ boxLabel: 'Sin Efecto', name: 'CLASIFICACION', inputValue: '5' },
																			{ boxLabel: 'Relevante', name: 'CLASIFICACION', inputValue: '3' }
																		],
                                                                buttons: [{
                                                                    text: 'Siguiente >>>',
                                                                    handler: function () {
                                                                        var new_object,
																	    errors,
																	    form;
                                                                        form = this.up('form').getForm();
                                                                        // verificar model!!
                                                                        new_object = Ext.create('WCF_ENAP.model.Trabajador', form.getValues());
                                                                        errors = new_object.validate();
                                                                        if (errors.isValid() && form.isValid()) {
                                                                            this.disable(true);
                                                                            //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                                            this.up('tabpanel').setActiveTab(1);
                                                                        }
                                                                        else {
                                                                            form.markInvalid(errors);
                                                                        }
                                                                        this.enable(true);
                                                                    }
                                                                }]

                                                            },
				                                            {
				                                                xtype: 'form',
				                                                anchor: '100%',
				                                                layout: 'anchor',
				                                                tabIndex: 1,
				                                                title: 'Tipo de Incidente a Patrimonio Proceso Medio Ambiente',
				                                                id: 'panel-TipoIncidentePPMA',
				                                                
				                                                items: [
																			{
																			    xtype: 'itemselector',
																			    id: 'TIPO_INCIDENTE_PATRIMONIO',
																			    name: 'TIPO_INCIDENTE_PATRIMONIO',
																			    store: dsPeligroListaTipoIncidentePatrimonio,
																			    anchor: '100%',
																			    displayField: 'NOM_PELIGRO',
																			    valueField: 'ID_PELIGRO'
																			}
																		],
																			buttons: [{
																			    text: '<<< Anterior',
																			    handler: function () {
																			        var new_object,
					                                                                errors,
					                                                                form;
																			        form = this.up('form').getForm();
																			        new_object = Ext.create('WCF_ENAP.model.Peligro', form.getValues());
																			        errors = new_object.validate();
																			        if (errors.isValid() && form.isValid()) {
																			            this.disable(true);
																			            //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
																			            this.up('tabpanel').setActiveTab(0);
																			            //form.reset();
																			        }
																			        else {
																			            form.markInvalid(errors);
																			        }
																			        this.enable(true);
																			    }
																			}, {
																			    text: 'Siguiente >>>',
																			    handler: function () {
																			        var new_object,
					                                                                errors,
					                                                                form;
																			        form = this.up('form').getForm();
																			        new_object = Ext.create('WCF_ENAP.model.Peligro', form.getValues());
																			        errors = new_object.validate();
																			        if (errors.isValid() && form.isValid()) {
																			            this.disable(true);
																			            //Ext.data.StoreManager.lookup(dsCausaListaAccion).insert(0, new_object);
																			            this.up('tabpanel').setActiveTab(2);
																			            //form.reset();
																			        }
																			        else {
																			            form.markInvalid(errors);
																			        }
																			        this.enable(true);
																			    }
																			}]
				                                            },
															{
															    xtype: 'form',
															    anchor: '100%',
															    layout: 'anchor',
															    tabIndex: 2,
															    id: 'panel-CausaInmediatasCondicion',
															    title: 'Causas Inmediatas Condiciones',
															    items: [
																			{
																			    xtype: 'itemselector',
																			    id: 'CAUSA_INMEDIATA_ACCION_PATRIMONIO',
																			    name: 'CAUSA_INMEDIATA_ACCION_PATRIMONIO',
																			    store: dsCausaListaCondcion,
																			    anchor: '100%',
																			    displayField: 'DESCRIPCION',
																			    valueField: 'ID_CAUSA'
																			}
																		],
															    buttons: [{
															        text: '<<< Anterior',
															        handler: function () {
															            var new_object,
				                                                            errors,
				                                                            form;
															            form = this.up('form').getForm();
															            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
															            errors = new_object.validate();
															            if (errors.isValid() && form.isValid()) {
															                this.disable(true);
															                //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
															                this.up('tabpanel').setActiveTab(1);
															            }
															            else {
															                form.markInvalid(errors);
															            }
															            this.enable(true);
															        }
															    }, {
															        text: 'Siguiente >>>',
															        handler: function () {
															            var new_object,
				                                                            errors,
				                                                            form;
															            form = this.up('form').getForm();
															            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
															            errors = new_object.validate();
															            if (errors.isValid() && form.isValid()) {
															                this.disable(true);
															                //Ext.data.StoreManager.lookup(dsCausaListaAccion).insert(0, new_object);
															                this.up('tabpanel').setActiveTab(3);
															            }
															            else {
															                form.markInvalid(errors);
															            }
															            this.enable(true);
															        }
															    }]
															},
															{
															    xtype: 'form',
															    tabIndex: 3,
															    anchor: '100%',
															    layout: 'anchor',
															    id: 'panel-FactoresdelTrabajo',
															    title: 'Factores del Trabajo',
															    items: [
																			{
																			    //11
																			    xtype: 'combobox',
																			    labelAlign: 'top',
																			    emptyText: 'Seleccione la o las ',
																			    margin: '5 5 5 5',
																			    anchor: '100%',
																			    name: 'CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO',
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
																			    name: 'CAUSA_LISTA_FACTORES_ING_INADECUADA',
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
																			    name: 'CAUSA_LISTA_FACTORES_COMPRAS_INADECUADAS',
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
																			    name: 'CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADO',
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
																			    name: 'CAUSA_LISTA_FACTORES_HERRAMIENTAS_INADECUADAS',
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
																			    name: 'CAUSA_LISTA_FACTORES_USO_DESGASTE',
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
																			    name: 'CAUSA_LISTA_FACTORES_ABUSO',
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
																			    name: 'CAUSA_LISTA_FACTORES_ERRORES',
																			    store: dsCausaListaFactoresErrores,
																			    displayField: 'DESCRIPCION',
																			    valueField: 'ID_CAUSA',
																			    multiSelect: true,
																			    fieldLabel: 'ERRORES',
																			    queryMode: 'local'
																			}
																		],
															    buttons: [{
															        text: '<<< Anterior',
															        handler: function () {
															            var new_object,
				                                                            errors,
				                                                            form;
															            form = this.up('form').getForm();
															            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
															            errors = new_object.validate();
															            if (errors.isValid() && form.isValid()) {
															                this.disable(true);
															                //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
															                this.up('tabpanel').setActiveTab(2);
															            }
															            else {
															                form.markInvalid(errors);
															            }
															            this.enable(true);
															        }
															    }, {
															        text: 'Guardar',
															        handler: function () {
															            var new_object,
																			errors,
																			form,
                                                                            values;
															            values = Ext.getCmp('form_datos_incidente_patrimonio').getForm().getValues();

															            var formValues = Ext.apply({
															               'TIPO_INCIDENTE_PATRIMONIO_LIST': Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').getRawValue(),
															               'CAUSA_INMEDIATA_ACCION_PATRIMONIO_LIST': Ext.getCmp('CAUSA_INMEDIATA_ACCION_PATRIMONIO').getRawValue()
															            }, values);

															           new_object = Ext.create('WCF_ENAP.model.e0063', formValues);
                                                                       
															           Ext.data.StoreManager.lookup('e0063').insert(0, new_object);
															        }
															    }]
															}
				                                       ],
										    listeners: {
										        tabchange: function (tabPanel, newCard, oldCard, options) {

										            if (newCard.getId() == 'panel-TipoIncidentePPMA') {
										                dsPeligroListaTipoIncidentePatrimonio.load({
										                    params: { 'TIPO_PELIGRO': 2 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										            }
										            if (newCard.getId() == 'panel-CausaInmediatasCondicion') {
										                dsCausaListaCondcion.load({
										                    params: { 'TIPO_CAUSA': 3 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										            }
										            if (newCard.getId() == 'panel-FactoresdelTrabajo') {
										                dsCausaListaFactoresFaltaLiderazgo.load({
										                    params: { 'TIPO_CAUSA': 11 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresIngInadecuada.load({
										                    params: { 'TIPO_CAUSA': 12 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresComprasInadecuadas.load({
										                    params: { 'TIPO_CAUSA': 13 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresMantenimientoInadecuado.load({
										                    params: { 'TIPO_CAUSA': 15 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresHerrEquioInadecuado.load({
										                    params: { 'TIPO_CAUSA': 16 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresUsoDesgaste.load({
										                    params: { 'TIPO_CAUSA': 17 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresAbuso.load({
										                    params: { 'TIPO_CAUSA': 18 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										                dsCausaListaFactoresErrores.load({
										                    params: { 'TIPO_CAUSA': 20 },
										                    callback: function (records, operation, success) {
										                    }
										                });
										            }

										        }
										    }
										}
									]
						}

			];
        me.callParent(arguments);
    }
});