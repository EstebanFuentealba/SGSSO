Ext.define('WCF_ENAP.model.ActividadResponsable', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_RESPONSABLE',
    fields: [{"name":"ID_ACTIVIDAD_RESPONSABLE","type":"int","useNull":true},{"name":"ID_SUB_ACTIVIDAD","type":"int"},{"name":"ID_CARGO","type":"int"}],
    validations: [{"field":"ID_SUB_ACTIVIDAD","type":"length","max":"11"},{"field":"ID_CARGO","type":"length","max":"11"}]
});
