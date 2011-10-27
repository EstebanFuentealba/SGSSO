Ext.define('WCF_ENAP.model.Node', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_NODE',
    fields: [
        { "name": "ID_NODO", "type": "int", "useNull": true },
        { "name": "NOMBRE_MODULO", "type": "string" },
        { "name": "ID_COMPONENTE", "type": "string" },
        { "name": "ICONCLS", "type": "string" },
        { "name": "TIPO_NODO", "type": "int" },
        { "name": "NODO_PADRE", "type": "int" },
        { "name": "N_ORDER", "type": "int" },
        { "name": "STORE_LIST" }
    ]
});
Ext.define('WCF_ENAP.store.dsNode', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsNode',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Node',
            proxy: {
                type: 'rest',
                url: '/Nodo/',
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