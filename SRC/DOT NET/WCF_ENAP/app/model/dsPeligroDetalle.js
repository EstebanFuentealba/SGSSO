Ext.define('WCF_ENAP.model.PeligroDetalle', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO_DETALLE',
    fields: [{"name":"ID_PELIGRO_DETALLE","type":"int","useNull":true},{"name":"ID_ACTIVIDAD_ESPECIFICA","type":"int"},{"name":"ID_PELIGRO","type":"int"},{"name":"ID_VALORACION_CONSECUENCIA","type":"int"},{"name":"MEDIDA_ID_VALORACION_CONSECUENCIA","type":"int"},{"name":"ID_VALORACION_PROBABILIDAD","type":"int"},{"name":"MEDIDA_ID_VALORACION_PROBABILIDAD","type":"int"}],
    validations: [{"field":"ID_ACTIVIDAD_ESPECIFICA","type":"length","max":"11"},{"field":"ID_PELIGRO","type":"length","max":"11"},{"field":"ID_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"MEDIDA_ID_VALORACION_CONSECUENCIA","type":"length","max":"11"},{"field":"ID_VALORACION_PROBABILIDAD","type":"length","max":"11"},{"field":"MEDIDA_ID_VALORACION_PROBABILIDAD","type":"length","max":"11"}]
});
