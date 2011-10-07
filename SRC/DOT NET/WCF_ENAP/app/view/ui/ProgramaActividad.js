var rowEditingProgramaActividad = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ProgramaActividad', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ProgramaActividad',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ProgramaActividad',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Programa Anual","anchor":"100%","name":"ID_PROGRAMA_ANUAL"},{"xtype":"textfield","fieldLabel":"Nombre Programa Actividad","anchor":"100%","name":"NOMBRE_PROGRAMA_ACTIVIDAD"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ProgramaActividad', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsProgramaActividad').insert(0, new_object);
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
                store: 'dsProgramaActividad',
                itemId: 'Grid_ProgramaActividad',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_PROGRAMA_ACTIVIDAD","text":"Id Programa Actividad","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_PROGRAMA_ANUAL","text":"Id Programa Anual","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOMBRE_PROGRAMA_ACTIVIDAD","text":"Nombre Programa Actividad","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingProgramaActividad
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsProgramaActividad',
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
                                    rowEditingProgramaActividad.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ProgramaActividad');
                                    Ext.data.StoreManager.lookup('dsProgramaActividad').insert(0, r);
                                    rowEditingProgramaActividad.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ProgramaActividad').getSelectionModel();
                                    rowEditingProgramaActividad.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsProgramaActividad').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsProgramaActividad').getCount() > 0) {
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
                            Ext.getCmp('Form_ProgramaActividad').getForm().loadRecord(records[0]);
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