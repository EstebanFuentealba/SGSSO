Ext.define('WCF_ENAP.model.Organizacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ORGANIZACION',
    fields: [
        { "name": "ID_ORGANIZACION", "type": "int", defaultValue: 0 },
        { "name": "NOMBRE_ORGANIZACION", "type": "string" }
    ],
    validations: [{"field":"NOMBRE_ORGANIZACION","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsOrganizacion', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsOrganizacion',
            pageSize: 10,
            remoteSort: false,
            model: 'WCF_ENAP.model.Organizacion',
            proxy: {
                type: 'rest',
                url: '/Organizacion/',
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