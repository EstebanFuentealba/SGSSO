Ext.define('WCF_ENAP.model.GraphEventosOrganizacion', {
    extend: 'Ext.data.Model',
    fields: [
        { "name": "MES_NAME", "type": "string" },
        { "name": "MES_ID", "type": "int" },
        { "name": "COUNT_EVENTOS", "type": "int" }
    ]
});
Ext.define('WCF_ENAP.store.dsGraphEventosOrganizacion', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: false,
            storeId: 'dsGraphEventosOrganizacion',
            pageSize: 20,
            remoteSort: true,
            model: 'WCF_ENAP.model.GraphEventosOrganizacion',
            proxy: {
                type: 'rest',
                url: '/GraphEventosOrganizacion/',
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