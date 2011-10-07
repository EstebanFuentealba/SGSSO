var rowEditingHerramientaPreventiva = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.HerramientaPreventiva', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-HerramientaPreventiva',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_HerramientaPreventiva',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Herramienta Preventiva","anchor":"100%","name":"NOMBRE_HERRAMIENTA_PREVENTIVA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.HerramientaPreventiva', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsHerramientaPreventiva').insert(0, new_object);
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
                store: 'dsHerramientaPreventiva',
                itemId: 'Grid_HerramientaPreventiva',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_HERRAMIENTA_PREVENTIVA","text":"Id Herramienta Preventiva","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_HERRAMIENTA_PREVENTIVA","text":"Nombre Herramienta Preventiva","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingHerramientaPreventiva
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsHerramientaPreventiva',
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
                                    rowEditingHerramientaPreventiva.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.HerramientaPreventiva');
                                    Ext.data.StoreManager.lookup('dsHerramientaPreventiva').insert(0, r);
                                    rowEditingHerramientaPreventiva.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_HerramientaPreventiva').getSelectionModel();
                                    rowEditingHerramientaPreventiva.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsHerramientaPreventiva').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsHerramientaPreventiva').getCount() > 0) {
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
                            Ext.getCmp('Form_HerramientaPreventiva').getForm().loadRecord(records[0]);
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