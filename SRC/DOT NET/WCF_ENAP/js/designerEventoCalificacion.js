Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsEventoCalificacion","dsCalificacion","dsEvento"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.EventoCalificacion', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
