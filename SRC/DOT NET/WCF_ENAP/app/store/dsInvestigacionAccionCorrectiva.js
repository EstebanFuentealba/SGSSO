Ext.define('WCF_ENAP.model.InvestigacionAccionCorrectiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INVESTIGACION',
    fields: [{"name":"ID_INVESTIGACION","type":"int","useNull":true},{"name":"ID_ACCION_CORRECTIVA","type":"int"},{"name":"ASISTIO","type":"boolean"}],
    validations: [{"field":"ID_ACCION_CORRECTIVA","type":"length","max":"11"},{"field":"ASISTIO","type":"length","max":"1"}]
});
Ext.define('WCF_ENAP.store.dsInvestigacionAccionCorrectiva', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsInvestigacionAccionCorrectiva',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.InvestigacionAccionCorrectiva',
            proxy: {
                type: 'rest',
                url: '/InvestigacionAccionCorrectiva/',
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