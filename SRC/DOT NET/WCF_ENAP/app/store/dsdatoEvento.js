Ext.define('WCF_ENAP.model.DatoEvento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TIPO_EVENTO',
    fields: [
        { "name": "ID_TIPO_EVENTO", "type": "int", "useNull": true },
        { "name": "NOMBRE_TIPO_EVENTO", "type": "string" },
        { "name": "TIPO", "type": "int" }
    ],
    validations: [{"field":"NOMBRE_TIPO_EVENTO","type":"length","max":"200"},{"field":"TIPO","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsDatoEvento', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsDatoEvento',
            pageSize: 300,
            remoteSort: true,
            model: 'WCF_ENAP.model.DatoEvento',
            proxy: {
                type: 'rest',
                url: '/DatoEvento/',
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