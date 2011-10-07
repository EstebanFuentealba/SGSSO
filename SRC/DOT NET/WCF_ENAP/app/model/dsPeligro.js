Ext.define('WCF_ENAP.model.Peligro', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO',
    fields: [{"name":"ID_PELIGRO","type":"int","useNull":true},{"name":"NOM_PELIGRO","type":"string"}],
    validations: [{"field":"NOM_PELIGRO","type":"length","max":"100"}]
});
