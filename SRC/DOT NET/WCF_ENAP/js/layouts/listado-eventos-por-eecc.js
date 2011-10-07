//Incudes
Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.chart.*',
    'Ext.grid.Panel',
	'Ext.toolbar.TextItem',
    'Ext.layout.container.Column',
	'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border'
]);

//VARIABLES
var winConfigureEECC,storeFilterEECCAno = Ext.create('Ext.data.Store', {
	fields: ['name', 'value'],
	data: [
		{ name: '2011', value: 2011 },
		{ name: '2010', value: 2010 },
		{ name: '2009', value: 2009 },
		{ name: '2008', value: 2008 }
	]
});
var storeFilterEECCMes = Ext.create('Ext.data.Store', {
	fields: ['name', 'value'],
	data: [
		{ name: 'Enero', value: 1 },
		{ name: 'Febrero', value: 2 },
		{ name: 'Marzo', value: 3 },
		{ name: 'Abril', value: 4 },
		{ name: 'Mayo', value: 5 },
		{ name: 'Junio', value: 6 },
		{ name: 'Julio', value: 7 },
		{ name: 'Agosto', value: 8 },
		{ name: 'Septiembre', value: 9 },
		{ name: 'Octubre', value: 10 },
		{ name: 'Noviembre', value: 11 },
		{ name: 'Diciembre', value: 12 }
	]
});
var storeFilterEECCSemana = Ext.create('Ext.data.Store', {
	fields: ['name', 'value'],
	data: [
		{ name: 'Primera', value: '1' },
		{ name: 'Segunda', value: '2' },
		{ name: 'Tercera', value: '3' },
		{ name: 'Cuarta', value: '4' }
	]
});
var storeFilterEECCDia = Ext.create('Ext.data.Store', {
	fields: ['name', 'value'],
	data: [
		{ name: 'Lunes', value: '1' },
		{ name: 'Martes', value: '2' },
		{ name: 'Miercoles', value: '3' },
		{ name: 'Jueves', value: '4' },
		{ name: 'Viernes', value: '5' }
	]
})

//Datos de Prueba
var dataeecc = [
	['3m Co',20,0,0,0,0],
	['Alcoa Inc',12,1,0.1,0.2,0],
	['Altria Group Inc',2,4,0.1,0.4,0.2],
	['American Express Company',5,2,0.2,0.4,0.2],
	['American International Group, Inc.',5,0,0,0,0],
	['AT&T Inc',5,10,0.5,0.6,0.4],
	['DuocUC',20,40,0.9,0.8,0.2]
];
//DataStore
var dsEECC = Ext.create('Ext.data.ArrayStore', {
	fields: [
		{name: 'EECC'},
		{name: 'CTP',type: 'numeric'},
		{name: 'STP',type: 'numeric'},
		{name: 'Indice de Frecuencia',type: 'float'},
		{name: 'Indice de Gravedad',type: 'float'},
		{name: 'Tasa Siniestralidad',type: 'float'}
	],
	data: dataeecc
});
//Combobox
var cmb_semana = Ext.create('Ext.form.ComboBox', {
	labelStyle: 'width:50px',
	fieldLabel: 'Semana',
	store: storeFilterEECCSemana,
	mode: 'local',
	disabled: true,
	queryMode: 'local',
	displayField: 'name',
	valueField: 'value',
	listeners:{
		'select': function( field,value, options){
			/* TODO */
			cmb_dia.enable();
		}
	}
});
var cmb_dia = Ext.create('Ext.form.ComboBox', {
	labelStyle: 'width:50px',
	fieldLabel: 'Día',
	store: storeFilterEECCDia,
	disabled: true,
	mode: 'local',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'value',
	listeners:{
		'select': function( field,value, options){
			/* TODO */
		}
	}
});
//MenuItem
var contextMenuGridEECC = Ext.create('Ext.menu.Menu', {
	items: [
		{
			xtype: 'combo',
			labelStyle: 'width:50px',
			fieldLabel: 'A&ntilde;o',
			store: storeFilterEECCAno,
			value: (new Date()).getFullYear(),
			mode: 'local',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			listeners:{
				'select': function( field,value, options){
					/* TODO */
				}
			}
		},
		{
			xtype: 'combo',
			labelStyle: 'width:50px',
			fieldLabel: 'Mes',
			store: storeFilterEECCMes,
			mode: 'local',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			listeners:{
				'select': function( field,value, options){
					/* TODO */
					cmb_semana.enable();
				}
			}
		},
		cmb_semana,
		cmb_dia
	]
});
var contextMenu = Ext.create('Ext.menu.Menu', {
	items: [
		{
			xtype: 'combo',
			labelStyle: 'width:50px',
			fieldLabel: 'Graficar',
			store: new Ext.data.ArrayStore({
				fields: ['name'],
				data : [
					['CTP'],
					['STP'],
					['Indice de Frecuencia'],
					['Indice de Gravedad'],
					['Tasa Siniestralidad']
				]
			}),
			value: 'CTP',
			mode: 'local',
			queryMode: 'local',
			displayField: 'name',
			listeners:{
				'select': function( field,value, options){
					var valor = this.getValue();
					barChartEECC.axes.get(0).fields = [valor];
					barChartEECC.series.get(0).yField= [valor];
					barChartEECC.series.get(0).label.field= [valor];
					gridPanelChart.setTitle('Gr&aacute;fico de '+valor+' por EECC');
					barChartEECC.setLoading('Cargando...');
					barChartEECC.redraw();

				}
			}
		}
	]
});
//GridView

