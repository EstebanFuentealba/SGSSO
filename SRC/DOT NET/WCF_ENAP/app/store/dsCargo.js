Ext.define('WCF_ENAP.model.Cargo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CARGO',
    fields: [{"name":"ID_CARGO","type":"int","useNull":true},{"name":"NOMBRE_CARGO","type":"string"}],
    validations: [{"field":"NOMBRE_CARGO","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsCargo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsCargo',
            pageSize: 200,
            remoteSort: true,
            model: 'WCF_ENAP.model.Cargo',
            proxy: {
                type: 'rest',
                url: '/Cargo/',
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