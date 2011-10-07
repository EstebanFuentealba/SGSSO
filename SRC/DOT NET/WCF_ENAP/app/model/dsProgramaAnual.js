Ext.define('WCF_ENAP.model.ProgramaAnual', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PROGRAMA_ANUAL',
    fields: [{"name":"ID_PROGRAMA_ANUAL","type":"int","useNull":true},{"name":"OBJETIVO","type":"string"},{"name":"META","type":"string"},{"name":"FECHA_CREACION","type":"date"}],
    validations: []
});
