Ext.define('WCF_ENAP.model.Frecuencia', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_FRECUENCIA',
    fields: [
        { "name": "ID_FRECUENCIA", "type": "int", "useNull": true },
        { "name": "NOMBRE_FRECUENCIA", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsFrecuencia', {
    extend: 'Ext.data.ArrayStore',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'dsFrecuencia',
            model: 'WCF_ENAP.model.Frecuencia',
            data: [
                [
                    1,
                    "Diario"
                ],
                [
                    2,
                    "Semanal"
                ],
                [
                    3,
                    "Mensual"
                ],
                [
                    4,
                    "Anual"
                ],
                [
                    5,
                    "Semestral"
                ]
            ]
        }, cfg)]);
    }
});