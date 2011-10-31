Ext.define('WCF_ENAP.model.Meses', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_MES',
    fields: [
        { "name": "ID_MES", "type": "int", "useNull": true },
        { "name": "NOMBRE_MES", "type": "string" }
    ]
});
Ext.define('WCF_ENAP.store.dsMeses', {
    extend: 'Ext.data.Store',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'dsMeses',
            model: 'WCF_ENAP.model.Meses',
            data: [
                { NOMBRE_MES: 'Enero', ID_MES: 1 },
		        { NOMBRE_MES: 'Febrero', ID_MES: 2 },
		        { NOMBRE_MES: 'Marzo', ID_MES: 3 },
		        { NOMBRE_MES: 'Abril', ID_MES: 4 },
		        { NOMBRE_MES: 'Mayo', ID_MES: 5 },
		        { NOMBRE_MES: 'Junio', ID_MES: 6 },
		        { NOMBRE_MES: 'Julio', ID_MES: 7 },
		        { NOMBRE_MES: 'Agosto', ID_MES: 8 },
		        { NOMBRE_MES: 'Septiembre', ID_MES: 9 },
		        { NOMBRE_MES: 'Octubre', ID_MES: 10 },
		        { NOMBRE_MES: 'Noviembre', ID_MES: 11 },
		        { NOMBRE_MES: 'Diciembre', ID_MES: 12 }
	        ]
        }, cfg)]);
    }
});