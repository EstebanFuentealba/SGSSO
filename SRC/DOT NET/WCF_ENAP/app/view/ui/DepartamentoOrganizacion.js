var rowEditingDepartamentoOrganizacion = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.DepartamentoOrganizacion', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-DepartamentoOrganizacion',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_DepartamentoOrganizacion',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Organizacion","displayField":"NOMBRE_ORGANIZACION","valueField":"ID_ORGANIZACION","anchor":"100%","store":"dsOrganizacion","name":"ID_ORGANIZACION"},{"xtype":"combo","fieldLabel":"Id Departamento","displayField":"NOMBRE_DEPARTAMENTO","valueField":"ID_DEPARTAMENTO","anchor":"100%","store":"dsDepartamento","name":"ID_DEPARTAMENTO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.DepartamentoOrganizacion', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsDepartamentoOrganizacion').insert(0, new_object);
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
                store: 'dsDepartamentoOrganizacion',
                itemId: 'Grid_DepartamentoOrganizacion',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO_ORGANIZACION","text":"Id Departamento Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_ORGANIZACION","text":"Id Organizacion","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_ORGANIZACION","valueField":"ID_ORGANIZACION","anchor":"100%","store":"dsOrganizacion","name":"ID_ORGANIZACION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ORGANIZACION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_ORGANIZACION') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO","text":"Id Departamento","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_DEPARTAMENTO","valueField":"ID_DEPARTAMENTO","anchor":"100%","store":"dsDepartamento","name":"ID_DEPARTAMENTO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_DEPARTAMENTO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_DEPARTAMENTO') : '' }"}],
                plugins: [
                    rowEditingDepartamentoOrganizacion
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsDepartamentoOrganizacion',
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
                                    rowEditingDepartamentoOrganizacion.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.DepartamentoOrganizacion');
                                    Ext.data.StoreManager.lookup('dsDepartamentoOrganizacion').insert(0, r);
                                    rowEditingDepartamentoOrganizacion.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_DepartamentoOrganizacion').getSelectionModel();
                                    rowEditingDepartamentoOrganizacion.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsDepartamentoOrganizacion').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsDepartamentoOrganizacion').getCount() > 0) {
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
                            Ext.getCmp('Form_DepartamentoOrganizacion').getForm().loadRecord(records[0]);
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