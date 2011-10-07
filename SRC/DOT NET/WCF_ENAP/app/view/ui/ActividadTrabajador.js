var rowEditingActividadTrabajador = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ActividadTrabajador', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ActividadTrabajador',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ActividadTrabajador',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Actividad Trabajador","anchor":"100%","name":"NOMBRE_ACTIVIDAD_TRABAJADOR"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ActividadTrabajador', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsActividadTrabajador').insert(0, new_object);
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
                store: 'dsActividadTrabajador',
                itemId: 'Grid_ActividadTrabajador',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_TRABAJADOR","text":"Id Actividad Trabajador","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_ACTIVIDAD_TRABAJADOR","text":"Nombre Actividad Trabajador","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingActividadTrabajador
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsActividadTrabajador',
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
                                    rowEditingActividadTrabajador.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ActividadTrabajador');
                                    Ext.data.StoreManager.lookup('dsActividadTrabajador').insert(0, r);
                                    rowEditingActividadTrabajador.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ActividadTrabajador').getSelectionModel();
                                    rowEditingActividadTrabajador.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsActividadTrabajador').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsActividadTrabajador').getCount() > 0) {
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
                            Ext.getCmp('Form_ActividadTrabajador').getForm().loadRecord(records[0]);
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