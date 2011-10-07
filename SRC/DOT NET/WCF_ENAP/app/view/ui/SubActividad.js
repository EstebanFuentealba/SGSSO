var rowEditingSubActividad = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.SubActividad', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-SubActividad',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_SubActividad',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Evidencia","displayField":"NOMBRE_EVIDENCIA","valueField":"ID_EVIDENCIA","anchor":"100%","store":"dsEvidencia","name":"ID_EVIDENCIA"},{"xtype":"combo","fieldLabel":"Id Programa Actividad","displayField":"NOMBRE_PROGRAMA_ACTIVIDAD","valueField":"ID_PROGRAMA_ACTIVIDAD","anchor":"100%","store":"dsProgramaActividad","name":"ID_PROGRAMA_ACTIVIDAD"},{"xtype":"textfield","fieldLabel":"Nombre Sub Actividad","anchor":"100%","name":"NOMBRE_SUB_ACTIVIDAD"},{"xtype":"numberfield","fieldLabel":"Tipo Frecuencia","anchor":"100%","name":"TIPO_FRECUENCIA"},{"xtype":"textfield","fieldLabel":"Cantidad Actividades","anchor":"100%","name":"CANTIDAD_ACTIVIDADES"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.SubActividad', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsSubActividad').insert(0, new_object);
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
                store: 'dsSubActividad',
                itemId: 'Grid_SubActividad',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_SUB_ACTIVIDAD","text":"Id Sub Actividad","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_EVIDENCIA","text":"Id Evidencia","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_EVIDENCIA","valueField":"ID_EVIDENCIA","anchor":"100%","store":"dsEvidencia","name":"ID_EVIDENCIA"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EVIDENCIA', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_EVIDENCIA') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_PROGRAMA_ACTIVIDAD","text":"Id Programa Actividad","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_PROGRAMA_ACTIVIDAD","valueField":"ID_PROGRAMA_ACTIVIDAD","anchor":"100%","store":"dsProgramaActividad","name":"ID_PROGRAMA_ACTIVIDAD"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_PROGRAMA_ACTIVIDAD', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_PROGRAMA_ACTIVIDAD') : '' }"},{"xtype":"gridcolumn","dataIndex":"NOMBRE_SUB_ACTIVIDAD","text":"Nombre Sub Actividad","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"TIPO_FRECUENCIA","text":"Tipo Frecuencia","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"CANTIDAD_ACTIVIDADES","text":"Cantidad Actividades","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingSubActividad
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsSubActividad',
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
                                    rowEditingSubActividad.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.SubActividad');
                                    Ext.data.StoreManager.lookup('dsSubActividad').insert(0, r);
                                    rowEditingSubActividad.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_SubActividad').getSelectionModel();
                                    rowEditingSubActividad.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsSubActividad').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsSubActividad').getCount() > 0) {
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
                            Ext.getCmp('Form_SubActividad').getForm().loadRecord(records[0]);
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