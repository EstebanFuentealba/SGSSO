var rowEditinghistorialInforme = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.historialInforme', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-historialInforme',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_historialInforme',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Informe","anchor":"100%","name":"ID_INFORME"},{"xtype":"datefield","fieldLabel":"Fecha Modificacion","anchor":"100%","name":"FECHA_MODIFICACION"},{"xtype":"htmleditor","fieldLabel":"Descripcion Modificacion","anchor":"100%","name":"DESCRIPCION_MODIFICACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.historialInforme', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dshistorialInforme').insert(0, new_object);
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
                store: 'dshistorialInforme',
                itemId: 'Grid_historialInforme',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_HISTORIAL_INFORME","text":"Id Historial Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"FECHA_MODIFICACION","text":"Fecha Modificacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION_MODIFICACION","text":"Descripcion Modificacion","sortable":true,"field":{"type":"htmleditor"}}],
                plugins: [
                    rowEditinghistorialInforme
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dshistorialInforme',
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
                                    rowEditinghistorialInforme.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.historialInforme');
                                    Ext.data.StoreManager.lookup('dshistorialInforme').insert(0, r);
                                    rowEditinghistorialInforme.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_historialInforme').getSelectionModel();
                                    rowEditinghistorialInforme.cancelEdit();
                                    Ext.data.StoreManager.lookup('dshistorialInforme').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dshistorialInforme').getCount() > 0) {
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
                            Ext.getCmp('Form_historialInforme').getForm().loadRecord(records[0]);
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