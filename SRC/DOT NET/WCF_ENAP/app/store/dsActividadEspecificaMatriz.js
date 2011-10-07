Ext.define('WCF_ENAP.model.ActividadEspecificaMatriz', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_ESPECIFICA',
    fields: [
        { "name": "ID_ACTIVIDAD_ESPECIFICA", "type": "int" },
        { "name": "NOM_ACTIVIDAD_ESPECIFICA", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsActividadEspecificaMatriz', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsActividadEspecificaMatriz',
            pageSize: 300,
            remoteSort: true,
            model: 'WCF_ENAP.model.ActividadEspecificaMatriz',
            proxy: {
                type: 'rest',
                url: '/MatrizRiesgo/GetEvaluadas',
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