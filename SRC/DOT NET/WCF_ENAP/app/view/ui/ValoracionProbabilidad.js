var rowEditingValoracionProbabilidad = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.ValoracionProbabilidad', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-ValoracionProbabilidad',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_ValoracionProbabilidad',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"textfield","fieldLabel":"Nom Probabilidad","anchor":"100%","name":"NOM_PROBABILIDAD"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.ValoracionProbabilidad', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsValoracionProbabilidad').insert(0, new_object);
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
                store: 'dsValoracionProbabilidad',
                itemId: 'Grid_ValoracionProbabilidad',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_VALORACION_PROBABILIDAD","text":"Id Valoracion Probabilidad","sortable":true},{"xtype":"gridcolumn","dataIndex":"NOM_PROBABILIDAD","text":"Nom Probabilidad","sortable":true,"field":{"type":"textfield"}}],
                plugins: [
                    rowEditingValoracionProbabilidad
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsValoracionProbabilidad',
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
                                    rowEditingValoracionProbabilidad.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.ValoracionProbabilidad');
                                    Ext.data.StoreManager.lookup('dsValoracionProbabilidad').insert(0, r);
                                    rowEditingValoracionProbabilidad.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_ValoracionProbabilidad').getSelectionModel();
                                    rowEditingValoracionProbabilidad.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsValoracionProbabilidad').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsValoracionProbabilidad').getCount() > 0) {
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
                            Ext.getCmp('Form_ValoracionProbabilidad').getForm().loadRecord(records[0]);
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