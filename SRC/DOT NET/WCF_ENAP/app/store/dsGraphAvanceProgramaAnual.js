Ext.define('WCF_ENAP.model.GraphAvanceProgramaAnual', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PROGRAMA_ANUAL',
    fields: [
        { "name": "ID_DIVISION", "type": "int", "useNull": true },
        { "name": "PROGRAMA", "type": "string" },
        { "name": "NOMBRE_DIVISION", "type": "string" },
        { "name": "PRC_TOTAL", "type": "float" }
    ]
});
Ext.define('WCF_ENAP.store.dsGraphAvanceProgramaAnual', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: false,
            storeId: 'dsGraphAvanceProgramaAnual',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.GraphAvanceProgramaAnual',
            proxy: {
                type: 'rest',
                url: '/GraphAvanceProgramaAnual/',
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