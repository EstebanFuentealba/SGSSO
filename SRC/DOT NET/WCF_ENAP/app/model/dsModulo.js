Ext.define('WCF_ENAP.model.Modulo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MODULO',
    fields: [{"name":"ID_MODULO","type":"int","useNull":true},{"name":"NOMBRE_MODULO","type":"string"},{"name":"DESCRIPCION_MODULO","type":"string"},{"name":"URL_MODULO","type":"string"}],
    validations: [{"field":"NOMBRE_MODULO","type":"length","max":"100"},{"field":"URL_MODULO","type":"length","max":"250"}]
});
