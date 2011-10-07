Ext.define('WCF_ENAP.model.matrizHistorial', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ_HISTORIAL',
    fields: [{"name":"ID_MATRIZ_HISTORIAL","type":"int","useNull":true},{"name":"ID_MATRIZ","type":"int"},{"name":"FECHA_ACTUALIZACION","type":"date"},{"name":"DESCRIPCION_ACTUALIZACION","type":"string"}],
    validations: [{"field":"ID_MATRIZ","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsmatrizHistorial', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsmatrizHistorial',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.matrizHistorial',
            proxy: {
                type: 'rest',
                url: '/matrizHistorial/',
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