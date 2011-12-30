Ext.define('WCF_ENAP.view.ui.Accion', {
    extend: 'Ext.window.Window',
    width: 709,
    maximizable: true,
    layout: {
        type: 'anchor'
    },
    modal: true,
    title: 'Agrega Acción Correctiva',
    id: 'panel-Accion',
    initComponent: function () {
        var me = this;
        me.addEvents(
            'addedRecord',
            'existsRecord'
        );
        me.items = [
            {
                xtype: 'form',
                id: 'Form_Accion',
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'Ingresa la Información de la Acción',
                items: [{
                    "xtype": "textfield",
                    "fieldLabel": "Nombre Accion",
                    "anchor": "100%", "name": "NOMBRE_ACCION"
                }],
                buttons: [{
                    text: 'Agregar',
                    handler: function () {
                        var new_object,
                            errors,
                            form,
                            store,
                            record;

                        form = this.up('form').getForm();
                        new_object = Ext.create('WCF_ENAP.model.Accion', form.getValues());
                        errors = new_object.validate();
                        store = Ext.data.StoreManager.lookup('dsAccion');
                        if (errors.isValid() && form.isValid()) {
                            record = store.findRecord('NOMBRE_ACCION', new_object.get('NOMBRE_ACCION'));
                            if (record == null) {
                                record = new_object;
                                store.insert(0, record);
                                form.reset();
                                me.fireEvent('addedRecord', me, record);
                            } else {
                                me.fireEvent('existsRecord', me, record);
                            }
                        } else {
                            form.markInvalid(errors);
                        }
                    }
                }]
            }
        ];
        me.callParent(arguments);
    }
});