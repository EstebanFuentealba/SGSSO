Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsRegistro","dsDivision","dsArea","dsActividadEspecifica"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Registro', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
