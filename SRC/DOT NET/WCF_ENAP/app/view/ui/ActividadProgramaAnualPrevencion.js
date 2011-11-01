﻿Ext.define('WCF_ENAP.view.ui.ActividadProgramaAnualPrevencion', {
    extend: 'Ext.window.Window',
    modal: true,
    /*closeAction: 'hide',*/
    height: 319,
    title: 'Agrega Actividad',
    width: 858,
    recordParent: null,
    initComponent: function () {
        var me = this, winAddCargo, winAddEvidencia;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'form_actividad_programa_anual',
                    margin: '5 5 5 5',
                    bodyPadding: 10,
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
                                            if(newValue == 4){
                                                var winMesesEvaluados = Ext.create('Ext.window.Window',{
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
                                                                        listeners : {
                                                                            change: function( field ,  newValue,  oldValue,  eOpts ) {
                                                                                var record = Ext.getCmp('form_actividad_programa_anual').getForm().getRecord();
                                                                                record.set('ENERO_E',0);
                                                                                record.set('FEBRERO_E',0);
                                                                                record.set('MARZO_E',0);
                                                                                record.set('ABRIL_E',0);
                                                                                record.set('MAYO_E',0);
                                                                                record.set('JUNIO_E',0);
                                                                                record.set('JULIO_E',0);
                                                                                record.set('AGOSTO_E',0);
                                                                                record.set('SEPTIEMBRE_E',0);
                                                                                record.set('OCTUBRE_E',0);
                                                                                record.set('NOVIEMBRE_E',0);
                                                                                record.set('DICIEMBRE_E',0);
                                                                                Ext.each(Ext.getCmp('chk_group_month_selected').getChecked(),function(checkbox) {
                                                                                    record.set(checkbox.name, ((checkbox.value) ?1 :0));  
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
                                    columnWidth: 0.94
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
                                                            "labelWidth":120
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
                                                            console.log(new_object);
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
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Evaluar a todos Juntos',
                                    name: 'ALL_TURNO',
                                    inputValue: 2,
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
                                this.disable(true);
                                if(tipo_turno == 1) {
                                    var records=[];
                                    Ext.each(['A','B','C','D'],function(name, index, turnoSelf){
                                        var c_new_object = Ext.create('WCF_ENAP.model.ActividadProgramaAnualPrevencion', form.getValues());
                                        c_new_object.set('TURNO',name);
                                        records.push(c_new_object);
                                    });
                                    console.log(records);
                                    Ext.data.StoreManager.lookup('dsActividadProgramaAnualPrevencion').insert(0, records);
                                } else {
                                    new_object.set('TURNO','0');
                                    console.log(new_object);
                                    Ext.data.StoreManager.lookup('dsActividadProgramaAnualPrevencion').insert(0, new_object);
                                }  
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


        me.callParent(arguments);
        Ext.getCmp('form_actividad_programa_anual').getForm().loadRecord(me.recordParent);
    }
});