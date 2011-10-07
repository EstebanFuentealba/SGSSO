Ext.define('WCF_ENAP.model.ActividadGeneral', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_GENERAL',
    fields: [{"name":"ID_ACTIVIDAD_GENERAL","type":"int","useNull":true},{"name":"NOM_ACTIVIDAD_GENERAL","type":"string"}],
    validations: [{"field":"NOM_ACTIVIDAD_GENERAL","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsActividadGeneral', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsActividadGeneral',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadGeneral',
            proxy: {
                type: 'rest',
                url: '/ActividadGeneral/',
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