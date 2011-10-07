Ext.define('WCF_ENAP.model.HistorialEmpresa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HISTORIAL',
    fields: [{"name":"ID_HISTORIAL","type":"int","useNull":true},{"name":"ID_EMPRESA","type":"int"},{"name":"FECHA_CREACION","type":"date"},{"name":"N_TRABAJADORES","type":"int"},{"name":"H_TRABAJADAS","type":"int"},{"name":"H_SOBRETIEMPO","type":"int"}],
    validations: [{"field":"ID_EMPRESA","type":"length","max":"11"},{"field":"N_TRABAJADORES","type":"length","max":"11"},{"field":"H_TRABAJADAS","type":"length","max":"11"},{"field":"H_SOBRETIEMPO","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsHistorialEmpresa', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsHistorialEmpresa',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.HistorialEmpresa',
            proxy: {
                type: 'rest',
                url: '/HistorialEmpresa/',
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