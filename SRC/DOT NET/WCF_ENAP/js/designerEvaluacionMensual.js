Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsEvaluacionMensual","dsSubActividad"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.EvaluacionMensual', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
