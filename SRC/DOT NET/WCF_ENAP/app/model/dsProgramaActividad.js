Ext.define('WCF_ENAP.model.ProgramaActividad', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PROGRAMA_ACTIVIDAD',
    fields: [{"name":"ID_PROGRAMA_ACTIVIDAD","type":"int","useNull":true},{"name":"ID_PROGRAMA_ANUAL","type":"int"},{"name":"NOMBRE_PROGRAMA_ACTIVIDAD","type":"string"}],
    validations: [{"field":"ID_PROGRAMA_ANUAL","type":"length","max":"11"},{"field":"NOMBRE_PROGRAMA_ACTIVIDAD","type":"length","max":"200"}]
});
