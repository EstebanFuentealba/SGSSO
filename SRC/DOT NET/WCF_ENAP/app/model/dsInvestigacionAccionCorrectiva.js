Ext.define('WCF_ENAP.model.InvestigacionAccionCorrectiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_INVESTIGACION',
    fields: [{"name":"ID_INVESTIGACION","type":"int","useNull":true},{"name":"ID_ACCION_CORRECTIVA","type":"int"},{"name":"ASISTIO","type":"boolean"}],
    validations: [{"field":"ID_ACCION_CORRECTIVA","type":"length","max":"11"},{"field":"ASISTIO","type":"length","max":"1"}]
});
