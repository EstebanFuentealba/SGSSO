Ext.define('WCF_ENAP.model.e0063', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO_EMPRESA',
    fields: [
        { "name": "ID_EVENTO_EMPRESA", "type": "int", "useNull": true },
        { "name": "CLASIFICACION_TRABAJADOR", "type": "int" },
        { "name": "CLASIFICACION_PATRIMONIO", "type": "int" },
        { "name": "CLASIFICACION_MEDIO_AMBIENTE", "type": "int" },
        { "name": "CLASIFICACION_PERDIDA_PROCESO", "type": "int" },
        { "name": "CLASIFICACION_IMAGEN", "type": "int" },
        { "name": "TIPO_INCIDENTE_PATRIMONIO" },
        { "name": "TIPO_INCIDENTE_PERSONA" },
        { "name": "TIPO_INCIDENTE_PERSONA" },
        { "name": "CAUSA_INMEDIATA_ACCION_PATRIMONIO" },
        { "name": "CAUSA_LISTA_FACTORES_ABUSO_MALTRATO" },
        { "name": "CAUSA_LISTA_FACTORES_ING_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA" }
    ]

});
Ext.define('WCF_ENAP.store.dse0063', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dse0063',
            pageSize: 300,
            remoteSort: true,
            model: 'WCF_ENAP.model.e0063',
            proxy: {
                type: 'rest',
                url: '/e0063/',
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