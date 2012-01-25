Ext.define('WCF_ENAP.model.ResumenEvento', {
    extend: 'Ext.data.Model',
    fields: [
        { "name": "ID_DEPARTAMENTO_ORGANIZACION", "type": "int" },
        { "name": "NOMBRE_DEPARTAMENTO", "type": "string" },
        { "name": "TOTAL_MAYOR", "type": "int" },
        { "name": "TOTAL_SERIO", "type": "int" },
        { "name": "TOTAL_RELEVANTE", "type": "int" },
        { "name": "TOTAL_LEVE", "type": "int" },
        { "name": "TOTAL_SIN_EFECTO", "type": "int" },
        { "name": "ACUMULADO_MENSUAL", "type": "int" },
        { "name": "ACUMULADO_ANUAL", "type": "int" }
    ]
});
Ext.define('WCF_ENAP.store.dsResumenEvento', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            storeId: 'dsResumenEvento',
            pageSize: 50,
            remoteSort: true,
            model: 'WCF_ENAP.model.ResumenEvento',
            proxy: {
                type: 'rest',
                url: '/GraphEventosOrganizacion/resumenEvento',
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