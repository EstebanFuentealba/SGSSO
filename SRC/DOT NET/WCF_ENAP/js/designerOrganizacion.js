Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsOrganizacion"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Organizacion', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
