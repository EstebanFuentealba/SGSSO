Ext.define('WCF_ENAP.model.PuntoGeografico', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PUNTO_GEOGRAFICA',
    fields: [{"name":"ID_PUNTO_GEOGRAFICA","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int"},{"name":"LAT_PUNTO","type":"float"},{"name":"LNG_PUNTO","type":"float"}],
    validations: [{"field":"ID_DEPARTAMENTO_ORGANIZACION","type":"presence","max":"11"}]
});
