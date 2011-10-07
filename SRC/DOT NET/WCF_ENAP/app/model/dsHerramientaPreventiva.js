Ext.define('WCF_ENAP.model.HerramientaPreventiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HERRAMIENTA_PREVENTIVA',
    fields: [{"name":"ID_HERRAMIENTA_PREVENTIVA","type":"int","useNull":true},{"name":"NOMBRE_HERRAMIENTA_PREVENTIVA","type":"string"}],
    validations: [{"field":"NOMBRE_HERRAMIENTA_PREVENTIVA","type":"length","max":"200"}]
});
