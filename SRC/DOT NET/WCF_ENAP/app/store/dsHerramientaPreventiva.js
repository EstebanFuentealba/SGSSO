Ext.define('WCF_ENAP.model.HerramientaPreventiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HERRAMIENTA_PREVENTIVA',
    fields: [{"name":"ID_HERRAMIENTA_PREVENTIVA","type":"int","useNull":true},{"name":"NOMBRE_HERRAMIENTA_PREVENTIVA","type":"string"}],
    validations: [{"field":"NOMBRE_HERRAMIENTA_PREVENTIVA","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsHerramientaPreventiva', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsHerramientaPreventiva',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.HerramientaPreventiva',
            proxy: {
                type: 'rest',
                url: '/HerramientaPreventiva/',
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