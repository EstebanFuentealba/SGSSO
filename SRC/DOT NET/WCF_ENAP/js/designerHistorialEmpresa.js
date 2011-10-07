Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsHistorialEmpresa","dsEmpresa"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.HistorialEmpresa', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
