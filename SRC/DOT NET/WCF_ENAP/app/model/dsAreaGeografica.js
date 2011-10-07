Ext.define('WCF_ENAP.model.AreaGeografica', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_AREA_GEOGRAFICA',
    fields: [{"name":"ID_AREA_GEOGRAFICA","type":"int","useNull":true},{"name":"ID_DEPARTAMENTO","type":"int"},{"name":"LAT_AREA","type":"float"},{"name":"LNG_AREA","type":"float"}],
    validations: [{"field":"ID_DEPARTAMENTO","type":"length","max":"11"}]
});
