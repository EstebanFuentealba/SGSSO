Ext.define('WCF_ENAP.model.ParteCorporal', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PARTE_CORPORAL',
    fields: [{"name":"ID_PARTE_CORPORAL","type":"int","useNull":true},{"name":"NOMBRE_PARTE_CORPORAL","type":"string"}],
    validations: [{"field":"NOMBRE_PARTE_CORPORAL","type":"length","max":"100"}]
});
