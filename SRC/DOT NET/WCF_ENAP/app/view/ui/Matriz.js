var rowEditingMatriz = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Matriz', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Matriz',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Matriz',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Usuario","displayField":"NOMBRES","valueField":"ID_USUARIO","anchor":"100%","store":"dsUsuario","name":"ID_USUARIO"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Matriz', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsMatriz').insert(0, new_object);
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
                store: 'dsMatriz',
                itemId: 'Grid_Matriz',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_MATRIZ","text":"Id Matriz","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_USUARIO","text":"Id Usuario","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRES","valueField":"ID_USUARIO","anchor":"100%","store":"dsUsuario","name":"ID_USUARIO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_USUARIO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRES') : '' }"},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditingMatriz
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsMatriz',
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
                                    rowEditingMatriz.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Matriz');
                                    Ext.data.StoreManager.lookup('dsMatriz').insert(0, r);
                                    rowEditingMatriz.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Matriz').getSelectionModel();
                                    rowEditingMatriz.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsMatriz').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsMatriz').getCount() > 0) {
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
                            Ext.getCmp('Form_Matriz').getForm().loadRecord(records[0]);
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