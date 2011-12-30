﻿Ext.define('WCF_ENAP.view.ui.DatosTrabajador', {
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
        winAcciones;
        var dsPeligroListaTipoIncidentePatrimonio = Ext.create('WCF_ENAP.store.dsPeligro', { autoLoad: false, autoSync: false, pageSize: 2000 }),
        dsPeligroLista = Ext.create('WCF_ENAP.store.dsPeligro', { autoLoad: false, autoSync: false, pageSize: 2000 }),
        dsCausaListaCondcion = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresFaltaLiderazgo = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresIngInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresComprasInadecuadas = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresMantenimientoInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresHerrEquioInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresUsoDesgaste = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresAbuso = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresErrores = Ext.create('WCF_ENAP.store.dsCausa', {}),
        //causas inmediatas acciones
        dsCausaListaAccion = Ext.create('WCF_ENAP.store.dsCausa', {}),
        //inicio
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresCapPsicologicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresCapMental = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresTencionMental = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresFaltaConocimiento = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresFaltaHabilidad = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresMotivacionInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {}),
        dsCausaListaFactoresAutocuidado = Ext.create('WCF_ENAP.store.dsCausa', {});

        var dsPeligros = Ext.create('WCF_ENAP.store.dsPeligro', { autoLoad: false });
        dsPeligros.setProxy(Ext.apply(dsPeligros.getProxy(), { url: '/Peligro/getAll' }));
        dsPeligros.load({
            callback: function (records, operation, success) {
                Ext.Array.each(records, function (record) {
                    switch (record.get('TIPO_PELIGRO')) {
                        case 1:
                            /*  PERSONA */
                            dsPeligroLista.add(record);
                            break;
                        case 2:
                            /*  PATRIMONIO */
                            dsPeligroListaTipoIncidentePatrimonio.add(record);
                            break;
                    }

                });
            }
        });
        var dsCausas = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.Array.each(records, function (record) {
                        switch (record.get('TIPO_CAUSA')) {
                            case 2:
                                /*  ACCIÓN */
                                dsCausaListaAccion.add(record);
                                break;
                            case 3:
                                /* CONDICIÓN */
                                dsCausaListaCondcion.add(record);
                                break;
                            case 4:
                                /* CAPACIDAD FÍSICA INADECUADA */
                                dsCausaListaFactoresCapFisicaInadecuada.add(record);
                                break;
                            case 5:
                                /* CAPACIDAD PSICOLÓGICA INADECUADA */
                                dsCausaListaFactoresCapPsicologicaInadecuada.add(record);
                                break;
                            case 6:
                                /*  TENSIÓN FÍSICA */
                                dsCausaListaFactoresCapMental.add(record);
                                break;
                            case 7:
                                /*  TENSIÓN MENTAL */
                                dsCausaListaFactoresTencionMental.add(record);
                                break;
                            case 8:
                                /*  FALTA DE CONOCIMIENTO */
                                dsCausaListaFactoresFaltaConocimiento.add(record);
                                break;
                            case 9:
                                /*  FALTA HABILIDAD */
                                dsCausaListaFactoresFaltaHabilidad.add(record);
                                break;
                            case 10:
                                /* MOTIVACIÓN INADECUADA */
                                dsCausaListaFactoresMotivacionInadecuada.add(record);
                                break;
                            case 11:
                                /* FALTA DE LIDERAZGO */
                                dsCausaListaFactoresFaltaLiderazgo.add(record);
                                break;
                            case 12:
                                /* INGENIERÍA INADECUADA */
                                dsCausaListaFactoresIngInadecuada.add(record);
                                break;
                            case 13:
                                /* COMPRAS INADECUADAS */
                                dsCausaListaFactoresComprasInadecuadas.add(record);
                                break;
                            case 15:
                                /* MANTENIMIENTO INADECUADO */
                                dsCausaListaFactoresMantenimientoInadecuado.add(record);
                                break;
                            case 16:
                                /* HERRAMIENTAS O EQUIPO INADECUADO */
                                dsCausaListaFactoresHerrEquioInadecuado.add(record);
                                break;
                            case 17:
                                /* USO O DESGASTE */
                                dsCausaListaFactoresUsoDesgaste.add(record);
                                break;
                            case 18:
                                /* ABUSO */
                                dsCausaListaFactoresAbuso.add(record);
                                break;
                            case 19:
                                /* AUTOCUIDADO */
                                dsCausaListaFactoresAutocuidado.add(record);
                                break;
                            case 20:
                                /* ERRORES */
                                dsCausaListaFactoresErrores.add(record);
                                break;
                        }
                    });
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
                                Ext.getCmp('form_informe_data_preliminar').loadRecord(record);
                                Ext.getCmp('form_afecta_a').loadRecord(record);
                                var campos = [
	                                    [dsPeligroListaTipoIncidentePatrimonio, 'TIPO_INCIDENTE_PATRIMONIO'],
	                                    [dsPeligroLista, 'TIPO_INCIDENTE_PERSONA'],
	                                    [dsCausaListaCondcion, 'CAUSA_INMEDIATA_ACCION_PATRIMONIO'],
	                                    [dsCausaListaFactoresAbuso, 'CAUSA_LISTA_FACTORES_ABUSO_MALTRATO'],
	                                    [dsCausaListaFactoresIngInadecuada, 'CAUSA_LISTA_FACTORES_ING_INADECUADA'],
	                                    [dsCausaListaFactoresComprasInadecuadas, 'CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA'],
	                                    [dsCausaListaFactoresMantenimientoInadecuado, 'CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA'],
	                                    [dsCausaListaFactoresHerrEquioInadecuado, 'CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO'],
	                                    [dsCausaListaFactoresUsoDesgaste, 'CAUSA_LISTA_FACTORES_USO_DESGASTE'],
	                                    [dsCausaListaFactoresFaltaLiderazgo, 'CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO']
                                    ];

                                Ext.Array.each(campos, function (name) {
                                    if (name[0].count() > 0) {
                                        Ext.getCmp(name[1]).setValue(record.get(name[1]));
                                    } else {
                                        name[0].on('load', function () {
                                            Ext.getCmp(name[1]).setValue(record.get(name[1]));
                                        });
                                    }
                                });

                            }
                        }
                    });
                }
            }
        });

        me.items = [
			{
			    xtype: 'form',
			    border: 0,
			    id: 'form_informe_preliminar',
			    items: [
					{
					    xtype: 'form',
					    border: 0,
					    id: 'form_informe_data_preliminar',
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
                                xtype: 'hiddenfield',
                                name: 'ID_INFORME_PRELIMINAR'
                            }
                        ]
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
                                                                id: 'AFECTA_PERSONA',
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
                                                                                /*dsPeligroLista.load({ params: { 'TIPO_PELIGRO': 1} });*/
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
                                                                id: 'AFECTA_PATRIMONIO',
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
                                                                id: 'AFECTA_PERDIDA_PROCESO',
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
                                                                id: 'AFECTA_MEDIO_AMBIENTE',
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
                                                                id: 'AFECTA_IMAGEN',
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
                                                disabled: true,
                                                id: 'tab_afecta_trabajador',
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
                                                                xtype: 'hiddenfield',
                                                                name: 'ID_EVENTO_TRABAJADOR',
                                                                id: 'ID_EVENTO_TRABAJADOR'
                                                            },
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
                                                                xtype: 'radiogroup',
                                                                margin: '5 5 5 5',
                                                                labelAlign: 'top',
                                                                columnWidth: 0.5,
                                                                fieldLabel: '¿Incidente con Tiempo Perdido?',
                                                                items: [
                                                                    { boxLabel: 'Si', name: 'IS_CTP', inputValue: true },
                                                                    { boxLabel: 'No', name: 'IS_CTP', inputValue: false, checked: true }
                                                                ]
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
                                                                queryMode: 'local',
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
                                                                queryMode: 'local',
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
										                            console.log(joinValues);
										                            new_object = Ext.create('WCF_ENAP.model.Trabajador', joinValues);
										                            console.log(new_object);
										                            var trabajadorSync = Ext.data.StoreManager.lookup('dsTrabajadorInvolucrado').getById(new_object.get('ID_EVENTO_TRABAJADOR'));
										                            if (!trabajadorSync) {
										                                Ext.data.StoreManager.lookup('dsTrabajadorInvolucrado').insert(0, new_object);
										                            } else {
										                                new_object.setProxy(Ext.data.StoreManager.lookup('dsTrabajadorInvolucrado').getProxy());
										                                new_object.save({
										                                    callback: function (records, options) {
										                                        console.log("ACTUALIZADO");
										                                        Ext.getCmp('grid_trabajadores_involucrados').down('pagingtoolbar').doRefresh();
										                                        form.reset();
										                                        Ext.getCmp('grid_trabajadores_involucrados').getSelectionModel().deselectAll();
										                                    }
										                                });
										                            }
										                        }
										                    }
									                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                store: 'dsTrabajadorInvolucrado',
                                                margin: '5 5 5 5',
                                                title: 'Listado de Trabajadores Involucrados',
                                                columnWidth: 0.5,
                                                id: 'grid_trabajadores_involucrados',
                                                listeners: {
                                                    'selectionchange': function (model, records) {
                                                        if (records[0]) {
                                                            var record = records[0];
                                                            Ext.getCmp('tab_afecta_trabajador').setDisabled(false);
                                                            Ext.getCmp('form_datos_trabajador').loadRecord(record);
                                                            dsCausaListaAccion.on('load', function () {
                                                                Ext.getCmp('CAUSA_INMEDIATA_ACCION').setRawValue(record.get('CAUSA_INMEDIATA_ACCION'));
                                                            });
                                                            var campos = [
                                                                [dsCausaListaAccion, 'CAUSA_INMEDIATA_ACCION'],
                                                                [dsCausaListaFactoresCapFisicaInadecuada, 'CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA'],
                                                                [dsCausaListaFactoresCapPsicologicaInadecuada, 'CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA'],
                                                                [dsCausaListaFactoresCapMental, 'CAUSA_LISTA_FATORES_TENSION_FISICA'],
                                                                [dsCausaListaFactoresTencionMental, 'CAUSA_LISTA_FATORES_TENSION_MENTAL'],
                                                                [dsCausaListaFactoresFaltaConocimiento, 'CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO'],
                                                                [dsCausaListaFactoresFaltaHabilidad, 'CAUSA_LISTA_FATORES_FALTA_HABILIDAD'],
                                                                [dsCausaListaFactoresMotivacionInadecuada, 'CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA'],
                                                                [dsCausaListaFactoresAutocuidado, 'CAUSA_LISTA_FATORES_AUTOCUIDADO'],
                                                                [dsCausaListaFactoresErrores, 'CAUSA_LISTA_FACTORES_ERRORES']
                                                            ];
                                                            Ext.Array.each(campos, function (name) {
                                                                if (name[0].count() > 0) {
                                                                    Ext.getCmp(name[1]).setValue(record.get(name[1]));
                                                                } else {
                                                                    name[0].on('load', function () {
                                                                        Ext.getCmp(name[1]).setValue(record.get(name[1]));
                                                                    });
                                                                }
                                                            });
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
                                                        xtype: 'toolbar',
                                                        dock: 'top',
                                                        items: [
                                                            {
                                                                xtype: 'button',
                                                                iconCls: 'btn-add',
                                                                text: 'Agregar Trabajador',
                                                                handler: function () {
                                                                    Ext.getCmp('tab_afecta_trabajador').setDisabled(false);
                                                                    var form = Ext.getCmp('form_afecta_trabajador').getForm();
                                                                    form.reset();
                                                                    Ext.getCmp('grid_trabajadores_involucrados').getSelectionModel().deselectAll();
                                                                    Ext.getCmp('tab_afecta_trabajador').setActiveTab(0);
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                iconCls: 'btn-delete',
                                                                text: 'Remover Seleccionado',
                                                                handler: function () {
                                                                    var store = Ext.StoreManager.lookup('dsTrabajadorInvolucrado'),
													                    grid = Ext.getCmp('grid_trabajadores_involucrados'),
													                    records = grid.getSelectionModel().getSelection();
                                                                    store.remove(records);
                                                                    Ext.getCmp('tab_afecta_trabajador').setDisabled(true);
                                                                }
                                                            }
                                                        ]
                                                    },
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
				                            if (Ext.getCmp('tab_afecta_trabajador').isDisabled()) {
				                                this.up('tabpanel').setActiveTab(2);
				                            } else {
				                                if (errors.isValid() && form.isValid()) {
				                                    this.up('tabpanel').setActiveTab(2);
				                                } else {
				                                    form.markInvalid(errors);
				                                }
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
				                            if (Ext.getCmp('tab_afecta_trabajador').isDisabled()) {
				                                this.up('tabpanel').setActiveTab(4);
				                            } else {
				                                if (errors.isValid() && form.isValid()) {
				                                    this.up('tabpanel').setActiveTab(4);
				                                } else {
				                                    form.markInvalid(errors);
				                                }
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                        queryMode: 'local',
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
                                                isValid = true,
				                                values = {},
				                                forms = ['form_informe_data_preliminar', 'form_afecta_a', 'form_incidente_patrimonio', 'form_tipo_incidente_persona', 'form_condiciones', 'form_factores_trabajo'];
				                            Ext.Array.each(forms, function (formId) {
				                                var form = Ext.getCmp(formId).getForm();
				                                values = Ext.apply(values, form.getValues());
				                                if (!form.isValid()) { isValid = false; }
				                            });
				                            new_object = Ext.create('WCF_ENAP.model.e0063', Ext.apply(
                                                values,
                                                {
                                                    'TIPO_INCIDENTE_PATRIMONIO': Ext.getCmp('TIPO_INCIDENTE_PATRIMONIO').getRawValue(),
                                                    'TIPO_INCIDENTE_PERSONA': Ext.getCmp('TIPO_INCIDENTE_PERSONA').getRawValue(),
                                                    'CAUSA_INMEDIATA_ACCION_PATRIMONIO': Ext.getCmp('CAUSA_INMEDIATA_ACCION_PATRIMONIO').getRawValue(),
                                                    'AFECTA_PERSONA': Ext.getCmp('AFECTA_PERSONA').getRawValue(),
                                                    'AFECTA_PATRIMONIO': Ext.getCmp('AFECTA_PATRIMONIO').getRawValue(),
                                                    'AFECTA_PERDIDA_PROCESO': Ext.getCmp('AFECTA_PERDIDA_PROCESO').getRawValue(),
                                                    'AFECTA_MEDIO_AMBIENTE': Ext.getCmp('AFECTA_MEDIO_AMBIENTE').getRawValue(),
                                                    'AFECTA_IMAGEN': Ext.getCmp('AFECTA_IMAGEN').getRawValue()
                                                }
                                            ));
				                            errors = new_object.validate();
				                            var informeSync = Ext.data.StoreManager.lookup('dse0063').getById(new_object.get('ID_INFORME_PRELIMINAR'));
				                            console.log(informeSync);
				                            if (errors.isValid() && isValid) {
				                                if (!informeSync) {
				                                    Ext.data.StoreManager.lookup('dse0063').insert(0, new_object);
				                                } else {
				                                    new_object.setProxy(Ext.data.StoreManager.lookup('dse0063').getProxy());
				                                    new_object.save({
				                                        callback: function (records, options) {
				                                            console.log("ACTUALIZADO");
				                                        }
				                                    });
				                                }
				                            } else {
				                                Ext.Array.each(forms, function (formId) {
				                                    var form = Ext.getCmp(formId).getForm();
				                                    form.markInvalid(errors);
				                                });
				                            }

				                        }
				                    }
			                    ]
                            }
                        ]
					}
				]
			}
		];
        me.callParent(arguments);
    }
});