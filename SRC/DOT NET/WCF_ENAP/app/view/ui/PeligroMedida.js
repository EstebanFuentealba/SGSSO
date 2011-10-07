var rowEditingPeligroMedida = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.PeligroMedida', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-PeligroMedida',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_PeligroMedida',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Peligro Detalle","anchor":"100%","name":"ID_PELIGRO_DETALLE"},{"xtype":"numberfield","fieldLabel":"Id Medidas De Control","anchor":"100%","name":"ID_MEDIDAS_DE_CONTROL"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.PeligroMedida', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsPeligroMedida').insert(0, new_object);
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
                store: 'dsPeligroMedida',
                itemId: 'Grid_PeligroMedida',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO_MEDIDA","text":"Id Peligro Medida","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO_DETALLE","text":"Id Peligro Detalle","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_MEDIDAS_DE_CONTROL","text":"Id Medidas De Control","sortable":true}],
                plugins: [
                    rowEditingPeligroMedida
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsPeligroMedida',
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
                                    rowEditingPeligroMedida.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.PeligroMedida');
                                    Ext.data.StoreManager.lookup('dsPeligroMedida').insert(0, r);
                                    rowEditingPeligroMedida.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_PeligroMedida').getSelectionModel();
                                    rowEditingPeligroMedida.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsPeligroMedida').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsPeligroMedida').getCount() > 0) {
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
                            Ext.getCmp('Form_PeligroMedida').getForm().loadRecord(records[0]);
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