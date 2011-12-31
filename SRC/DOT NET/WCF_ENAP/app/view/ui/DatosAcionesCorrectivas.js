Ext.define('WCF_ENAP.view.ui.DatosAcionesCorrectivas', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.field.BoxSelect',
        'Ext.ux.form.field.ClearButton'
    ],
    width: 1000,
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
                            columnWidth: 0.45,
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
                                    xtype: 'hiddenfield',
                                    id: 'hdd_field_responsables_name',
                                    name: 'RESPONSABLES'
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
                                            allowBlank: false,
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
                                                                    Ext.getCmp('cmb_accion_correctiva').select(record);
                                                                    addAccion.close();
                                                                },
                                                                existsRecord: function (cmp, record) {

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
                                    allowBlank: false,
                                    name: 'RESPONSABLE',
                                    store: 'dsCargo',
                                    displayField: 'NOMBRE_CARGO',
                                    valueField: 'ID_CARGO',
                                    multiSelect: true,
                                    anchor: '100%',
                                    listeners: {
                                        change: function (field, newValue, oldValue, eOpts) {
                                            Ext.getCmp('hdd_field_responsables_name').setValue(this.getRawValue());
                                        }
                                    }
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
                                            plugins: ['clearbutton'],
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha Inicio',
                                            allowBlank: false,
                                            name: 'FECHA_COMIENZO',
                                            labelAlign: 'top',
                                            columnWidth: 0.333,
                                            format: 'd-m-Y',
                                            id: 'startdtac',
                                            vtype: 'daterange',
                                            endDateField: 'enddtac',
                                            listeners: {
                                                select: function (combo, value) {
                                                    Ext.getCmp('enddtac').setValue(value);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            plugins: ['clearbutton'],
                                            disabled: true,
                                            allowBlank: false,
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha Término',
                                            name: 'FECHA_PLAZO',
                                            labelAlign: 'top',
                                            columnWidth: 0.333,
                                            format: 'd-m-Y',
                                            id: 'enddtac',
                                            vtype: 'daterange',
                                            startDateField: 'startdtac',
                                            listeners: {
                                                change: function (field, newValue, oldValue, eOpts) {
                                                    Ext.getCmp('enddtac').setDisabled((newValue == null));
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            plugins: ['clearbutton'],
                                            id: 'field_date_ejecucion',
                                            disabled: true,
                                            margin: '5 5 5 5',
                                            fieldLabel: 'Fecha Ejecución',
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
                                    allowBlank: false,
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
                                    Ext.getCmp('btn_accion_correctiva_submit').setIconCls('btn-add');
                                    Ext.getCmp('field_date_ejecucion').setDisabled(true);
                                    Ext.getCmp('grid_acciones_correctivas_list').getSelectionModel().deselectAll();
                                    form.reset();
                                }
                            },
                            {
                                id: 'btn_accion_correctiva_submit',
                                text: 'Agregar',
                                iconCls: 'btn-add',
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
                                        if (Ext.isDefined(values['ID_ACCION_CORRECTIVA']) && Ext.isNumeric(values['ID_ACCION_CORRECTIVA'])) {
                                            form.updateRecord(form.getRecord());
                                        } else {
                                            Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
                                        }
                                    }
                                    Ext.getCmp('btn_accion_correctiva_submit').setText('Agregar');
                                    Ext.getCmp('btn_accion_correctiva_submit').setIconCls('btn-add');
                                    Ext.getCmp('field_date_ejecucion').setDisabled(true);
                                    form.reset();
                                    Ext.getCmp('grid_acciones_correctivas_list').getDockedItems('pagingtoolbar')[0].doRefresh();
                                }
                            }]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_acciones_correctivas_list',
                            margin: '5 5 5 5',
                            title: 'Listado de Acciones a Realizar',
                            store: 'dsAccionCorrectiva',
                            columnWidth: 0.55,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.3,
                                    dataIndex: 'NOMBRE_ACCION',
                                    text: 'Acción'
                                },
                                {
                                    xtype: 'templatecolumn',
                                    flex: 0.2,
                                    text: 'Responsable(s)',
                                    dataIndex: 'RESPONSABLES_OBJECT',
                                    tpl: '<ol><tpl for="RESPONSABLES_OBJECT"><li>{NOMBRE_CARGO}</li></tpl></ol>'
                                },
                                {
                                    xtype: 'datecolumn',
                                    flex: 0.15,
                                    dataIndex: 'FECHA_COMIENZO',
                                    text: 'Inicio',
                                    format: 'd-m-Y'
                                },
                                {
                                    xtype: 'datecolumn',
                                    flex: 0.15,
                                    dataIndex: 'FECHA_PLAZO',
                                    text: 'Fin',
                                    format: 'd-m-Y'
                                },
                                {
                                    xtype: 'datecolumn',
                                    flex: 0.15,
                                    dataIndex: 'FECHA_EJECUCION',
                                    text: 'Ejecución',
                                    format: 'd-m-Y'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.05,
                                    dataIndex: 'bool',
                                    text: 'Estado',
                                    renderer: function (value, meta, record) {
                                        if (record.get('FECHA_EJECUCION') != null) {
                                            if ((record.get('FECHA_EJECUCION') >= record.get('FECHA_COMIENZO') && record.get('FECHA_EJECUCION') <= record.get('FECHA_PLAZO')) || (record.get('FECHA_EJECUCION') <= record.get('FECHA_COMIENZO'))) {
                                                return '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="16" border="0" height="16" class="accept-icon" />';
                                            }
                                            return '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="16" border="0" height="16" class="alert-icon" />';
                                        }
                                        return '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="16" border="0" height="16" class="stop-icon" />';
                                    }
                                }
                            ],
                            viewConfig: {

                        },
                        dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                        xtype: 'button',
                                        disabled: true,
                                        text: 'Eliminar Seleccionado',
                                        id: 'btn_delete_accion_correctiva',
                                        itemId: 'btn_delete_accion_correctiva',
                                        iconCls: 'btn-delete',
                                        handler: function () {
                                            var record,
                                                storeAccionCorrectiva = Ext.StoreManager.lookup('dsAccionCorrectiva'),
												grid = Ext.getCmp('grid_acciones_correctivas_list'),
												records = grid.getSelectionModel().getSelection();
                                            record = Ext.create('WCF_ENAP.model.AccionCorrectiva', {
                                                'ID_ACCION_CORRECTIVA': records[0].get('ID_ACCION_CORRECTIVA')
                                            });
                                            record.setProxy(storeAccionCorrectiva.getProxy());
                                            record.destroy();
                                            Ext.getCmp('grid_acciones_correctivas_list').getDockedItems('pagingtoolbar')[0].doRefresh();
                                        }
                                    }]
                                },
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
                                    Ext.getCmp('btn_accion_correctiva_submit').setIconCls('btn-save');
                                    Ext.getCmp('field_date_ejecucion').setDisabled(false);
                                }
                                this.down('#btn_delete_accion_correctiva').setDisabled(Ext.isEmpty(records[0]));
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
