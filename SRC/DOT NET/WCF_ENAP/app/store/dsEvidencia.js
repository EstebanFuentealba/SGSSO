Ext.define('WCF_ENAP.model.Evidencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVIDENCIA',
    fields: [{"name":"ID_EVIDENCIA","type":"int","useNull":true},{"name":"NOMBRE_EVIDENCIA","type":"string"}],
    validations: [{"field":"NOMBRE_EVIDENCIA","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsEvidencia', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsEvidencia',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Evidencia',
            proxy: {
                type: 'rest',
                url: '/Evidencia/',
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