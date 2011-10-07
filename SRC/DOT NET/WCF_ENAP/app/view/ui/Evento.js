var rowEditingEvento = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Evento', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Evento',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Evento',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Departamento Organizacion","anchor":"100%","name":"ID_DEPARTAMENTO_ORGANIZACION"},{"xtype":"numberfield","fieldLabel":"Ocurrio","anchor":"100%","name":"OCURRIO"},{"xtype":"datefield","fieldLabel":"Fecha Hora Evento","anchor":"100%","name":"FECHA_HORA_EVENTO"},{"xtype":"datefield","fieldLabel":"Fecha Ingreso","anchor":"100%","name":"FECHA_INGRESO"},{"xtype":"textfield","fieldLabel":"Lat Evento","anchor":"100%","name":"LAT_EVENTO"},{"xtype":"textfield","fieldLabel":"Lng Evento","anchor":"100%","name":"LNG_EVENTO"},{"xtype":"checkboxfield","fieldLabel":"Tipo Evento","anchor":"100%","name":"TIPO_EVENTO"},{"xtype":"textfield","fieldLabel":"Lugar Exacto","anchor":"100%","name":"LUGAR_EXACTO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Evento', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEvento').insert(0, new_object);
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
                store: 'dsEvento',
                itemId: 'Grid_Evento',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVENTO","text":"Id Evento","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO_ORGANIZACION","text":"Id Departamento Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"OCURRIO","text":"Ocurrio","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_HORA_EVENTO","text":"Fecha Hora Evento","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_INGRESO","text":"Fecha Ingreso","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"LAT_EVENTO","text":"Lat Evento","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"LNG_EVENTO","text":"Lng Evento","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"TIPO_EVENTO","text":"Tipo Evento","sortable":true,"field":{"type":"checkboxfield"}},{"xtype":"gridcolumn","dataIndex":"LUGAR_EXACTO","text":"Lugar Exacto","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingEvento
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEvento',
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
                                    rowEditingEvento.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Evento');
                                    Ext.data.StoreManager.lookup('dsEvento').insert(0, r);
                                    rowEditingEvento.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Evento').getSelectionModel();
                                    rowEditingEvento.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEvento').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEvento').getCount() > 0) {
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
                            Ext.getCmp('Form_Evento').getForm().loadRecord(records[0]);
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