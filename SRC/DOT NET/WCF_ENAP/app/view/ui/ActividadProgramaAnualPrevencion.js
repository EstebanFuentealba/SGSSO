Ext.define('WCF_ENAP.view.ui.ActividadProgramaAnualPrevencion', {
    extend: 'Ext.window.Window',
    modal: true,
    closeAction: 'hide',
    height: 319,
    title: 'Agrega Actividad',
    width: 858,
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
                                    name: 'TIPO_FRECUENCIA'
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

                            form = this.up('form').getForm();
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
    }
});