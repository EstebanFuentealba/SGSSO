var rowEditingEvaluacionMensual = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.EvaluacionMensual', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-EvaluacionMensual',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_EvaluacionMensual',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Evaluacion Mensual","anchor":"100%","name":"ID_EVALUACION_MENSUAL"},{"xtype":"combo","fieldLabel":"Id Sub Actividad","displayField":"NOMBRE_SUB_ACTIVIDAD","valueField":"ID_SUB_ACTIVIDAD","anchor":"100%","store":"dsSubActividad","name":"ID_SUB_ACTIVIDAD"},{"xtype":"numberfield","fieldLabel":"Programado","anchor":"100%","name":"PROGRAMADO"},{"xtype":"numberfield","fieldLabel":"Realizado","anchor":"100%","name":"REALIZADO"},{"xtype":"datefield","fieldLabel":"Fecha Evaluacion","anchor":"100%","name":"FECHA_EVALUACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.EvaluacionMensual', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsEvaluacionMensual').insert(0, new_object);
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
                store: 'dsEvaluacionMensual',
                itemId: 'Grid_EvaluacionMensual',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_EVALUACION_MENSUAL","text":"Id Evaluacion Mensual","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_SUB_ACTIVIDAD","text":"Id Sub Actividad","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_SUB_ACTIVIDAD","valueField":"ID_SUB_ACTIVIDAD","anchor":"100%","store":"dsSubActividad","name":"ID_SUB_ACTIVIDAD"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_SUB_ACTIVIDAD', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_SUB_ACTIVIDAD') : '' }"},{"xtype":"gridcolumn","dataIndex":"PROGRAMADO","text":"Programado","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"REALIZADO","text":"Realizado","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_EVALUACION","text":"Fecha Evaluacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditingEvaluacionMensual
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsEvaluacionMensual',
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
                                    rowEditingEvaluacionMensual.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.EvaluacionMensual');
                                    Ext.data.StoreManager.lookup('dsEvaluacionMensual').insert(0, r);
                                    rowEditingEvaluacionMensual.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_EvaluacionMensual').getSelectionModel();
                                    rowEditingEvaluacionMensual.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsEvaluacionMensual').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsEvaluacionMensual').getCount() > 0) {
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
                            Ext.getCmp('Form_EvaluacionMensual').getForm().loadRecord(records[0]);
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