Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsActividadGeneral"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ActividadGeneral', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
