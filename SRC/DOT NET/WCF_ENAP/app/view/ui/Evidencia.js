var rowEditingEvidencia = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Evidencia', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Evidencia',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Evidencia',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Evidencia","anchor":"100%","name":"NOMBRE_EVIDENCIA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Evidencia', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEvidencia').insert(0, new_object);
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
                store: 'dsEvidencia',
                itemId: 'Grid_Evidencia',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVIDENCIA","text":"Id Evidencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_EVIDENCIA","text":"Nombre Evidencia","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingEvidencia
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEvidencia',
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
                                    rowEditingEvidencia.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Evidencia');
                                    Ext.data.StoreManager.lookup('dsEvidencia').insert(0, r);
                                    rowEditingEvidencia.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Evidencia').getSelectionModel();
                                    rowEditingEvidencia.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEvidencia').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEvidencia').getCount() > 0) {
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
                            Ext.getCmp('Form_Evidencia').getForm().loadRecord(records[0]);
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