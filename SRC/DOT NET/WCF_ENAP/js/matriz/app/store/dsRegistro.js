Ext.define('WCF_ENAP.model.Registro', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_REGISTRO',
    fields: [
        { "name": "ID_REGISTRO", "type": "int", "useNull": true },
        { "name": "ID_DIVISION", "type": "int" },
        { "name": "ID_AREA", "type": "int" },
        { "name": "ID_ACTIVIDAD_ESPECIFICA", "type": "int" },
        { "name": "FECHA_CREACION", "type": "date" },
        { "name": "FECHA_APROVACION", "type": "date" },
        { "name": "FECHA_MODIFICACION", "type": "date" }
    ],
    validations: [{"field":"ID_DIVISION","type":"length","max":"11"},{"field":"ID_ACTIVIDAD_ESPECIFICA","type":"length","max":"11"}]
});
Ext.define('WCF_ENAP.store.dsRegistro', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsRegistro',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.Registro',
            proxy: {
                type: 'rest',
                url: '/Registro/',
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