Ext.define('WCF_ENAP.model.Evento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO',
    fields: [{"name":"ID_EVENTO","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int"},{"name":"OCURRIO","type":"int"},{"name":"FECHA_HORA_EVENTO","type":"date"},{"name":"FECHA_INGRESO","type":"date"},{"name":"LAT_EVENTO","type":"float"},{"name":"LNG_EVENTO","type":"float"},{"name":"TIPO_EVENTO","type":"boolean"},{"name":"LUGAR_EXACTO","type":"string"}],
    validations: [{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"length","max":"11"},{"field":"OCURRIO","type":"length","max":"11"},{"field":"TIPO_EVENTO","type":"length","max":"1"},{"field":"LUGAR_EXACTO","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsEvento', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
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