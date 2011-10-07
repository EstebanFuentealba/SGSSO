var rowEditingEventoEmpresa = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.EventoEmpresa', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-EventoEmpresa',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_EventoEmpresa',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Evento","anchor":"100%","name":"ID_EVENTO"},{"xtype":"combo","fieldLabel":"Id Empresa","displayField":"NOMBRE_EMPRESA","valueField":"ID_EMPRESA","anchor":"100%","store":"dsEmpresa","name":"ID_EMPRESA"},{"xtype":"htmleditor","fieldLabel":"Descripcion","anchor":"100%","name":"DESCRIPCION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.EventoEmpresa', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEventoEmpresa').insert(0, new_object);
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
                store: 'dsEventoEmpresa',
                itemId: 'Grid_EventoEmpresa',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVENTO_EMPRESA","text":"Id Evento Empresa","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EVENTO","text":"Id Evento","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EMPRESA","text":"Id Empresa","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_EMPRESA","valueField":"ID_EMPRESA","anchor":"100%","store":"dsEmpresa","name":"ID_EMPRESA"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EMPRESA', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_EMPRESA') : '' }"},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION","text":"Descripcion","sortable":true,"field":{"type":"htmleditor"}}],
                plugins: [
                    rowEditingEventoEmpresa
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEventoEmpresa',
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
                                    rowEditingEventoEmpresa.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.EventoEmpresa');
                                    Ext.data.StoreManager.lookup('dsEventoEmpresa').insert(0, r);
                                    rowEditingEventoEmpresa.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_EventoEmpresa').getSelectionModel();
                                    rowEditingEventoEmpresa.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEventoEmpresa').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEventoEmpresa').getCount() > 0) {
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
                            Ext.getCmp('Form_EventoEmpresa').getForm().loadRecord(records[0]);
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