Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsTrabajador","dsCargo"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Trabajador', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
