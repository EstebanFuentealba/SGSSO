var rowEditingPeligro = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Peligro', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Peligro',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Peligro',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Peligro","anchor":"100%","name":"NOM_PELIGRO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Peligro', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsPeligro').insert(0, new_object);
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
                store: 'dsPeligro',
                itemId: 'Grid_Peligro',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO","text":"Id Peligro","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_PELIGRO","text":"Nom Peligro","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingPeligro
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsPeligro',
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
                                    rowEditingPeligro.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Peligro');
                                    Ext.data.StoreManager.lookup('dsPeligro').insert(0, r);
                                    rowEditingPeligro.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Peligro').getSelectionModel();
                                    rowEditingPeligro.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsPeligro').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsPeligro').getCount() > 0) {
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
                            Ext.getCmp('Form_Peligro').getForm().loadRecord(records[0]);
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