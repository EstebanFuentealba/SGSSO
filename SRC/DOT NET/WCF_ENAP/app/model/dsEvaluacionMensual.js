Ext.define('WCF_ENAP.model.EvaluacionMensual', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVALUACION_MENSUAL',
    fields: [{"name":"ID_EVALUACION_MENSUAL","type":"int"},{"name":"ID_SUB_ACTIVIDAD","type":"int"},{"name":"PROGRAMADO","type":"int"},{"name":"REALIZADO","type":"int"},{"name":"FECHA_EVALUACION","type":"date"}],
    validations: [{"field":"ID_EVALUACION_MENSUAL","type":"length","max":"11"},{"field":"ID_SUB_ACTIVIDAD","type":"length","max":"11"},{"field":"PROGRAMADO","type":"length","max":"11"},{"field":"REALIZADO","type":"length","max":"11"}]
});
