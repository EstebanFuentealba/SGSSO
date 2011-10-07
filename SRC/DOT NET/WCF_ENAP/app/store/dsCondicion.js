Ext.define('WCF_ENAP.model.Condicion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONDICION',
    fields: [{"name":"ID_CONDICION","type":"int","useNull":true},{"name":"NOM_CONDICION","type":"string"}],
    validations: [{"field":"NOM_CONDICION","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsCondicion', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsCondicion',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Condicion',
            proxy: {
                type: 'rest',
                url: '/Condicion/',
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