Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', 'ux');

var storeTreeStore;
function findChildRecursively(node,attribute, value) {
    var childNodes = node.childNodes, length = childNodes.length,i, nodeReturn=null;
    for (i = 0; i < length; i++) {
        var n = childNodes[i];
        if(value == n.get(attribute)) {
            return (nodeReturn = n);
        }else {
            if(nodeReturn = findChildRecursively(n,attribute,value)){
                return nodeReturn;
            }
        }
    }
    return nodeReturn; 
}  
function showContent(id,stores) {
    var contentPanel = Ext.getCmp('content-panel');
    contentPanel.setLoading(true);
     Ext.defer(function () { 
        if (!contentPanel.getComponent('panel-' + id)) {
            Ext.application({
                name: 'WCF_ENAP',
                stores: stores,
                launch: function () {
                    Ext.QuickTips.init();
                    var cmp = Ext.create('WCF_ENAP.view.' + id, {
                        listeners: {
                            render: function () {
                                if (!(cmp.getXTypes().indexOf("/window") != -1)) {
                                    contentPanel.layout.setActiveItem('panel-' + id);
                                }
                            }
                        }
                    });
                    contentPanel.add(cmp);
                    cmp.show();
                }
            });
        } else {
            contentPanel.layout.setActiveItem('panel-' + id);
            Ext.getCmp('panel-' + id).show();
        }
        contentPanel.setLoading(false);
    },10, this); // Ext.defer 
}
Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();
    Ext.define('Node', {
        extend: 'Ext.data.Model',
        idProperty: 'ID_NODE',
        fields: [
        { "name": "ID_NODO", "type": "int", "useNull": true },
        { "name": "text", "type": "string", mapping: 'NOMBRE_MODULO' },
        { "name": "ID_COMPONENTE", "type": "string" },
        { "name": "iconCls", "type": "string", mapping: 'ICONCLS' },
        { "name": "TIPO_NODO", "type": "int" },
        { "name": "TIPO_DISPLAY", "type": "int" },
        { "name": "NODO_PADRE", "type": "int" },
        { "name": "N_ORDER", "type": "int" },
        { "name": 'stores', mapping: "STORE_LIST_TEXT" },
        { "name": 'iswin', type: 'bool' },
        { "name": 'id', type: 'string', mapping: 'ID_COMPONENTE' }
    ]
    });
    storeTreeStore = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            nodeType: 'async'
        },
        model: 'Node',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/TreeData/'
        }
    });


    Ext.create('Ext.Viewport', {
        layout: 'border',
        title: 'ENAP S.G.S.S.O.',
        id: 'viewPortPanel',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> ENAP S.G.S.S.O.</h1>',
            height: 30
        }, {
            layout: 'border',
            id: 'layout-browser',
            region: 'west',
            border: false,
            split: true,
            margins: '2 0 5 5',
            width: 275,
            minSize: 100,
            collapsible: true,
            title: 'Navegaci&oacute;n',
            defaults: {
                margin: '2 0 0 0'
            },
            items: [{
                xtype: 'treepanel',
                id: 'tree-panel',
                title: 'Menu',
                region: 'north',
                split: true,
                height: 360,
                minSize: 150,
                rootVisible: false,
                autoScroll: true,
                store: storeTreeStore,
                listeners: {
                    'load': function (store, records, successful, operation, eOpts) {
                        var hash = window.location.hash.substr(2).toString();
                        if (hash) {
                            var record = findChildRecursively(Ext.getCmp('tree-panel').getRootNode(), 'id', hash);
                            if (record) {
                                showContent(hash, record.get('stores'));
                            }
                        }
                    },
                    'select': function (selModel, record) {
                        switch (record.get('TIPO_NODO')) {
                            case 1:
                                /*Modulo*/
                                break;
                            case 2:
                                /*Componente*/
                                /*Panel  Window*/
                                var id = record.get('id');
                                if (record.get('TIPO_DISPLAY') == 3) {
                                    Ext.Ajax.request({
                                        url: '/LoginUser/',
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        success: function (response) {
                                            var o = Ext.JSON.decode(response.responseText);
                                            if (o.success) {
                                                window.location = "/";
                                            } else {
                                                Ext.Msg.alert('Error en Conexión', 'Ups, no se pudo conectar con el servidor.');
                                            }
                                        }
                                    });
                                } else {
                                    window.location.hash = '!' + id;
                                    showContent(id, record.get('stores'));
                                }

                                break;
                            case 3:
                                break;
                        }
                    }
                }
            },
            {
                id: 'details-panel',
                title: 'Descripción',
                region: 'center',
                bodyStyle: 'padding-bottom:15px;background:#eee;',
                autoScroll: true,
                html: '<p class="details-info">Descripción del módulo seleccionado.</p>'
            }]

        },
            {
                id: 'content-panel',
                stateId: 'content-panel',
                region: 'center', // this is what makes this panel into a region within the containing layout
                layout: 'card',
                margins: '2 5 5 0',
                border: 0,
                autoScroll: true,
                activeItem: 0,
                border: false,
                items: [{
                    id: 'start-panel',
                    title: 'Start Page',
                    layout: 'fit',
                    bodyStyle: 'padding:25px',
                    contentEl: 'start-div'  // pull existing content from the page
                }]
            }
        ],
        renderTo: Ext.getBody()
    });
});

