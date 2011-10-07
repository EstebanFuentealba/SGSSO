Ext.define('WCF_ENAP.model.Grupo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_GRUPO',
    fields: [{"name":"ID_GRUPO","type":"int","useNull":true},{"name":"NOMBRE_GRUPO","type":"string"},{"name":"DESCRIPCION_GRUPO","type":"string"}],
    validations: [{"field":"NOMBRE_GRUPO","type":"length","max":"250"}]
});
Ext.define('WCF_ENAP.store.dsGrupo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsGrupo',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Grupo',
            proxy: {
                type: 'rest',
                url: '/Grupo/',
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