Ext.define('WCF_ENAP.model.Organizacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ORGANIZACION',
    fields: [{"name":"ID_ORGANIZACION","type":"int","useNull":true},{"name":"NOMBRE_ORGANIZACION","type":"string"}],
    validations: [{"field":"NOMBRE_ORGANIZACION","type":"length","max":"100"}]
});
