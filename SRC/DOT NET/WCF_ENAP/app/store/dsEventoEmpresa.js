Ext.define('WCF_ENAP.model.EventoEmpresa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO_EMPRESA',
    fields: [{"name":"ID_EVENTO_EMPRESA","type":"int","useNull":true},{"name":"ID_EVENTO","type":"int"},{"name":"ID_EMPRESA","type":"int"},{"name":"DESCRIPCION","type":"string"}],
    validations: [{"field":"ID_EVENTO","type":"length","max":"11"},{"field":"ID_EMPRESA","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsEventoEmpresa', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsEventoEmpresa',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.EventoEmpresa',
            proxy: {
                type: 'rest',
                url: '/EventoEmpresa/',
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