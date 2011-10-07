Ext.define('WCF_ENAP.model.MatrizRiesgo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ_RIESGO',
    fields: [{ "name": "ID_MATRIZ_RIESGO", "type": "int", "useNull": true }, { "name": "ID_ACTIVIDAD_ESPECIFICA", "type": "int" }, { "name": "ID_PELIGRO", "type": "int" }, { "name": "VALORACION_CONSECUENCIA", "type": "int" }, { "name": "VALORACION_PROBABILIDAD", "type": "int"}],
    validations: [{ "field": "ID_ACTIVIDAD_ESPECIFICA", "type": "length", "max": "11" }, { "field": "ID_PELIGRO", "type": "length", "max": "11" }, { "field": "VALORACION_CONSECUENCIA", "type": "length", "max": "11" }, { "field": "VALORACION_PROBABILIDAD", "type": "length", "max": "11"}]
});
Ext.define('WCF_ENAP.store.dsMatrizRiesgoIdentificado', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsMatrizRiesgoIdentificado',
            pageSize: 300,
            remoteSort: false,
            model: 'WCF_ENAP.model.MatrizRiesgo',
            proxy: {
                type: 'rest',
                url: '/MatrizRiesgo/',
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