var gridEECC = Ext.create('Ext.grid.Panel', {
	flex: 0.60,
	store: dsEECC,
	title:'Estadisticas EECC',
	tools:[{
		xtype: 'tool',
		type: 'gear',
		handler: function(e, target, panelHeader, tool){
			contextMenuGridEECC.showAt(e.getXY());
		}
	}],
	dockedItems: [{
        xtype: 'pagingtoolbar',
        store: dsEECC,   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }],
	/* COLUMNAS DE LA GRILLA */
	columns: [
		{
			id       :'empresa_contratista',
			text	: 'EECC',
			sortable : true,
			dataIndex: 'EECC'
		},
		{
			text   : 'C.T.P',
			sortable : true,
			dataIndex: 'CTP',
			type: 'numeric',
			align: 'right'
		},
		{
			text   : 'S.T.P',
			sortable : true,
			align: 'right',
			dataIndex: 'STP'
		},
		{
			text   : 'Indice de Frecuencia',
			sortable : true,
			align: 'right',
			type: 'float',
			dataIndex: 'Indice de Frecuencia'
		},
		{
			text   : 'Indice de Gravedad',
			sortable : true,
			align: 'right',
			type: 'float',
			dataIndex: 'Indice de Gravedad'
		},
		{
			text   : 'Tasa Siniestralidad',
			sortable : true,
			align: 'right',
			dataIndex: 'Tasa Siniestralidad'
		}
	],
	listeners: {
		selectionchange: function(model, records) {
			var rec;
			if (records[0]) {
				rec = records[0];
				
				/* Resalta Gráfico */
				
				var name = rec.get('EECC'),
                series = barChartEECC.series.get(0),
                i, items, l;
            
				series.highlight = true;
				series.unHighlightItem();
				series.cleanHighlights();
				for (i = 0, items = series.items, l = items.length; i < l; i++) {
					if (name == items[i].storeItem.get('EECC')) {
						selectedStoreItem = items[i].storeItem;
						series.highlightItem(items[i]);
						break;
					}
				}
				series.highlight = false;
			}
		}
	}
});

//Grafico Series EECC
var barChartEECC = Ext.create('Ext.chart.Chart', {
	flex: 1,
	shadow: true,
	animate: true,
	store: dsEECC,
	axes: [{
		type: 'Numeric',
		position: 'left',
		fields: ['CTP'],
		minimum: 0,
		hidden: true
	}, {
		type: 'Category',
		position: 'bottom',
		fields: ['EECC'],
		label: {
			renderer: function(v) {
				return Ext.String.ellipsis(v, 15, false);
			},
			font: '9px Arial',
			rotate: {
				degrees: 270
			}
		}
	}],
	series: [{
		type: 'column',
		axis: 'left',
		highlight: true,
		style: {
			fill: '#456d9f'
		},
		highlightCfg: {
			fill: '#a2b5ca'
		},
		label: {
			contrast: true,
			display: 'insideEnd',
			field: 'CTP',
			color: '#000',
			orientation: 'vertical',
			'text-anchor': 'middle'
		},
		listeners: {
			'itemmouseup': function(item) {
				var series = barChartEECC.series.get(0),
					index = Ext.Array.indexOf(series.items, item),
					selectionModel = gridEECC.getSelectionModel();

				selectedStoreItem = item.storeItem;
				selectionModel.select(index);
			},
			afterrender:function (field,options ) {
				Ext.defer(function() {
                    barChartEECC.setLoading(false);
                }, 1000);
				
			}
		},
		xField: 'EECC',
		yField: ['CTP']
	}]        
});

var gridPanelChart = Ext.create('Ext.form.Panel', {
	title: 'Gr&aacute;fico de CTP por EECC',
	height: 200,
	layout: 'fit',
	width: 705,
	margin: '0 0 3 0',
	tools:[{
		xtype: 'tool',
		type: 'gear',
		handler: function(e, target, panelHeader, tool){
			contextMenu.showAt(e.getXY());
		}
	}],
	items:[barChartEECC]
});

var gridPanelEECC = Ext.create('Ext.panel.Panel', {
	title: 'Estadisticas EECC',
	autoScroll: true,
	bodyPadding: 5,
	width: 870,
	id: 'list-eecc-panel',
	items: [
		gridPanelChart,
		gridEECC
	]
});