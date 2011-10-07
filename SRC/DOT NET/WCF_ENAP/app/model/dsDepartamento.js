Ext.define('WCF_ENAP.model.Departamento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DEPARTAMENTO',
    fields: [{"name":"ID_DEPARTAMENTO","type":"int","useNull":true},{"name":"NOMBRE_DEPARTAMENTO","type":"string"}],
    validations: [{"field":"NOMBRE_DEPARTAMENTO","type":"length","max":"200"}]
});
