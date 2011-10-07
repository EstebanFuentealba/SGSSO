var rowEditingValoracionConsecuencia = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ValoracionConsecuencia', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ValoracionConsecuencia',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ValoracionConsecuencia',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Consecuencia","anchor":"100%","name":"NOM_CONSECUENCIA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ValoracionConsecuencia', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsValoracionConsecuencia').insert(0, new_object);
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
                store: 'dsValoracionConsecuencia',
                itemId: 'Grid_ValoracionConsecuencia',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_VALORACION_CONSECUENCIA","text":"Id Valoracion Consecuencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_CONSECUENCIA","text":"Nom Consecuencia","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingValoracionConsecuencia
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsValoracionConsecuencia',
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
                                    rowEditingValoracionConsecuencia.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ValoracionConsecuencia');
                                    Ext.data.StoreManager.lookup('dsValoracionConsecuencia').insert(0, r);
                                    rowEditingValoracionConsecuencia.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ValoracionConsecuencia').getSelectionModel();
                                    rowEditingValoracionConsecuencia.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsValoracionConsecuencia').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsValoracionConsecuencia').getCount() > 0) {
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
                            Ext.getCmp('Form_ValoracionConsecuencia').getForm().loadRecord(records[0]);
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