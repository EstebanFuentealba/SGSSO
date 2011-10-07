var rowEditingEventoTrabajador = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.EventoTrabajador', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-EventoTrabajador',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_EventoTrabajador',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Evento Empresa","anchor":"100%","name":"ID_EVENTO_EMPRESA"},{"xtype":"combo","fieldLabel":"Id Trabajador","displayField":"NOMBRES","valueField":"ID_TRABAJADOR","anchor":"100%","store":"dsTrabajador","name":"ID_TRABAJADOR"},{"xtype":"numberfield","fieldLabel":"Id Matriz","anchor":"100%","name":"ID_MATRIZ"},{"xtype":"datefield","fieldLabel":"Fecha Presentacion Hospital","anchor":"100%","name":"FECHA_PRESENTACION_HOSPITAL"},{"xtype":"datefield","fieldLabel":"Fecha Alta Medica","anchor":"100%","name":"FECHA_ALTA_MEDICA"},{"xtype":"numberfield","fieldLabel":"Tipo Lesion","anchor":"100%","name":"TIPO_LESION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.EventoTrabajador', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEventoTrabajador').insert(0, new_object);
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
                store: 'dsEventoTrabajador',
                itemId: 'Grid_EventoTrabajador',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVENTO_TRABAJADOR","text":"Id Evento Trabajador","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EVENTO_EMPRESA","text":"Id Evento Empresa","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_TRABAJADOR","text":"Id Trabajador","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRES","valueField":"ID_TRABAJADOR","anchor":"100%","store":"dsTrabajador","name":"ID_TRABAJADOR"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_TRABAJADOR', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRES') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_MATRIZ","text":"Id Matriz","sortable":true},{"xtype":"gridcolumn","dataIndex":"FECHA_PRESENTACION_HOSPITAL","text":"Fecha Presentacion Hospital","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_ALTA_MEDICA","text":"Fecha Alta Medica","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"TIPO_LESION","text":"Tipo Lesion","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingEventoTrabajador
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEventoTrabajador',
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
                                    rowEditingEventoTrabajador.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.EventoTrabajador');
                                    Ext.data.StoreManager.lookup('dsEventoTrabajador').insert(0, r);
                                    rowEditingEventoTrabajador.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_EventoTrabajador').getSelectionModel();
                                    rowEditingEventoTrabajador.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEventoTrabajador').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEventoTrabajador').getCount() > 0) {
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
                            Ext.getCmp('Form_EventoTrabajador').getForm().loadRecord(records[0]);
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