Ext.define('WCF_ENAP.model.PeligroDetalle', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO_DETALLE',
    fields: [{"name":"ID_PELIGRO_DETALLE","type":"int","useNull":true},{"name":"ID_ACTIVIDAD_ESPECIFICA","type":"int"},{"name":"ID_PELIGRO","type":"int"},{"name":"ID_VALORACION_CONSECUENCIA","type":"int"},{"name":"MEDIDA_ID_VALORACION_CONSECUENCIA","type":"int"},{"name":"ID_VALORACION_PROBABILIDAD","type":"int"},{"name":"MEDIDA_ID_VALORACION_PROBABILIDAD","type":"int"}],
    validations: [{"field":"ID_ACTIVIDAD_ESPECIFICA","type":"length","max":"11"},{"field":"ID_PELIGRO","type":"length","max":"11"},{"field":"ID_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"MEDIDA_ID_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"ID_VALORACION_PROBABILIDAD","type":"length","max":"11"},{"field":"MEDIDA_ID_VALORACION_PROBABILIDAD","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsPeligroDetalle', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsPeligroDetalle',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.PeligroDetalle',
            proxy: {
                type: 'rest',
                url: '/PeligroDetalle/',
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