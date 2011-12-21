Ext.define('WCF_ENAP.model.Trabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TRABAJADOR',
    fields: [
        { "name": "RUT_TRABAJADOR", "type": "string" },
        { "name": "NOMBRES", "type": "string" },
        { "name": "APELLIDO_MATERNO", "type": "string" },
        { "name": "APELLIDO_PATERNO", "type": "string" },
        { "name": "TELEFONO", "type": "string" },
        { "name": "ANOS_EXPERIENCIA_CARGO", "type": "int" },
        { "name": "ANOS_EXPERIENCIA_LABORAL", "type": "int" },
        { "name": "ID_TRABAJADOR", "type": "int", "useNull": true },
        { "name": "ID_CARGO", "type": "int" },

    /* Incidente data */
        {"name": "ID_EVENTO", "type": "int" },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },

        { "name": "CLASIFICACION_TRABAJADOR", "type": "int" },
        { "name": "TIPO_INCIDENTE_PERSONA", "type": "int" },
        { "name": "CAUSA_INMEDIATA_ACCION", "type": "int" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FATORES_CAP_MENTAL" },
        { "name": "CAUSA_LISTA_FATORES_TECNCION_MENTAL" },
        { "name": "CAUSA_LISTA_FATORES_FALTA_CONOCIMIETO" },
        { "name": "CAUSA_LISTA_FATORES_FALTA_HABILIDAD" },
        { "name": "CAUSA_LISTA_FATORES_MOTIVACION_INADECUADA" },
        { "name": "CAUSA_LISTA_FATORES_AUTOCUIDADO" },
        { "name": "CAUSA_LISTA_FACTORES_ERRORES" }
    ],
    validations: [
        { "field": "RUT_TRABAJADOR", "type": "presence", "max": "12" },
        { "field": "NOMBRES", "type": "length", "max": "200" },
        { "field": "APELLIDO_MATERNO", "type": "length", "max": "200" },
        { "field": "APELLIDO_PATERNO", "type": "length", "max": "200" },
        { "field": "TELEFONO", "type": "length", "max": "20" },
        { "field": "ANOS_EXPERIENCIA_CARGO", "type": "length", "max": "11" },
        { "field": "ANOS_EXPERIENCIA_LABORAL", "type": "length", "max": "11" },
        { "field": "ID_CARGO", "type": "length", "max": "11" }
    ]
});