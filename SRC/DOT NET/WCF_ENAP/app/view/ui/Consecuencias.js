var rowEditingConsecuencias = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Consecuencias', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Consecuencias',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Consecuencias',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Consecuencia","anchor":"100%","name":"NOMBRE_CONSECUENCIA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Consecuencias', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsConsecuencias').insert(0, new_object);
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
                store: 'dsConsecuencias',
                itemId: 'Grid_Consecuencias',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_CONSECUENCIA","text":"Id Consecuencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_CONSECUENCIA","text":"Nombre Consecuencia","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingConsecuencias
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsConsecuencias',
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
                                    rowEditingConsecuencias.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Consecuencias');
                                    Ext.data.StoreManager.lookup('dsConsecuencias').insert(0, r);
                                    rowEditingConsecuencias.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Consecuencias').getSelectionModel();
                                    rowEditingConsecuencias.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsConsecuencias').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsConsecuencias').getCount() > 0) {
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
                            Ext.getCmp('Form_Consecuencias').getForm().loadRecord(records[0]);
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