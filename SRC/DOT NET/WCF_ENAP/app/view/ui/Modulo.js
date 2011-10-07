var rowEditingModulo = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Modulo', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Modulo',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Modulo',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Modulo","anchor":"100%","name":"NOMBRE_MODULO"},{"xtype":"htmleditor","fieldLabel":"Descripcion Modulo","anchor":"100%","name":"DESCRIPCION_MODULO"},{"xtype":"textfield","fieldLabel":"Url Modulo","anchor":"100%","name":"URL_MODULO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Modulo', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsModulo').insert(0, new_object);
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
                store: 'dsModulo',
                itemId: 'Grid_Modulo',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_MODULO","text":"Id Modulo","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_MODULO","text":"Nombre Modulo","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION_MODULO","text":"Descripcion Modulo","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"URL_MODULO","text":"Url Modulo","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingModulo
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsModulo',
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
                                    rowEditingModulo.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Modulo');
                                    Ext.data.StoreManager.lookup('dsModulo').insert(0, r);
                                    rowEditingModulo.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Modulo').getSelectionModel();
                                    rowEditingModulo.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsModulo').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsModulo').getCount() > 0) {
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
                            Ext.getCmp('Form_Modulo').getForm().loadRecord(records[0]);
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