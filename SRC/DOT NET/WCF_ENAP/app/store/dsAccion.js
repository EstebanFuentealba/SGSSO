Ext.define('WCF_ENAP.model.Accion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACCION',
    fields: [
        { "name": "ID_ACCION", "type": "int", "useNull": true },
        { "name": "NOMBRE_ACCION", "type": "string" }
    ],
    validations: [{"field":"NOMBRE_ACCION","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsAccion', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsAccion',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Accion',
            proxy: {
                type: 'rest',
                url: '/Accion/',
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