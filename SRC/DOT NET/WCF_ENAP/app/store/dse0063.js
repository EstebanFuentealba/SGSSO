Ext.define('WCF_ENAP.model.e0063', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INFORME_PRELIMINAR',
    fields: [
        {"name": "ID_INFORME_PRELIMINAR", "type": "int", "useNull": true },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "FECHA_INGRESO", "type": "date" },
        { "name": "CLASIFICACION", "type": "int" },
        { "name": "RUT_TRABAJADOR", "type": "string" },
        { "name": "NOMBRES", "type": "string" },
        { "name": "APELLIDO_MATERNO", "type": "string" },
        { "name": "APELLIDO_PATERNO", "type": "string" },
        { "name": "ANOS_EXPERIENCIA_CARGO", "type": "int" },
        { "name": "ANOS_EXPERIENCIA_LABORAL", "type": "int" },
        { "name": "ID_CARGO", "type": "int"},
        { "name": "ID_EVENTO", "type": "int" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FATORES_AUTOCUIDADO" },
        { "name": "CAUSA_LISTA_FATORES_CAP_MENTAL" },
        { "name": "CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO" },
        { "name": "CAUSA_LISTA_FATORES_FALTA_HABILIDAD" },
        { "name": "CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA" },
        { "name": "CAUSA_LISTA_FATORES_TECNCION_MENTAL" },
        

    //causa
        { "name": "ID_CAUSA", "type": "int" },
        { "name": "TIPO_CAUSA" },

    //peligro
        {"name": "TIPO_INCIDENTE_PERSONA_LIST" },
        { "name": "CAUSA_INMEDIATA_ACCION_LIST" },

    //causas patrimonio
        {"name": "TIPO_INCIDENTE_PATRIMONIO_LIST" },
        { "name": "CAUSA_INMEDIATA_ACCION_PATRIMONIO_LIST" },

        { "name": "CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO" },
        { "name": "CAUSA_LISTA_FACTORES_ING_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_COMPRAS_INADECUADAS" },
        { "name": "CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADO" },
        { "name": "CAUSA_LISTA_FACTORES_HERRAMIENTAS_INADECUADAS" },
        { "name": "CAUSA_LISTA_FACTORES_USO_DESGASTE" },
        { "name": "CAUSA_LISTA_FACTORES_ABUSO" },
        { "name": "CAUSA_LISTA_FACTORES_ERRORES" }
        
        
   

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