var rowEditingEmpresa = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Empresa', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'Empresas Contratistas',
    id: 'panel-Empresa',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Empresa',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'Ingresar Empresa Contratista',
                items: [{ "xtype": "textfield", "fieldLabel": "Nombre Empresa", "anchor": "100%", "name": "NOMBRE_EMPRESA" },
                    { "xtype": "textfield", "fieldLabel": "Direccion Empresa", "anchor": "100%", "name": "DIRECCION_EMPRESA" },
                    { "xtype": "textfield", "fieldLabel": "Fono Empresa", "anchor": "100%", "name": "FONO_EMPRESA" },
                    { "xtype": "textfield", "fieldLabel": "Email Empresa", vtype: 'email', "anchor": "100%", "name": "EMAIL_EMPRESA" },
                    { "xtype": "textfield", "fieldLabel": "Nombre Contrato", "anchor": "100%", "name": "NOMBRE_CONTRATO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;

                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Empresa', form.getValues());
                        errors = new_object.validate();

                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEmpresa').insert(0, new_object);
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
                title: 'Listado de Empresas Contratistas',
                store: 'dsEmpresa',
                itemId: 'Grid_Empresa',
                columns: [{ "xtype": "gridcolumn", flex: 0.20, "dataIndex": "NOMBRE_EMPRESA", "text": "Nombre Empresa", "sortable": true, "field": { "type": "textfield"} },
                    { "xtype": "gridcolumn", flex: 0.20, "dataIndex": "DIRECCION_EMPRESA", "text": "Direccion Empresa", "sortable": true, "field": { "type": "textfield"} },
                    { "xtype": "gridcolumn", flex: 0.20, "dataIndex": "FONO_EMPRESA", "text": "Fono Empresa", "sortable": true, "field": { "type": "textfield"} },
                    { "xtype": "gridcolumn", flex: 0.20, "dataIndex": "EMAIL_EMPRESA", "text": "Email Empresa", "sortable": true, "field": { "type": "textfield"} },
                    { "xtype": "gridcolumn", flex: 0.20, "dataIndex": "NOMBRE_CONTRATO", "text": "Nombre Contrato", "sortable": true, "field": { "type": "textfield"}}],
                plugins: [
                    rowEditingEmpresa
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEmpresa',
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
                                    rowEditingEmpresa.cancelEdit();
                                    var r = Ext.ModelManager.create({}, 'WCF_ENAP.model.Empresa');
                                    Ext.data.StoreManager.lookup('dsEmpresa').insert(0, r);
                                    rowEditingEmpresa.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function () {
                                    var sm = Ext.getCmp('#Grid_Empresa').getSelectionModel();
                                    rowEditingEmpresa.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEmpresa').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEmpresa').getCount() > 0) {
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
                            Ext.getCmp('Form_Empresa').getForm().loadRecord(records[0]);
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