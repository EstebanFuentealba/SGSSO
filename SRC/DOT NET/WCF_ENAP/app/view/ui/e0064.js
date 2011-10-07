var rowEditinge0064 = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.e0064', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-e0064',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_e0064',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"E00 Id Informe","anchor":"100%","name":"E00_ID_INFORME"},{"xtype":"htmleditor","fieldLabel":"Descripcion Incidente","anchor":"100%","name":"DESCRIPCION_INCIDENTE"},{"xtype":"htmleditor","fieldLabel":"Antecedentes","anchor":"100%","name":"ANTECEDENTES"},{"xtype":"htmleditor","fieldLabel":"Relato De Hecho","anchor":"100%","name":"RELATO_DE_HECHO"},{"xtype":"htmleditor","fieldLabel":"Comentario","anchor":"100%","name":"COMENTARIO"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.e0064', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dse0064').insert(0, new_object);
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
                store: 'dse0064',
                itemId: 'Grid_e0064',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"E00_ID_INFORME","text":"E00 Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION_INCIDENTE","text":"Descripcion Incidente","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"ANTECEDENTES","text":"Antecedentes","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"RELATO_DE_HECHO","text":"Relato De Hecho","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"COMENTARIO","text":"Comentario","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditinge0064
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dse0064',
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
                                    rowEditinge0064.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.e0064');
                                    Ext.data.StoreManager.lookup('dse0064').insert(0, r);
                                    rowEditinge0064.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_e0064').getSelectionModel();
                                    rowEditinge0064.cancelEdit();
                                    Ext.data.StoreManager.lookup('dse0064').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dse0064').getCount() > 0) {
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
                            Ext.getCmp('Form_e0064').getForm().loadRecord(records[0]);
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