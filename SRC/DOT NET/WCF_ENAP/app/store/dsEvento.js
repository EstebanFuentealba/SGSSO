Ext.define('WCF_ENAP.model.Evento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO',
    fields: [
        { "name": "ID_EVENTO", "type": "int", "useNull": true },
        { "name": "ID_DEPARTAMENTO_ORGANIZACION", "type": "int" },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "FECHA_HORA_EVENTO", "type": "string" },
        { "name": "NOMBRE_DEPARTAMENTO", "type": "string" },
        { "name": "HORA_EVENTO", "type": "string" },
        { "name": "LAT_EVENTO", "type": "float" },
        { "name": "LNG_EVENTO", "type": "float" },
        { "name": "LUGAR_EXACTO", "type": "string" },
        { "name": "DESCRIPCION_GENERAL", "type": "string" },
        { "name": "COUNT_IPRELIMINAR", "type": "int" },
        { "name": "COUNT_TRABAJADORES", "type": "int" },
        { "name": "AVG_CALIFICACION", "type": "int" }
    ]
});
Ext.define('WCF_ENAP.store.dsEvento', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsEvento',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Evento',
            proxy: {
                type: 'rest',
                url: '/Evento/',
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