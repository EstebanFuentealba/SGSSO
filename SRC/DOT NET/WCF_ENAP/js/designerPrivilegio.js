Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsPrivilegio"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Privilegio', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
