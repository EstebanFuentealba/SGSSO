Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsActividadResponsable","dsSubActividad","dsCargo"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ActividadResponsable', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
