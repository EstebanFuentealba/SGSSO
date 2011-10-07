Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsSubActividad","dsProgramaActividad","dsEvidencia"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.SubActividad', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
