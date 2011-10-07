Ext.define('WCF_ENAP.model.Consecuencias', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONSECUENCIA',
    fields: [{"name":"ID_CONSECUENCIA","type":"int","useNull":true},{"name":"NOMBRE_CONSECUENCIA","type":"string"}],
    validations: [{"field":"NOMBRE_CONSECUENCIA","type":"length","max":"150"}]
});
