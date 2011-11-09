Ext.define('WCF_ENAP.view.ui.EventoList', {
    extend: 'Ext.panel.Panel',
    height: 600,
    layout: {
        type: 'anchor'
    },
    title: 'Incidentes Ocurridos',
    autoScroll: true,
    id: 'panel-EventoList',
    contextMenuYear: null,
    initComponent: function () {
             var me = this,
            lastMarker = null;

        var me = this,
            lastMarker = null,
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();


        for (var yInicio = (yearNow); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        }

        Ext.data.StoreManager.lookup('dsEvento').on('write', function (store, operation, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                try {
                    var nuevo_marker = fnCreateMarkerFromRecord(record);
                    Ext.getCmp('gmapid').addSingleMarker(nuevo_marker);
                } catch (e) { }
            }
        });
        me.contextMenuYear = Ext.create('Ext.menu.Menu', {
            items: [
		        {
		            xtype: 'combobox',
		            store: Ext.create('Ext.data.ArrayStore', {
		                fields: ['ANO'],
		                data: yearsList
		            }),
		            margin: '0 0 0 5',
		            fieldLabel: 'Año',
		            height: 50,
		            valueField: 'ANO',
		            displayField: 'ANO',
		            name: 'ANO_INICIO',
		            listeners: {
		                change: function ( field, newValue, oldValue, eOpts ) {
		                    console.log("INICIO");
		                    Ext.getCmp('pnl_graph_incidentes_mes').setLoading(true);
		                    Ext.data.StoreManager.lookup('dsGraphEventosOrganizacion').load({
		                        params: {
		                            'ANO': newValue
		                        },
		                        callback: function (records, operation, success) {
		                            Ext.getCmp('pnl_graph_incidentes_mes').setLoading(false);
		                        }
		                    });
		                    Ext.data.StoreManager.lookup('dsEvento').load({
		                        params: {
		                            'ANO': newValue
		                        },
		                        callback: function (records, operation, success) {
		                        }
		                    });
		                    this.up('menu').hide();
		                }
		            }
		        }
	        ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    title: 'Gráfico de Incidentes por Mes',
                    id: 'pnl_graph_incidentes_mes',
                    collapsible: true,
                    margin: '5 5 5 5',
                    layout: {
                        type: 'fit'
                    },
                    border: 0,
                    tools: [{
                        type: 'gear',
                        handler: function (e, target, panelHeader, tool) {
                            me.contextMenuYear.showAt(e.getXY());
                        }
                    }],
                    items: [
                        {
                            xtype: 'chart',
                            store: 'dsGraphEventosOrganizacion',
                            height: 150,
                            width: 500,
                            margin: '5 0 0 0',
                            animate: true,
                            axes: [
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'COUNT_EVENTOS'
                                    ],
                                    minorTickSteps: 1,
                                    minimum: 0,
                                    position: 'left',
                                    title: 'Incidentes'
                                },
                                {
                                    type: 'Category',
                                    fields: [
                                        'MES_NAME'
                                    ],
                                    position: 'bottom',
                                    title: 'Meses',
                                    label: {
                                        font: '9px Arial'
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    highlight: {
                                        size: 7,
                                        radius: 7
                                    },
                                    fill: true,
                                    axis: 'left',
                                    xField: 'MES_NAME',
                                    yField: 'COUNT_EVENTOS',
                                    markerConfig: {
                                        type: 'cross',
                                        size: 4,
                                        radius: 4,
                                        'stroke-width': 0
                                    },
                                    tips: {
                                        trackMouse: true,
                                        width: 110,
                                        renderer: function (storeItem, item) {
                                            this.setTitle(storeItem.get('COUNT_EVENTOS') + ' Incidentes en ' + storeItem.get('MES_NAME'));
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: 0,
                    height: 556,
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 500,
                            store: 'dsEvento',
                            margin: '0 5 5 5',
                            title: 'Listado de Incidentes Reportados',
                            id: 'grid_eventos_list',
                            columnWidth: 0.5,
                            listeners: {
                                selectionchange: function (model, records) {
                                    var rec,
                                        gmp,
                                        cmp;
                                    if (records[0]) {
                                        rec = records[0];
                                        cmp = Ext.getCmp('gmapid');
                                        var idEvento = rec.get('ID_EVENTO');
                                        gmp = cmp.getMap();
                                        cmp.hideMarkers();
                                        var marker = cmp.getMarkerById(idEvento);
                                        if (marker) {
                                            if (marker.getPosition().lat() != 0 && marker.getPosition().lng() != 0) {
                                                if (lastMarker != null) {
                                                    if (lastMarker.circleRadio.dragMarker != null) {
                                                        lastMarker.circleRadio.dragMarker.setMap(null);
                                                        lastMarker.circleRadio.dragMarker = null;
                                                    }
                                                    if (lastMarker.circleRadio.circle != null) {
                                                        lastMarker.circleRadio.circle.setMap(null);
                                                        lastMarker.circleRadio.circle = null;
                                                    }
                                                }
                                                gmp.panTo(marker.getPosition());
                                                var circleRadio = cmp.addCircleMarker({
                                                    marker: marker,
                                                    store: 'dsSearchMarker',
                                                    listeners: {
                                                        dragEnd: function (point, radio, store) {

                                                            var search = Ext.data.StoreManager.lookup('dsSearchMarker');
                                                            search.load({
                                                                params: {
                                                                    'LAT': point.lat(),
                                                                    'LNG': point.lng(),
                                                                    'RADIO': radio
                                                                },
                                                                callback: function (records, operation, success) {
                                                                    cmp.hideMarkers();
                                                                    /* Remover el record que es igual al marker */
                                                                    cmp.recoresToMarkers(records, true);
                                                                }
                                                            });
                                                        },
                                                        load: function (store, records, successful, operation, eOpts) {
                                                            console.log("CARGO LA WEA ");
                                                            console.log(records);
                                                        }
                                                    }
                                                });
                                                marker.circleRadio = circleRadio;
                                                lastMarker = marker;
                                            } else {
                                                if (lastMarker != null) {

                                                    if (lastMarker.circleRadio.dragMarker != null) {
                                                        lastMarker.circleRadio.dragMarker.setMap(null);
                                                        lastMarker.circleRadio.dragMarker = null;
                                                    }
                                                    if (lastMarker.circleRadio.circle != null) {
                                                        lastMarker.circleRadio.circle.setMap(null);
                                                        lastMarker.circleRadio.circle = null;
                                                    }
                                                    lastMarker.setMap(null);
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            tools: [{
                                type: 'gear',
                                handler: function (e, target, panelHeader, tool) {
                                    me.contextMenuYear.showAt(e.getXY());
                                }
                            }],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_EVENTO',
                                    text: 'ID',
                                    flex: 0.05
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_DEPARTAMENTO',
                                    text: 'Departamento',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'FECHA_HORA_EVENTO',
                                    text: 'Fecha',
                                    flex: 0.2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'HORA_EVENTO',
                                    text: 'Hora',
                                    flex: 0.1

                                },
                                {
                                    xtype: 'gridcolumn', text: 'T',
                                    flex: 0.05,
                                    dataIndex: 'COUNT_TRABAJADORES',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        return '<b>' + value + '</b> <img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="  class="x-tree-icon x-tree-icon-parent grupo-icon">'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn', text: 'I',
                                    flex: 0.05,
                                    dataIndex: 'COUNT_IPRELIMINAR',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        return '<b>' + value + '</b> <img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tree-icon x-tree-icon-parent informe-icon">'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn', text: 'S',
                                    flex: 0.05
                                }
                            ],
                            viewConfig: {

                        },
                        dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Agregar Nuevo',
                                            handler: function () {
                                                Ext.getCmp('pnl_gmap').hide();
                                                Ext.application({
                                                    name: 'WCF_ENAP',
                                                    stores:
                                                            [
                                                                'dsOrganizacion',
                                                                'dsDepartamento',
                                                                'dsDivision',
                                                                'dsArea',
                                                                'dsEvento'
                                                            ],
                                                    launch: function () {
                                                        Ext.QuickTips.init();
                                                        var addEvento = Ext.create('WCF_ENAP.view.ui.NuevoEvento', {
                                                            cmpPadre: me
                                                        });
                                                        addEvento.show();
                                                        addEvento.on('destroy', function () {
                                                            Ext.getCmp('pnl_gmap').show();
                                                        });
                                                    }
                                                });

                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Agregar datos Trabajador',
                                            handler: function () {
                                                var me = this;
                                                Ext.getCmp('pnl_gmap').hide();
                                                Ext.application({
                                                    name: 'WCF_ENAP',
                                                    stores:
                                                            [
                                                                'dsTrabajador',
                                                                'dsCargo',
                                                                'dsAccion',
                                                                'dsAccionCorrectiva'
                                                            ],
                                                    launch: function () {
                                                        Ext.QuickTips.init();
                                                        var addEvento = Ext.create('WCF_ENAP.view.ui.DatosTrabajador', {
                                                            cmpPadre: me
                                                        });
                                                        addEvento.show();
                                                        addEvento.on('destroy', function () {
                                                            Ext.getCmp('pnl_gmap').show();
                                                        });
                                                    }
                                                });

                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Agregar datos PATRIMONIO / PROCESOS / MEDIO AMBIENTE',
                                            handler: function () {
                                                var me = this;
                                                Ext.getCmp('pnl_gmap').hide();
                                                Ext.application({
                                                    name: 'WCF_ENAP',
                                                    stores:
                                                            [

                                                                'dsTrabajador',
                                                                'dsPeligro',
                                                                'dsCausa',
                                                                'dsCargo',
                                                                'dsAccion',
                                                                'dsAccionCorrectiva'
                                                            ],
                                                    launch: function () {
                                                        Ext.QuickTips.init();
                                                        var addEvento = Ext.create('WCF_ENAP.view.ui.DatosTipoIncidente', {
                                                            cmpPadre: me
                                                        });
                                                        addEvento.show();
                                                        addEvento.on('destroy', function () {
                                                            Ext.getCmp('pnl_gmap').show();
                                                        });
                                                    }
                                                });

                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'pagingtoolbar',
                                    store: 'dsEvento',
                                    id: 'grid_pagintoolbar_eventos_list',
                                    displayInfo: true,
                                    dock: 'bottom',
                                    listeners: {
                                        beforechange: function (paging, page, eOpts) {
                                            if (lastMarker != null) {

                                                if (lastMarker.circleRadio.dragMarker != null) {
                                                    lastMarker.circleRadio.dragMarker.setMap(null);
                                                    lastMarker.circleRadio.dragMarker = null;
                                                }
                                                if (lastMarker.circleRadio.circle != null) {
                                                    lastMarker.circleRadio.circle.setMap(null);
                                                    lastMarker.circleRadio.circle = null;
                                                }
                                                lastMarker.setMap(null);
                                            }
                                        }
                                    }
                                }
                            ]
                    },
                        {
                            xtype: 'panel',
                            height: 500,
                            id: 'pnl_gmap',
                            margin: '0 5 5 5',
                            title: 'Geo Localización de Incidentes',
                            columnWidth: 0.5,
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                Ext.create('Ext.ux.GMapPanel', {
                                    id: 'gmapid',
                                    zoomLevel: 14,
                                    gmapType: 'map',
                                    store: 'dsEvento',
                                    mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
                                    mapControls: ['GSmallMapControl', 'GMapTypeControl'],
                                    setCenter: {
                                        lat: -36.779860,
                                        lng: -73.125072
                                    }
                                })
                            ],
                            dockedItems: [{
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [{
                                    xtype: 'button',
                                    text: 'Mostrar Todos',
                                    handler: function () {
                                        Ext.getCmp('grid_pagintoolbar_eventos_list').doRefresh();
                                        Ext.getCmp('grid_eventos_list').getSelectionModel().deselectAll();
                                    }
                                }]
                            }]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);

    },
    afterRender: function () {
        this.contextMenuYear.getComponent(0).select((new Date()).getFullYear());
        this.contextMenuYear.getComponent(0).checkChange();
    }
});