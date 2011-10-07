Ext.define('WCF_ENAP.model.Area', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_AREA',
    fields: [{"name":"ID_AREA","type":"int","useNull":true},{"name":"ID_DIVISION","type":"int"},{"name":"NOMBRE_AREA","type":"string"}],
    validations: [{"field":"ID_DIVISION","type":"length","max":"11"},{"field":"NOMBRE_AREA","type":"length","max":"200"}]
});
