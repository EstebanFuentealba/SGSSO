Ext.define('WCF_ENAP.model.Trabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TRABAJADOR',
    fields: [{"name":"RUT_TRABAJADOR","type":"string"},{"name":"NOMBRES","type":"string"},{"name":"APELLIDO_MATERNO","type":"string"},{"name":"APELLIDO_PATERNO","type":"string"},{"name":"TELEFONO","type":"string"},{"name":"ANOS_EXPERIENCIA","type":"int"},{"name":"ID_TRABAJADOR","type":"int","useNull":true},{"name":"ID_CARGO","type":"int"}],
    validations: [{"field":"RUT_TRABAJADOR","type":"presence","max":"12"},{"field":"NOMBRES","type":"length","max":"200"},{"field":"APELLIDO_MATERNO","type":"length","max":"200"},{"field":"APELLIDO_PATERNO","type":"length","max":"200"},{"field":"TELEFONO","type":"length","max":"20"},{"field":"ANOS_EXPERIENCIA","type":"length","max":"11"},{"field":"ID_CARGO","type":"length","max":"11"}]
});
