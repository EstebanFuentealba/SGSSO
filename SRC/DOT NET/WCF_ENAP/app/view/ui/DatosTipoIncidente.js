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
										    xtype: 'tabpanel',
										    margin: '5 5 5 5',
										    bodyPadding: 10,
										    layout: 'column',
										    id: 'panel-DatosTipoIncidente',
										    items: [
				                                            {
				                                                xtype: 'form',
				                                                anchor: '100%',
				                                                layout: 'anchor',
				                                                //tabIndex: 1,
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
																		],
				                                                buttons: [{
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
				                                                            //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
				                                                            this.up('tabpanel').setActiveTab(1);
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
																			    id: 'STORE_LIST_CINCO',
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
															            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
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
															                //form.reset();
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
				                                                            form;
															            form = this.up('form').getForm();
															            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
															            errors = new_object.validate();
															            if (errors.isValid() && form.isValid()) {
															                this.disable(true);
															                //Ext.data.StoreManager.lookup(dsCausaListaAccion).insert(0, new_object);
															                this.up('tabpanel').setActiveTab(3);
															                //form.reset();
															            }
															            else {
															                form.markInvalid(errors);
															            }
															            this.enable(true);
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