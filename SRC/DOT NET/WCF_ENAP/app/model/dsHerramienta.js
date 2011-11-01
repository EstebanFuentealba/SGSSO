Ext.define('WCF_ENAP.model.Herramienta', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HERRAMIENTA',
    fields: [
                { "name": "ID_HERRAMIENTA", "type": "int", "useNull": true },
                { "name": "NOMBRE_HERRAMIENTA", "type": "string" }
            ],
    validations: [
                    { "field": "NOMBRE_HERRAMIENTA", "type": "length", "max": "200" }
                ]
});
