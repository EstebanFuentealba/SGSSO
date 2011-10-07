Ext.define('WCF_ENAP.model.Calificacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CALIFICACION',
    fields: [{"name":"ID_CALIFICACION","type":"int","useNull":true},{"name":"NOMBRE_CALICACION","type":"string"}],
    validations: [{"field":"NOMBRE_CALICACION","type":"length","max":"100"}]
});
Ext.define('WCF_ENAP.store.dsCalificacion', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsCalificacion',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Calificacion',
            proxy: {
                type: 'rest',
                url: '/Calificacion/',
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