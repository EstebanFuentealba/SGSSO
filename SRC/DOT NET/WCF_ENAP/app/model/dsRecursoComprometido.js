Ext.define('WCF_ENAP.model.RecursoComprometido', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_RECURSO_COMPROMETIDO',
    fields: [{"name":"ID_RECURSO_COMPROMETIDO","type":"int","useNull":true},{"name":"NOMBRE_RECURSO","type":"string"},{"name":"DESCRIPCION","type":"string"}],
    validations: [{"field":"NOMBRE_RECURSO","type":"length","max":"150"}]
});
