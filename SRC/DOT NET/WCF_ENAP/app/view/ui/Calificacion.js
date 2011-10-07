var rowEditingCalificacion = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Calificacion', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Calificacion',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Calificacion',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Calicacion","anchor":"100%","name":"NOMBRE_CALICACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Calificacion', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsCalificacion').insert(0, new_object);
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
                store: 'dsCalificacion',
                itemId: 'Grid_Calificacion',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_CALIFICACION","text":"Id Calificacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_CALICACION","text":"Nombre Calicacion","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingCalificacion
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsCalificacion',
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
                                    rowEditingCalificacion.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Calificacion');
                                    Ext.data.StoreManager.lookup('dsCalificacion').insert(0, r);
                                    rowEditingCalificacion.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Calificacion').getSelectionModel();
                                    rowEditingCalificacion.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsCalificacion').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsCalificacion').getCount() > 0) {
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
                            Ext.getCmp('Form_Calificacion').getForm().loadRecord(records[0]);
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