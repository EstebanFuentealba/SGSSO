Ext.define('WCF_ENAP.model.Archivo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ARCHIVO',
    fields: [{"name":"ID_ARCHIVO","type":"int","useNull":true},{"name":"ID_INFORME","type":"int"},{"name":"NOMBRE_ARCHIVO","type":"string"},{"name":"PATH","type":"string"}],
    validations: [{"field":"ID_INFORME","type":"length","max":"11"},{"field":"NOMBRE_ARCHIVO","type":"length","max":"255"}]
});
Ext.define('WCF_ENAP.store.dsArchivo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsArchivo',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Archivo',
            proxy: {
                type: 'rest',
                url: '/Archivo/',
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