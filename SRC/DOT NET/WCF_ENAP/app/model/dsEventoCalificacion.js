Ext.define('WCF_ENAP.model.EventoCalificacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO_CALIFICACION',
    fields: [{"name":"ID_EVENTO_CALIFICACION","type":"int","useNull":true},{"name":"ID_CALIFICACION","type":"int"},{"name":"ID_EVENTO","type":"int"},{"name":"AFECTADO","type":"int"}],
    validations: [{"field":"ID_CALIFICACION","type":"length","max":"11"},{"field":"ID_EVENTO","type":"length","max":"11"},{"field":"AFECTADO","type":"length","max":"11"}]
});
