var rowEditingActividadEvaluada = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ActividadEvaluada', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ActividadEvaluada',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ActividadEvaluada',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Actividad General","anchor":"100%","name":"ID_ACTIVIDAD_GENERAL"},{"xtype":"combo","fieldLabel":"Id Cargo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"},{"xtype":"combo","fieldLabel":"Id Division","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},{"xtype":"numberfield","fieldLabel":"Id Actividad Especifica","anchor":"100%","name":"ID_ACTIVIDAD_ESPECIFICA"},{"xtype":"numberfield","fieldLabel":"Id Departamento Organizacion","anchor":"100%","name":"ID_DEPARTAMENTO_ORGANIZACION"},{"xtype":"numberfield","fieldLabel":"Id Peligro","anchor":"100%","name":"ID_PELIGRO"},{"xtype":"combo","fieldLabel":"Id Area","displayField":"NOMBRE_AREA","valueField":"ID_AREA","anchor":"100%","store":"dsArea","name":"ID_AREA"},{"xtype":"numberfield","fieldLabel":"Valoracion Consecuencia","anchor":"100%","name":"VALORACION_CONSECUENCIA"},{"xtype":"numberfield","fieldLabel":"Valoracion Probabilidad","anchor":"100%","name":"VALORACION_PROBABILIDAD"},{"xtype":"numberfield","fieldLabel":"Medida Valoracion Consecuencia","anchor":"100%","name":"MEDIDA_VALORACION_CONSECUENCIA"},{"xtype":"numberfield","fieldLabel":"Medida Valoracion Probabilidad","anchor":"100%","name":"MEDIDA_VALORACION_PROBABILIDAD"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"},{"xtype":"numberfield","fieldLabel":"Condicion","anchor":"100%","name":"CONDICION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ActividadEvaluada', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsActividadEvaluada').insert(0, new_object);
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
                store: 'dsActividadEvaluada',
                itemId: 'Grid_ActividadEvaluada',
                columns: [
                    { "xtype": "gridcolumn", "dataIndex": "ID_ACTIVIDAD_EVALUADA", "text": "Id Actividad Evaluada", "sortable": true },
                    { "xtype": "gridcolumn", "dataIndex": "ID_ACTIVIDAD_GENERAL", "text": "Id Actividad General", "sortable": true },
                    {"xtype":"gridcolumn","dataIndex":"ID_CARGO","text":"Id Cargo","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CARGO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CARGO') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_DIVISION","text":"Id Division","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_DIVISION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_DIVISION') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_ESPECIFICA","text":"Id Actividad Especifica","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO_ORGANIZACION","text":"Id Departamento Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_PELIGRO","text":"Id Peligro","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_AREA","text":"Id Area","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_AREA","valueField":"ID_AREA","anchor":"100%","store":"dsArea","name":"ID_AREA"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_AREA', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_AREA') : '' }"},{"xtype":"gridcolumn","dataIndex":"VALORACION_CONSECUENCIA","text":"Valoracion Consecuencia","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"VALORACION_PROBABILIDAD","text":"Valoracion Probabilidad","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"MEDIDA_VALORACION_CONSECUENCIA","text":"Medida Valoracion Consecuencia","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"MEDIDA_VALORACION_PROBABILIDAD","text":"Medida Valoracion Probabilidad","sortable":true,"field":{"type":"numberfield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"CONDICION","text":"Condicion","sortable":true,"field":{"type":"numberfield"}}],
                plugins: [
                    rowEditingActividadEvaluada
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsActividadEvaluada',
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
                                    rowEditingActividadEvaluada.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ActividadEvaluada');
                                    Ext.data.StoreManager.lookup('dsActividadEvaluada').insert(0, r);
                                    rowEditingActividadEvaluada.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ActividadEvaluada').getSelectionModel();
                                    rowEditingActividadEvaluada.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsActividadEvaluada').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsActividadEvaluada').getCount() > 0) {
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
                            Ext.getCmp('Form_ActividadEvaluada').getForm().loadRecord(records[0]);
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