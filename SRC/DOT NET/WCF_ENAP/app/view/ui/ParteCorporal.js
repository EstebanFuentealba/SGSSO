var rowEditingParteCorporal = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ParteCorporal', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ParteCorporal',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ParteCorporal',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Parte Corporal","anchor":"100%","name":"NOMBRE_PARTE_CORPORAL"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ParteCorporal', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsParteCorporal').insert(0, new_object);
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
                store: 'dsParteCorporal',
                itemId: 'Grid_ParteCorporal',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PARTE_CORPORAL","text":"Id Parte Corporal","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_PARTE_CORPORAL","text":"Nombre Parte Corporal","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingParteCorporal
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsParteCorporal',
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
                                    rowEditingParteCorporal.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ParteCorporal');
                                    Ext.data.StoreManager.lookup('dsParteCorporal').insert(0, r);
                                    rowEditingParteCorporal.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ParteCorporal').getSelectionModel();
                                    rowEditingParteCorporal.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsParteCorporal').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsParteCorporal').getCount() > 0) {
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
                            Ext.getCmp('Form_ParteCorporal').getForm().loadRecord(records[0]);
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