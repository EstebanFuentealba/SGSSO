var rowEditingRegistro = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Registro', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Registro',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Registro',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Division","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},{"xtype":"combo","fieldLabel":"Id Area","displayField":"NOMBRE_AREA","valueField":"ID_AREA","anchor":"100%","store":"dsArea","name":"ID_AREA"},{"xtype":"numberfield","fieldLabel":"Id Actividad Especifica","anchor":"100%","name":"ID_ACTIVIDAD_ESPECIFICA"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"},{"xtype":"datefield","fieldLabel":"Fecha Aprovacion","anchor":"100%","name":"FECHA_APROVACION"},{"xtype":"datefield","fieldLabel":"Fecha Modificacion","anchor":"100%","name":"FECHA_MODIFICACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Registro', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsRegistro').insert(0, new_object);
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
                store: 'dsRegistro',
                itemId: 'Grid_Registro',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_REGISTRO","text":"Id Registro","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DIVISION","text":"Id Division","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_DIVISION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_DIVISION') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_AREA","text":"Id Area","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_AREA","valueField":"ID_AREA","anchor":"100%","store":"dsArea","name":"ID_AREA"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_AREA', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_AREA') : '' }"},{"xtype":"gridcolumn","dataIndex":"ID_ACTIVIDAD_ESPECIFICA","text":"Id Actividad Especifica","sortable":true},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_APROVACION","text":"Fecha Aprovacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"FECHA_MODIFICACION","text":"Fecha Modificacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditingRegistro
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsRegistro',
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
                                    rowEditingRegistro.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Registro');
                                    Ext.data.StoreManager.lookup('dsRegistro').insert(0, r);
                                    rowEditingRegistro.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Registro').getSelectionModel();
                                    rowEditingRegistro.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsRegistro').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsRegistro').getCount() > 0) {
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
                            Ext.getCmp('Form_Registro').getForm().loadRecord(records[0]);
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