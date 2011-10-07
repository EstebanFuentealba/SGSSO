Ext.define('WCF_ENAP.model.EventoEmpresa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_EVENTO_EMPRESA',
    fields: [{"name":"ID_EVENTO_EMPRESA","type":"int","useNull":true},{"name":"ID_EVENTO","type":"int"},{"name":"ID_EMPRESA","type":"int"},{"name":"DESCRIPCION","type":"string"}],
    validations: [{"field":"ID_EVENTO","type":"length","max":"11"},{"field":"ID_EMPRESA","type":"length","max":"11"}]
});
