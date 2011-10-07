Ext.define('WCF_ENAP.model.Departamento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DEPARTAMENTO',
    fields: [{"name":"ID_DEPARTAMENTO","type":"int","useNull":true},{"name":"NOMBRE_DEPARTAMENTO","type":"string"},{"name":"LAT","type":"float"},{"name":"LNG","type":"float"}],
    validations: [{"field":"NOMBRE_DEPARTAMENTO","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsDepartamento', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pruneModifiedRecords: true,
            storeId: 'dsDepartamento',
            model: 'WCF_ENAP.model.Departamento',
            proxy: {
                type: 'rest',
                url: '/Departamento/',
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