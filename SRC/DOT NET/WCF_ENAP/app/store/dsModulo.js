Ext.define('WCF_ENAP.model.Modulo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MODULO',
    fields: [{"name":"ID_MODULO","type":"int","useNull":true},{"name":"NOMBRE_MODULO","type":"string"},{"name":"DESCRIPCION_MODULO","type":"string"},{"name":"URL_MODULO","type":"string"}],
    validations: [{"field":"NOMBRE_MODULO","type":"length","max":"100"},{"field":"URL_MODULO","type":"length","max":"250"}]
});
Ext.define('WCF_ENAP.store.dsModulo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsModulo',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Modulo',
            proxy: {
                type: 'rest',
                url: '/Modulo/',
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