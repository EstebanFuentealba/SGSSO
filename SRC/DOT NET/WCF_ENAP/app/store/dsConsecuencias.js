Ext.define('WCF_ENAP.model.Consecuencias', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONSECUENCIA',
    fields: [{"name":"ID_CONSECUENCIA","type":"int","useNull":true},{"name":"NOMBRE_CONSECUENCIA","type":"string"}],
    validations: [{"field":"NOMBRE_CONSECUENCIA","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsConsecuencias', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsConsecuencias',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Consecuencias',
            proxy: {
                type: 'rest',
                url: '/Consecuencias/',
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