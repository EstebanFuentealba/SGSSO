Ext.define('WCF_ENAP.model.Accion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACCION',
    fields: [{"name":"ID_ACCION","type":"int","useNull":true},{"name":"NOMBRE_ACCION","type":"string"}],
    validations: [{"field":"NOMBRE_ACCION","type":"length","max":"200"}]
});
