Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsPeligro","dsConsecuencias"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Peligro', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
