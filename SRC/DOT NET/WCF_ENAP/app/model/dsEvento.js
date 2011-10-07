Ext.define('WCF_ENAP.model.Evento', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO',
    fields: [{"name":"ID_EVENTO","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int"},{"name":"OCURRIO","type":"int"},{"name":"FECHA_HORA_EVENTO","type":"date"},{"name":"FECHA_INGRESO","type":"date"},{"name":"LAT_EVENTO","type":"float"},{"name":"LNG_EVENTO","type":"float"},{"name":"TIPO_EVENTO","type":"boolean"},{"name":"LUGAR_EXACTO","type":"string"}],
    validations: [{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"length","max":"11"},{"field":"OCURRIO","type":"length","max":"11"},{"field":"TIPO_EVENTO","type":"length","max":"1"},{"field":"LUGAR_EXACTO","type":"length","max":"200"}]
});
