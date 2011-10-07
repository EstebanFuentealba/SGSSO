Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsDivision"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Division', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
