Ext.define('WCF_ENAP.model.ActividadEspecifica', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_ESPECIFICA',
    fields: [{"name":"ID_ACTIVIDAD_ESPECIFICA","type":"int","useNull":true},{"name":"NOM_ACTIVIDAD_ESPECIFICA","type":"string"}],
    validations: [{"field":"NOM_ACTIVIDAD_ESPECIFICA","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsActividadEspecifica', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsActividadEspecifica',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadEspecifica',
            proxy: {
                type: 'rest',
                url: '/ActividadEspecifica/',
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