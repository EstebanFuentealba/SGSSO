Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsAccionCorrectiva","dsEvento","dsAccion","dsUsuario"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.AccionCorrectiva', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
