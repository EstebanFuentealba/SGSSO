Ext.define('WCF_ENAP.model.ActividadProgramaAnualPrevencion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD',
    fields: [
                { name: 'ID_ACTIVIDAD', type: 'int', "useNull": true },
                { name: 'NOMBRE_ACTIVIDAD', type: 'string' },
                { name: 'ID_PROGRAMA_ANUAL', type: 'int' },
                { name: 'CANTIDAD_FRECUENCIA', type: 'int' },
                { name: 'ID_EVIDENCIA', type: 'int' },
                { name: 'TIPO_FRECUENCIA', type: 'int' },
                { name: 'ID_CARGO', type: 'int' },
		        { name: 'TURNO', type: 'string' },
                { name: 'ENERO_P', type: 'int', defaultValue: 0 },
		        { name: 'ENERO_R', type: 'int', defaultValue: 0 },
                { name: 'ENERO_E', type: 'bool', defaultValue: false },
                { name: 'FEBRERO_P', type: 'int', defaultValue: 0 },
		        { name: 'FEBRERO_R', type: 'int', defaultValue: 0 },
                { name: 'FEBRERO_E', type: 'bool', defaultValue: false },
                { name: 'MARZO_P', type: 'int', defaultValue: 0 },
		        { name: 'MARZO_R', type: 'int', defaultValue: 0 },
                { name: 'MARZO_E', type: 'bool', defaultValue: false },
                { name: 'ABRIL_P', type: 'int', defaultValue: 0 },
		        { name: 'ABRIL_R', type: 'int', defaultValue: 0 },
                { name: 'ABRIL_E', type: 'bool', defaultValue: false },
                { name: 'MAYO_P', type: 'int', defaultValue: 0 },
		        { name: 'MAYO_R', type: 'int', defaultValue: 0 },
                { name: 'MAYO_E', type: 'bool', defaultValue: false },
                { name: 'JUNIO_P', type: 'int', defaultValue: 0 },
		        { name: 'JUNIO_R', type: 'int', defaultValue: 0 },
                { name: 'JUNIO_E', type: 'bool', defaultValue: false },
                { name: 'JULIO_P', type: 'int', defaultValue: 0 },
		        { name: 'JULIO_R', type: 'int', defaultValue: 0 },
                { name: 'JULIO_E', type: 'bool', defaultValue: false },
                { name: 'AGOSTO_P', type: 'int', defaultValue: 0 },
		        { name: 'AGOSTO_R', type: 'int', defaultValue: 0 },
                { name: 'AGOSTO_E', type: 'bool', defaultValue: false },
                { name: 'SEPTIEMBRE_P', type: 'int', defaultValue: 0 },
		        { name: 'SEPTIEMBRE_R', type: 'int', defaultValue: 0 },
                { name: 'SEPTIEMBRE_E', type: 'bool', defaultValue: false },
                { name: 'OCTUBRE_P', type: 'int', defaultValue: 0 },
		        { name: 'OCTUBRE_R', type: 'int', defaultValue: 0 },
                { name: 'OCTUBRE_E', type: 'bool', defaultValue: false },
                { name: 'NOVIEMBRE_P', type: 'int', defaultValue: 0 },
		        { name: 'NOVIEMBRE_R', type: 'int', defaultValue: 0 },
                { name: 'NOVIEMBRE_E', type: 'bool', defaultValue: false },
                { name: 'DICIEMBRE_P', type: 'int', defaultValue: 0 },
		        { name: 'DICIEMBRE_R', type: 'int', defaultValue: 0 },
                { name: 'DICIEMBRE_E', type: 'bool', defaultValue: false },
                { "name": "MES_INICIO", "type": "int" },
                { "name": "ANO_INICIO", "type": "int" },
                { "name": "NOMBRE_EVIDENCIA", "type": "string" },
                { "name": "NOMBRE_CARGO", "type": "string" }, { "name": "TOTAL", "type": "float" },
            ]
});
Ext.define('WCF_ENAP.store.dsActividadProgramaAnualPrevencion', {
    extend: 'Ext.data.Store',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsActividadProgramaAnualPrevencion',
            groupField: 'NOMBRE_ACTIVIDAD',
            pageSize: 300,
            remoteSort: false,
            model: 'WCF_ENAP.model.ActividadProgramaAnualPrevencion',
            proxy: {
                type: 'rest',
                url: '/ActividadProgramaAnualPrevencion/',
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