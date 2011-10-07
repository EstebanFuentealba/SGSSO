Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsPeligroMedida","dsPeligroDetalle","dsMedidasDeControl"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.PeligroMedida', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
