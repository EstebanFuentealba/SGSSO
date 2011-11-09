Ext.define('WCF_ENAP.view.ui.EventoList', {
    extend: 'Ext.panel.Panel',
    height: 600,
    layout: {
        type: 'anchor'
    },
    title: 'Incidentes Ocurridos',
    id: 'panel-EventoList',
    initComponent: function () {

        var me = this,
            lastMarker = null;
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
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    margin: '5 5 0 5',
                    layout: {
                        type: 'fit'
                    },
                    border: 0,
                    items: [
                    /*{
                    xtype: 'chart',
                    height: 200,
                    margin: '5 5 0 5',
                    width: 400,
                    animate: true,
                    insetPadding: 20,
                    axes: [
                    {
                    type: 'Category',
                    fields: [
                    'x'
                    ],
                    position: 'bottom',
                    title: 'Category Axis'
                    },
                    {
                    type: 'Numeric',
                    fields: [
                    'y'
                    ],
                    position: 'left',
                    title: 'Numeric Axis'
                    }
                    ],
                    series: [
                    {
                    type: 'line',
                    xField: 'x',
                    yField: [
                    'y'
                    ],
                    smooth: 3
                    }
                    ]
                    }*/
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
                            margin: '5 5 5 5',
                            title: 'Listado de Incidentes Reportados',
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
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_DEPARTAMENTO',
                                    text: 'Departamento',
                                    flex: 0.6
                                },
                                {
                                    xtype: 'datecolumn',
                                    dataIndex: 'FECHA_HORA_EVENTO',
                                    text: 'Fecha',
                                    flex: 0.2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'HORA_EVENTO',
                                    text: 'Hora',
                                    flex: 0.2

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
                            margin: '5 5 5 5',
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
                                        var cmp = Ext.getCmp('gmapid');
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

                                        cmp.deleteOverlays(false);
                                        cmp.getMap().setZoom(14);

                                        cmp.showMarkers();
                                    }
                                }]
                            }]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});