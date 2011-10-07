var rowEditingMedidasDeControl = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.MedidasDeControl', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-MedidasDeControl',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_MedidasDeControl',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Medida De Control","anchor":"100%","name":"NOM_MEDIDA_DE_CONTROL"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.MedidasDeControl', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsMedidasDeControl').insert(0, new_object);
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
                store: 'dsMedidasDeControl',
                itemId: 'Grid_MedidasDeControl',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_MEDIDAS_DE_CONTROL","text":"Id Medidas De Control","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_MEDIDA_DE_CONTROL","text":"Nom Medida De Control","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingMedidasDeControl
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsMedidasDeControl',
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
                                    rowEditingMedidasDeControl.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.MedidasDeControl');
                                    Ext.data.StoreManager.lookup('dsMedidasDeControl').insert(0, r);
                                    rowEditingMedidasDeControl.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_MedidasDeControl').getSelectionModel();
                                    rowEditingMedidasDeControl.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsMedidasDeControl').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsMedidasDeControl').getCount() > 0) {
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
                            Ext.getCmp('Form_MedidasDeControl').getForm().loadRecord(records[0]);
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