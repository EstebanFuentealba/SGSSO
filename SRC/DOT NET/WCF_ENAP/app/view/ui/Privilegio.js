var rowEditingPrivilegio = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Privilegio', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Privilegio',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Privilegio',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Privilegio","anchor":"100%","name":"NOMBRE_PRIVILEGIO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Privilegio', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsPrivilegio').insert(0, new_object);
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
                store: 'dsPrivilegio',
                itemId: 'Grid_Privilegio',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PRIVILEGIO","text":"Id Privilegio","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_PRIVILEGIO","text":"Nombre Privilegio","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingPrivilegio
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsPrivilegio',
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
                                    rowEditingPrivilegio.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Privilegio');
                                    Ext.data.StoreManager.lookup('dsPrivilegio').insert(0, r);
                                    rowEditingPrivilegio.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Privilegio').getSelectionModel();
                                    rowEditingPrivilegio.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsPrivilegio').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsPrivilegio').getCount() > 0) {
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
                            Ext.getCmp('Form_Privilegio').getForm().loadRecord(records[0]);
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