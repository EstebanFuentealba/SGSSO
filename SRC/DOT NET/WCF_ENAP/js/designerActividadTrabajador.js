Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsActividadTrabajador"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ActividadTrabajador', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
