Ext.define('WCF_ENAP.model.Matriz', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MATRIZ',
    fields: [{"name":"ID_MATRIZ","type":"int","useNull":true},{"name":"ID_USUARIO","type":"int"},{"name":"FECHA_CREACION","type":"date"}],
    validations: [{"field":"ID_USUARIO","type":"length","max":"11"}]
});
