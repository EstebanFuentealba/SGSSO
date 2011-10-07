Ext.define('WCF_ENAP.model.ActividadTrabajador', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_ACTIVIDAD_TRABAJADOR',
    fields: [{"name":"ID_ACTIVIDAD_TRABAJADOR","type":"int","useNull":true},{"name":"NOMBRE_ACTIVIDAD_TRABAJADOR","type":"string"}],
    validations: [{"field":"NOMBRE_ACTIVIDAD_TRABAJADOR","type":"length","max":"200"}]
});
