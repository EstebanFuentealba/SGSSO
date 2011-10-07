var rowEditingActividadEspecifica = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ActividadEspecifica', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ActividadEspecifica',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ActividadEspecifica',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Actividad Especifica","anchor":"100%","name":"NOM_ACTIVIDAD_ESPECIFICA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ActividadEspecifica', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsActividadEspecifica').insert(0, new_object);
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
                store: 'dsActividadEspecifica',
                itemId: 'Grid_ActividadEspecifica',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_ESPECIFICA","text":"Id Actividad Especifica","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_ACTIVIDAD_ESPECIFICA","text":"Nom Actividad Especifica","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingActividadEspecifica
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsActividadEspecifica',
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
                                    rowEditingActividadEspecifica.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ActividadEspecifica');
                                    Ext.data.StoreManager.lookup('dsActividadEspecifica').insert(0, r);
                                    rowEditingActividadEspecifica.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ActividadEspecifica').getSelectionModel();
                                    rowEditingActividadEspecifica.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsActividadEspecifica').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsActividadEspecifica').getCount() > 0) {
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
                            Ext.getCmp('Form_ActividadEspecifica').getForm().loadRecord(records[0]);
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