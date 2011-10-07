Ext.define('WCF_ENAP.model.e0064', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INFORME',
    fields: [{"name":"ID_INFORME","type":"int","useNull":true},{"name":"E00_ID_INFORME","type":"int"},{"name":"DESCRIPCION_INCIDENTE","type":"string"},{"name":"ANTECEDENTES","type":"string"},{"name":"RELATO_DE_HECHO","type":"string"},{"name":"COMENTARIO","type":"string"},{"name":"FECHA_CREACION","type":"date"}],
    validations: [{"field":"E00_ID_INFORME","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dse0064', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dse0064',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.e0064',
            proxy: {
                type: 'rest',
                url: '/e0064/',
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