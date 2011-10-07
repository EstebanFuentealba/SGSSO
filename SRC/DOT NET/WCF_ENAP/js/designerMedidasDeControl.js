Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsMedidasDeControl"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.MedidasDeControl', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
