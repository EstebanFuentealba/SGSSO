var rowEditingImagenes = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Imagenes', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Imagenes',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Imagenes',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Imagen","anchor":"100%","name":"ID_IMAGEN"},{"xtype":"numberfield","fieldLabel":"Id Evento","anchor":"100%","name":"ID_EVENTO"},{"xtype":"textfield","fieldLabel":"Nombre Imagen","anchor":"100%","name":"NOMBRE_IMAGEN"},{"xtype":"textfield","fieldLabel":"Imagen","anchor":"100%","name":"IMAGEN"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Imagenes', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsImagenes').insert(0, new_object);
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
                store: 'dsImagenes',
                itemId: 'Grid_Imagenes',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_IMAGEN","text":"Id Imagen","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EVENTO","text":"Id Evento","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_IMAGEN","text":"Nombre Imagen","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"IMAGEN","text":"Imagen","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingImagenes
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsImagenes',
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
                                    rowEditingImagenes.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Imagenes');
                                    Ext.data.StoreManager.lookup('dsImagenes').insert(0, r);
                                    rowEditingImagenes.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Imagenes').getSelectionModel();
                                    rowEditingImagenes.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsImagenes').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsImagenes').getCount() > 0) {
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
                            Ext.getCmp('Form_Imagenes').getForm().loadRecord(records[0]);
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