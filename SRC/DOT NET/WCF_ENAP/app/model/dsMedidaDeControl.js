Ext.define('WCF_ENAP.model.MedidaDeControl', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MEDIDAS_DE_CONTROL',
    fields: [{"name":"ID_MEDIDAS_DE_CONTROL","type":"int","useNull":true},{"name":"NOM_MEDIDA_DE_CONTROL","type":"string"}],
    validations: [{"field":"NOM_MEDIDA_DE_CONTROL","type":"length","max":"100"}]
});
