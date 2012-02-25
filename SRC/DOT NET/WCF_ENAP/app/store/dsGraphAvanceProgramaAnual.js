Ext.define('WCF_ENAP.model.GraphAvanceProgramaAnual', {
    extend: 'Ext.data.Model',
    fields: [
        { "name": "ID_DIVISION", "type": "int" },
        { "name": "NOMBRE_DIVISION", "type": "string" },
        { "name": "PROGRAMA", "type": "string" },
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