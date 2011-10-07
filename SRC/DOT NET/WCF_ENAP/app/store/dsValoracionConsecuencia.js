Ext.define('WCF_ENAP.model.ValoracionConsecuencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_VALORACION_CONSECUENCIA',
    fields: [{"name":"ID_VALORACION_CONSECUENCIA","type":"int","useNull":true},{"name":"NOM_CONSECUENCIA","type":"string"}],
    validations: [{"field":"NOM_CONSECUENCIA","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsValoracionConsecuencia', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsValoracionConsecuencia',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ValoracionConsecuencia',
            proxy: {
                type: 'rest',
                url: '/ValoracionConsecuencia/',
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