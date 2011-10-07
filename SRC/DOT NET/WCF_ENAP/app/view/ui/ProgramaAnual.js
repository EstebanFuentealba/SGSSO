var rowEditingProgramaAnual = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ProgramaAnual', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ProgramaAnual',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ProgramaAnual',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"htmleditor","fieldLabel":"Objetivo","anchor":"100%","name":"OBJETIVO"},{"xtype":"htmleditor","fieldLabel":"Meta","anchor":"100%","name":"META"},{"xtype":"datefield","fieldLabel":"Fecha Creacion","anchor":"100%","name":"FECHA_CREACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ProgramaAnual', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsProgramaAnual').insert(0, new_object);
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
                store: 'dsProgramaAnual',
                itemId: 'Grid_ProgramaAnual',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PROGRAMA_ANUAL","text":"Id Programa Anual","sortable":true},{"xtype":"gridcolumn","dataIndex":"OBJETIVO","text":"Objetivo","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"META","text":"Meta","sortable":true,"field":{"type":"htmleditor"}},{"xtype":"gridcolumn","dataIndex":"FECHA_CREACION","text":"Fecha Creacion","sortable":true,"field":{"type":"datefield"}}],
                plugins: [
                    rowEditingProgramaAnual
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsProgramaAnual',
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
                                    rowEditingProgramaAnual.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ProgramaAnual');
                                    Ext.data.StoreManager.lookup('dsProgramaAnual').insert(0, r);
                                    rowEditingProgramaAnual.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ProgramaAnual').getSelectionModel();
                                    rowEditingProgramaAnual.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsProgramaAnual').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsProgramaAnual').getCount() > 0) {
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
                            Ext.getCmp('Form_ProgramaAnual').getForm().loadRecord(records[0]);
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