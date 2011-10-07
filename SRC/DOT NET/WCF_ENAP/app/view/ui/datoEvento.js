var rowEditingDatoEvento = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.DatoEvento', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-DatoEvento',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_DatoEvento',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Tipo Evento","anchor":"100%","name":"NOMBRE_TIPO_EVENTO"},{"xtype":"numberfield","fieldLabel":"Tipo","anchor":"100%","name":"TIPO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.DatoEvento', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsDatoEvento').insert(0, new_object);
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
                store: 'dsDatoEvento',
                itemId: 'Grid_DatoEvento',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_TIPO_EVENTO","text":"Id Tipo Evento","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_TIPO_EVENTO","text":"Nombre Tipo Evento","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"TIPO","text":"Tipo","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingDatoEvento
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsDatoEvento',
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
                                    rowEditingDatoEvento.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.DatoEvento');
                                    Ext.data.StoreManager.lookup('dsDatoEvento').insert(0, r);
                                    rowEditingDatoEvento.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_DatoEvento').getSelectionModel();
                                    rowEditingDatoEvento.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsDatoEvento').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsDatoEvento').getCount() > 0) {
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
                            Ext.getCmp('Form_DatoEvento').getForm().loadRecord(records[0]);
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