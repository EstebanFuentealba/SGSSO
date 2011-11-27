Ext.define('WCF_ENAP.view.ui.Cargo', {
    extend: 'Ext.form.Panel',
    layout: 'anchor',
    title: 'Datos del Cargo',
    id: 'panel-Cargo',
    margin: '5 5 5 5',
    bodyPadding: 10,
    initComponent: function () {
        var me = this, rowEditingCargo = Ext.create('Ext.grid.plugin.RowEditing', {});
        me.items = [
            {
                "xtype": "textfield",
                "fieldLabel": "Nombre Cargo",
                "anchor": "100%",
                "name": "NOMBRE_CARGO",
                "labelWidth": 120,
                "allowBlank": false
            }
        ];
        me.buttons = [{
			text: 'Agregar',
			handler: function () {
				var new_object,
					errors,
					form;

				form = this.up('form').getForm();
				new_object = Ext.create('WCF_ENAP.model.Cargo', form.getValues());
				errors = new_object.validate();

				if (errors.isValid() && form.isValid()) {
					this.disable(true);
					Ext.data.StoreManager.lookup('dsCargo').insert(0, new_object);
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