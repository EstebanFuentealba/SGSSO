Ext.define('WCF_ENAP.model.Consecuencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONSECUENCIA',
    fields: [{"name":"ID_CONSECUENCIA","type":"int","useNull":true},{"name":"ID_PELIGRO","type":"int"},{"name":"NOMBRE_CONSECUENCIA","type":"string"}],
    validations: [{"field":"ID_PELIGRO","type":"length","max":"11"},{"field":"NOMBRE_CONSECUENCIA","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsConsecuencia', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsConsecuencia',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Consecuencia',
            proxy: {
                type: 'rest',
                url: '/Consecuencia/',
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