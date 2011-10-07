var rowEditingTrabajador = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Trabajador', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Trabajador',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Trabajador',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Rut Trabajador","anchor":"100%","name":"RUT_TRABAJADOR"},{"xtype":"textfield","fieldLabel":"Nombres","anchor":"100%","name":"NOMBRES"},{"xtype":"textfield","fieldLabel":"Apellido Materno","anchor":"100%","name":"APELLIDO_MATERNO"},{"xtype":"textfield","fieldLabel":"Apellido Paterno","anchor":"100%","name":"APELLIDO_PATERNO"},{"xtype":"textfield","fieldLabel":"Telefono","anchor":"100%","name":"TELEFONO"},{"xtype":"numberfield","fieldLabel":"Anos Experiencia","anchor":"100%","name":"ANOS_EXPERIENCIA"},{"xtype":"combo","fieldLabel":"Id Cargo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Trabajador', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
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
                store: 'dsTrabajador',
                itemId: 'Grid_Trabajador',
                columns: [{"xtype":"gridcolumn","dataIndex":"RUT_TRABAJADOR","text":"Rut Trabajador","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"NOMBRES","text":"Nombres","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"APELLIDO_MATERNO","text":"Apellido Materno","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"APELLIDO_PATERNO","text":"Apellido Paterno","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"TELEFONO","text":"Telefono","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"ANOS_EXPERIENCIA","text":"Anos Experiencia","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"ID_TRABAJADOR","text":"Id Trabajador","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_CARGO","text":"Id Cargo","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CARGO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CARGO') : '' }"}],
                plugins: [
                    rowEditingTrabajador
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsTrabajador',
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
                                    rowEditingTrabajador.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Trabajador');
                                    Ext.data.StoreManager.lookup('dsTrabajador').insert(0, r);
                                    rowEditingTrabajador.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Trabajador').getSelectionModel();
                                    rowEditingTrabajador.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsTrabajador').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsTrabajador').getCount() > 0) {
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
                            Ext.getCmp('Form_Trabajador').getForm().loadRecord(records[0]);
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