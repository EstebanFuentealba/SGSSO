Ext.define('WCF_ENAP.view.ui.DatosAcionesCorrectivas', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.field.BoxSelect'
    ],
    width: 828,
    cmpRecord: null,
    title: 'Agregar Datos de Acciones Correctivas',
    maximizable: true,
    initComponent: function () {
        var me = this;
        var store = Ext.StoreManager.lookup('dsAccionCorrectiva');
            store.setProxy(Ext.apply(store.getProxy(), {
                extraParams: {
                    'ID_EVENTO_EMPRESA': me.cmpRecord.get('ID_EVENTO_EMPRESA')
                }
            }));
            store.load();
        Ext.applyIf(me, {
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
                            xtype: 'form',
                            id: 'form_datos_acciones_correctivas',
                            margin: '5 5 5 5',
                            bodyPadding: 10,
                            title: 'Medida Correctiva o Preventiva',
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'ID_ACCION_CORRECTIVA'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'ID_EVENTO_EMPRESA',
                                    value: me.cmpRecord.get('ID_EVENTO_EMPRESA')
                                },
                                {
                                    xtype: 'panel',
                                    border: 0,
                                    margin: '5 5 5 5',
                                    layout: {
                                        type: 'column'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_accion_correctiva',
                                            margin: '0 5 0 0',
                                            name: 'ID_ACCION',
                                            store: 'dsAccion',
                                            displayField: 'NOMBRE_ACCION',
                                            valueField: 'ID_ACCION',
                                            fieldLabel: 'Acción Correctiva',
                                            columnWidth: 0.94
                                        },
                                        {
                                            xtype: 'button',
                                            columnWidth: 0.06,
                                            iconCls: 'btn-add',
                                            handler: function () {
                                                Ext.application({
                                                    name: 'WCF_ENAP',
                                                    stores: ['dsAccion'],
                                                    launch: function () {
                                                        Ext.QuickTips.init();
                                                        var addAccion = Ext.create('WCF_ENAP.view.ui.Accion', {
                                                            listeners: {
                                                                addedRecord: function (cmp, record) {
                                                                    console.log('ADDED RECORD: ');
                                                                    Ext.getCmp('cmb_accion_correctiva').select();
                                                                    addAccion.close();
                                                                },
                                                                existsRecord: function (cmp, record) {
                                                                    console.log('EXISTE RECORD: ');
                                                                    console.log(record);
                                                                }
                                                            }
                                                        });
                                                        addAccion.show();
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'boxselect',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Responsable(s)',
                                    name: 'RESPONSABLE',
                                    store: 'dsCargo',
                                    displayField: 'NOMBRE_CARGO',
                                    valueField: 'ID_CARGO',
                                    multiSelect: true,
                                    anchor: '100%'
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
                                            xtype: 'datefield',
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha de Inicio',
                                            name: 'FECHA_COMIENZO',
                                            labelAlign: 'top',
                                            columnWidth: 0.333,
                                            format: 'd-m-Y'
                                        },
                                        {
                                            xtype: 'datefield',
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha de Término',
                                            name: 'FECHA_PLAZO',
                                            labelAlign: 'top',
                                            columnWidth: 0.333,
                                            format: 'd-m-Y'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'field_date_ejecucion',
                                            disabled: true,
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha de Ejecución',
                                            name: 'FECHA_EJECUCION',
                                            labelAlign: 'top',
                                            columnWidth: 0.333,
                                            format: 'd-m-Y'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'htmleditor',
                                    name: 'DESCRIPCION',
                                    height: 150,
                                    style: 'background-color: white;',
                                    fieldLabel: 'Descripción de la acción correctiva',
                                    labelAlign: 'top',
                                    anchor: '100%'
                                }
                            ],
                            buttons: [{
                                text: 'Limpiar',
                                handler: function () {
                                    var form;
                                    form = Ext.getCmp('form_datos_acciones_correctivas').getForm();
                                    Ext.getCmp('btn_accion_correctiva_submit').setText('Agregar');
                                    Ext.getCmp('field_date_ejecucion').setDisabled(true);
                                    form.reset();
                                }
                            },
                            {
                                id: 'btn_accion_correctiva_submit',
                                text: 'Agregar',
                                handler: function () {
                                    var new_object,
									errors,
									form,
		                            values;
                                    
                                    form = Ext.getCmp('form_datos_acciones_correctivas').getForm();
                                    values = form.getValues();

                                    var record = Ext.StoreManager.lookup('dsAccion').findRecord('ID_ACCION', values['ID_ACCION']);
                                    new_object = Ext.create('WCF_ENAP.model.AccionCorrectiva', Ext.apply(values, { 'NOMBRE_ACCION': record.get('NOMBRE_ACCION') }));
                                    errors = new_object.validate();
                                    if (errors.isValid() && form.isValid()) {
                                        if(Ext.isDefined(values['ID_ACCION_CORRECTIVA']) && Ext.isNumeric(values['ID_ACCION_CORRECTIVA'])){
                                            form.updateRecord(form.getRecord());
                                        } else {
                                            Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
                                        }
                                    }

                                }
                            }]
                        },
                        {
                            xtype: 'gridpanel',
                            margin: '5 5 5 5',
                            title: 'Listado de Acciones a Realizar',
                            store: 'dsAccionCorrectiva',
                            columnWidth: 0.5,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_ACCION',
                                    text: 'Acción'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Responsable(s)',
                                    dataIndex: 'RESPONSABLE',
                                },
                                {
                                    xtype: 'datecolumn',
                                    dataIndex: 'FECHA_EJECUCION',
                                    text: 'Fecha de Ejecución',
                                    format: 'd-m-Y'
                                },
                                {
                                    xtype: 'booleancolumn',
                                    dataIndex: 'bool',
                                    text: 'Estado'
                                }
                            ],
                            viewConfig: {

                            },
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true,
                                    store: 'dsAccionCorrectiva',
                                    dock: 'bottom'
                                }
                            ],
                            listeners: {
                                selectionchange: function (model, records) {
                                    var form,
                                        record;
                                        form = Ext.getCmp('form_datos_acciones_correctivas');
                                    if (records[0]) {
                                        record = records[0];
                                        form.loadRecord(record);
                                        Ext.getCmp('btn_accion_correctiva_submit').setText('Guardar');
                                        Ext.getCmp('field_date_ejecucion').setDisabled(false);
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
