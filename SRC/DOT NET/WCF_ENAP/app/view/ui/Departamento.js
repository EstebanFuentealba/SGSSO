var rowEditingDepartamento = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Departamento', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Departamento',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Departamento',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nombre Departamento","anchor":"100%","name":"NOMBRE_DEPARTAMENTO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Departamento', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsDepartamento').insert(0, new_object);
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
                store: 'dsDepartamento',
                itemId: 'Grid_Departamento',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO","text":"Id Departamento","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_DEPARTAMENTO","text":"Nombre Departamento","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingDepartamento
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsDepartamento',
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
                                    rowEditingDepartamento.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Departamento');
                                    Ext.data.StoreManager.lookup('dsDepartamento').insert(0, r);
                                    rowEditingDepartamento.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Departamento').getSelectionModel();
                                    rowEditingDepartamento.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsDepartamento').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsDepartamento').getCount() > 0) {
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
                            Ext.getCmp('Form_Departamento').getForm().loadRecord(records[0]);
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