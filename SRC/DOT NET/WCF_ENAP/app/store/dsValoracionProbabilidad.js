Ext.define('WCF_ENAP.model.ValoracionProbabilidad', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_VALORACION_PROBABILIDAD',
    fields: [{"name":"ID_VALORACION_PROBABILIDAD","type":"int","useNull":true},{"name":"NOM_PROBABILIDAD","type":"string"}],
    validations: [{"field":"NOM_PROBABILIDAD","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsValoracionProbabilidad', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsValoracionProbabilidad',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ValoracionProbabilidad',
            proxy: {
                type: 'rest',
                url: '/ValoracionProbabilidad/',
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