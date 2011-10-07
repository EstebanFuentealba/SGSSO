Ext.define('WCF_ENAP.model.Rol', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ROL',
    fields: [{"name":"ID_ROL","type":"int","useNull":true},{"name":"NOM_ROL","type":"string"}],
    validations: [{"field":"NOM_ROL","type":"length","max":"150"}]
});
