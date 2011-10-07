Ext.define('WCF_ENAP.model.Area', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_AREA',
    fields: [{"name":"ID_AREA","type":"int","useNull":true},{"name":"ID_DIVISION","type":"int"},{"name":"NOMBRE_AREA","type":"string"}],
    validations: [{"field":"ID_DIVISION","type":"length","max":"11"},{"field":"NOMBRE_AREA","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsArea', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsArea',
            pageSize: 200,
            remoteSort: false,
            model: 'WCF_ENAP.model.Area',
            proxy: {
                type: 'rest',
                url: '/Area/',
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