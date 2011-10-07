Ext.define('WCF_ENAP.model.PeligroMedida', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PELIGRO_MEDIDA',
    fields: [
        { "name": "ID_PELIGRO_MEDIDA", "type": "int" },
        { "name": "ID_MATRIZ_RIESGO", "type": "int" },
        { "name": "ID_MEDIDAS_DE_CONTROL", "type": "int" }
    ],
    validations: [
        { "field": "ID_PELIGRO_MEDIDA", "type": "length", "max": "11" },
        { "field": "ID_MATRIZ_RIESGO", "type": "length", "max": "11" },
        { "field": "ID_MEDIDAS_DE_CONTROL", "type": "length", "max": "11" }
    ]
});
Ext.define('WCF_ENAP.store.dsPeligroMedida', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsPeligroMedida',
            pageSize: 10,
            remoteSort: true,
            model: 'WCF_ENAP.model.PeligroMedida',
            proxy: {
                type: 'rest',
                url: '/PeligroMedida/',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount',
                    successProperty: 'success'
                }
            }
        }, cfg)]);
    }
});