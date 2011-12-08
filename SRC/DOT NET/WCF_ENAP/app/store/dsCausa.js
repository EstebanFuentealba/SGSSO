Ext.define('WCF_ENAP.model.Causa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CAUSA',
    fields: [
                { "name": "ID_CAUSA", "type": "int", "useNull": true },
                { "name": "ID_INFORME", "type": "int" },
                { "name": "DESCRIPCION", "type": "string" },
                {"name":"TIPO_CAUSA","type":"int"}],
    validations: [{"field":"ID_INFORME","type":"length","max":"11"},{"field":"TIPO_CAUSA","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsCausa', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsCausa',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Causa',
            proxy: {
                type: 'rest',
                url: '/Causa/',
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