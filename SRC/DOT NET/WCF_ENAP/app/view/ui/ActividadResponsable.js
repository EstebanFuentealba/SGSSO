var rowEditingActividadResponsable = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ActividadResponsable', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ActividadResponsable',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ActividadResponsable',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Sub Actividad","displayField":"NOMBRE_SUB_ACTIVIDAD","valueField":"ID_SUB_ACTIVIDAD","anchor":"100%","store":"dsSubActividad","name":"ID_SUB_ACTIVIDAD"},{"xtype":"combo","fieldLabel":"Id Cargo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ActividadResponsable', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsActividadResponsable').insert(0, new_object);
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
                store: 'dsActividadResponsable',
                itemId: 'Grid_ActividadResponsable',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_RESPONSABLE","text":"Id Actividad Responsable","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_SUB_ACTIVIDAD","text":"Id Sub Actividad","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_SUB_ACTIVIDAD","valueField":"ID_SUB_ACTIVIDAD","anchor":"100%","store":"dsSubActividad","name":"ID_SUB_ACTIVIDAD"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_SUB_ACTIVIDAD', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_SUB_ACTIVIDAD') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_CARGO","text":"Id Cargo","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_CARGO","valueField":"ID_CARGO","anchor":"100%","store":"dsCargo","name":"ID_CARGO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CARGO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CARGO') : '' }"}],
                plugins: [
                    rowEditingActividadResponsable
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsActividadResponsable',
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
                                    rowEditingActividadResponsable.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ActividadResponsable');
                                    Ext.data.StoreManager.lookup('dsActividadResponsable').insert(0, r);
                                    rowEditingActividadResponsable.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ActividadResponsable').getSelectionModel();
                                    rowEditingActividadResponsable.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsActividadResponsable').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsActividadResponsable').getCount() > 0) {
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
                            Ext.getCmp('Form_ActividadResponsable').getForm().loadRecord(records[0]);
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