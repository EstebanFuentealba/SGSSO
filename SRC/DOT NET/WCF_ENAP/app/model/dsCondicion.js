Ext.define('WCF_ENAP.model.Condicion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CONDICION',
    fields: [{"name":"ID_CONDICION","type":"int","useNull":true},{"name":"NOM_CONDICION","type":"string"}],
    validations: [{"field":"NOM_CONDICION","type":"length","max":"100"}]
});
