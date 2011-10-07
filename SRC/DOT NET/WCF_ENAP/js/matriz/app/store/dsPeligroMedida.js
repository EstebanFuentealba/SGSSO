Ext.define('WCF_ENAP.model.PeligroMedida', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ_RIESGO',
    fields: [{"name":"ID_MATRIZ_RIESGO","type":"int"},{"name":"ID_MEDIDAS_DE_CONTROL","type":"int"},{"name":"MEDIDA_VALORACION_CONSECUENCIA","type":"int"},{"name":"MEDIDA_VALORACION_PROBABILIDAD","type":"int"}],
    validations: [{"field":"ID_MATRIZ_RIESGO","type":"length","max":"11"},{"field":"ID_MEDIDAS_DE_CONTROL","type":"length","max":"11"},{"field":"MEDIDA_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"MEDIDA_VALORACION_PROBABILIDAD","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsPeligroMedida', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsPeligroMedida',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.PeligroMedida',
            proxy: {
                type: 'rest',
                url: '/PeligroMedida/',
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