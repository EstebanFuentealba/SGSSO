Ext.define('WCF_ENAP.model.PeligroMedida', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO_MEDIDA',
    fields: [{"name":"ID_PELIGRO_MEDIDA","type":"int","useNull":true},{"name":"ID_PELIGRO_DETALLE","type":"int"},{"name":"ID_MEDIDAS_DE_CONTROL","type":"int"}],
    validations: [{"field":"ID_PELIGRO_DETALLE","type":"length","max":"11"},{"field":"ID_MEDIDAS_DE_CONTROL","type":"length","max":"11"}]
});
