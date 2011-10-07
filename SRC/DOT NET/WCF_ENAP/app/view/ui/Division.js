var rowEditingDivision = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.Division', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-Division',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Division',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Departamento Organizacion","anchor":"100%","name":"ID_DEPARTAMENTO_ORGANIZACION"},{"xtype":"textfield","fieldLabel":"Nombre Division","anchor":"100%","name":"NOMBRE_DIVISION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Division', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsDivision').insert(0, new_object);
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
                store: 'dsDivision',
                itemId: 'Grid_Division',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_DIVISION","text":"Id Division","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_DEPARTAMENTO_ORGANIZACION","text":"Id Departamento Organizacion","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_DIVISION","text":"Nombre Division","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingDivision
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsDivision',
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
                                    rowEditingDivision.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.Division');
                                    Ext.data.StoreManager.lookup('dsDivision').insert(0, r);
                                    rowEditingDivision.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_Division').getSelectionModel();
                                    rowEditingDivision.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsDivision').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsDivision').getCount() > 0) {
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
                            Ext.getCmp('Form_Division').getForm().loadRecord(records[0]);
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