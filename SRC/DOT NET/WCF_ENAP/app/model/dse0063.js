Ext.define('WCF_ENAP.model.e0063', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INFORME_PRELIMINAR',
    fields: [
        { "name": "ID_INFORME_PRELIMINAR", "type": "int", "useNull": true },
        { "name": "ID_EVENTO", "type": "int" },

        { "name": "AFECTA_PERSONA", "type":"boolean" },
        { "name": "AFECTA_PATRIMONIO", "type": "boolean" },
        { "name": "AFECTA_PERDIDA_PROCESO", "type": "boolean" },
        { "name": "AFECTA_MEDIO_AMBIENTE", "type": "boolean" },
        { "name": "AFECTA_IMAGEN", "type": "boolean" },

        { "name": "CLASIFICACION_TRABAJADOR", "type": "int" },
        { "name": "CLASIFICACION_PATRIMONIO", "type": "int" },
        { "name": "CLASIFICACION_MEDIO_AMBIENTE", "type": "int" },
        { "name": "CLASIFICACION_PERDIDA_PROCESO", "type": "int" },
        { "name": "CLASIFICACION_IMAGEN", "type": "int" },
        { "name": "TIPO_INCIDENTE_PATRIMONIO" },
        { "name": "TIPO_INCIDENTE_PERSONA" },
        { "name": "TRABAJADORES_LIST" },
        { "name": "CAUSA_INMEDIATA_ACCION_PATRIMONIO" },
        { "name": "CAUSA_LISTA_FACTORES_ABUSO_MALTRATO" },
        { "name": "CAUSA_LISTA_FACTORES_ING_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_COMPRAS_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_MANTENIMIENTO_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_HERR_EQUIPO_INADECUADO" },
        { "name": "CAUSA_LISTA_FACTORES_USO_DESGASTE" },
        { "name": "CAUSA_LISTA_FACTORES_FALTA_LIDERAZGO" }
    ]
});