Ext.define('WCF_ENAP.model.Division', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DIVISION',
    fields: [{"name":"ID_DIVISION","type":"int","useNull":true},{"name":"NOMBRE_DIVISION","type":"string"}],
    validations: [{"field":"NOMBRE_DIVISION","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsDivision', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            pruneModifiedRecords: true,
            storeId: 'dsDivision',
            pageSize: 200,
            remoteSort: false,
            model: 'WCF_ENAP.model.Division',
            proxy: {
                type: 'rest',
                url: '/Division/',
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