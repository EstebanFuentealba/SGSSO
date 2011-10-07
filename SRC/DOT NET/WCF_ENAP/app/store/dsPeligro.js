Ext.define('WCF_ENAP.model.Peligro', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO',
    fields: [{"name":"ID_PELIGRO","type":"int","useNull":true},{"name":"NOM_PELIGRO","type":"string"}],
    validations: [{"field":"NOM_PELIGRO","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsPeligro', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsPeligro',
            pageSize: 300,
            remoteSort: true,
            model: 'WCF_ENAP.model.Peligro',
            proxy: {
                type: 'rest',
                url: '/Peligro/',
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