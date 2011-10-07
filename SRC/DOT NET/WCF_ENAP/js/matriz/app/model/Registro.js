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
    validations: [
        { "field": "ID_DIVISION", "type": "length", "max": "11" },
        { "field": "ID_ACTIVIDAD_ESPECIFICA", "type": "length", "max": "11" }
    ]
});