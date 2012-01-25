Ext.define('WCF_ENAP.view.ui.InformeEvento', {
    requires: [
        'Ext.ux.form.field.ClearButton'
    ],
    extend: 'Ext.panel.Panel',
    height: 600,
    title: 'Información de Eventos',
    autoScroll: true,
    id: 'panel-InformeEvento',
    initComponent: function () {
        var me = this,
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();

        for (var yInicio = (yearNow + yearStep); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        };

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    margin: '5 5 5 5',
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: 10,
                    title: 'Filtro',
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            margin: '5 5 5 5',
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'combobox',
                                    plugins: ['clearbutton'],
                                    fieldLabel: 'Organización',
                                    displayField: 'NOMBRE_ORGANIZACION',
                                    id: 'cmb_organizacion_resumen',
                                    store: 'dsOrganizacion',
                                    valueField: 'ID_ORGANIZACION',
                                    name: 'ID_ORGANIZACION',
                                    anchor: '100%',
                                    mode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    emptyText: 'Selecciona una Organización',
                                    listeners: {
                                        'change': function (cmb, newValue, oldValue, eOpts) {
                                            var record,
                                            cmbDepto = this.next('combobox');
                                            cmbDepto.clearValue();

                                            if (newValue != null) {
                                                record = Ext.create('WCF_ENAP.model.Organizacion', { 'ID_ORGANIZACION': newValue });
                                                Ext.data.StoreManager.lookup('dsDepartamento').load({
                                                    params: record.data,
                                                    callback: function (records, operation, success) {
                                                        cmbDepto.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                            {
                                xtype: 'combobox',
                                plugins: ['clearbutton'],
                                fieldLabel: 'Departamento',
                                displayField: 'NOMBRE_DEPARTAMENTO',
                                id: 'cmb_departamento_resumen',
                                store: 'dsDepartamento',
                                valueField: 'ID_DEPARTAMENTO',
                                name: 'ID_DEPARTAMENTO',
                                anchor: '100%',
                                editable: false,
                                disabled: true,
                                typeAhead: true,
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Selecciona un Departamento',
                                queryMode: 'local',
                                lastQuery: '',
                                selectOnFocus: true,
                                listeners: {
                                    'change': function (cmb, newValue, oldValue, eOpts) {
                                        var record;

                                        if (newValue != null) {
                                        }
                                    }
                                }
                            }
                            ]
                        },
                        {
                            xtype: 'form',
                            border: 0,
                            margin: '5 5 5 5',
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'combobox',
                                    store: Ext.create('Ext.data.ArrayStore', {
                                        fields: ['ANO'],
                                        data: yearsList
                                    }),
                                    id: 'cmb_ano_resumen',
                                    anchor: '100%',
                                    name: 'ANO_INICIO',
                                    fieldLabel: 'Año',
                                    displayField: 'ANO',
                                    valueField: 'ANO',
                                    columnWidth: 0.5
                                },
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    name: 'MES_INICIO',
                                    fieldLabel: 'Mes',
                                    id: 'cmb_mes_resumen',
                                    displayField: 'NOMBRE_MES',
                                    queryMode: 'local',
                                    store: 'dsMeses',
                                    valueField: 'ID_MES',
                                    columnWidth: 0.5
                                }
                            ]
                        }
                    ],
                    buttons: [
                        {
                            text: 'Filtrar',
                            handler: function () {
                                var dsResumen = Ext.StoreManager.lookup('dsResumenEvento');

                                console.log(Ext.getCmp('cmb_organizacion_resumen').getValue());
                                console.log(Ext.getCmp('cmb_departamento_resumen').getValue());
                                console.log(Ext.getCmp('cmb_ano_resumen').getValue());
                                console.log(Ext.getCmp('cmb_mes_resumen').getValue());
                                var valOrg = Ext.getCmp('cmb_organizacion_resumen').getValue(),
                                    valDep = Ext.getCmp('cmb_departamento_resumen').getValue(),
                                    valAno = Ext.getCmp('cmb_ano_resumen').getValue(),
                                    valMes = Ext.getCmp('cmb_mes_resumen').getValue();
                                dsResumen.setProxy(Ext.apply(dsResumen.getProxy(), {
                                    extraParams: {
                                        'ID_ORGANIZACION': ((valOrg == null) ? 0 : valOrg),
                                        'ID_DEPARTAMENTO': ((valDep == null) ? 0: valDep),
                                        'ANO_INICIO': ((valAno == null) ? 0 : valAno),
                                        'MES_INICIO': ((valMes == null)?0:valMes)
                                    }
                                }));
                                dsResumen.load({});
                            }
                        }
                    ]
                    },
                /*{
                    xtype: 'panel',
                    collapsible: true,

                    height: 150,
                    width: 500,
                    margin: '5 5 5 5',
                    layout: {
                        type: 'fit'
                    },
                    border: 0,
                    items: [
                        {
                            xtype: 'chart',
                            store: 'dsGraphResumenEvento',
                            margin: '5 0 0 0',
                            animate: true,
                            legend: {
                                position: 'right'
                            },
                            axes:[{
                                type: 'Numeric',
                                fields: [
                                    'ENERO_ACUMULADO'
                                ],
                                minorTickSteps: 1,
                                minimum: 0,
                                position: 'left',
                                title: 'Eventos por Mes'
                            },
                            {
                                type: 'Category',
                                fields: [
                                    'NOMBRE_DEPARTAMENTO'
                                ],
                                position: 'bottom',
                                title: 'Departamento',
                                label: {
                                    font: '9px Arial'
                                }
                            }],
                            series: [
                                {
                                    type: 'line',
                                    highlight: {
                                        size: 7,
                                        radius: 7
                                    },
                                    fill: true,
                                    axis: 'left',
                                    xField: 'NOMBRE_DEPARTAMENTO',
                                    yField: 'ENERO_ACUMULADO',
                                    markerConfig: {
                                        type: 'cross',
                                        size: 4,
                                        radius: 4,
                                        'stroke-width': 0
                                    }
                                }
                            ]
                        }
                    ]
                },*/
                {
                    xtype: 'gridpanel',
                    margin: '5 5 5 5',
                    store: 'dsResumenEvento',
                    height: 350,
                    title: 'Tipos de Eventos por Departamento',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'NOMBRE_DEPARTAMENTO',
                            flex: 0.3,
                            text: 'Departamento'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'TOTAL_MAYOR',
                            flex: 0.1,
                            text: 'Mayor'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'TOTAL_SERIO',
                            flex: 0.1,
                            text: 'Serio'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'TOTAL_RELEVANTE',
                            flex: 0.1,
                            text: 'Relevante'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'TOTAL_LEVE',
                            flex: 0.1,
                            text: 'Leve'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'TOTAL_SIN_EFECTO',
                            flex: 0.1,
                            text: 'Sin Efecto'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'ACUMULADO_MENSUAL',
                            flex: 0.1,
                            text: 'Acumulado Mensual'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'ACUMULADO_ANUAL',
                            flex: 0.1,
                            text: 'Acumulado Anual'
                        }
                    ],
                    viewConfig: {

                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});