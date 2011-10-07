Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    name: 'WCF_ENAP',

    stores: ["dsUsuario","dsEmpresa"],

    launch: function() {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.Usuario', {
            renderTo: Ext.getBody()
        });
        
        cmp1.show();
    }
});
