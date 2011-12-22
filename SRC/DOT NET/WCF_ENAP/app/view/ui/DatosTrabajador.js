Ext.define('WCF_ENAP.view.ui.DatosTrabajador', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector',
        'Ext.ux.form.field.BoxSelect'
    ],
    modal: true,
    width: 900,
    layout: 'anchor',
    maximizable: true,
    cmpRecord: null,
    title: 'Información del Incidente',
    initComponent: function () {

        var me = this,
        winAcciones,
        dsPeligroLista,
        dsCausaListaAccion,
        dsCausaListaFactoresCapFisicaInadecuada,
        dsCausaListaFactoresCapPsicologicaInadecuada,
        dsCausaListaFactoresCapMental,
        dsCausaListaFactoresTencionMental,
        dsCausaListaFactoresFaltaConocimiento,
        dsCausaListaFactoresFaltaHabilidad,
        dsCausaListaFactoresMotivacionInadecuada,
        dsCausaListaFactoresAutocuidado,
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
        var dsPeligroListaTipoIncidentePatrimonio = Ext.create('WCF_ENAP.store.dsPeligro', {
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
        });

        //tipo incidente persona
        dsPeligroLista = Ext.create('WCF_ENAP.store.dsPeligro', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        //causas inmediatas acciones
        dsCausaListaAccion = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        //inicio
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
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
        });

        me.items = [
			{
			    xtype: 'form',
			    border: 0,
			    id: 'form_informe_preliminar',
			    items: [
					{
					    xtype: 'hiddenfield',
					    name: 'ID_EVENTO',
					    value: me.cmpRecord.get('ID_EVENTO')
					},
                    {
                        xtype: 'hiddenfield',
                        name: 'ID_EVENTO_EMPRESA',
                        value: me.cmpRecord.get('ID_EVENTO_EMPRESA')
                    },
					{
					    xtype: 'tabpanel',
					    activeTab: 0,
					    margin: '5 5 5 5',
					    border: 0,
					    items: [
								{
								    xtype: 'form',
								    id: 'form_afecta_a',
								    bodyPadding: 10,
								    title: 'Afecta a',
								    items: [
                                                    {
                                                        xtype: 'checkboxgroup',
                                                        fieldLabel: 'Afecta a',
                                                        labelAlign: 'top',
                                                        items: [
                                                            {
                                                                xtype: 'checkboxfield',
                                                                name: 'AFECTA_PERSONA',
                                                                boxLabel: 'Personas',
                                                                listeners: {
                                                                    change: function (field, newValue, oldValue, eOpts) {
                                                                        var checked = field.getValue();
                                                                        this.up('form').down('panel').down('radiogroup').setDisabled(!checked);
                                                                        Ext.getCmp('form_afecta_trabajador').setDisabled(!checked);
                                                                        Ext.getCmp('form_tipo_incidente_persona').setDisabled(!checked);
                                                                        this.up('form').down('panel').down('radiogroup').allowBlank = !checked;

                                                                        if (checked) {
                                                                            Ext.getCmp('TIPO_INCIDENTE_PERSONA').minSelections = 1;
                                                                            if (dsPeligroLista.count() == 0) {
                                                                                dsPeligroLista.load({ params: { 'TIPO_PELIGRO': 1} });
                                                                            }
                                                                        } else {
                                                                            Ext.getCmp('TIPO_INCIDENTE_PERSONA').minSelections = 0;
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                name: 'AFECTA_PATRIMONIO',
                                                                boxLabel: 'Patrimonio',
                                                                listeners: {
                                                                    change: function (field, newValue, oldValue, eOpts) {
                                                                        var patrimonioChecked = field.getValue(),
                                                                            perdidaProcesoChecked = field.next('checkboxfield').getValue(),
                                                                            medioAmbienteChecked = field.next('checkboxfield').next('checkboxfield').getValue(),
                                                                            imagenChecked = field.next('checkboxfield').next('checkboxfield').next('checkboxfield').getValue();
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').setDisabled(!patrimonioChecked);
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').allowBlank = !patrimonioChecked;

                                                                        Ext.getCmp('form_incidente_patrimonio').setDisabled(!(patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked));
                                                                        Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').minSelections = (patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked) ? 1 : 0;
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                name: 'AFECTA_PERDIDA_PROCESO',
                                                                boxLabel: 'Pérdida de Proceso',
                                                                listeners: {
                                                                    change: function (field, newValue, oldValue, eOpts) {
                                                                        var perdidaProcesoChecked = field.getValue(),
                                                                            patrimonioChecked = field.prev('checkboxfield').getValue(),
                                                                            medioAmbienteChecked = field.next('checkboxfield').getValue(),
                                                                            imagenChecked = field.next('checkboxfield').next('checkboxfield').getValue();
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').setDisabled(!perdidaProcesoChecked);
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').allowBlank = !perdidaProcesoChecked;
                                                                        Ext.getCmp('form_incidente_patrimonio').setDisabled(!(patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked));
                                                                        Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').minSelections = (patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked) ? 1 : 0;
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                name: 'AFECTA_MEDIO_AMBIENTE',
                                                                boxLabel: 'Medio Ambiente',
                                                                listeners: {
                                                                    change: function (field, newValue, oldValue, eOpts) {
                                                                        var perdidaProcesoChecked = field.prev('checkboxfield').getValue(),
                                                                            patrimonioChecked = field.prev('checkboxfield').prev('checkboxfield').getValue(),
                                                                            medioAmbienteChecked = field.getValue(),
                                                                            imagenChecked = field.next('checkboxfield').getValue();
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').setDisabled(!medioAmbienteChecked);
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').allowBlank = !medioAmbienteChecked;

                                                                        Ext.getCmp('form_incidente_patrimonio').setDisabled(!(patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked));
                                                                        Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').minSelections = (patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked) ? 1 : 0;
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                name: 'AFECTA_IMAGEN',
                                                                boxLabel: 'Imágen',
                                                                listeners: {
                                                                    change: function (field, newValue, oldValue, eOpts) {
                                                                        var perdidaProcesoChecked = field.prev('checkboxfield').prev('checkboxfield').getValue(),
                                                                            patrimonioChecked = field.prev('checkboxfield').prev('checkboxfield').prev('checkboxfield').getValue(),
                                                                            medioAmbienteChecked = field.prev('checkboxfield').getValue(),
                                                                            imagenChecked = field.getValue();
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').setDisabled(!imagenChecked);
                                                                        this.up('form').down('panel').down('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').next('radiogroup').allowBlank = !imagenChecked;

                                                                        Ext.getCmp('form_incidente_patrimonio').setDisabled(!(patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked));
                                                                        Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').minSelections = (patrimonioChecked || perdidaProcesoChecked || medioAmbienteChecked || imagenChecked) ? 1 : 0;
                                                                    }
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
                                                                xtype: 'radiogroup',
                                                                disabled: true,
                                                                fieldLabel: 'Calificación de Incidente que afecta a Persona',
                                                                labelAlign: 'top',
                                                                columns: 2,
                                                                columnWidth: 0.5,
                                                                items: [
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_TRABAJADOR',
                                                                        boxLabel: 'Mayor',
                                                                        inputValue: 1
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_TRABAJADOR',
                                                                        boxLabel: 'Leve',
                                                                        inputValue: 4
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_TRABAJADOR',
                                                                        boxLabel: 'Serio',
                                                                        inputValue: 2
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_TRABAJADOR',
                                                                        boxLabel: 'Sin efecto',
                                                                        inputValue: 5
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_TRABAJADOR',
                                                                        boxLabel: 'Relevante',
                                                                        inputValue: 3
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'radiogroup',
                                                                disabled: true,
                                                                fieldLabel: 'Calificación de Incidente que afecta a Patrimonio',
                                                                labelAlign: 'top',
                                                                columns: 2,
                                                                columnWidth: 0.5,
                                                                items: [
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PATRIMONIO',
                                                                        boxLabel: 'Mayor',
                                                                        inputValue: 1
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PATRIMONIO',
                                                                        boxLabel: 'Leve',
                                                                        inputValue: 4
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PATRIMONIO',
                                                                        fieldLabel: '',
                                                                        boxLabel: 'Serio',
                                                                        inputValue: 2
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PATRIMONIO',
                                                                        boxLabel: 'Sin efecto',
                                                                        inputValue: 5
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PATRIMONIO',
                                                                        boxLabel: 'Relevante',
                                                                        inputValue: 3
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'radiogroup',
                                                                disabled: true,
                                                                fieldLabel: 'Calificación de Incidente que afecta a Medio Ambiente Laboral ',
                                                                labelAlign: 'top',
                                                                columns: 2,
                                                                columnWidth: 0.5,
                                                                items: [
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_MEDIO_AMBIENTE',
                                                                        boxLabel: 'Mayor',
                                                                        inputValue: 1
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_MEDIO_AMBIENTE',
                                                                        boxLabel: 'Leve',
                                                                        inputValue: 4
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_MEDIO_AMBIENTE',
                                                                        fieldLabel: '',
                                                                        boxLabel: 'Serio',
                                                                        inputValue: 2
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_MEDIO_AMBIENTE',
                                                                        boxLabel: 'Sin efecto',
                                                                        inputValue: 5
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_MEDIO_AMBIENTE',
                                                                        boxLabel: 'Relevante',
                                                                        inputValue: 3
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'radiogroup',
                                                                disabled: true,
                                                                fieldLabel: 'Calificación de Incidente que afecta a Perdida de Proceso',
                                                                labelAlign: 'top',
                                                                columns: 2,
                                                                columnWidth: 0.5,
                                                                items: [
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PERDIDA_PROCESO',
                                                                        boxLabel: 'Mayor',
                                                                        inputValue: 1
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PERDIDA_PROCESO',
                                                                        boxLabel: 'Leve',
                                                                        inputValue: 4
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PERDIDA_PROCESO',
                                                                        fieldLabel: '',
                                                                        boxLabel: 'Serio',
                                                                        inputValue: 2
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PERDIDA_PROCESO',
                                                                        boxLabel: 'Sin efecto',
                                                                        inputValue: 5
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_PERDIDA_PROCESO',
                                                                        boxLabel: 'Relevante',
                                                                        inputValue: 3
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'radiogroup',
                                                                disabled: true,
                                                                fieldLabel: 'Calificación de Incidente que afecta a Imagen',
                                                                labelAlign: 'top',
                                                                columns: 2,
                                                                columnWidth: 0.5,
                                                                items: [
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_IMAGEN',
                                                                        boxLabel: 'Mayor',
                                                                        inputValue: 1
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_IMAGEN',
                                                                        boxLabel: 'Leve',
                                                                        inputValue: 4
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_IMAGEN',
                                                                        boxLabel: 'Serio',
                                                                        inputValue: 2
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_IMAGEN',
                                                                        boxLabel: 'Sin efecto',
                                                                        inputValue: 5
                                                                    },
                                                                    {
                                                                        xtype: 'radiofield',
                                                                        name: 'CLASIFICACION_IMAGEN',
                                                                        boxLabel: 'Relevante',
                                                                        inputValue: 3
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
								    buttons: [
													{
													    text: 'Siguiente',
													    handler: function () {
													        var new_object,
																errors,
																form;
													        form = this.up('form').getForm();
													        new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
													        errors = new_object.validate();
													        if (errors.isValid() && form.isValid()) {
													            this.up('tabpanel').setActiveTab(((Ext.getCmp('form_incidente_patrimonio').isDisabled()) ? ((Ext.getCmp('form_tipo_incidente_persona').isDisabled()) ? 3 : 2) : 1));
													        } else {
													            form.markInvalid(errors);
													        }
													    }
													}
												]
								}

				                ,
                                {
                                    xtype: 'form',
                                    id: 'form_incidente_patrimonio',
                                    disabled: true,
                                    title: 'Tipo de Incidente de Otros',
                                    items: [
                                        {
                                            xtype: 'itemselector',
                                            msgTarget: 'side',
                                            margin: '5 5 5 5',
                                            id: 'TIPO_INCIDENTE_PATRIMONIO',
                                            name: 'TIPO_INCIDENTE_PATRIMONIO',
                                            store: dsPeligroListaTipoIncidentePatrimonio,
                                            anchor: '100%',
                                            displayField: 'NOM_PELIGRO',
                                            valueField: 'ID_PELIGRO'
                                        }
                                    ],
                                    buttons: [
									    {
									        text: 'Anterior',
									        handler: function () {
									            var new_object,
												    errors,
												    form;
									            form = this.up('form').getForm();
									            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
									            errors = new_object.validate();
									            if (errors.isValid() && form.isValid()) {
									                this.up('tabpanel').setActiveTab(0);
									            } else {
									                form.markInvalid(errors);
									            }
									        }
									    },
                                        {
                                            text: 'Siguiente',
                                            handler: function () {
                                                var new_object,
												    errors,
												    form;
                                                form = this.up('form').getForm();
                                                new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                                                errors = new_object.validate();
                                                if (errors.isValid() && form.isValid()) {
                                                    this.up('tabpanel').setActiveTab(((Ext.getCmp('form_tipo_incidente_persona').isDisabled()) ? 4 : 2));
                                                } else {
                                                    form.markInvalid(errors);
                                                }
                                            }
                                        }
									]
                                },
                                            {
                                                xtype: 'form',
                                                id: 'form_tipo_incidente_persona',
                                                disabled: true,
                                                title: 'Tipo Incidente de Persona',
                                                items: [
                                                    {
                                                        xtype: 'itemselector',
                                                        msgTarget: 'side',
                                                        margin: '5 5 5 5',
                                                        id: 'TIPO_INCIDENTE_PERSONA',
                                                        name: 'TIPO_INCIDENTE_PERSONA',
                                                        store: dsPeligroLista,
                                                        anchor: '100%',
                                                        displayField: 'NOM_PELIGRO',
                                                        valueField: 'ID_PELIGRO'
                                                    }
                                                ],
                                                buttons: [
				                                    {
				                                        text: 'Anterior',
				                                        handler: function () {
				                                            var new_object,
							                                    errors,
							                                    form;
				                                            form = this.up('form').getForm();
				                                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                                            errors = new_object.validate();
				                                            if (errors.isValid() && form.isValid()) {
				                                                this.up('tabpanel').setActiveTab((Ext.getCmp('form_incidente_patrimonio').isDisabled()) ? 0 : 1);
				                                            } else {
				                                                form.markInvalid(errors);
				                                            }
				                                        }
				                                    }, {
				                                        text: 'Siguiente',
				                                        handler: function () {
				                                            var new_object,
							                                    errors,
							                                    form;
				                                            form = this.up('form').getForm();
				                                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                                            errors = new_object.validate();
				                                            if (errors.isValid() && form.isValid()) {
				                                                this.up('tabpanel').setActiveTab(3);
				                                            } else {
				                                                form.markInvalid(errors);
				                                            }
				                                        }
				                                    }
			                                    ]
                                            },
                            {
                                xtype: 'form',
                                title: 'Trabajadores Involucrados',
                                id: 'form_afecta_trabajador',
                                disabled: true,
                                items: [
                                    {
                                        xtype: 'panel',
                                        border: 0,
                                        margin: '5 5 5 5',
                                        layout: {
                                            type: 'column'
                                        },
                                        items: [
                                            {
                                                xtype: 'tabpanel',
                                                margin: '5 5 5 5',
                                                bodyPadding: 10,
                                                activeTab: 0,
                                                columnWidth: 0.5,
                                                items: [
                                                    {
                                                        xtype: 'form',
                                                        id: 'form_datos_trabajador',
                                                        defaults: {
                                                            defaults: {
                                                                margin: '5 5 5 5'
                                                            }
                                                        },
                                                        layout: {
                                                            type: 'column'
                                                        },
                                                        title: 'Antecedentes Generales',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '5 5 5 5',
                                                                name: 'RUT_TRABAJADOR',
                                                                fieldLabel: 'RUT',
                                                                labelAlign: 'top',
                                                                allowBlank: false,
                                                                emptyText: 'Ingrese RUT',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '5 5 5 5',
                                                                name: 'NOMBRES',
                                                                fieldLabel: 'Nombres',
                                                                labelAlign: 'top',
                                                                allowBlank: false,
                                                                emptyText: 'Ingrese los Nombres del trabajador',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '5 5 5 5',
                                                                name: 'APELLIDO_PATERNO',
                                                                fieldLabel: 'Apellido Paterno',
                                                                labelAlign: 'top',
                                                                allowBlank: false,
                                                                emptyText: 'Ingrese Apellido Paterno del Trabajador',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '5 5 5 5',
                                                                name: 'APELLIDO_MATERNO',
                                                                fieldLabel: 'Apellido Materno',
                                                                labelAlign: 'top',
                                                                allowBlank: false,
                                                                emptyText: 'Ingrese Apellido Materno del Trabajador',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                margin: '5 5 5 5',
                                                                name: 'ID_CARGO',
                                                                fieldLabel: 'Cargo',
                                                                labelAlign: 'top',
                                                                allowBlank: false,
                                                                emptyText: 'Seleccione el cargo del trabajador',
                                                                displayField: 'NOMBRE_CARGO',
                                                                store: 'dsCargo',
                                                                valueField: 'ID_CARGO',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'numberfield',
                                                                margin: '5 5 5 5',
                                                                name: 'ANOS_EXPERIENCIA_LABORAL',
                                                                fieldLabel: 'Experiencia laboral en ENAP',
                                                                labelAlign: 'top',
                                                                columnWidth: 0.5
                                                            },
                                                            {
                                                                xtype: 'numberfield',
                                                                margin: '5 5 5 5',
                                                                name: 'ANOS_EXPERIENCIA_CARGO',
                                                                fieldLabel: 'Experiencia en el cargo',
                                                                labelAlign: 'top',
                                                                columnWidth: 0.5
                                                            }
                                                        ],
                                                        buttons: [{
                                                            text: 'Siguiente',
                                                            iconCls: 'arrow_right-icon',
                                                            iconAlign: 'right',
                                                            handler: function () {
                                                                var new_object,
												                    errors,
												                    form;
                                                                form = this.up('form').getForm();
                                                                new_object = Ext.create('WCF_ENAP.model.Trabajador', form.getValues());
                                                                errors = new_object.validate();
                                                                if (errors.isValid() && form.isValid()) {
                                                                    this.up('tabpanel').setActiveTab(1);
                                                                }
                                                                else {
                                                                    form.markInvalid(errors);
                                                                }
                                                            }
                                                        }]
                                                    },
                                                    {
                                                        xtype: 'form',
                                                        id: 'form_acciones_incidente',
                                                        title: 'Acciones del Trabajador',
                                                        items: [
                                                            {
                                                                xtype: 'itemselector',
                                                                id: 'CAUSA_INMEDIATA_ACCION',
                                                                store: dsCausaListaAccion,
                                                                anchor: '100%',
                                                                name: 'CAUSA_INMEDIATA_ACCION',
                                                                displayField: 'DESCRIPCION',
                                                                valueField: 'ID_CAUSA'
                                                            }
                                                        ],
                                                        buttons: [
										                    {
										                        text: 'Anterior',
										                        iconCls: 'arrow_left-icon',
										                        iconAlign: 'left',
										                        handler: function () {
										                            var new_object,
													                    errors,
													                    form;
										                            form = this.up('form').getForm();
										                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
										                            errors = new_object.validate();
										                            if (errors.isValid() && form.isValid()) {
										                                this.up('tabpanel').setActiveTab(0);
										                            } else {
										                                form.markInvalid(errors);
										                            }
										                        }
										                    },
										                    {
										                        text: 'Siguiente',
										                        iconCls: 'arrow_right-icon',
										                        iconAlign: 'right',
										                        handler: function () {
										                            var new_object,
													                    errors,
													                    form;
										                            form = this.up('form').getForm();
										                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
										                            errors = new_object.validate();
										                            if (errors.isValid() && form.isValid()) {
										                                this.up('tabpanel').setActiveTab(2);
										                            } else {
										                                form.markInvalid(errors);
										                            }
										                        }
										                    }
									                    ]
                                                    },
                                                    {
                                                        xtype: 'form',
                                                        title: 'Factores de la persona',
                                                        id: 'form_factor_persona',
                                                        items: [
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresCapFisicaInadecuada,
                                                                name: 'CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA',
                                                                id: 'CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA',
                                                                fieldLabel: 'Capacidad Física Inadecuada',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresCapPsicologicaInadecuada,
                                                                name: 'CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA',
                                                                id: 'CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA',
                                                                fieldLabel: 'Capacidad Psicológica Inadecuada',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresCapMental,
                                                                name: 'CAUSA_LISTA_FATORES_TENSION_FISICA',
                                                                id: 'CAUSA_LISTA_FATORES_TENSION_FISICA',
                                                                fieldLabel: 'Tensión Física o Fisiológica',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresTencionMental,
                                                                name: 'CAUSA_LISTA_FATORES_TENSION_MENTAL',
                                                                id: 'CAUSA_LISTA_FATORES_TENSION_MENTAL',
                                                                fieldLabel: 'Tensión Mental o Sicológica',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresFaltaConocimiento,
                                                                name: 'CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO',
                                                                id: 'CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO',
                                                                fieldLabel: 'Falta de Conocimiento',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresFaltaHabilidad,
                                                                name: 'CAUSA_LISTA_FATORES_FALTA_HABILIDAD',
                                                                id: 'CAUSA_LISTA_FATORES_FALTA_HABILIDAD',
                                                                fieldLabel: 'Falta de Habilidad',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresMotivacionInadecuada,
                                                                name: 'CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA',
                                                                id: 'CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA',
                                                                fieldLabel: 'Motivación Deficiente',
                                                                labelAlign: 'top',
                                                                emptyText: 'Seleccione la o las',
                                                                displayField: 'DESCRIPCION',
                                                                multiSelect: true,
                                                                queryMode: 'local',
                                                                valueField: 'ID_CAUSA',
                                                                anchor: '100%'
                                                            }
                                                        ],
                                                        buttons: [
										                    {
										                        text: 'Anterior',
										                        iconCls: 'arrow_left-icon',
										                        iconAlign: 'left',
										                        handler: function () {
										                            var new_object,
													                    errors,
													                    form;
										                            form = this.up('form').getForm();
										                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
										                            errors = new_object.validate();
										                            if (errors.isValid() && form.isValid()) {
										                                this.up('tabpanel').setActiveTab(1);
										                            }
										                            else {
										                                form.markInvalid(errors);
										                            }
										                        }
										                    }, {
										                        text: 'Siguiente',
										                        iconCls: 'arrow_right-icon',
										                        iconAlign: 'right',
										                        handler: function () {
										                            var new_object,
													                    errors,
													                    form;
										                            form = this.up('form').getForm();
										                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
										                            errors = new_object.validate();
										                            if (errors.isValid() && form.isValid()) {
										                                this.up('tabpanel').setActiveTab(3);
										                            }
										                            else {
										                                form.markInvalid(errors);
										                            }
										                        }
										                    }
									                    ]
                                                    },
                                                    {
                                                        xtype: 'form',
                                                        title: 'Autocuidado',
                                                        id: 'form_autocuidado',
                                                        items: [
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresAutocuidado,
                                                                name: 'CAUSA_LISTA_FATORES_AUTOCUIDADO',
                                                                id: 'CAUSA_LISTA_FATORES_AUTOCUIDADO',
                                                                fieldLabel: 'Estados',
                                                                displayField: 'DESCRIPCION',
                                                                valueField: 'ID_CAUSA',
                                                                multiSelect: true,
                                                                labelAlign: 'top',
                                                                queryMode: 'local',
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'boxselect',
                                                                store: dsCausaListaFactoresErrores,
                                                                name: 'CAUSA_LISTA_FACTORES_ERRORES',
                                                                id: 'CAUSA_LISTA_FACTORES_ERRORES',
                                                                fieldLabel: 'Errores',
                                                                displayField: 'DESCRIPCION',
                                                                valueField: 'ID_CAUSA',
                                                                multiSelect: true,
                                                                labelAlign: 'top',
                                                                anchor: '100%'
                                                            }
                                                        ],
                                                        buttons: [
										                    {
										                        text: 'Anterior',
										                        iconCls: 'arrow_left-icon',
										                        iconAlign: 'left',
										                        handler: function () {
										                            var new_object,
													                    errors,
													                    form;
										                            form = this.up('form').getForm();
										                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
										                            errors = new_object.validate();
										                            if (errors.isValid() && form.isValid()) {
										                                this.up('tabpanel').setActiveTab(2);
										                            }
										                            else {
										                                form.markInvalid(errors);
										                            }
										                        }
										                    }, {
										                        text: 'Guardar',
										                        iconCls: 'btn-save',
										                        handler: function () {
										                            var new_object,
										                            errors,
										                            form,
										                            values;

										                            form = Ext.getCmp('form_afecta_trabajador').getForm();
										                            values = Ext.apply(form.getValues(), {
										                                'CAUSA_INMEDIATA_ACCION': Ext.getCmp('CAUSA_INMEDIATA_ACCION').getRawValue()
										                            });
										                            var joinValues = Ext.apply(
										                                Ext.getCmp('form_informe_preliminar').getForm().getValues(),
										                                values
										                            );
										                            new_object = Ext.create('WCF_ENAP.model.Trabajador', joinValues);
										                            Ext.data.StoreManager.lookup('dsTrabajadorInvolucrado').insert(0, new_object);

										                        }
										                    }
									                    ]
                                                    }
                                                ],
                                                listeners: {
                                                    tabchange: function (tabPanel, newCard, oldCard, options) {
                                                        //tipo incidente persona
                                                        /*if (newCard.getId() == 'form_tipo_incidente_persona') {
                                                        if (dsPeligroLista.count() == 0) {
                                                        dsPeligroLista.load({ params: { 'TIPO_PELIGRO': 1} });
                                                        }
                                                        }*/
                                                        if (newCard.getId() == 'form_acciones_incidente') {
                                                            if (dsCausaListaAccion.count() == 0) {
                                                                dsCausaListaAccion.load({ params: { 'TIPO_CAUSA': 2} });
                                                            }
                                                        }
                                                        //causas basicas factores de la persona
                                                        if (newCard.getId() == 'form_factor_persona') {

                                                            if (dsCausaListaFactoresCapFisicaInadecuada.count() == 0) {
                                                                dsCausaListaFactoresCapFisicaInadecuada.setProxy(Ext.apply(dsCausaListaFactoresCapFisicaInadecuada.getProxy(), { extraParams: { 'TIPO_CAUSA': 4} }));
                                                                dsCausaListaFactoresCapFisicaInadecuada.load();
                                                            }
                                                            if (dsCausaListaFactoresCapPsicologicaInadecuada.count() == 0) {
                                                                dsCausaListaFactoresCapPsicologicaInadecuada.setProxy(Ext.apply(dsCausaListaFactoresCapPsicologicaInadecuada.getProxy(), { extraParams: { 'TIPO_CAUSA': 5} }));
                                                                dsCausaListaFactoresCapPsicologicaInadecuada.load();
                                                            }
                                                            if (dsCausaListaFactoresCapMental.count() == 0) {
                                                                dsCausaListaFactoresCapMental.setProxy(Ext.apply(dsCausaListaFactoresCapMental.getProxy(), { extraParams: { 'TIPO_CAUSA': 6} }));
                                                                dsCausaListaFactoresCapMental.load();
                                                            }
                                                            if (dsCausaListaFactoresTencionMental.count() == 0) {
                                                                dsCausaListaFactoresTencionMental.setProxy(Ext.apply(dsCausaListaFactoresTencionMental.getProxy(), { extraParams: { 'TIPO_CAUSA': 7} }));
                                                                dsCausaListaFactoresTencionMental.load();
                                                            }

                                                            if (dsCausaListaFactoresFaltaConocimiento.count() == 0) {
                                                                dsCausaListaFactoresFaltaConocimiento.setProxy(Ext.apply(dsCausaListaFactoresFaltaConocimiento.getProxy(), { extraParams: { 'TIPO_CAUSA': 8} }));
                                                                dsCausaListaFactoresFaltaConocimiento.load();
                                                            }
                                                            if (dsCausaListaFactoresFaltaHabilidad.count() == 0) {
                                                                dsCausaListaFactoresFaltaHabilidad.setProxy(Ext.apply(dsCausaListaFactoresFaltaHabilidad.getProxy(), { extraParams: { 'TIPO_CAUSA': 9} }));
                                                                dsCausaListaFactoresFaltaHabilidad.load();
                                                            }
                                                            if (dsCausaListaFactoresMotivacionInadecuada.count() == 0) {
                                                                dsCausaListaFactoresMotivacionInadecuada.setProxy(Ext.apply(dsCausaListaFactoresMotivacionInadecuada.getProxy(), { extraParams: { 'TIPO_CAUSA': 10} }));
                                                                dsCausaListaFactoresMotivacionInadecuada.load();
                                                            }

                                                        }
                                                        if (newCard.getId() == 'form_autocuidado') {
                                                            if (dsCausaListaFactoresAutocuidado.count() == 0) {
                                                                dsCausaListaFactoresAutocuidado.setProxy(Ext.apply(dsCausaListaFactoresAutocuidado.getProxy(), { extraParams: { 'TIPO_CAUSA': 19} }));
                                                                dsCausaListaFactoresAutocuidado.load();
                                                            }
                                                            if (dsCausaListaFactoresErrores.count() == 0) {
                                                                dsCausaListaFactoresErrores.setProxy(Ext.apply(dsCausaListaFactoresErrores.getProxy(), { extraParams: { 'TIPO_CAUSA': 20} }));
                                                                dsCausaListaFactoresErrores.load();
                                                            }
                                                        }
                                                    }

                                                }
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                store: 'dsTrabajadorInvolucrado',
                                                margin: '5 5 5 5',
                                                title: 'Listado de Trabajadores Involucrados',
                                                columnWidth: 0.5,

                                                listeners: {
                                                    'selectionchange': function (model, records) {
                                                        if (records[0]) {
                                                            var record = records[0];
                                                            Ext.getCmp('form_afecta_trabajador').loadRecord(record);
                                                            dsCausaListaAccion.on('load', function () {
                                                                Ext.getCmp('CAUSA_INMEDIATA_ACCION').setRawValue(record.get('CAUSA_INMEDIATA_ACCION'));
                                                            });

                                                            Ext.getCmp('CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA').value = record.get('CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA');
                                                            Ext.getCmp('CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA').value = record.get('CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA');
                                                            Ext.getCmp('CAUSA_LISTA_FATORES_TENSION_FISICA').value = record.get('CAUSA_LISTA_FATORES_TENSION_FISICA');
                                                            Ext.getCmp('CAUSA_LISTA_FATORES_TENSION_MENTAL').value = record.get('CAUSA_LISTA_FATORES_TENSION_MENTAL');
                                                            Ext.getCmp('CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO').value = record.get('CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO');
                                                            Ext.getCmp('CAUSA_LISTA_FATORES_FALTA_HABILIDAD').value = record.get('CAUSA_LISTA_FATORES_FALTA_HABILIDAD');
                                                            Ext.getCmp('CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA').value = record.get('CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA');

                                                            Ext.getCmp('CAUSA_LISTA_FATORES_AUTOCUIDADO').value = record.get('CAUSA_LISTA_FATORES_AUTOCUIDADO');
                                                            Ext.getCmp('CAUSA_LISTA_FACTORES_ERRORES').value = record.get('CAUSA_LISTA_FACTORES_ERRORES');
                                                            Ext.getCmp('form_afecta_trabajador').doLayout();
                                                        }
                                                    },
                                                    'afterrender': function (cmp, eOpts) {
                                                        var dsTrabajadorInvolucrado = Ext.StoreManager.lookup('dsTrabajadorInvolucrado');
                                                        dsTrabajadorInvolucrado.setProxy(Ext.apply(dsTrabajadorInvolucrado.getProxy(), {
                                                            extraParams: {
                                                                'ID_EVENTO_EMPRESA': me.cmpRecord.get('ID_EVENTO_EMPRESA')
                                                            }
                                                        }))
                                                        dsTrabajadorInvolucrado.load();
                                                    }
                                                },
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        flex: 0.2,
                                                        dataIndex: 'RUT_TRABAJADOR',
                                                        text: 'Rut'
                                                    },
								                    {
								                        xtype: 'gridcolumn',
								                        flex: 0.3,
								                        dataIndex: 'NOMBRES',
								                        text: 'Nombres'
								                    },
								                    {
								                        xtype: 'gridcolumn',
								                        flex: 0.3,
								                        dataIndex: 'APELLIDO_PATERNO',
								                        text: 'Apellido Paterno'
								                    },
								                    {
								                        xtype: 'gridcolumn',
								                        flex: 0.2,
								                        dataIndex: 'APELLIDO_MATERNO',
								                        text: 'Apellido Materno'
								                    }
                                                ],
                                                viewConfig: {

                                            },
                                            dockedItems: [
								                    {
								                        xtype: 'pagingtoolbar',
								                        store: 'dsTrabajadorInvolucrado',
								                        displayInfo: true,
								                        dock: 'bottom'
								                    }
							                    ]
                                        }
                                        ]
                                    }
                                ],
                                buttons: [
				                    {
				                        text: 'Anterior',
				                        handler: function () {
				                            var new_object,
							                    errors,
							                    form;
				                            form = this.up('form').getForm();
				                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                            errors = new_object.validate();
				                            if (errors.isValid() && form.isValid()) {
				                                this.up('tabpanel').setActiveTab(3);
				                            } else {
				                                form.markInvalid(errors);
				                            }
				                        }
				                    }, {
				                        text: 'Siguiente',
				                        handler: function () {
				                            var new_object,
							                    errors,
							                    form;
				                            form = this.up('form').getForm();
				                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                            errors = new_object.validate();
				                            if (errors.isValid() && form.isValid()) {
				                                this.up('tabpanel').setActiveTab(4);
				                            } else {
				                                form.markInvalid(errors);
				                            }
				                        }
				                    }
			                    ]
                            },
                            {
                                xtype: 'form',
                                id: 'form_condiciones',
                                bodyPadding: 10,
                                title: 'Condiciones',
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
                                buttons: [
				                    {
				                        text: 'Anterior',
				                        handler: function () {
				                            var new_object,
							                    errors,
							                    form;
				                            form = this.up('form').getForm();
				                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                            errors = new_object.validate();
				                            if (errors.isValid() && form.isValid()) {
				                                this.up('tabpanel').setActiveTab(((Ext.getCmp('form_tipo_incidente_persona').isDisabled()) ? ((Ext.getCmp('form_incidente_patrimonio').isDisabled()) ? 0 : 1) : 3));
				                            } else {
				                                form.markInvalid(errors);
				                            }
				                        }
				                    }, {
				                        text: 'Siguiente',
				                        handler: function () {
				                            var new_object,
							                    errors,
							                    form;
				                            form = this.up('form').getForm();
				                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                            errors = new_object.validate();
				                            if (errors.isValid() && form.isValid()) {
				                                this.up('tabpanel').setActiveTab(5);
				                            } else {
				                                form.markInvalid(errors);
				                            }
				                        }
				                    }
			                    ]
                            },
                            {
                                xtype: 'form',
                                id: 'form_factores_trabajo',
                                bodyPadding: 10,
                                title: 'Factores del Trabajo',
                                items: [
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresAbuso,
                                        name: 'CAUSA_LISTA_FACTORES_ABUSO_MALTRATO',
                                        id: 'CAUSA_LISTA_FACTORES_ABUSO_MALTRATO',
                                        fieldLabel: 'Abuso o Maltrato',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione el o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresIngInadecuada,
                                        name: 'CAUSA_LISTA_FACTORES_ING_INADECUADA',
                                        id: 'CAUSA_LISTA_FACTORES_ING_INADECUADA',
                                        fieldLabel: 'Ingeniería Inadecuada',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresComprasInadecuadas,
                                        name: 'CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA',
                                        id: 'CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA',
                                        fieldLabel: 'Deficiencia en las Adquisiciones',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresMantenimientoInadecuado,
                                        name: 'CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA',
                                        id: 'CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA',
                                        fieldLabel: 'Mantención Deficiente',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresHerrEquioInadecuado,
                                        name: 'CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO',
                                        id: 'CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO',
                                        fieldLabel: 'Herramientas y equipos inadecuados',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresUsoDesgaste,
                                        name: 'CAUSA_LISTA_FACTORES_USO_DESGASTE',
                                        id: 'CAUSA_LISTA_FACTORES_USO_DESGASTE',
                                        fieldLabel: 'Uso y Desgaste',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    },
                                    {
                                        xtype: 'boxselect',
                                        store: dsCausaListaFactoresFaltaLiderazgo,
                                        name: 'CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO',
                                        id: 'CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO',
                                        fieldLabel: 'Liderazgo deficiente',
                                        labelAlign: 'top',
                                        emptyText: 'Seleccione la o las',
                                        displayField: 'DESCRIPCION',
                                        multiSelect: true,
                                        valueField: 'ID_CAUSA',
                                        anchor: '100%'
                                    }
                                ],
                                buttons: [
				                    {
				                        text: 'Anterior',
				                        handler: function () {
				                            var new_object,
							                    errors,
							                    form;
				                            form = this.up('form').getForm();
				                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
				                            errors = new_object.validate();
				                            if (errors.isValid() && form.isValid()) {
				                                this.up('tabpanel').setActiveTab(4);
				                            } else {
				                                form.markInvalid(errors);
				                            }
				                        }
				                    }, {
				                        text: 'Guardar',
				                        handler: function () {
				                            var new_object,
				                                errors,
				                                form,
				                                values;
				                            form = Ext.getCmp('form_informe_preliminar').getForm();
				                            var TRABAJADORES_LIST = [];
				                            Ext.StoreManager.lookup('dsTrabajadorInvolucrado').each(function (record) { TRABAJADORES_LIST.push(record.get('ID_TRABAJADOR')); });

				                            new_object = Ext.create('WCF_ENAP.model.e0063', Ext.apply(
                                                form.getValues(),
                                                {
                                                    'TIPO_INCIDENTE_PATRIMONIO': Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').getRawValue(),
                                                    'TIPO_INCIDENTE_PERSONA': Ext.getCmp('TIPO_INCIDENTE_PERSONA').getRawValue(),
                                                    'CAUSA_INMEDIATA_ACCION_PATRIMONIO': Ext.getCmp('CAUSA_INMEDIATA_ACCION_PATRIMONIO').getRawValue()
                                                }
                                            ));
				                            Ext.data.StoreManager.lookup('dse0063').insert(0, new_object);
				                            errors = new_object.validate();

				                            if (errors.isValid() && form.isValid()) {

				                            } else {
				                                form.markInvalid(errors);
				                            }

				                        }
				                    }
			                    ]
                            }
                        ],
					    listeners: {
					        tabchange: function (tabPanel, newCard, oldCard, options) {
					            if (newCard.getId() == 'form_incidente_patrimonio') {
					                if (dsPeligroListaTipoIncidentePatrimonio.count() == 0) {
					                    dsPeligroListaTipoIncidentePatrimonio.load({ params: { 'TIPO_PELIGRO': 2} });
					                }
					            }
					            if (newCard.getId() == 'form_condiciones') {
					                if (dsCausaListaCondcion.count() == 0) {
					                    dsCausaListaCondcion.setProxy(Ext.apply(dsCausaListaCondcion.getProxy(), { extraParams: { 'TIPO_CAUSA': 3} }));
					                    dsCausaListaCondcion.load();
					                }
					            }
					            if (newCard.getId() == 'form_factores_trabajo') {
					                if (dsCausaListaFactoresFaltaLiderazgo.count() == 0) {
					                    dsCausaListaFactoresFaltaLiderazgo.setProxy(Ext.apply(dsCausaListaFactoresFaltaLiderazgo.getProxy(), { extraParams: { 'TIPO_CAUSA': 11} }));
					                    dsCausaListaFactoresFaltaLiderazgo.load();
					                }
					                if (dsCausaListaFactoresIngInadecuada.count() == 0) {
					                    dsCausaListaFactoresIngInadecuada.setProxy(Ext.apply(dsCausaListaFactoresIngInadecuada.getProxy(), { extraParams: { 'TIPO_CAUSA': 12} }));
					                    dsCausaListaFactoresIngInadecuada.load();
					                }
					                if (dsCausaListaFactoresComprasInadecuadas.count() == 0) {
					                    dsCausaListaFactoresComprasInadecuadas.setProxy(Ext.apply(dsCausaListaFactoresComprasInadecuadas.getProxy(), { extraParams: { 'TIPO_CAUSA': 13} }));
					                    dsCausaListaFactoresComprasInadecuadas.load();
					                }
					                if (dsCausaListaFactoresMantenimientoInadecuado.count() == 0) {
					                    dsCausaListaFactoresMantenimientoInadecuado.setProxy(Ext.apply(dsCausaListaFactoresMantenimientoInadecuado.getProxy(), { extraParams: { 'TIPO_CAUSA': 15} }));
					                    dsCausaListaFactoresMantenimientoInadecuado.load();
					                }
					                if (dsCausaListaFactoresHerrEquioInadecuado.count() == 0) {
					                    dsCausaListaFactoresHerrEquioInadecuado.setProxy(Ext.apply(dsCausaListaFactoresHerrEquioInadecuado.getProxy(), { extraParams: { 'TIPO_CAUSA': 16} }));
					                    dsCausaListaFactoresHerrEquioInadecuado.load();
					                }
					                if (dsCausaListaFactoresUsoDesgaste.count() == 0) {
					                    dsCausaListaFactoresUsoDesgaste.setProxy(Ext.apply(dsCausaListaFactoresUsoDesgaste.getProxy(), { extraParams: { 'TIPO_CAUSA': 17} }));
					                    dsCausaListaFactoresUsoDesgaste.load();
					                }
					                if (dsCausaListaFactoresAbuso.count() == 0) {
					                    dsCausaListaFactoresAbuso.setProxy(Ext.apply(dsCausaListaFactoresAbuso.getProxy(), { extraParams: { 'TIPO_CAUSA': 18} }));
					                    dsCausaListaFactoresAbuso.load();
					                }
					            }
					        }
					    }
					}
				],
			    listeners: {
			        beforerender: function (cmp, eOpts) {
			            var store = Ext.StoreManager.lookup('dse0063');
			            store.setProxy(Ext.apply(store.getProxy(), {
			                extraParams: {
			                    'ID_EVENTO_EMPRESA': me.cmpRecord.get('ID_EVENTO_EMPRESA')
			                }
			            }));
			            store.load({
			                callback: function (records, operation, success) {
			                    if (records.length > 0) {
			                        var record = records[0];

			                        Ext.getCmp('form_afecta_a').loadRecord(record);
			                        dsPeligroLista.on('load', function () {
			                            Ext.getCmp('TIPO_INCIDENTE_PERSONA').setRawValue(record.get('TIPO_INCIDENTE_PERSONA'));
			                        });
			                        dsPeligroListaTipoIncidentePatrimonio.on('load', function () {
			                            Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').setRawValue(record.get('TIPO_INCIDENTE_PATRIMONIO'));
			                        });
			                        dsCausaListaCondcion.on('load', function () {
			                            Ext.getCmp('CAUSA_INMEDIATA_ACCION_PATRIMONIO').setRawValue(record.get('CAUSA_INMEDIATA_ACCION_PATRIMONIO'));
			                        });

			                        Ext.getCmp('CAUSA_LISTA_FACTORES_ABUSO_MALTRATO').value = record.get('CAUSA_LISTA_FACTORES_ABUSO_MALTRATO');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_ING_INADECUADA').value = record.get('CAUSA_LISTA_FACTORES_ING_INADECUADA');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA').value = record.get('CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA').value = record.get('CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO').value = record.get('CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_USO_DESGASTE').value = record.get('CAUSA_LISTA_FACTORES_USO_DESGASTE');
			                        Ext.getCmp('CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO').value = record.get('CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO');
			                    }
			                }
			            });
			        }
			    }
			}
		];
        me.callParent(arguments);
    }
});