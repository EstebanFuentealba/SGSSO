Ext.define('WCF_ENAP.model.Template', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TEMPLATE',
    fields: [
        { "name": "ID_TEMPLATE", "type": "int", "useNull": true },
        { "name": "NOMBRE_TEMPLATE", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsTemplate', {
    extend: 'Ext.data.Store',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsTemplate',
            pageSize: 200,
            remoteSort: true,
            model: 'WCF_ENAP.model.Template',
            proxy: {
                type: 'rest',
                url: '/TemplatePrograma/',
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