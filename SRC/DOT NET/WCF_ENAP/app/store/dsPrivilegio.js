Ext.define('WCF_ENAP.model.Privilegio', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PRIVILEGIO',
    fields: [{"name":"ID_PRIVILEGIO","type":"int","useNull":true},{"name":"NOMBRE_PRIVILEGIO","type":"string"}],
    validations: [{"field":"NOMBRE_PRIVILEGIO","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsPrivilegio', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsPrivilegio',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Privilegio',
            proxy: {
                type: 'rest',
                url: '/Privilegio/',
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