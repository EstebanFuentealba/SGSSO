Ext.define('WCF_ENAP.model.AccionCorrectiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACCION_CORRECTIVA',
    fields: [
        { "name": "ID_ACCION_CORRECTIVA", "type": "int", "useNull": true },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "ID_ACCION", "type": "int" },
        { "name": "NOMBRE_ACCION", "type": "string" },
        { "name": "FECHA_COMIENZO", "type": "date", "dateFormat": "d-m-Y" },
        { "name": "FECHA_PLAZO", "type": "date", "dateFormat": "d-m-Y" },
        { "name": "FECHA_EJECUCION", "type": "date", "dateFormat": "d-m-Y" },
        { "name": "PORCENTAJE_CUMPLIMIENTO", "type": "int" },
        { "name": "DESCRIPCION", "type": "string" },
        { "name": "FECHA_CREACION", "type": "date", "dateFormat": "d-m-Y" },
        { "name": "RESPONSABLE" },
        { "name": "RESPONSABLES_OBJECT" }
    ]
});
Ext.define('WCF_ENAP.store.dsAccionCorrectiva', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsAccionCorrectiva',
            pageSize: 300,
            remoteSort: true,
            model: 'WCF_ENAP.model.AccionCorrectiva',
            proxy: {
                type: 'rest',
                url: '/AccionCorrectiva/',
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