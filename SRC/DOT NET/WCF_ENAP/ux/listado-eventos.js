//Datos de Prueba
var myData = [
	['3m Co','2011-05-22','12:20','Accidente',0],
	['Alcoa Inc','2011-05-22','12:20','Accidente',0],
	['Altria Group Inc','2011-05-22','12:20','Accidente',2],
	['American Express Company','2011-05-22','12:20','Accidente',3],
	['American International Group, Inc.','2011-05-22','12:20','Accidente',0],
	['AT&T Inc','2011-05-22','12:20','Accidente',5]
];
//DataStore
    var ds = Ext.create('Ext.data.ArrayStore', {
        fields: [
            {name: 'EECC'},
            {name: 'Fecha',   type: 'date'},
            {name: 'Hora'},
            {name: 'Clasificación'},
            {name: 'Lugar'},
            {name: 'Imagenes',   type: 'int'}
        ],
        data: myData
    });
//GridView
var gridPanelEventosList = Ext.create('Ext.grid.Panel', {
        id: 'list-evento-panel',
        flex: 0.60,
        store: ds,
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
