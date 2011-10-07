Ext.define('WCF_ENAP.model.ValoracionProbabilidad', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_VALORACION_PROBABILIDAD',
    fields: [{"name":"ID_VALORACION_PROBABILIDAD","type":"int","useNull":true},{"name":"NOM_PROBABILIDAD","type":"string"}],
    validations: [{"field":"NOM_PROBABILIDAD","type":"length","max":"100"}]
});
