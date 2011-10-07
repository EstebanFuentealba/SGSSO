Ext.define('WCF_ENAP.model.Division', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DIVISION',
    fields: [{"name":"ID_DIVISION","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int"},{"name":"NOMBRE_DIVISION","type":"string"}],
    validations: [{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"length","max":"11"},{"field":"NOMBRE_DIVISION","type":"length","max":"150"}]
});
