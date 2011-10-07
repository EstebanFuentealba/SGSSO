var rowEditinge0063 = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.e0063', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-e0063',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_e0063',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"E00 Id Informe","anchor":"100%","name":"E00_ID_INFORME"},{"xtype":"numberfield","fieldLabel":"Id Evento Empresa","anchor":"100%","name":"ID_EVENTO_EMPRESA"},{"xtype":"datefield","fieldLabel":"Fecha Ingreso","anchor":"100%","name":"FECHA_INGRESO"},{"xtype":"numberfield","fieldLabel":"Clasificacion","anchor":"100%","name":"CLASIFICACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.e0063', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dse0063').insert(0, new_object);
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
                store: 'dse0063',
                itemId: 'Grid_e0063',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"E00_ID_INFORME","text":"E00 Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EVENTO_EMPRESA","text":"Id Evento Empresa","sortable":true},{"xtype":"gridcolumn","dataIndex":"FECHA_INGRESO","text":"Fecha Ingreso","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"CLASIFICACION","text":"Clasificacion","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditinge0063
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dse0063',
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
                                    rowEditinge0063.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.e0063');
                                    Ext.data.StoreManager.lookup('dse0063').insert(0, r);
                                    rowEditinge0063.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_e0063').getSelectionModel();
                                    rowEditinge0063.cancelEdit();
                                    Ext.data.StoreManager.lookup('dse0063').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dse0063').getCount() > 0) {
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
                            Ext.getCmp('Form_e0063').getForm().loadRecord(records[0]);
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