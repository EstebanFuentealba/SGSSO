var rowEditingInvestigacionAccionCorrectiva = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.InvestigacionAccionCorrectiva', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-InvestigacionAccionCorrectiva',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_InvestigacionAccionCorrectiva',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Accion Correctiva","anchor":"100%","name":"ID_ACCION_CORRECTIVA"},{"xtype":"checkboxfield","fieldLabel":"Asistio","anchor":"100%","name":"ASISTIO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.InvestigacionAccionCorrectiva', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsInvestigacionAccionCorrectiva').insert(0, new_object);
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
                store: 'dsInvestigacionAccionCorrectiva',
                itemId: 'Grid_InvestigacionAccionCorrectiva',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_INVESTIGACION","text":"Id Investigacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_ACCION_CORRECTIVA","text":"Id Accion Correctiva","sortable":true},{"xtype":"gridcolumn","dataIndex":"ASISTIO","text":"Asistio","sortable":true,"field":{"type":"checkboxfield"}}],
                plugins: [
                    rowEditingInvestigacionAccionCorrectiva
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsInvestigacionAccionCorrectiva',
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
                                    rowEditingInvestigacionAccionCorrectiva.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.InvestigacionAccionCorrectiva');
                                    Ext.data.StoreManager.lookup('dsInvestigacionAccionCorrectiva').insert(0, r);
                                    rowEditingInvestigacionAccionCorrectiva.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_InvestigacionAccionCorrectiva').getSelectionModel();
                                    rowEditingInvestigacionAccionCorrectiva.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsInvestigacionAccionCorrectiva').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsInvestigacionAccionCorrectiva').getCount() > 0) {
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
                            Ext.getCmp('Form_InvestigacionAccionCorrectiva').getForm().loadRecord(records[0]);
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