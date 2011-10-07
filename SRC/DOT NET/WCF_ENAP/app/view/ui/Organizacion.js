var rowEditingOrganizacion = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Organizacion', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Organizacion',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Organizacion',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Organizacion","anchor":"100%","name":"NOMBRE_ORGANIZACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Organizacion', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsOrganizacion').insert(0, new_object);
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
                store: 'dsOrganizacion',
                itemId: 'Grid_Organizacion',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ORGANIZACION","text":"Id Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_ORGANIZACION","text":"Nombre Organizacion","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingOrganizacion
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsOrganizacion',
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
                                    rowEditingOrganizacion.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Organizacion');
                                    Ext.data.StoreManager.lookup('dsOrganizacion').insert(0, r);
                                    rowEditingOrganizacion.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Organizacion').getSelectionModel();
                                    rowEditingOrganizacion.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsOrganizacion').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsOrganizacion').getCount() > 0) {
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
                            Ext.getCmp('Form_Organizacion').getForm().loadRecord(records[0]);
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