Ext.define('WCF_ENAP.model.AccionCorrectiva', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACCION_CORRECTIVA',
    fields: [{"name":"ID_ACCION_CORRECTIVA","type":"int","useNull":true},{"name":"ID_USUARIO","type":"int"},{"name":"ID_INFORME","type":"int"},{"name":"ID_ACCION","type":"int"},{"name":"FECHA_PLAZO","type":"date"},{"name":"FECHA_REALIZACION","type":"date"},{"name":"PORCENTAJE_CUMPLIMIENTO","type":"int"},{"name":"DESCRIPCION","type":"string"},{"name":"FECHA_CREACION","type":"date"}],
    validations: [{"field":"ID_USUARIO","type":"length","max":"11"},{"field":"ID_INFORME","type":"presence","max":"11"},{"field":"ID_ACCION","type":"length","max":"11"},{"field":"PORCENTAJE_CUMPLIMIENTO","type":"length","max":"11"}]
});
