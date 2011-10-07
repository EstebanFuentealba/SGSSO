Ext.define('WCF_ENAP.model.ActividadGeneral', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_GENERAL',
    fields: [{"name":"ID_ACTIVIDAD_GENERAL","type":"int","useNull":true},{"name":"NOM_ACTIVIDAD_GENERAL","type":"string"}],
    validations: [{"field":"NOM_ACTIVIDAD_GENERAL","type":"length","max":"100"}]
});
