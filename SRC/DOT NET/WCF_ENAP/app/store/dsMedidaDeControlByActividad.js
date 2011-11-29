Ext.define('WCF_ENAP.store.dsMedidaDeControlByActividad', {
    extend: 'WCF_ENAP.store.dsMedidaDeControl',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsMedidaDeControlByActividad',
            pageSize: 200
        }, cfg)]);
    }
});