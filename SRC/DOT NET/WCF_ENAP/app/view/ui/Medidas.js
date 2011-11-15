Ext.define('WCF_ENAP.view.ui.Medidas', {
    requires: [
        'Ext.ux.LiveSearchGridPanel'
    ],
    extend: 'Ext.window.Window',
    width: 673,
    maximizable: true,
    title: 'Medidas de Control',
    listeners: {
        resize: function (win, width, height, options) {
            //this.down('gridpanel').setHeight(height - 40);
            //this.down('gridpanel').doLayout();
        }
    },
    layout: 'fit',
    modal: true,
    cmpPadre: null,
    initComponent: function () {
        var me = this,
            winMedida;

        me.items = [
            {
                xtype: 'livesearchgrid',
                height: 400,
                autoScroll: true,
                store: 'dsMedidaDeControl',
                margin: '5 5 5 5',
                title: 'Selecciona las Medidas a tomar',
                columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'NOM_MEDIDA_DE_CONTROL',
                    text: 'Medida de Control',
                    filter: true
                }
            ],
                viewConfig: {

            },
            listeners: {
                afterrender: function (component, eOpts) {
                    var meGrid = this;
                    if (me.cmpPadre.getSelectionModel().getCount() > 0) {
                        meGrid.getSelectionModel().select(Ext.Array.map(me.cmpPadre.getSelectionModel().getSelection(), function (record) {
                            return meGrid.getView().getStore().getById(record.getId())
                        }));
                    }
                },
                beforeclose: function (panel, eOpts) {
                    this.getSelectionModel().deselectAll();
                }
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                checkOnly: true,
                allowDeselect: true,
                listeners: {
                    selectionchange: function (sm, selections) {
                        var cmp = me.cmpPadre.next('panel');
                        if (selections.length == 0) {
                            cmp.setDisabled(true);
                        } else {
                            cmp.setDisabled(false);
                        }
                        me.cmpPadre.getStore().loadData(selections);
                    }
                }
            }),
            dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'btn-add',
                                handler: function () {
                                    if (!winMedida) {
                                        winMedida = Ext.create('Ext.window.Window', {
                                            width: 673,
                                            closeAction: 'hide',
                                            title: 'Medidas de Control',
                                            modal: true,
                                            items: [{
                                                xtype: 'form',
                                                margin: '5 5 5 5',
                                                bodyPadding: 10,
                                                title: 'Agrega Medida de Control',
                                                items: [{ "xtype": "textfield", "fieldLabel": "Nom Medida De Control", "anchor": "100%", "name": "NOM_MEDIDA_DE_CONTROL"}],
                                                buttons: [{
                                                    text: 'Agregar',
                                                    handler: function () {
                                                        var new_object,
                                                            errors,
                                                            form;

                                                        form = this.up('form').getForm();
                                                        new_object = Ext.create('WCF_ENAP.model.MedidaDeControl', form.getValues());
                                                        errors = new_object.validate();

                                                        if (errors.isValid() && form.isValid()) {
                                                            this.disable(true);
                                                            Ext.data.StoreManager.lookup('dsMedidaDeControl').insert(0, new_object);
                                                            form.reset();
                                                        } else {
                                                            form.markInvalid(errors);
                                                        }
                                                        this.enable(true);
                                                    }
                                                }]
                                            }]
                                        });
                                    }
                                    winMedida.show();
                                    /* FIN AGREGAR MEDIDA */
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Guardar',
                                iconCls: 'btn-save',
                                handler: function () {
                                    this.up('window').close();
                                }
                            }
                        ]
                    }
                ]
        }
        ];
        me.callParent(arguments);
    }
});