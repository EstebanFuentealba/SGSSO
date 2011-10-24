Ext.define('WCF_ENAP.view.ui.Login', {
    extend: 'Ext.window.Window',
    modal: true,
    height: 185,
    width: 400,
    title: 'Login',
    closeAction: 'hide',
    initComponent: function () {
        var me = this;
        me.items = [
                    {
                        xtype: 'form',
                        margin: '5 5 5 5',
                        bodyPadding: 10,
                        title: 'Ingrasa tus credenciales',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'USERNAME',
                                fieldLabel: 'Usuario',
                                anchor: '100%'
                            },
                            {
                                xtype: 'textfield',
                                name: 'PASSWORD',
                                inputType: 'password',
                                fieldLabel: 'Contraseña',
                                anchor: '100%'
                            }
                        ],
                        buttons: [{
                            text: 'Login',
                            handler: function () {
                                var me = this;
                                me.up("window").setLoading(true);
                                var form = me.up("form").getForm();

                                Ext.Ajax.request({
                                    url: '/LoginUser/',
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    jsonData: form.getValues(),
                                    success: function (response) {
                                        var o = Ext.JSON.decode(response.responseText);
                                        if (o.success) {
                                            window.location = "/";
                                        } else {
                                            me.up("window").setLoading(false);
                                            Ext.Msg.alert('Datos Incorrectos', 'Usuario o Contraseña Incorrectos.');

                                        }

                                    }
                                });
                            }
                        }]
                    }
                ];
        me.callParent(arguments);
    }
});