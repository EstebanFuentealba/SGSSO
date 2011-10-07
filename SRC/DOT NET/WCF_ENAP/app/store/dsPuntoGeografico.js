Ext.define('WCF_ENAP.model.PuntoGeografico', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PUNTO_GEOGRAFICA',
    fields: [{"name":"ID_PUNTO_GEOGRAFICA","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int"},{"name":"LAT_PUNTO","type":"float"},{"name":"LNG_PUNTO","type":"float"}],
    validations: [{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"presence","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsPuntoGeografico', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsPuntoGeografico',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.PuntoGeografico',
            proxy: {
                type: 'rest',
                url: '/PuntoGeografico/',
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