Ext.define('WCF_ENAP.model.historialInforme', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HISTORIAL_INFORME',
    fields: [{"name":"ID_HISTORIAL_INFORME","type":"int","useNull":true},{"name":"ID_INFORME","type":"int"},{"name":"FECHA_MODIFICACION","type":"date"},{"name":"DESCRIPCION_MODIFICACION","type":"string"}],
    validations: [{"field":"ID_INFORME","type":"length","max":"11"}]
});
