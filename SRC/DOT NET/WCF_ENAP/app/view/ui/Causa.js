var rowEditingCausa = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Causa', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Causa',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Causa',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Informe","anchor":"100%","name":"ID_INFORME"},{"xtype":"htmleditor","fieldLabel":"Descripcion","anchor":"100%","name":"DESCRIPCION"},{"xtype":"numberfield","fieldLabel":"Tipo Causa","anchor":"100%","name":"TIPO_CAUSA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsCausa').insert(0, new_object);
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
                store: 'dsCausa',
                itemId: 'Grid_Causa',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_CAUSA","text":"Id Causa","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION","text":"Descripcion","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"TIPO_CAUSA","text":"Tipo Causa","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingCausa
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsCausa',
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
                                    rowEditingCausa.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Causa');
                                    Ext.data.StoreManager.lookup('dsCausa').insert(0, r);
                                    rowEditingCausa.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Causa').getSelectionModel();
                                    rowEditingCausa.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsCausa').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsCausa').getCount() > 0) {
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
                            Ext.getCmp('Form_Causa').getForm().loadRecord(records[0]);
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