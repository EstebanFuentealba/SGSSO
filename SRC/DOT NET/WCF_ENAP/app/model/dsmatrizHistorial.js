Ext.define('WCF_ENAP.model.matrizHistorial', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ_HISTORIAL',
    fields: [{"name":"ID_MATRIZ_HISTORIAL","type":"int","useNull":true},{"name":"ID_MATRIZ","type":"int"},{"name":"FECHA_ACTUALIZACION","type":"date"},{"name":"DESCRIPCION_ACTUALIZACION","type":"string"}],
    validations: [{"field":"ID_MATRIZ","type":"length","max":"11"}]
});
