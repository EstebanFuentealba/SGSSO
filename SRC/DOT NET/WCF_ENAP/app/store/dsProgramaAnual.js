Ext.define('WCF_ENAP.model.ProgramaAnual', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PROGRAMA_ANUAL',
    fields: [
        { "name": "ID_PROGRAMA_ANUAL", "type": "int", "useNull": true },
        { "name": "ID_DEPARTAMENTO_ORGANIZACION", "type": "int" },
        { "name": "ID_DIVISION", "type": "int" },
        { "name": "OBJETIVO", "type": "string" },
        { "name": "META", "type": "string" },
        { "name": "FECHA_CREACION", "type": "date" },
        { "name": "NOMBRE_PROGRAMA", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsProgramaAnual', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsProgramaAnual',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.ProgramaAnual',
            proxy: {
                type: 'rest',
                url: '/ProgramaAnual/',
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