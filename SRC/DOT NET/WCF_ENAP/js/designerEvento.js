Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsEvento","dsEmpresa","dsDepartamento"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Evento', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
