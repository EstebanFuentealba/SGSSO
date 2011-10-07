Ext.define('WCF_ENAP.model.ActividadEspecifica', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_ESPECIFICA',
    fields: [{"name":"ID_ACTIVIDAD_ESPECIFICA","type":"int","useNull":true},{"name":"NOM_ACTIVIDAD_ESPECIFICA","type":"string"}],
    validations: [{"field":"NOM_ACTIVIDAD_ESPECIFICA","type":"length","max":"100"}]
});
