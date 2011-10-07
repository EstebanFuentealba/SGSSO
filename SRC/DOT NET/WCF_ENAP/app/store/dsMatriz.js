Ext.define('WCF_ENAP.model.Matriz', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ',
    fields: [{"name":"ID_MATRIZ","type":"int","useNull":true},{"name":"ID_USUARIO","type":"int"},{"name":"FECHA_CREACION","type":"date"}],
    validations: [{"field":"ID_USUARIO","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsMatriz', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsMatriz',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Matriz',
            proxy: {
                type: 'rest',
                url: '/Matriz/',
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