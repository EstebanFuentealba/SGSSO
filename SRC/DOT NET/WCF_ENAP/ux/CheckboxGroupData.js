Ext.define('Ext.ux.CheckboxGroupData', {
    extend: 'Ext.form.CheckboxGroup',
    alias: ['widget.checkboxgroupdata'],
	initComponent: function() {
        var me = this;
		if (!me.store) {
            Ext.Error.raise("You must specify a store config");
        }
        me.store = Ext.data.StoreManager.lookup(me.store);
        me.mon(store, {
			load: me.onDataLoaded
		});
        me.callParent();
    },
	onDataLoaded : function(store, records, successful, operation, options) {
		Ext.each(records, function(name, index, record) {
			console.log(name);
		});
	}
});