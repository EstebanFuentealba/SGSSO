var rowEditingGrupo = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Grupo', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'Grupos',
    id: 'panel-Grupo',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Grupo',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'Ingrear Grupo',
                items: [{ "xtype": "textfield", "fieldLabel": "Nombre Grupo", "anchor": "100%", "name": "NOMBRE_GRUPO" },
                    { "xtype": "htmleditor", "fieldLabel": "Descripcion Grupo", "anchor": "100%", "name": "DESCRIPCION_GRUPO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;

                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Grupo', form.getValues());
                        errors = new_object.validate();

                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsGrupo').insert(0, new_object);
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
                height: 200,
                title: 'Listado de Grupos',
                store: 'dsGrupo',
                itemId: 'Grid_Grupo',
                columns: [{ "xtype": "gridcolumn", flex: 0.4, "dataIndex": "NOMBRE_GRUPO", "text": "Nombre Grupo", "sortable": true, "field": { "type": "textfield"} },
                { "xtype": "gridcolumn", flex: 0.6, "dataIndex": "DESCRIPCION_GRUPO", "text": "Descripcion Grupo", "sortable": true, "field": { "type": "htmleditor"}}],
                plugins: [
                    rowEditingGrupo
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsGrupo',
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
                                    rowEditingGrupo.cancelEdit();
                                    var r = Ext.ModelManager.create({}, 'WCF_ENAP.model.Grupo');
                                    Ext.data.StoreManager.lookup('dsGrupo').insert(0, r);
                                    rowEditingGrupo.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function () {
                                    var sm = Ext.getCmp('#Grid_Grupo').getSelectionModel();
                                    rowEditingGrupo.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsGrupo').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsGrupo').getCount() > 0) {
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
                            Ext.getCmp('Form_Grupo').getForm().loadRecord(records[0]);
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