Ext.define('WCF_ENAP.model.SearchMarker', {
    extend: 'WCF_ENAP.model.Evento',
    idProperty: 'ID_EVENTO',
    fields: [
        { "name": "DISTANCE", "type": "float" }
    ]
});
Ext.define('WCF_ENAP.store.dsSearchMarker', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsSearchMarker',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.SearchMarker',
            proxy: {
                type: 'rest',
                url: '/SearchMarker/',
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