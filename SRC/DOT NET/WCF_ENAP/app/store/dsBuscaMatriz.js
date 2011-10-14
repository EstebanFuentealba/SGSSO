Ext.define('WCF_ENAP.model.BuscaMatriz', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ',
    fields: [
        { "name": "ID_MATRIZ", "type": "int", "useNull": true },
        { "name": "ID_ACTIVIDAD_EVALUADA", "type": "int" },
        { "name": "ID_ACTIVIDAD_GENERAL", "type": "int" },
        { "name": "ID_CARGO", "type": "int" },
        { "name": "ID_DIVISION", "type": "int" },
        { "name": "ID_ACTIVIDAD_ESPECIFICA", "type": "int" },
        { "name": "ID_DEPARTAMENTO_ORGANIZACION", "type": "int" },
        { "name": "ID_PELIGRO", "type": "int" },
        { "name": "ID_AREA", "type": "int" },
        { "name": "VALORACION_CONSECUENCIA", "type": "int" },
        { "name": "VALORACION_PROBABILIDAD", "type": "int" },
        { "name": "MEDIDA_VALORACION_CONSECUENCIA", "type": "int" },
        { "name": "MEDIDA_VALORACION_PROBABILIDAD", "type": "int" },
        { "name": "FECHA_CREACION", "type": "date" },
        { "name": "CONDICION", "type": "int" },
        { "name": "MEDIDAS" }
    ]
});

Ext.define('WCF_ENAP.store.dsBuscaMatriz', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsBuscaMatriz',
            groupField: 'ID_MATRIZ',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.BuscaMatriz',
            proxy: {
                type: 'rest',
                url: '/BuscaMatriz/',
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