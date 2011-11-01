var rowEditingAccion = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Herramienta', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Herramienta',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Herramienta',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [
                            {"xtype":"textfield",
                                "fieldLabel":"Nombre Herramienta",
                                "anchor":"100%",
                                "name":"NOMBRE_HERRAMIENTA}
                        ],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Herramienta', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsHerramienta').insert(0, new_object);
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
                store: 'dsHerramienta',
                itemId: 'Grid_Herramienta',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_HERRAMIENTA","text":"Id Herramienta","sortable":true},
                            {"xtype":"gridcolumn","dataIndex":"NOMBRE_HERRAMIENTA","text":"Nombre Herramienta","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingAccion
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsHerramienta',
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
                                    rowEditingAccion.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Herramienta');
                                    Ext.data.StoreManager.lookup('dsHerramienta').insert(0, r);
                                    rowEditingAccion.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Herramienta').getSelectionModel();
                                    rowEditingAccion.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsHerramienta').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsHerramienta').getCount() > 0) {
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
                            Ext.getCmp('Form_Herramienta').getForm().loadRecord(records[0]);
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