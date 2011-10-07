Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsValoracionProbabilidad"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ValoracionProbabilidad', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
