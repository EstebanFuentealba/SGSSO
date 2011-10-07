var rowEditingPuntoGeografico = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.PuntoGeografico', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-PuntoGeografico',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_PuntoGeografico',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Departamento Organizacion","anchor":"100%","name":"ID_DEPARTAMENTO_ORGANIZACION"},{"xtype":"textfield","fieldLabel":"Lat Punto","anchor":"100%","name":"LAT_PUNTO"},{"xtype":"textfield","fieldLabel":"Lng Punto","anchor":"100%","name":"LNG_PUNTO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.PuntoGeografico', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsPuntoGeografico').insert(0, new_object);
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
                store: 'dsPuntoGeografico',
                itemId: 'Grid_PuntoGeografico',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PUNTO_GEOGRAFICA","text":"Id Punto Geografica","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO_ORGANIZACION","text":"Id Departamento Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"LAT_PUNTO","text":"Lat Punto","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"LNG_PUNTO","text":"Lng Punto","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingPuntoGeografico
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsPuntoGeografico',
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
                                    rowEditingPuntoGeografico.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.PuntoGeografico');
                                    Ext.data.StoreManager.lookup('dsPuntoGeografico').insert(0, r);
                                    rowEditingPuntoGeografico.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_PuntoGeografico').getSelectionModel();
                                    rowEditingPuntoGeografico.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsPuntoGeografico').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsPuntoGeografico').getCount() > 0) {
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
                            Ext.getCmp('Form_PuntoGeografico').getForm().loadRecord(records[0]);
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