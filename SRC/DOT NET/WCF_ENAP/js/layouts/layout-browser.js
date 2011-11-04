Ext.Loader.setConfig({ enabled: true });

Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.container.Viewport',
    'Ext.layout.*',
	'Ext.layout.container.Column',
	'Ext.window.MessageBox',
	'Ext.fx.target.Element',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.tree.*',
    'Ext.selection.*',
    'Ext.tab.Panel',
    'Ext.ux.layout.Center'
]);

//
// This is the main layout definition.
//
Ext.onReady(function () {

    Ext.tip.QuickTipManager.init();

    // This is an inner body element within the Details panel created to provide a "slide in" effect
    // on the panel body without affecting the body's box itself.  This element is created on
    // initial use and cached in this var for subsequent access.
    var detailEl;

    // Gets all layouts examples

    var contentPanel = {
        id: 'content-panel',
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
    };
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
        { name: 'iswin', type: 'bool' },
        { name: 'id', type: 'string', mapping: 'ID_COMPONENTE' }
    ]
    });
    var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        model: 'Node',
        proxy: {
            type: 'ajax',
            /*url: '/js/tree-data.json'*/
            url: '/TreeData/'
        }
    });

    // Go ahead and create the TreePanel now so that we can use it below
    var treePanel = Ext.create('Ext.tree.Panel', {
        id: 'tree-panel',
        title: 'Menu',
        region: 'north',
        split: true,
        height: 360,
        minSize: 150,
        rootVisible: false,
        autoScroll: true,
        store: store
    });
    var panelsArray = [];

    // Assign the changeLayout function to be called on tree node click.
    treePanel.getSelectionModel().on('select', function (selModel, record) {
        console.log();
        switch (record.get('TIPO_NODO')) {
            case 1:
                /*Modulo*/
                break;
            case 2:
                /*Componente*/
                /*Panel  Window*/
                var id = record.get('id');

                console.log(record);
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
                    if (!Ext.Array.contains(panelsArray, id)) {
                        Ext.application({
                            name: 'WCF_ENAP',
                            stores: record.get('stores'),
                            launch: function () {

                                Ext.getCmp('content-panel').setLoading(true);
                                Ext.QuickTips.init();
                                var cmp = Ext.create('WCF_ENAP.view.' + id, {});
                                panelsArray.push(id);
                                if (record.get('TIPO_DISPLAY') == 1) {
                                    Ext.getCmp('content-panel').add(cmp);
                                    Ext.getCmp('content-panel').layout.setActiveItem('panel-' + id);
                                } else if (record.get('TIPO_DISPLAY') == 2) {
                                    Ext.getCmp('content-panel').add(cmp);
                                }
                                Ext.getCmp('content-panel').setLoading(false);
                                cmp.show();
                            }
                        });
                    } else {
                        Ext.getCmp('content-panel').layout.setActiveItem('panel-' + id);
                        Ext.getCmp('panel-' + id).show();
                    }
                }

                break;
            case 3:
                break;
        }
        /*
        if (record.get('leaf')) {
        //console.log(record.raw.stores);
        if (!Ext.Array.contains(panelsArray, record.getId())) {
        Ext.application({
        name: 'WCF_ENAP',
        stores: record.raw.stores,
        launch: function () {
        Ext.getCmp('content-panel').setLoading(true);
        Ext.QuickTips.init();
        var cmp = Ext.create('WCF_ENAP.view.' + record.getId(), {});

        if (record.raw.iswin != true) {
        panelsArray.push(record.getId());
        Ext.getCmp('content-panel').add(cmp);
        Ext.getCmp('content-panel').layout.setActiveItem('panel-' + record.getId());

        } else {
        treePanel.getSelectionModel().deselectAll();
        }
        Ext.getCmp('content-panel').setLoading(false);
        cmp.show();
        }
        });
        } else {

        Ext.getCmp('content-panel').layout.setActiveItem('panel-' + record.getId());
        Ext.getCmp('panel-' + record.getId()).show();
        console.log("EXISTE");
        }

        } else {
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
        }*/
    });

    // This is the Details panel that contains the description for each example layout.
    var detailsPanel = {
        id: 'details-panel',
        title: 'Descripción',
        region: 'center',
        bodyStyle: 'padding-bottom:15px;background:#eee;',
        autoScroll: true,
        html: '<p class="details-info">Descripción del módulo seleccionado.</p>'
    };

    // Finally, build the main layout once all the pieces are ready.  This is also a good
    // example of putting together a full-screen BorderLayout within a Viewport.
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
            items: [treePanel, detailsPanel]

        },
            contentPanel
        ],
        renderTo: Ext.getBody()
    });
});

