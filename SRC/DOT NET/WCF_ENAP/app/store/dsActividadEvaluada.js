/*Ext.define('WCF_ENAP.model.ActividadEvaluada', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_EVALUADA',
    fields: [
        { "name": "ID_ACTIVIDAD_EVALUADA", "type": "int", "useNull": true },
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
        { "name": "MEDIDAS" },
    ],
    validations: [{"field":"ID_ACTIVIDAD_GENERAL","type":"length","max":"11"},{"field":"ID_CARGO","type":"length","max":"11"},{"field":"ID_DIVISION","type":"length","max":"11"},{"field":"ID_ACTIVIDAD_ESPECIFICA","type":"length","max":"11"},{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"length","max":"11"},{"field":"ID_PELIGRO","type":"length","max":"11"},{"field":"ID_AREA","type":"length","max":"11"},{"field":"VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"VALORACION_PROBABILIDAD","type":"length","max":"11"},{"field":"MEDIDA_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"MEDIDA_VALORACION_PROBABILIDAD","type":"length","max":"11"},{"field":"CONDICION","type":"length","max":"11"}]
});
*/
Ext.define('WCF_ENAP.model.ActividadEvaluada', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_EVALUADA',
    fields: [
        { "name": "ID_MATRIZ", "type": "int" },
        { "name": "NOMBRE_MATRIZ", "type": "string" },
        { "name": "NOM_ACTIVIDAD_ESPECIFICA", "type": "string" },
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
        { "name": "FECHA_CREACION", "type": "date", "convert": function (v, record) {
                return (Ext.JSON.decode({ 'd': v })).d;
            }
        },
        { "name": "CONDICION", "type": "int" },
        { "name": "MEDIDAS" }
    ]
});
Ext.define('WCF_ENAP.store.dsActividadEvaluada', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsActividadEvaluada',
            groupField: 'NOMBRE_MATRIZ',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadEvaluada',
            proxy: {
                type: 'rest',
                /*url: '/ActividadEvaluada/',*/
                api: {
                    create: '/ActividadEvaluada/',
                    read: '/ActividadEvaluada/search',
                    update: '/ActividadEvaluada/',
                    destroy: '/ActividadEvaluada/'
                },
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