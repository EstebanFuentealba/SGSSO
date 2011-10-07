Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsProgramaActividad","dsProgramaAnual"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.ProgramaActividad', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
    }
});
