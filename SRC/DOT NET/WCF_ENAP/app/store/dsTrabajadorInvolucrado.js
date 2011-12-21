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
        { "name": "ID_EVENTO", "type": "int" },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "CAUSA_INMEDIATA_ACCION" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_FISICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FACTORES_CAP_PSICOLOGICA_INADECUADA" },
        { "name": "CAUSA_LISTA_FATORES_CAP_MENTAL" },
        { "name": "CAUSA_LISTA_FATORES_TENSION_MENTAL" },
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
Ext.define('WCF_ENAP.store.dsTrabajadorInvolucrado', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsTrabajadorInvolucrado',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Trabajador',
            proxy: {
                type: 'rest',
                url: '/Evento/trabajadores',
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