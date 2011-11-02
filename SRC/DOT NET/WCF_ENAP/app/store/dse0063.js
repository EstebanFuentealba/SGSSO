Ext.define('WCF_ENAP.model.e0063', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INFORME',
    fields: [
        { "name": "ID_INFORME", "type": "int", "useNull": true },
        { "name": "E00_ID_INFORME", "type": "int" },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "FECHA_INGRESO", "type": "date" },
        { "name": "CLASIFICACION", "type": "int" }
    ],
    validations: [{"field":"E00_ID_INFORME","type":"presence","max":"11"},{"field":"ID_EVENTO_EMPRESA","type":"length","max":"11"},{"field":"CLASIFICACION","type":"length","max":"11"}]
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
            pageSize: 10,
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