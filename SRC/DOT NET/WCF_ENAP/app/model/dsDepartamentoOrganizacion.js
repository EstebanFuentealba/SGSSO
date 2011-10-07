Ext.define('WCF_ENAP.model.DepartamentoOrganizacion', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_DEPARTAMENTO_ORGANIZACION',
    fields: [{"name":"ID_DEPARTAMENTO_ORGANIZACION","type":"int","useNull":true},{"name":"ID_ORGANIZACION","type":"int"},{"name":"ID_DEPARTAMENTO","type":"int"}],
    validations: [{"field":"ID_ORGANIZACION","type":"presence","max":"11"},{"field":"ID_DEPARTAMENTO","type":"presence","max":"11"}]
});
