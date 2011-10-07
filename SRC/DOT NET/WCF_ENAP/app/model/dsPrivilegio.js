Ext.define('WCF_ENAP.model.Privilegio', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PRIVILEGIO',
    fields: [{"name":"ID_PRIVILEGIO","type":"int","useNull":true},{"name":"NOMBRE_PRIVILEGIO","type":"string"}],
    validations: [{"field":"NOMBRE_PRIVILEGIO","type":"length","max":"150"}]
});
