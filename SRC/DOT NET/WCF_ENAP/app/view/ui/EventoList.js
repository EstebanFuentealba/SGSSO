Ext.define('WCF_ENAP.view.ui.EventoList', {
    requires: [
        'Ext.ux.RowExpander'
    ],
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
		            iconCls: 'no-icon',
		            valueField: 'ANO',
		            displayField: 'ANO',
		            name: 'ANO_INICIO',
		            listeners: {
		                change: function (field, newValue, oldValue, eOpts) {
		                    var cmbCalificacion = this.next('combobox');
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
		                    var dsSearch = Ext.data.StoreManager.lookup('dsSearchMarker');
		                    dsSearch.setProxy(Ext.apply(dsSearch.getProxy(), {
		                        extraParams: {
		                            'ANO': newValue,
		                            'CALIFICACION': cmbCalificacion.getValue()
		                        }
		                    }))
		                }
		            }
		        },
                {
                    xtype: 'combobox',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['CALIFICACION','CALIFICACION_NOMBRE'],
                        data: [
                            [0,'Todos'],
                            [1,'Mayor'],
                            [2,'Serio'],
                            [3,'Relevante'],
                            [4,'Leve'],
                            [5, 'Sin Efecto'],
                            [6, 'Sin Información'],
                        ]
                    }),
                    margin: '0 0 0 5',
                    iconCls: 'no-icon',
                    valueField: 'CALIFICACION',
                    displayField: 'CALIFICACION_NOMBRE',
                    name: 'CALIFICACION',
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            var cmbAno = this.prev('combobox');
                            Ext.getCmp('pnl_graph_incidentes_mes').setLoading(true);
                            Ext.data.StoreManager.lookup('dsGraphEventosOrganizacion').load({
                                params: {
                                    'ANO': cmbAno.getValue(),
                                    'CALIFICACION': newValue
                                },
                                callback: function (records, operation, success) {
                                    Ext.getCmp('pnl_graph_incidentes_mes').setLoading(false);
                                }
                            });
                            Ext.data.StoreManager.lookup('dsEvento').load({
                                params: {
                                    'ANO': cmbAno.getValue(),
                                    'CALIFICACION': newValue
                                },
                                callback: function (records, operation, success) {
                                }
                            });
                            var dsSearch = Ext.data.StoreManager.lookup('dsSearchMarker');
                            dsSearch.setProxy(Ext.apply(dsSearch.getProxy(), {
                                extraParams: {
                                    'ANO': cmbAno.getValue(),
                                    'CALIFICACION': newValue
                                }
                            }))
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
                            plugins: [
                                {
                                    ptype: 'rowexpander',
                                    pluginId: 'rowexpander',
                                    rowBodyTpl: [
                                        '<div style="margin-left: 15px;"><div style="margin-left: 15px; float:left;">		<h3>Descripción:</h3><span style="margin-left: 15px;">{DESCRIPCION_GENERAL}</span><br /><br /></div></div><br />'
                                    ]
                                }
                            ],
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
                                                                    Ext.getCmp('grid_eventos_list').getStore().loadRecords(records);

                                                                }
                                                            });
                                                        },
                                                        load: function (store, records, successful, operation, eOpts) {
                                                            // console.log("CARGO LA WEA ");
                                                            // console.log(records);
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
                                    flex: 0.01
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_DEPARTAMENTO',
                                    text: 'Departamento',
                                    flex: 0.2
                                },
                                {
                                    //fecha en la cual ocurrio el incidente
                                    xtype: 'gridcolumn',
                                    dataIndex: 'FECHA_HORA_EVENTO',
                                    text: 'Fecha',
                                    flex: 0.1
                                },
                                {
                                    //hora en la que se ingreso el incidente al sisteme
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
                                    flex: 0.05,
                                    dataIndex: 'AVG_CALIFICACION',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        var markersIcons = ['red', 'orange', 'yellow', 'blue', 'green','white'],
                                        dataIcon;
                                        try {
                                            var calificacion = parseInt(value);
                                            if (calificacion > 0) {
                                                dataIcon = '/icons/mm_20_' + markersIcons[calificacion - 1] + '.png';
                                            } else {
                                                dataIcon = '/icons/mm_20_white.png';
                                            }
                                        } catch (e) {
                                            dataIcon = '/icons/mm_20_green.png';
                                        }
                                        return '<img src="' + dataIcon  + '" class="x-tree-icon">';
                                    }
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
                                            text: 'Información del Incidente',
                                            handler: function () {
                                                var record = Ext.getCmp('grid_eventos_list').getSelectionModel().getSelection()[0],
                                                    me = this;
                                                Ext.application({
                                                    name: 'WCF_ENAP',
                                                    stores:
                                                            [
                                                                'dsTrabajadorInvolucrado',
                                                                'dsCargo',
                                                                'dsPeligro',
                                                                'dsCausa',
                                                                'dsAccion',
                                                                'dsAccionCorrectiva'
                                                            ],
                                                    launch: function () {
                                                        Ext.QuickTips.init();
                                                        var addEvento = Ext.create('WCF_ENAP.view.ui.DatosTrabajador', {
                                                            cmpRecord: record
                                                        });
                                                        addEvento.show();
                                                        addEvento.on('destroy', function () {
                                                            Ext.getCmp('pnl_gmap').show();
                                                        });
                                                    }
                                                });

                                            }
                                        },
                                    /*{
                                    xtype: 'button',
                                    text: 'Afecta a PATRIMONIO',
                                    handler: function () {
                                    var record = Ext.getCmp('grid_eventos_list').getSelectionModel().getSelection()[0],
                                    me = this;
                                    Ext.application({
                                    name: 'WCF_ENAP',
                                    stores:
                                    [
                                    'dsCausa',
                                    'dsTrabajador',
                                    'dsPeligro',
                                    'dsCargo',
                                    'dsAccion',
                                    'dsAccionCorrectiva'
                                                                
                                    ],
                                    launch: function () {
                                    Ext.QuickTips.init();
                                    var addEvento = Ext.create('WCF_ENAP.view.ui.DatosTipoIncidente', {
                                    cmpRecord: record
                                    });
                                    addEvento.show();
                                    addEvento.on('destroy', function () {
                                    Ext.getCmp('pnl_gmap').show();
                                    });
                                    }
                                    });

                                    }
                                    },*/
                                        {
                                        xtype: 'button',
                                        text: 'Acciones Correctivas',
                                        handler: function () {
                                            var record = Ext.getCmp('grid_eventos_list').getSelectionModel().getSelection()[0],
                                                me = this;
                                            Ext.getCmp('pnl_gmap').hide();
                                            Ext.application({
                                                name: 'WCF_ENAP',
                                                stores:
                                                            [
                                                                'dsCausa',
                                                                'dsCargo',
                                                                'dsAccion',
                                                                'dsAccionCorrectiva'
                                                            ],
                                                launch: function () {
                                                    Ext.QuickTips.init();
                                                    var addEvento = Ext.create('WCF_ENAP.view.ui.DatosAcionesCorrectivas', {
                                                        cmpRecord: record
                                                    });
                                                    addEvento.show();
                                                    addEvento.on('destroy', function () {
                                                        Ext.getCmp('pnl_gmap').show();
                                                    });
                                                }
                                            });

                                        }
                                    }
                                    /*,
                                    {
                                    xtype: 'button',
                                    text: 'Seguimiento...',
                                    handler: function () {
                                    var me = this;
                                    Ext.getCmp('pnl_gmap').hide();
                                    Ext.application({
                                    name: 'WCF_ENAP',
                                    stores:
                                    [
                                    'dsCausa',
                                    'dsCargo',
                                    'dsAccion',
                                    'dsUsuario',
                                    'dsEvento',
                                    'dsGraphEventosOrganizacion',
                                    'dsAccionCorrectiva'
                                    ],
                                    launch: function () {
                                    Ext.QuickTips.init();
                                    var addEvento = Ext.create('WCF_ENAP.view.ui.DatosSeguimiento', {
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
                                    */
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
        this.contextMenuYear.getComponent(1).select('0');
        this.contextMenuYear.getComponent(0).checkChange();
        this.callParent(arguments);
    }
});