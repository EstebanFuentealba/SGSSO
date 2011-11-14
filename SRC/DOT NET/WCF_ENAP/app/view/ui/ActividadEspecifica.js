Ext.define('WCF_ENAP.view.ui.ActividadEspecifica', {
    extend: 'Ext.form.Panel',
    layout: 'anchor',
    title: 'Datos de la actividad específica',
    id: 'panel-ActividadEspecifica',
    margin: '5 5 5 5',
    bodyPadding: 10,
    initComponent: function () {
        var me = this;
        me.items = [
            { 
                "xtype": "textfield", 
                "fieldLabel": "Nombre", 
                "anchor": "100%", 
                "name": "NOM_ACTIVIDAD_ESPECIFICA", 
                allowBlank: false
            }
        ];
        me.buttons = [{
            text: 'Agregar',
            handler: function () {
                var new_object,
					errors,
					form;

                form = this.up('form').getForm();
                new_object = Ext.create('WCF_ENAP.model.ActividadEspecifica', form.getValues());
                errors = new_object.validate();

                if (errors.isValid() && form.isValid()) {
                    this.disable(true);
                    Ext.data.StoreManager.lookup('dsActividadEspecifica').insert(0, new_object);
                    form.reset();
                } else {
                    form.markInvalid(errors);
                }
                this.enable(true);
            }
        }];
        me.callParent(arguments);
    }
});