Ext.define('WCF_ENAP.model.Herramienta', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HERRAMIENTA',
    fields: [{ "name": "ID_HERRAMIENTA", "type": "int", "useNull": true }, { "name": "NOMBRE_HERRAMIENTA", "type": "string"}],
    validations: [{ "field": "NOMBRE_HERRAMIENTA", "type": "length", "max": "200"}]
});
Ext.define('WCF_ENAP.store.dsHerramienta', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsHerramienta',
            pageSize: 100,
            remoteSort: true,
            model: 'WCF_ENAP.model.Herramienta',
            proxy: {
                type: 'rest',
                url: '/Accion/',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount',
                    successProperty: 'success'
                }
            }
        }, cfg)]);
    }
});