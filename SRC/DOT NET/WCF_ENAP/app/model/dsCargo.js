Ext.define('WCF_ENAP.model.Cargo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_CARGO',
    fields: [{"name":"ID_CARGO","type":"int","useNull":true},{"name":"NOMBRE_CARGO","type":"string"}],
    validations: [{"field":"NOMBRE_CARGO","type":"length","max":"200"}]
});
