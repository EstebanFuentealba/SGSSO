var rowEditingConsecuencia = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Consecuencia', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Consecuencia',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Consecuencia',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Peligro","anchor":"100%","name":"ID_PELIGRO"},{"xtype":"textfield","fieldLabel":"Nombre Consecuencia","anchor":"100%","name":"NOMBRE_CONSECUENCIA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Consecuencia', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsConsecuencia').insert(0, new_object);
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
                store: 'dsConsecuencia',
                itemId: 'Grid_Consecuencia',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_CONSECUENCIA","text":"Id Consecuencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO","text":"Id Peligro","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_CONSECUENCIA","text":"Nombre Consecuencia","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingConsecuencia
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsConsecuencia',
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
                                    rowEditingConsecuencia.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Consecuencia');
                                    Ext.data.StoreManager.lookup('dsConsecuencia').insert(0, r);
                                    rowEditingConsecuencia.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Consecuencia').getSelectionModel();
                                    rowEditingConsecuencia.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsConsecuencia').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsConsecuencia').getCount() > 0) {
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
                            Ext.getCmp('Form_Consecuencia').getForm().loadRecord(records[0]);
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