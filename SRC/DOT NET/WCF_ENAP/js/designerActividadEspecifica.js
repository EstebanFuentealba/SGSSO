Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsActividadEspecifica","dsActividadGeneral","dsRol","dsCondicion"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ActividadEspecifica', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
