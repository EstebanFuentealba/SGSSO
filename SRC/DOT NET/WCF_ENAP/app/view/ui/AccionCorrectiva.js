var rowEditingAccionCorrectiva = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.AccionCorrectiva', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-AccionCorrectiva',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_AccionCorrectiva',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Usuario","displayField":"NOMBRES","valueField":"ID_USUARIO","anchor":"100%","store":"dsUsuario","name":"ID_USUARIO"},{"xtype":"numberfield","fieldLabel":"Id Informe","anchor":"100%","name":"ID_INFORME"},{"xtype":"combo","fieldLabel":"Id Accion","displayField":"NOMBRE_ACCION","valueField":"ID_ACCION","anchor":"100%","store":"dsAccion","name":"ID_ACCION"},{"xtype":"datefield","fieldLabel":"Fecha Plazo","anchor":"100%","name":"FECHA_PLAZO"},{"xtype":"datefield","fieldLabel":"Fecha Realizacion","anchor":"100%","name":"FECHA_REALIZACION"},{"xtype":"numberfield","fieldLabel":"Porcentaje Cumplimiento","anchor":"100%","name":"PORCENTAJE_CUMPLIMIENTO"},{"xtype":"htmleditor","fieldLabel":"Descripcion","anchor":"100%","name":"DESCRIPCION"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.AccionCorrectiva', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
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
                store: 'dsAccionCorrectiva',
                itemId: 'Grid_AccionCorrectiva',
                columns: [{
                    "xtype": "gridcolumn",
                    "dataIndex": "ID_ACCION_CORRECTIVA",
                    "text": "Id Accion Correctiva",
                    "sortable": true
                },
                {
                    "xtype": "gridcolumn",
                    "dataIndex": "ID_USUARIO",
                    "text": "Id Usuario",
                    "sortable":true,"field":{"xtype":"combo","displayField":"NOMBRES","valueField":"ID_USUARIO","anchor":"100%","store":"dsUsuario","name":"ID_USUARIO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_USUARIO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRES') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_INFORME","text":"Id Informe","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_ACCION","text":"Id Accion","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_ACCION","valueField":"ID_ACCION","anchor":"100%","store":"dsAccion","name":"ID_ACCION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ACCION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_ACCION') : '' }"},{"xtype":"gridcolumn","dataIndex":"FECHA_PLAZO","text":"Fecha Plazo","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_REALIZACION","text":"Fecha Realizacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"PORCENTAJE_CUMPLIMIENTO","text":"Porcentaje Cumplimiento","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION","text":"Descripcion","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditingAccionCorrectiva
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsAccionCorrectiva',
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
                                    rowEditingAccionCorrectiva.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.AccionCorrectiva');
                                    Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, r);
                                    rowEditingAccionCorrectiva.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_AccionCorrectiva').getSelectionModel();
                                    rowEditingAccionCorrectiva.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsAccionCorrectiva').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsAccionCorrectiva').getCount() > 0) {
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
                            Ext.getCmp('Form_AccionCorrectiva').getForm().loadRecord(records[0]);
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