Ext.define('WCF_ENAP.model.MatrizRiesgo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ',
    fields: [
        { "name": "ID_MATRIZ", "type": "int", "useNull": true },
        { "name": "ID_ACTIVIDAD_ESPECIFICA", "type": "int" },
        { "name": "NOM_ACTIVIDAD_ESPECIFICA", "type": "string" },
        { "name": "ID_PELIGRO", "type": "int" },
        { "name": "NOM_PELIGRO", "type": "string" },
        { "name": "ID_MEDIDAS_DE_CONTROL", "type": "int" },
        { "name": "MEDIDAS"},
        { "name": "VALORACION_CONSECUENCIA", "type": "int" },
        { "name": "VALORACION_PROBABILIDAD", "type": "int" },
        { "name": "MEDIDA_VALORACION_CONSECUENCIA", "type": "int" },
        { "name": "MEDIDA_VALORACION_PROBABILIDAD", "type": "int" }
    ]
});
Ext.define('WCF_ENAP.store.dsMatrizRiesgo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsMatrizRiesgo',
            pageSize: 10,
            remoteSort: false,
            model: 'WCF_ENAP.model.MatrizRiesgo',
            proxy: {
                type: 'rest',
                url:'/Matriz/',
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
