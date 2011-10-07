var rowEditingHistorialEmpresa = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.HistorialEmpresa', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-HistorialEmpresa',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_HistorialEmpresa',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Empresa","displayField":"NOMBRE_EMPRESA","valueField":"ID_EMPRESA","anchor":"100%","store":"dsEmpresa","name":"ID_EMPRESA"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"},{"xtype":"numberfield","fieldLabel":"N Trabajadores","anchor":"100%","name":"N_TRABAJADORES"},{"xtype":"numberfield","fieldLabel":"H Trabajadas","anchor":"100%","name":"H_TRABAJADAS"},{"xtype":"numberfield","fieldLabel":"H Sobretiempo","anchor":"100%","name":"H_SOBRETIEMPO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.HistorialEmpresa', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsHistorialEmpresa').insert(0, new_object);
                            form.reset();
                        } else {
                            form.markInvalid(errors);
                        }
                        this.enable(true);
                    }
                }]
            },
            {
                xtype: 'gridpanel',
                margin: '5 5 5 5',
                collapsible: true,
                title: 'My Grid Panel',
                store: 'dsHistorialEmpresa',
                itemId: 'Grid_HistorialEmpresa',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_HISTORIAL","text":"Id Historial","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EMPRESA","text":"Id Empresa","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_EMPRESA","valueField":"ID_EMPRESA","anchor":"100%","store":"dsEmpresa","name":"ID_EMPRESA"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EMPRESA', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_EMPRESA') : '' }"},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"N_TRABAJADORES","text":"N Trabajadores","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"H_TRABAJADAS","text":"H Trabajadas","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"H_SOBRETIEMPO","text":"H Sobretiempo","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingHistorialEmpresa
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsHistorialEmpresa',
                        dock: 'bottom'
                    },
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                handler: function () {
                                    rowEditingHistorialEmpresa.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.HistorialEmpresa');
                                    Ext.data.StoreManager.lookup('dsHistorialEmpresa').insert(0, r);
                                    rowEditingHistorialEmpresa.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_HistorialEmpresa').getSelectionModel();
                                    rowEditingHistorialEmpresa.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsHistorialEmpresa').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsHistorialEmpresa').getCount() > 0) {
                                        sm.select(0);
                                    }
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    itemdblclick: function (view, records) {
                        if (records[0]) {
                            Ext.getCmp('Form_HistorialEmpresa').getForm().loadRecord(records[0]);
                        }
                    }
                },
                selModel: Ext.create('Ext.selection.RowModel', {
                    allowDeselect: true,
                    mode: 'MULTI'
                })
            }
        ];
        me.callParent(arguments);
    }
});