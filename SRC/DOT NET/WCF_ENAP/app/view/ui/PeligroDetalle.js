var rowEditingPeligroDetalle = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.PeligroDetalle', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-PeligroDetalle',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_PeligroDetalle',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Actividad Especifica","anchor":"100%","name":"ID_ACTIVIDAD_ESPECIFICA"},{"xtype":"numberfield","fieldLabel":"Id Peligro","anchor":"100%","name":"ID_PELIGRO"},{"xtype":"numberfield","fieldLabel":"Id Valoracion Consecuencia","anchor":"100%","name":"ID_VALORACION_CONSECUENCIA"},{"xtype":"numberfield","fieldLabel":"Medida Id Valoracion Consecuencia","anchor":"100%","name":"MEDIDA_ID_VALORACION_CONSECUENCIA"},{"xtype":"numberfield","fieldLabel":"Id Valoracion Probabilidad","anchor":"100%","name":"ID_VALORACION_PROBABILIDAD"},{"xtype":"numberfield","fieldLabel":"Medida Id Valoracion Probabilidad","anchor":"100%","name":"MEDIDA_ID_VALORACION_PROBABILIDAD"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.PeligroDetalle', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsPeligroDetalle').insert(0, new_object);
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
                store: 'dsPeligroDetalle',
                itemId: 'Grid_PeligroDetalle',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO_DETALLE","text":"Id Peligro Detalle","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_ESPECIFICA","text":"Id Actividad Especifica","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO","text":"Id Peligro","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_VALORACION_CONSECUENCIA","text":"Id Valoracion Consecuencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"MEDIDA_ID_VALORACION_CONSECUENCIA","text":"Medida Id Valoracion Consecuencia","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_VALORACION_PROBABILIDAD","text":"Id Valoracion Probabilidad","sortable":true},{"xtype":"gridcolumn","dataIndex":"MEDIDA_ID_VALORACION_PROBABILIDAD","text":"Medida Id Valoracion Probabilidad","sortable":true}],
                plugins: [
                    rowEditingPeligroDetalle
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsPeligroDetalle',
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
                                    rowEditingPeligroDetalle.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.PeligroDetalle');
                                    Ext.data.StoreManager.lookup('dsPeligroDetalle').insert(0, r);
                                    rowEditingPeligroDetalle.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_PeligroDetalle').getSelectionModel();
                                    rowEditingPeligroDetalle.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsPeligroDetalle').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsPeligroDetalle').getCount() > 0) {
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
                            Ext.getCmp('Form_PeligroDetalle').getForm().loadRecord(records[0]);
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