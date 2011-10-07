var rowEditingArea = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Area', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Area',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Area',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"combo","fieldLabel":"Id Division","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},{"xtype":"textfield","fieldLabel":"Nombre Area","anchor":"100%","name":"NOMBRE_AREA"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Area', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsArea').insert(0, new_object);
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
                store: 'dsArea',
                itemId: 'Grid_Area',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_AREA","text":"Id Area","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DIVISION","text":"Id Division","sortable":true,"field":{"xtype":"combo","displayField":"NOMBRE_DIVISION","valueField":"ID_DIVISION","anchor":"100%","store":"dsDivision","name":"ID_DIVISION"},"renderer":"function (value, metaData, record, rowIndex, colIndex, store) { var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_DIVISION', value.toString()); return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_DIVISION') : '' }"},{"xtype":"gridcolumn","dataIndex":"NOMBRE_AREA","text":"Nombre Area","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingArea
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsArea',
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
                                    rowEditingArea.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Area');
                                    Ext.data.StoreManager.lookup('dsArea').insert(0, r);
                                    rowEditingArea.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Area').getSelectionModel();
                                    rowEditingArea.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsArea').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsArea').getCount() > 0) {
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
                            Ext.getCmp('Form_Area').getForm().loadRecord(records[0]);
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