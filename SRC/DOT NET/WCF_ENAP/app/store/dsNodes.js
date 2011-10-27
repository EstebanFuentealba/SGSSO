Ext.define('WCF_ENAP.store.dsNodes', {
    extend: 'Ext.data.TreeStore',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoSync: false,
            proxy: {
                type: 'ajax',
                url: '/Nodo/nodes'
            },
            root: {
                expanded: true
            }
        }, cfg)]);
    }
});