Ext.define('WCF_ENAP.model.Calificacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CALIFICACION',
    fields: [{"name":"ID_CALIFICACION","type":"int","useNull":true},{"name":"NOMBRE_CALICACION","type":"string"}],
    validations: [{"field":"NOMBRE_CALICACION","type":"length","max":"100"}]
});
