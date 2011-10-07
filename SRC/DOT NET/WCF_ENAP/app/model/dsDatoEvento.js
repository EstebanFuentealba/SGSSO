Ext.define('WCF_ENAP.model.DatoEvento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TIPO_EVENTO',
    fields: [{"name":"ID_TIPO_EVENTO","type":"int","useNull":true},{"name":"NOMBRE_TIPO_EVENTO","type":"string"},{"name":"TIPO","type":"int"}],
    validations: [{"field":"NOMBRE_TIPO_EVENTO","type":"length","max":"200"},{"field":"TIPO","type":"length","max":"11"}]
});
