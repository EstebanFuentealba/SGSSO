Ext.define('WCF_ENAP.view.ui.BuscaMatrizRiesgo', {
    extend: 'Ext.panel.Panel',
    maximizable: true,
    modal: true,
    bodyPadding: 10,
    autoScroll: true,
    title: 'Busca Matriz de Riesgo',
    id: 'panel-BuscaMatrizRiesgo',
    initComponent: function () {
        var me = this;
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Actividad Específica: {name} ({rows.length} Evaluaci{[values.rows.length > 1 ? "ones" : "ón"]})'
        });
        me.items = [
		{
		    xtype: 'form',
		    id: 'form_busca_actividad',
		    title: 'Busca Actividad Específica',
		    collapsible: true,
		    margin: '0 0 5 0',
		    layout: 'column',
		    anchor: '100%',
		    items: [
			{
			    xtype: 'form',
			    columnWidth: 1 / 2,
			    margin: '5 5 5 5',
			    bodyPadding: 10,
			    title: 'Lugar de La Actividad',
			    
			    items: [
				{
				    xtype: 'combobox',
				    fieldLabel: 'Organización',
				    displayField: 'NOMBRE_ORGANIZACION',
				    store: 'dsOrganizacion',
				    valueField: 'ID_ORGANIZACION',
				    name: 'ID_ORGANIZACION',
				    id: 'busca_organizacion_organizacion',
				    anchor: '100%',
				    mode: 'local',
				    editable: false,
				    allowBlank: false,
				    triggerAction: 'all',
				    emptyText: 'Selecciona una Organización',
				    listeners: {
				        'change': function (cmb, newValue, oldValue, eOpts) {
				            var cmbDepto = Ext.getCmp('busca_organizacion_departamento');
				            cmbDepto.clearValue();
				            Ext.data.StoreManager.lookup('dsDepartamento').load({
				                params: { 'ID_ORGANIZACION': newValue },
				                callback: function (records, operation, success) {
				                    cmbDepto.setDisabled(!(Ext.isArray(records) && records.length > 0));
				                }
				            });

				        }
				    }
				},
				{
				    xtype: 'combobox',
				    fieldLabel: 'Departamento',
				    id: 'busca_organizacion_departamento',
				    displayField: 'NOMBRE_DEPARTAMENTO',
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
				            var cmbDiv = Ext.getCmp('busca_organizacion_division');
				            cmbDiv.clearValue();
				            Ext.data.StoreManager.lookup('dsDivision').load({
				                params: { 'ID_DEPARTAMENTO': newValue },
				                callback: function (records, operation, success) {
				                    cmbDiv.setDisabled(!(Ext.isArray(records) && records.length > 0));
				                }
				            });
				        }
				    }
				},
				{
				    xtype: 'combobox',
				    fieldLabel: 'División',
				    id: 'busca_organizacion_division',
				    displayField: 'NOMBRE_DIVISION',
				    store: 'dsDivision',
				    valueField: 'ID_DIVISION',
				    name: 'ID_DIVISION',
				    anchor: '100%',
				    editable: false,
				    disabled: true,
				    typeAhead: true,
				    forceSelection: true,
				    triggerAction: 'all',
				    emptyText: 'Selecciona un División',
				    queryMode: 'local',
				    lastQuery: '',
				    selectOnFocus: true,
				    listeners: {
				        'change': function (cmb, newValue, oldValue, eOpts) {
				            var cmbArea = Ext.getCmp('busca_organizacion_area');
				            cmbArea.clearValue();
				            Ext.data.StoreManager.lookup('dsArea').load({
				                params: { 'ID_DIVISION': newValue },
				                callback: function (records, operation, success) {
				                    if (Ext.isArray(records) && records.length > 0) {
				                        cmbArea.setDisabled(!(Ext.isArray(records) && records.length > 0));
				                    }
				                }
				            });
				        }
				    }
				},
				{
				    xtype: 'combobox',
				    fieldLabel: 'Area',
				    displayField: 'NOMBRE_AREA',
				    id: 'busca_organizacion_area',
				    store: 'dsArea',
				    valueField: 'ID_AREA',
				    name: 'ID_AREA',
				    anchor: '100%',
				    disabled: true,
				    editable: false,
				    disabled: true,
				    typeAhead: true,
				    forceSelection: true,
				    triggerAction: 'all',
				    emptyText: 'Selecciona un Area',
				    queryMode: 'local',
				    lastQuery: '',
				    selectOnFocus: true
				}
			]
			},
		{
		    xtype: 'form',
		    columnWidth: 1 / 2,
		    margin: '5 5 5 5',
		    bodyPadding: 10,
		    title: 'Datos de Actividad',
		    items: [
				{
				    xtype: 'combobox',
				    fieldLabel: 'General',
				    displayField: 'NOM_ACTIVIDAD_GENERAL',
				    store: 'dsActividadGeneral',
				    valueField: 'ID_ACTIVIDAD_GENERAL',
				    name: 'ID_ACTIVIDAD_GENERAL',
				    anchor: '100%'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: 'Específica',
				    anchor: '100%',
				    name: 'NOM_ACTIVIDAD_ESPECIFICA'
				},
				{
				    xtype: 'combobox',
				    fieldLabel: 'Cargo',
				    store: 'dsCargo',
				    displayField: 'NOMBRE_CARGO',
				    valueField: 'ID_CARGO',
				    anchor: '100%',
				    name: 'ID_CARGO'
				},
				{
				    xtype: 'radiogroup',
				    fieldLabel: 'Es',
				    items: [
						{
						    xtype: 'radiofield',
						    name: 'CONDICION',
						    boxLabel: 'Rutinario',
						    inputValue: 1
						},
						{
						    xtype: 'radiofield',
						    name: 'CONDICION',
						    boxLabel: 'No Rutinario',
						    inputValue: 2
						},
						{
						    xtype: 'radiofield',
						    name: 'CONDICION',
						    fieldLabel: '',
						    boxLabel: 'Emergencia',
						    inputValue: 3
						}
					]
		},
                {
                    xtype: 'panel',
                    border: 0,
                    layout: 'column',
                    fieldDefaults: {
                        msgTarget: 'side',
                        autoFitErrors: false
                    },
                    defaultType: 'datefield',
                    items: [
                        {
                            fieldLabel: 'Evaluada Entre',
                            columnWidth: 0.5,
                            name: 'startdt',
                            id: 'startdt',
                            vtype: 'daterange',
                            endDateField: 'enddt' // id of the end date field
                        },
                        {
                            fieldLabel: 'Y',
                            columnWidth: 0.5,
                            margin: '0 0 0 5',
                            name: 'enddt',
                            id: 'enddt',
                            vtype: 'daterange',
                            startDateField: 'startdt' // id of the start date field
                        }
                    ]
                }
			]
		}
		],
		    buttons: [{
		        text: 'Limpiar',
		        handler: function () {
		            var form = Ext.getCmp('form_busca_actividad').getForm();
		            form.reset();
		        }
		    }, {
		        text: 'Buscar',
		        handler: function () {
		            var form = Ext.getCmp('form_busca_actividad').getForm();

		            Ext.data.StoreManager.lookup('dsActividadEvaluada').load({
		                params: form.getValues(),
		                callback: function (records, operation, success) {
		                    /*TODO*/
		                }
		            });
		        }
		    }]
		},
    {
        xtype: 'gridpanel',
        collapsible: true,
        title: 'Listado de Matrices Evaluadas',
        anchor: '100%',
        store: 'dsActividadEvaluada',
        autoScroll: true,
        features: [groupingFeature],
        columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'ID_ACTIVIDAD_ESPECIFICA',
            flex: 0.2,
            text: 'Actividad Especifica',
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                var idx = Ext.data.StoreManager.lookup('dsActividadEspecifica').find('ID_ACTIVIDAD_ESPECIFICA', value.toString());
                return idx !== -1 ? Ext.data.StoreManager.lookup('dsActividadEspecifica').getAt(idx).get('NOM_ACTIVIDAD_ESPECIFICA') : '';
            }
        },
{
    xtype: 'gridcolumn',
    dataIndex: 'ID_PELIGRO',
    flex: 0.3,
    text: 'Peligro',
    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
        var idx = Ext.data.StoreManager.lookup('dsPeligro').find('ID_PELIGRO', value.toString());
        return idx !== -1 ? Ext.data.StoreManager.lookup('dsPeligro').getAt(idx).get('NOM_PELIGRO') : '';
    }
},
{

    xtype: 'gridcolumn',
    align: 'center',
    text: 'Evaluación del Riesgo',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'VALORACION_PROBABILIDAD',
        text: 'P',
        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
            switch (value.toString()) {
                case '2':
                    return "<span style='display: block; background-color:yellow;'>M</span>";
                    break;
                case '3':
                    return "<span style='display: block; background-color:red;'>A</span>";
                    break;
                default:
                    return "<span style='display: block; background-color:green;'>B</span>";
                    break;
            }
        }
    },
	{
	    xtype: 'gridcolumn',
	    dataIndex: 'VALORACION_CONSECUENCIA',
	    text: 'C',
	    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
	        switch (value.toString()) {
	            case '2':
	                return "<span style='display: block; background-color:yellow;'>M</span>";
	                break;
	            case '3':
	                return "<span style='display: block; background-color:red;'>A</span>";
	                break;
	            default:
	                return "<span style='display: block; background-color:green;'>B</span>";
	                break;
	        }
	    }
	},
	{
	    xtype: 'gridcolumn',
	    text: 'MR',
	    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
	        /*
	        TODO: CALCULO DE LA MAGNITUD DE RIESGO
	        */
	        var indicador_riesgo = parseInt(record.get('VALORACION_CONSECUENCIA')) * parseInt(record.get('VALORACION_PROBABILIDAD'));
	        if (indicador_riesgo < 3) {
	            /* GREEN */
	            return "<span style='display: block; background-color:green;'>B</span>";
	        } else if (indicador_riesgo > 5) {
	            /* RED */
	            return "<span style='display: block; background-color:red;'>B</span>";
	        } else {
	            /* YELLOW */
	            return "<span style='display: block; background-color:yellow;'>B</span>";
	        }
	    }
	}
	]
},
/*{
    xtype: 'gridcolumn',
    align: 'center',
    text: 'Medidas de Control',
    flex: 0.2,
    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
    }
},*/
{
    xtype: 'gridcolumn',
    text: 'Re Evaluación del Riesgo',
    align: 'center',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'MEDIDA_VALORACION_PROBABILIDAD',
        text: 'P',
        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
            switch (value.toString()) {
                case '2':
                    return "<span style='display: block; background-color:yellow;'>M</span>";
                    break;
                case '3':
                    return "<span style='display: block; background-color:red;'>A</span>";
                    break;
                default:
                    return "<span style='display: block; background-color:green;'>B</span>";
                    break;
            }
        }
    },
	{
	    xtype: 'gridcolumn',
	    dataIndex: 'MEDIDA_VALORACION_CONSECUENCIA',
	    text: 'C',
	    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
	        switch (value.toString()) {
	            case '2':
	                return "<span style='display: block; background-color:yellow;'>M</span>";
	                break;
	            case '3':
	                return "<span style='display: block; background-color:red;'>A</span>";
	                break;
	            default:
	                return "<span style='display: block; background-color:green;'>B</span>";
	                break;
	        }
	    }
	},
	{
	    xtype: 'gridcolumn',
	    text: 'MRCC',
	    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
	        /*
	        TODO: CALCULO DE LA MAGNITUD DE RIESGO
	        */
	        var indicador_riesgo_controlado = parseInt(record.get('MEDIDA_VALORACION_CONSECUENCIA')) * parseInt(record.get('MEDIDA_VALORACION_PROBABILIDAD'));
	        if (indicador_riesgo_controlado < 3) {
	            /* GREEN */
	            return "<span style='display: block; background-color:green;'>B</span>";
	        } else if (indicador_riesgo_controlado > 5) {
	            /* RED */
	            return "<span style='display: block; background-color:red;'>B</span>";
	        } else {
	            /* YELLOW */
	            return "<span style='display: block; background-color:yellow;'>B</span>";
	        }
	    }
	}
]
}
    ],
        viewConfig: {

    },
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'dsActividadEvaluada',
            dock: 'bottom'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            anchor: '100%',
            items: [
                {
                    xtype: 'button',
                    text: 'Agregar Seleccionadas a Nueva Matriz',
                    iconCls: 'add-actividad-evaluada-icon'
                },
                {
                    xtype: 'button',
                    text: 'Exportar Seleccionadas',
                    iconCls: 'excel-icon',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Planilla de Reconocimiento de Riesgo',
                                iconCls: 'matriz-icon'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Matriz de Riesgo',
                                iconCls: 'matriz-icon'
                            }
                        ]
                    }
                }
            ]
        }
    ],
    selModel: Ext.create('Ext.selection.CheckboxModel', {
        checkOnly: true
    })
}];
        me.callParent(arguments);
    }
});
									