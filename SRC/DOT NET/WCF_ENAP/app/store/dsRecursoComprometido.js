Ext.define('WCF_ENAP.model.RecursoComprometido', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_RECURSO_COMPROMETIDO',
    fields: [{"name":"ID_RECURSO_COMPROMETIDO","type":"int","useNull":true},{"name":"NOMBRE_RECURSO","type":"string"},{"name":"DESCRIPCION","type":"string"}],
    validations: [{"field":"NOMBRE_RECURSO","type":"length","max":"150"}]
});
Ext.define('WCF_ENAP.store.dsRecursoComprometido', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsRecursoComprometido',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.RecursoComprometido',
            proxy: {
                type: 'rest',
                url: '/RecursoComprometido/',
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