Ext.define('WCF_ENAP.model.AccionCorrectiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACCION_CORRECTIVA',
    fields: [
        { "name": "ID_ACCION_CORRECTIVA", "type": "int", "useNull": true },
        { "name": "ID_EVENTO_EMPRESA", "type": "int" },
        { "name": "ID_ACCION", "type": "int" },
        { "name": "FECHA_COMIENZO", "type": "string" },
        { "name": "FECHA_PLAZO", "type": "string" },
        { "name": "FECHA_EJECUCION", "type": "string" },
        { "name": "PORCENTAJE_CUMPLIMIENTO", "type": "int" },
        { "name": "DESCRIPCION", "type": "string" },
        { "name": "FECHA_CREACION", "type": "string" },
        { "name": "RESPONSABLE" }
    ]
});