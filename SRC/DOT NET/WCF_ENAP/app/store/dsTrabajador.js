Ext.define('WCF_ENAP.model.Trabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TRABAJADOR',
    fields: [{"name":"RUT_TRABAJADOR","type":"string"},{"name":"NOMBRES","type":"string"},{"name":"APELLIDO_MATERNO","type":"string"},{"name":"APELLIDO_PATERNO","type":"string"},{"name":"TELEFONO","type":"string"},{"name":"ANOS_EXPERIENCIA","type":"int"},{"name":"ID_TRABAJADOR","type":"int","useNull":true},{"name":"ID_CARGO","type":"int"}],
    validations: [{"field":"RUT_TRABAJADOR","type":"presence","max":"12"},{"field":"NOMBRES","type":"length","max":"200"},{"field":"APELLIDO_MATERNO","type":"length","max":"200"},{"field":"APELLIDO_PATERNO","type":"length","max":"200"},{"field":"TELEFONO","type":"length","max":"20"},{"field":"ANOS_EXPERIENCIA","type":"length","max":"11"},{"field":"ID_CARGO","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsTrabajador', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsTrabajador',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Trabajador',
            proxy: {
                type: 'rest',
                url: '/Trabajador/',
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