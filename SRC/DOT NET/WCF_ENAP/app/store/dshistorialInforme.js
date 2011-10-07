Ext.define('WCF_ENAP.model.historialInforme', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HISTORIAL_INFORME',
    fields: [{"name":"ID_HISTORIAL_INFORME","type":"int","useNull":true},{"name":"ID_INFORME","type":"int"},{"name":"FECHA_MODIFICACION","type":"date"},{"name":"DESCRIPCION_MODIFICACION","type":"string"}],
    validations: [{"field":"ID_INFORME","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dshistorialInforme', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dshistorialInforme',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.historialInforme',
            proxy: {
                type: 'rest',
                url: '/historialInforme/',
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