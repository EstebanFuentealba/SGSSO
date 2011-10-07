Ext.define('WCF_ENAP.model.Archivo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ARCHIVO',
    fields: [{"name":"ID_ARCHIVO","type":"int","useNull":true},{"name":"ID_INFORME","type":"int"},{"name":"NOMBRE_ARCHIVO","type":"string"},{"name":"PATH","type":"string"}],
    validations: [{"field":"ID_INFORME","type":"length","max":"11"},{"field":"NOMBRE_ARCHIVO","type":"length","max":"255"}]
});
