var rowEditingActividadGeneral = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ActividadGeneral', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ActividadGeneral',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ActividadGeneral',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Actividad General","anchor":"100%","name":"NOM_ACTIVIDAD_GENERAL"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ActividadGeneral', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsActividadGeneral').insert(0, new_object);
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
                store: 'dsActividadGeneral',
                itemId: 'Grid_ActividadGeneral',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_GENERAL","text":"Id Actividad General","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_ACTIVIDAD_GENERAL","text":"Nom Actividad General","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingActividadGeneral
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsActividadGeneral',
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
                                    rowEditingActividadGeneral.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ActividadGeneral');
                                    Ext.data.StoreManager.lookup('dsActividadGeneral').insert(0, r);
                                    rowEditingActividadGeneral.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ActividadGeneral').getSelectionModel();
                                    rowEditingActividadGeneral.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsActividadGeneral').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsActividadGeneral').getCount() > 0) {
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
                            Ext.getCmp('Form_ActividadGeneral').getForm().loadRecord(records[0]);
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