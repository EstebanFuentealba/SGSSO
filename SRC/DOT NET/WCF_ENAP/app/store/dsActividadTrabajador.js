Ext.define('WCF_ENAP.model.ActividadTrabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_TRABAJADOR',
    fields: [{"name":"ID_ACTIVIDAD_TRABAJADOR","type":"int","useNull":true},{"name":"NOMBRE_ACTIVIDAD_TRABAJADOR","type":"string"}],
    validations: [{"field":"NOMBRE_ACTIVIDAD_TRABAJADOR","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsActividadTrabajador', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsActividadTrabajador',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadTrabajador',
            proxy: {
                type: 'rest',
                url: '/ActividadTrabajador/',
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