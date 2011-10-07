Ext.define('WCF_ENAP.model.AreaGeografica', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_AREA_GEOGRAFICA',
    fields: [{"name":"ID_AREA_GEOGRAFICA","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO","type":"int"},{"name":"LAT_AREA","type":"float"},{"name":"LNG_AREA","type":"float"}],
    validations: [{"field":"ID_DEPARTAMENTO","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsAreaGeografica', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsAreaGeografica',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.AreaGeografica',
            proxy: {
                type: 'rest',
                url: '/AreaGeografica/',
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