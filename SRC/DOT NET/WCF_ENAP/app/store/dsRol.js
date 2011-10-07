Ext.define('WCF_ENAP.model.Rol', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ROL',
    fields: [{"name":"ID_ROL","type":"int","useNull":true},{"name":"NOM_ROL","type":"string"}],
    validations: [{"field":"NOM_ROL","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsRol', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsRol',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Rol',
            proxy: {
                type: 'rest',
                url: '/Rol/',
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