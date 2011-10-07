Ext.define('WCF_ENAP.model.Imagenes', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_IMAGEN',
    fields: [{"name":"ID_IMAGEN","type":"int"},{"name":"ID_EVENTO","type":"int"},{"name":"NOMBRE_IMAGEN","type":"string"},{"name":"IMAGEN","type":"string"}],
    validations: [{"field":"ID_IMAGEN","type":"length","max":"11"},{"field":"ID_EVENTO","type":"length","max":"11"},{"field":"NOMBRE_IMAGEN","type":"length","max":"100"}]
});
