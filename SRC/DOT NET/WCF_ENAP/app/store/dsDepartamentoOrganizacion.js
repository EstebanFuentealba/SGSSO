Ext.define('WCF_ENAP.model.DepartamentoOrganizacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DEPARTAMENTO_ORGANIZACION',
    fields: [{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int","useNull":true},{"name":"ID_ORGANIZACION","type":"int"},{"name":"ID_DEPARTAMENTO","type":"int"}],
    validations: [{"field":"ID_ORGANIZACION","type":"presence","max":"11"},{"field":"ID_DEPARTAMENTO","type":"presence","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsDepartamentoOrganizacion', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsDepartamentoOrganizacion',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.DepartamentoOrganizacion',
            proxy: {
                type: 'rest',
                url: '/DepartamentoOrganizacion/',
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