Ext.define('WCF_ENAP.model.ProgramaActividad', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PROGRAMA_ACTIVIDAD',
    fields: [{"name":"ID_PROGRAMA_ACTIVIDAD","type":"int","useNull":true},{"name":"ID_PROGRAMA_ANUAL","type":"int"},{"name":"NOMBRE_PROGRAMA_ACTIVIDAD","type":"string"}],
    validations: [{"field":"ID_PROGRAMA_ANUAL","type":"length","max":"11"},{"field":"NOMBRE_PROGRAMA_ACTIVIDAD","type":"length","max":"200"}]
});
Ext.define('WCF_ENAP.store.dsProgramaActividad', {
    extend: 'Ext.data.Store',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsProgramaActividad',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ProgramaActividad',
            proxy: {
                type: 'rest',
                url: '/ProgramaActividad/',
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