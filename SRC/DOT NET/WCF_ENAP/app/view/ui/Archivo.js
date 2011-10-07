var rowEditingArchivo = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Archivo', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Archivo',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Archivo',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Informe","anchor":"100%","name":"ID_INFORME"},{"xtype":"textfield","fieldLabel":"Nombre Archivo","anchor":"100%","name":"NOMBRE_ARCHIVO"},{"xtype":"htmleditor","fieldLabel":"Path","anchor":"100%","name":"PATH"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Archivo', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsArchivo').insert(0, new_object);
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
                store: 'dsArchivo',
                itemId: 'Grid_Archivo',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ARCHIVO","text":"Id Archivo","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_ARCHIVO","text":"Nombre Archivo","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"PATH","text":"Path","sortable":true,"field":{"type":"htmleditor"}}],
                plugins: [
                    rowEditingArchivo
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsArchivo',
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
                                    rowEditingArchivo.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Archivo');
                                    Ext.data.StoreManager.lookup('dsArchivo').insert(0, r);
                                    rowEditingArchivo.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Archivo').getSelectionModel();
                                    rowEditingArchivo.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsArchivo').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsArchivo').getCount() > 0) {
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
                            Ext.getCmp('Form_Archivo').getForm().loadRecord(records[0]);
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