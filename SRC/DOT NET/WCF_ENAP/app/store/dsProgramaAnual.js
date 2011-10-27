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
        { "name": "NOMBRE_PROGRAMA", "type": "string" },
        { "name": "ENERO", "type": "int", defaultValue: 0 },
        { "name": "FEBRERO", "type": "int", defaultValue: 0 },
        { "name": "MARZO", "type": "int", defaultValue: 0 },
        { "name": "ABRIL", "type": "int", defaultValue: 0 },
        { "name": "MAYO", "type": "int", defaultValue: 0 },
        { "name": "JUNIO", "type": "int", defaultValue: 0 },
        { "name": "JULIO", "type": "int", defaultValue: 0 },
        { "name": "AGOSTO", "type": "int", defaultValue: 0 },
        { "name": "SEPTIEMBRE", "type": "int", defaultValue: 0 },
        { "name": "OCTUBRE", "type": "int", defaultValue: 0 },
        { "name": "NOVIEMBRE", "type": "int", defaultValue: 0 },
        { "name": "DICIEMBRE", "type": "int", defaultValue: 0 }

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