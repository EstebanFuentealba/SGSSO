Ext.define('WCF_ENAP.model.Consecuencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONSECUENCIA',
    fields: [{"name":"ID_CONSECUENCIA","type":"int","useNull":true},{"name":"ID_PELIGRO","type":"int"},{"name":"NOMBRE_CONSECUENCIA","type":"string"}],
    validations: [{"field":"ID_PELIGRO","type":"length","max":"11"},{"field":"NOMBRE_CONSECUENCIA","type":"length","max":"150"}]
});
