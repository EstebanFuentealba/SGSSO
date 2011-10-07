Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsValoracionConsecuencia"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ValoracionConsecuencia', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
