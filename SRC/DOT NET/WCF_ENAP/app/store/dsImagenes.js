Ext.define('WCF_ENAP.model.Imagenes', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_IMAGEN',
    fields: [{"name":"ID_IMAGEN","type":"int"},{"name":"ID_EVENTO","type":"int"},{"name":"NOMBRE_IMAGEN","type":"string"},{"name":"IMAGEN","type":"string"}],
    validations: [{"field":"ID_IMAGEN","type":"length","max":"11"},{"field":"ID_EVENTO","type":"length","max":"11"},{"field":"NOMBRE_IMAGEN","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsImagenes', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsImagenes',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Imagenes',
            proxy: {
                type: 'rest',
                url: '/Imagenes/',
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