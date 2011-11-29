Ext.define('WCF_ENAP.model.GraphAvanceProgramaAnualById', {
    extend: 'Ext.data.Model',
    fields: [
        { "name": "ID_DIVISION", "type": "int" },
        { "name": "NOMBRE_DIVISION", "type": "string" },
        { "name": "NOMBRE_MES_R", "type": "string" },
        { "name": "PRC_MES_R", "type": "float" },
        { "name": "PROGRAMADO", "type": "int" },
        { "name": "REALIZADO", "type": "int" }
    ]
});
Ext.define('WCF_ENAP.store.dsGraphAvanceProgramaAnualById', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: false,
            storeId: 'dsGraphAvanceProgramaAnualById',
            pageSize: 12,
            remoteSort: true,
            model: 'WCF_ENAP.model.GraphAvanceProgramaAnualById',
            proxy: {
                type: 'rest',
                url: '/GraphAvanceProgramaAnual/getById',
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