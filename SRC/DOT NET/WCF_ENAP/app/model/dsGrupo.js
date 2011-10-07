Ext.define('WCF_ENAP.model.Grupo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_GRUPO',
    fields: [{"name":"ID_GRUPO","type":"int","useNull":true},{"name":"NOMBRE_GRUPO","type":"string"},{"name":"DESCRIPCION_GRUPO","type":"string"}],
    validations: [{"field":"NOMBRE_GRUPO","type":"length","max":"250"}]
});
