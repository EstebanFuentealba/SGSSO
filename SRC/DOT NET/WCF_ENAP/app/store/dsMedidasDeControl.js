Ext.define('WCF_ENAP.model.MedidasDeControl', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MEDIDAS_DE_CONTROL',
    fields: [{"name":"ID_MEDIDAS_DE_CONTROL","type":"int","useNull":true},{"name":"NOM_MEDIDA_DE_CONTROL","type":"string"}],
    validations: [{"field":"NOM_MEDIDA_DE_CONTROL","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsMedidasDeControl', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsMedidasDeControl',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.MedidasDeControl',
            proxy: {
                type: 'rest',
                url: '/MedidasDeControl/',
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