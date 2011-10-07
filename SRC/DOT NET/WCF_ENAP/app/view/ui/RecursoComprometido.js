var rowEditingRecursoComprometido = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.RecursoComprometido', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-RecursoComprometido',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_RecursoComprometido',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Recurso","anchor":"100%","name":"NOMBRE_RECURSO"},{"xtype":"htmleditor","fieldLabel":"Descripcion","anchor":"100%","name":"DESCRIPCION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.RecursoComprometido', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsRecursoComprometido').insert(0, new_object);
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
                store: 'dsRecursoComprometido',
                itemId: 'Grid_RecursoComprometido',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_RECURSO_COMPROMETIDO","text":"Id Recurso Comprometido","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_RECURSO","text":"Nombre Recurso","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION","text":"Descripcion","sortable":true,"field":{"type":"htmleditor"}}],
                plugins: [
                    rowEditingRecursoComprometido
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsRecursoComprometido',
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
                                    rowEditingRecursoComprometido.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.RecursoComprometido');
                                    Ext.data.StoreManager.lookup('dsRecursoComprometido').insert(0, r);
                                    rowEditingRecursoComprometido.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_RecursoComprometido').getSelectionModel();
                                    rowEditingRecursoComprometido.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsRecursoComprometido').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsRecursoComprometido').getCount() > 0) {
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
                            Ext.getCmp('Form_RecursoComprometido').getForm().loadRecord(records[0]);
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