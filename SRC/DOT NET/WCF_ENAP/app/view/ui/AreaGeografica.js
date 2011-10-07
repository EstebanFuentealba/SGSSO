var rowEditingAreaGeografica = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.AreaGeografica', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-AreaGeografica',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_AreaGeografica',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Departamento","displayField":"NOMBRE_DEPARTAMENTO","valueField":"ID_DEPARTAMENTO","anchor":"100%","store":"dsDepartamento","name":"ID_DEPARTAMENTO"},{"xtype":"textfield","fieldLabel":"Lat Area","anchor":"100%","name":"LAT_AREA"},{"xtype":"textfield","fieldLabel":"Lng Area","anchor":"100%","name":"LNG_AREA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.AreaGeografica', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsAreaGeografica').insert(0, new_object);
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
                store: 'dsAreaGeografica',
                itemId: 'Grid_AreaGeografica',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_AREA_GEOGRAFICA","text":"Id Area Geografica","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO","text":"Id Departamento","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_DEPARTAMENTO","valueField":"ID_DEPARTAMENTO","anchor":"100%","store":"dsDepartamento","name":"ID_DEPARTAMENTO"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_DEPARTAMENTO', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_DEPARTAMENTO') : '' }"},{"xtype":"gridcolumn","dataIndex":"LAT_AREA","text":"Lat Area","sortable":true,"field":{"type":"textfield"}},{"xtype":"gridcolumn","dataIndex":"LNG_AREA","text":"Lng Area","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingAreaGeografica
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsAreaGeografica',
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
                                    rowEditingAreaGeografica.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.AreaGeografica');
                                    Ext.data.StoreManager.lookup('dsAreaGeografica').insert(0, r);
                                    rowEditingAreaGeografica.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_AreaGeografica').getSelectionModel();
                                    rowEditingAreaGeografica.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsAreaGeografica').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsAreaGeografica').getCount() > 0) {
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
                            Ext.getCmp('Form_AreaGeografica').getForm().loadRecord(records[0]);
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