Ext.define('WCF_ENAP.view.ui.EventoList', {
    extend: 'Ext.panel.Panel',
    height: 600,
    layout: {
        type: 'anchor'
    },
    title: 'Incidentes Ocurridos',
    id: 'panel-EventoList',
    initComponent: function () {

        var me = this, eventsMarkers = [];
        Ext.data.StoreManager.lookup('dsEvento').on('write', function (store, operation, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                try {
                    //var nuevo_marker = fnCreateMarkerFromRecord(record);
                    //Ext.getCmp('gmapid').addSingleMarker(nuevo_marker);
                } catch (e) { }
            }
        });
        Ext.StoreManager.lookup('dsEvento').on('load', function (store, records, successful, operation, eOpts) {
            //console.log(1);
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
                                    var rec;
                                    if (records[0]) {
                                        rec = records[0];
                                        var idEvento = rec.get('ID_EVENTO');
                                        var gmp = Ext.getCmp('gmapid').getMap();
                                        Ext.getCmp('gmapid').hideMarkers();
                                        Ext.getCmp('gmapid').getMarkerById(idEvento);
                                        //console.log(Ext.getCmp('gmapid').getMarkerById(idEvento));
                                    }
                                }
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_EVENTO',
                                    text: 'ID'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_DEPARTAMENTO',
                                    text: 'Departamento'
                                },
                                {
                                    xtype: 'datecolumn',
                                    dataIndex: 'FECHA_HORA_EVENTO',
                                    text: 'Fecha'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'HORA_EVENTO',
                                    text: 'Hora'
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
                                                    stores: [
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
                                            text: 'Agregar Información a Seleccionado'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'pagingtoolbar',
                                    store: 'dsEvento',
                                    displayInfo: true,
                                    dock: 'bottom'
                                }
                            ]
                    },
                        {
                            xtype: 'panel',
                            height: 350,
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
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});