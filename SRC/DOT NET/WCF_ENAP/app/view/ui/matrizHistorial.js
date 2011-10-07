var rowEditingmatrizHistorial = Ext.create('Ext.grid.plugin.RowEditing', {});
Ext.define('WCF_ENAP.view.ui.matrizHistorial', {
    extend: 'Ext.panel.Panel',

    height: 531,
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    title: 'My Window',
    id: 'panel-matrizHistorial',
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                id: 'Form_matrizHistorial',
                collapsible: true,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'My Form',
                items: [{"xtype":"numberfield","fieldLabel":"Id Matriz","anchor":"100%","name":"ID_MATRIZ"},{"xtype":"datefield","fieldLabel":"Fecha Actualizacion","anchor":"100%","name":"FECHA_ACTUALIZACION"},{"xtype":"htmleditor","fieldLabel":"Descripcion Actualizacion","anchor":"100%","name":"DESCRIPCION_ACTUALIZACION"}],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form;
                        
                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.matrizHistorial', form.getValues());
                        errors = new_object.validate();
                        
                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsmatrizHistorial').insert(0, new_object);
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
                store: 'dsmatrizHistorial',
                itemId: 'Grid_matrizHistorial',
                columns: [{"xtype":"gridcolumn","dataIndex":"ID_MATRIZ_HISTORIAL","text":"Id Matriz Historial","sortable":true},{"xtype":"gridcolumn","dataIndex":"ID_MATRIZ","text":"Id Matriz","sortable":true},{"xtype":"gridcolumn","dataIndex":"FECHA_ACTUALIZACION","text":"Fecha Actualizacion","sortable":true,"field":{"type":"datefield"}},{"xtype":"gridcolumn","dataIndex":"DESCRIPCION_ACTUALIZACION","text":"Descripcion Actualizacion","sortable":true,"field":{"type":"htmleditor"}}],
                plugins: [
                    rowEditingmatrizHistorial
                ],
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        store: 'dsmatrizHistorial',
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
                                    rowEditingmatrizHistorial.cancelEdit();
                                    var r = Ext.ModelManager.create({ }, 'WCF_ENAP.model.matrizHistorial');
                                    Ext.data.StoreManager.lookup('dsmatrizHistorial').insert(0, r);
                                    rowEditingmatrizHistorial.startEdit(0, 0);
                                }
                            },
                            {
                                xtype: 'tbseparator'
                            },
                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                handler: function() {
                                    var sm = Ext.getCmp('#Grid_matrizHistorial').getSelectionModel();
                                    rowEditingmatrizHistorial.cancelEdit();
                                    Ext.data.StoreManager.lookup('dsmatrizHistorial').remove(sm.getSelection());
                                    if (Ext.data.StoreManager.lookup('dsmatrizHistorial').getCount() > 0) {
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
                            Ext.getCmp('Form_matrizHistorial').getForm().loadRecord(records[0]);
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