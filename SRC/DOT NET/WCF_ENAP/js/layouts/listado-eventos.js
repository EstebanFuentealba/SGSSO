Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ux');

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
    'Ext.layout.container.Border',
	'Ext.util.*',
	'Ext.view.View'
]);
var mapwin;
//Datos de Prueba
var myData = [
	['3m Co','2011-05-22','12:20','Accidente','Un lugar',0],
	['Alcoa Inc','2011-05-22','12:20','Accidente','Un lugar',0],
	['Altria Group Inc','2011-05-22','12:20','Accidente','Un lugar',2],
	['American Express Company','2011-05-22','12:20','Accidente','Un lugar',3],
	['American International Group, Inc.','2011-05-22','12:20','Accidente','Un lugar',0],
	['AT&T Inc','2011-05-22','12:20','Accidente','Un lugar',5]
];
//DataStore
    var ds = Ext.create('Ext.data.ArrayStore', {
        fields: [
            {name: 'EECC'},
            {name: 'Fecha',   type: 'date'},
            {name: 'Hora'},
            {name: 'Clasificación'},
            {name: 'Lugar'},
            {name: 'Imagenes',   type: 'numeric'}
        ],
        data: myData
    });
//GridView
var gridPanelEventosList = Ext.create('Ext.grid.Panel', {
	flex: 0.60,
	store: ds,
	margin: '0 0 3 0',
	title:'Listado de Eventos',
	columns: [
		{
			id       :'empresa_contratista',
			text	: 'EECC',
			flex: 1,
			sortable : true,
			dataIndex: 'EECC'
		},
		{
			text   : 'Fecha',
			width    : 75,
			sortable : true,
			dataIndex: 'Fecha',
			align: 'right'
		},
		{
			text   : 'Hora',
			width    : 75,
			sortable : true,
			align: 'right',
			dataIndex: 'Hora'
		},
		{
			text   : 'Clasificación',
			width    : 75,
			sortable : true,
			align: 'right',
			dataIndex: 'Clasificación'
		},
		{
			text   : 'Lugar',
			width    : 75,
			sortable : true,
			align: 'right',
			dataIndex: 'Lugar'
		},
		{
			text   : 'Imagenes',
			width    : 75,
			sortable : true,
			align: 'right',
			dataIndex: 'Imagenes'
		}
	],

	listeners: {
		selectionchange: function(model, records) {
			
		}
	}
});

ImageModel = Ext.define('ImageModel', {
	extend: 'Ext.data.Model',
	fields: [
	   {name: 'name'},
	   {name: 'url'},
	   {name: 'size', type: 'float'},
	   {name:'lastmod', type:'date', dateFormat:'timestamp'}
	]
});
var imagePanel = Ext.create('Ext.Panel', {
	frame: true,
	id: 'images-view',
	title: 'Imagenes Adjuntas',
	items: Ext.create('Ext.view.View', {
		store: Ext.create('Ext.data.Store', 
			{
				fields: [
				   {name: 'name'},
				   {name: 'url'},
				   {name: 'size', type: 'float'},
				   {name:'lastmod', type:'date', dateFormat:'timestamp'}
				],
				data: [{"name":"zack_dress.jpg","size":2645,"lastmod":1303810973000,"url":"images\/zack_dress.jpg"},{"name":"dance_fever.jpg","size":2067,"lastmod":1303810973000,"url":"images\/dance_fever.jpg"},{"name":"zack_hat.jpg","size":2323,"lastmod":1303810973000,"url":"images\/zack_hat.jpg"},{"name":"sara_pink.jpg","size":2154,"lastmod":1303810973000,"url":"images\/sara_pink.jpg"},{"name":"gangster_zack.jpg","size":2115,"lastmod":1303810973000,"url":"images\/gangster_zack.jpg"},{"name":"zacks_grill.jpg","size":2825,"lastmod":1303810973000,"url":"images\/zacks_grill.jpg"},{"name":"kids_hug.jpg","size":2477,"lastmod":1303810973000,"url":"images\/kids_hug.jpg"},{"name":"zack.jpg","size":2901,"lastmod":1303810973000,"url":"images\/zack.jpg"},{"name":"sara_smile.jpg","size":2410,"lastmod":1303810973000,"url":"images\/sara_smile.jpg"},{"name":"up_to_something.jpg","size":2120,"lastmod":1303810973000,"url":"images\/up_to_something.jpg"},{"name":"kids_hug2.jpg","size":2476,"lastmod":1303810973000,"url":"images\/kids_hug2.jpg"},{"name":"zack_sink.jpg","size":2303,"lastmod":1303810973000,"url":"images\/zack_sink.jpg"},{"name":"sara_pumpkin.jpg","size":2588,"lastmod":1303810973000,"url":"images\/sara_pumpkin.jpg"}]
			}
		),
		tpl: [
			'<tpl for=".">',
				'<div class="thumb-wrap" id="{name}">',
				'<div class="thumb"><img src="http://dev.sencha.com/deploy/ext-4.0.0/examples/view/{url}" title="{name}"></div>',
				'<span class="x-editable">{shortName}</span></div>',
			'</tpl>',
			'<div class="x-clear"></div>'
		],
		multiSelect: true,
		height: 310,
		trackOver: true,
		overItemCls: 'x-item-over',
		itemSelector: 'div.thumb-wrap',
		emptyText: 'No Hay Imagenes',
		prepareData: function(data) {
			Ext.apply(data, {
				shortName: Ext.util.Format.ellipsis(data.name, 15),
				sizeString: Ext.util.Format.fileSize(data.size),
				dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
			});
			return data;
		},
		listeners: {
			selectionchange: function(dv, nodes ){
				var l = nodes.length,
					s = l !== 1 ? 's' : '';
				//this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
			}
		}
	})
});

var panelListEventos = Ext.create('Ext.panel.Panel', {
	title: 'Listado de Eventos',
	autoScroll: true,
	bodyPadding: 5,
	id: 'list-evento-panel',
	layout: 'anchor',
	items: [
		gridPanelEventosList,
		imagePanel
	]
});