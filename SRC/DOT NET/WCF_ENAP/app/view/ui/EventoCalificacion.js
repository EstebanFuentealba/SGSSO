var rowEditingEventoCalificacion = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.EventoCalificacion', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-EventoCalificacion',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_EventoCalificacion',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Calificacion","displayField":"NOMBRE_CALICACION","valueField":"ID_CALIFICACION","anchor":"100%","store":"dsCalificacion","name":"ID_CALIFICACION"},{"xtype":"numberfield","fieldLabel":"Id Evento","anchor":"100%","name":"ID_EVENTO"},{"xtype":"numberfield","fieldLabel":"Afectado","anchor":"100%","name":"AFECTADO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.EventoCalificacion', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEventoCalificacion').insert(0, new_object);
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
                store: 'dsEventoCalificacion',
                itemId: 'Grid_EventoCalificacion',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVENTO_CALIFICACION","text":"Id Evento Calificacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_CALIFICACION","text":"Id Calificacion","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_CALICACION","valueField":"ID_CALIFICACION","anchor":"100%","store":"dsCalificacion","name":"ID_CALIFICACION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CALIFICACION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CALICACION') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_EVENTO","text":"Id Evento","sortable":true},{"xtype":"gridcolumn","dataIndex":"AFECTADO","text":"Afectado","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingEventoCalificacion
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEventoCalificacion',
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
                                    rowEditingEventoCalificacion.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.EventoCalificacion');
                                    Ext.data.StoreManager.lookup('dsEventoCalificacion').insert(0, r);
                                    rowEditingEventoCalificacion.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_EventoCalificacion').getSelectionModel();
                                    rowEditingEventoCalificacion.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEventoCalificacion').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEventoCalificacion').getCount() > 0) {
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
                            Ext.getCmp('Form_EventoCalificacion').getForm().loadRecord(records[0]);
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