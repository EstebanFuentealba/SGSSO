Ext.define('WCF_ENAP.model.Stores', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_STORE',
    fields: [
        { "name": "ID_STORE", "type": "int", "useNull": true },
        { "name": "NOMBRE_STORE", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsStores', {
    extend: 'Ext.data.Store',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            storeId: 'dsStores',
            pageSize: 200,
            remoteSort: true,
            model: 'WCF_ENAP.model.Stores',
            proxy: {
                type: 'rest',
                url: '/Stores/',
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