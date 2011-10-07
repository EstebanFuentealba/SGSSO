Ext.define('WCF_ENAP.model.ParteCorporal', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PARTE_CORPORAL',
    fields: [{"name":"ID_PARTE_CORPORAL","type":"int","useNull":true},{"name":"NOMBRE_PARTE_CORPORAL","type":"string"}],
    validations: [{"field":"NOMBRE_PARTE_CORPORAL","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsParteCorporal', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsParteCorporal',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ParteCorporal',
            proxy: {
                type: 'rest',
                url: '/ParteCorporal/',
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