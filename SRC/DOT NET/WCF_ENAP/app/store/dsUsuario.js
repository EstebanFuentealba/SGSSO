Ext.define('WCF_ENAP.model.Usuario', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_USUARIO',
    fields: [{"name":"PASSWORD","type":"string"},{"name":"EMAIL","type":"string"},{"name":"ID_USUARIO","type":"int","useNull":true},{"name":"ID_EMPRESA","type":"int"},{"name":"RUT_TRABAJADOR","type":"string"},{"name":"NOMBRES","type":"string"},{"name":"APELLIDO_MATERNO","type":"string"},{"name":"APELLIDO_PATERNO","type":"string"},{"name":"TELEFONO","type":"string"},{"name":"ANOS_EXPERIENCIA","type":"int"}],
    validations: [{"field":"PASSWORD","type":"length","max":"32"},{"field":"EMAIL","type":"length","max":"150"},{"field":"ID_EMPRESA","type":"length","max":"11"},{"field":"RUT_TRABAJADOR","type":"length","max":"12"},{"field":"NOMBRES","type":"length","max":"200"},{"field":"APELLIDO_MATERNO","type":"length","max":"200"},{"field":"APELLIDO_PATERNO","type":"length","max":"200"},{"field":"TELEFONO","type":"length","max":"20"},{"field":"ANOS_EXPERIENCIA","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsUsuario', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsUsuario',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Usuario',
            proxy: {
                type: 'rest',
                url: '/Usuario/',
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