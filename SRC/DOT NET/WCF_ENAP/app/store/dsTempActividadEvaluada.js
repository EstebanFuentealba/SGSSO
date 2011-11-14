Ext.define('WCF_ENAP.store.dsTempActividadEvaluada', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: false,
            storeId: 'dsTempActividadEvaluada',
            groupField: 'ID_ACTIVIDAD_ESPECIFICA',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadEvaluada',
            proxy: {
                type: 'rest',
                url: '/TempActividadEvaluada/',
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