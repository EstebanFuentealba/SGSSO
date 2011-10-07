Ext.define('WCF_ENAP.model.ValoracionConsecuencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_VALORACION_CONSECUENCIA',
    fields: [{"name":"ID_VALORACION_CONSECUENCIA","type":"int","useNull":true},{"name":"NOM_CONSECUENCIA","type":"string"}],
    validations: [{"field":"NOM_CONSECUENCIA","type":"length","max":"100"}]
});
