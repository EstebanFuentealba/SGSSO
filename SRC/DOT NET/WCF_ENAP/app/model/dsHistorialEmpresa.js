Ext.define('WCF_ENAP.model.HistorialEmpresa', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_HISTORIAL',
    fields: [{"name":"ID_HISTORIAL","type":"int","useNull":true},{"name":"ID_EMPRESA","type":"int"},{"name":"FECHA_CREACION","type":"date"},{"name":"N_TRABAJADORES","type":"int"},{"name":"H_TRABAJADAS","type":"int"},{"name":"H_SOBRETIEMPO","type":"int"}],
    validations: [{"field":"ID_EMPRESA","type":"length","max":"11"},{"field":"N_TRABAJADORES","type":"length","max":"11"},{"field":"H_TRABAJADAS","type":"length","max":"11"},{"field":"H_SOBRETIEMPO","type":"length","max":"11"}]
});
