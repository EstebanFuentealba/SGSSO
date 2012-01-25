Ext.define('WCF_ENAP.model.GraphResumenEvento', {
    extend: 'Ext.data.Model',
    fields: [
        { "name": "ENERO_ACUMULADO", "type": "int" },
        { "name": "FEBRERO_ACUMULADO", "type": "string" },
        { "name": "MARZO_ACUMULADO", "type": "int" },
        { "name": "ABRIL_ACUMULADO", "type": "int" },
        { "name": "MAYO_ACUMULADO", "type": "int" },
        { "name": "JUNIO_ACUMULADO", "type": "int" },
        { "name": "JULIO_ACUMULADO", "type": "int" },
        { "name": "AGOSTO_ACUMULADO", "type": "int" },
        { "name": "SEPTIEMBRE_ACUMULADO", "type": "int" },
        { "name": "OCTUBRE_ACUMULADO", "type": "int" },
        { "name": "NOVIEMBRE_ACUMULADO", "type": "int" },
        { "name": "DICIEMBRE_ACUMULADO", "type": "int" },
        { "name": "NOMBRE_DEPARTAMENTO", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsGraphResumenEvento', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            storeId: 'dsGraphResumenEvento',
            pageSize: 50,
            remoteSort: true,
            model: 'WCF_ENAP.model.GraphResumenEvento',
            proxy: {
                type: 'rest',
                url: '/GraphEventosOrganizacion/graphResumen',
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