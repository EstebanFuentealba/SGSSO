Ext.define('WCF_ENAP.model.Evidencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVIDENCIA',
    fields: [{"name":"ID_EVIDENCIA","type":"int","useNull":true},{"name":"NOMBRE_EVIDENCIA","type":"string"}],
    validations: [{"field":"NOMBRE_EVIDENCIA","type":"length","max":"200"}]
});
