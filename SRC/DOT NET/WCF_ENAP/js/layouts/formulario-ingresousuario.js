
Ext.require('Ext.tab.*');
Ext.require(['Ext.data.*', 'Ext.grid.*']);

//grid
Ext.define('Grupo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'nombreEECC', 'email', 'telefono'],
    validations: [
	{
        type: 'length',
        field: 'nombre',
        min: 1
    },{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'telefono',
        min: 1
    }]
});
Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'nombre', 'apellidopaterno', 'apellidomaterno','rut','password','email','telefono','grupo'],
    validations: [
	{
        type: 'length',
        field: 'nombre',
        min: 1
    },{
        type: 'length',
        field: 'apellidopaterno',
        min: 1
    }, {
        type: 'length',
        field: 'apellidomaterno',
        min: 1
    },{
        type: 'length',
        field: 'rut',
        min: 1
    },{
        type: 'length',
        field: 'password',
        min: 1
    },{
        type: 'length',
        field: 'email',
        min: 1
    },{
        type: 'length',
        field: 'telefono',
        min: 1
    },{
        type: 'length',
        field: 'grupo',
        min: 1
    }
	
	]
});
Ext.onReady(function(){
	var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Person',
        proxy: {
            type: 'rest',
            url: 'app.php/users',
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json'
            }
        },
        listeners: {
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;                    
                if (name == 'Destroy') {
                    record = operation.records[0];
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
            }
        }
    });
    
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
    
    var grid =  {
        plugins: [rowEditing],
        //width: 400,
        height: 300,
        frame: true,
        title: 'ingresar usuario',
        store: store,
        iconCls: 'icon-user',
		listeners: {
			selectionchange:function(selModel, selections){
				this.down('#delete').setDisabled(selections.length === 0);
			}
		},
        columns: [{
            text: 'ID',
			flex: 0.09,
            //width: 40,
            sortable: true,
            dataIndex: 'id'
        }, {
            text: 'Nombre',
            flex: 0.1,
			//width: 80,
            sortable: true,
            dataIndex: 'nombre',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'Apellido Paterno',
            //width: 80,
			flex: 0.1,
            sortable: true,
            dataIndex: 'apellidopaterno',
            field: {
                xtype: 'textfield'
            }
        },{
            header: 'Apellido Materno',
            //width: 80,
			flex: 0.1,
            sortable: true,
            dataIndex: 'apellidomaterno',
            field: {
                xtype: 'textfield'
            }
        }, {
            text: 'Rut',
            //width: 80,
			flex: 0.1,
            sortable: true,
            dataIndex: 'rut',
            field: {
                xtype: 'textfield'
            }
        },{
            text: 'Password',
            //width: 80,
			flex: 0.1,
            sortable: true,
            dataIndex: 'password',
            field: {
                xtype: 'textfield'
            }
        },{
            text: 'Email',
			flex: 0.1,
            sortable: true,
            dataIndex: 'email',
            field: {
                xtype: 'textfield'
            }
        },{
            text: 'Telefono',
            //width: 80,
			flex: 0.1,
            sortable: true,
            dataIndex: 'telefono',
            field: {
                xtype: 'textfield'
            }
        },{
            text: 'Grupo',
			flex: 0.1,
            sortable: true,
            dataIndex: 'grupo',
            field: {
												xtype:          'combo',
												mode:           'local',
												name:           'grupo',
												displayField:   'name',
												valueField:     'value',
												queryMode: 'local',
												store: Ext.create('Ext.data.Store', {
													fields : ['name', 'value'],
													data   : [
														{name : 'grupo', value: 'grupo'}
													]
												})
											
										}
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Agregar',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store.insert(0, new Person());
                    rowEditing.startEdit(0, 0);	
                }
            }, '-', {
                itemId: 'delete',
                text: 'Borrar',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            }]
        }]
    };
	

//
// grid 2


	var store2 = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Grupo',
        proxy: {
            type: 'rest',
            url: 'app.php/users',
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json'
            }
        },
        listeners: {
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;                    
                if (name == 'Destroy') {
                    record = operation.records[0];
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
            }
        }
    });
    
    var rowEditing2 = Ext.create('Ext.grid.plugin.RowEditing');
    
    var grid2 =  {
        plugins: [rowEditing2],
        //width: 400,
        height: 300,
        frame: true,
        title: 'Ingresar Empresas contratistas',
        store: store2,
        iconCls: 'icon-user',
		listeners: {
			selectionchange:function(selModel, selections){
				this.down('#delete').setDisabled(selections.length === 0);
			}
		},
        columns: [{
            text: 'ID',
            flex: .1,
            sortable: true,
            dataIndex: 'id'
        }, {
            text: 'Nombre EECC',
            flex: .3,
            sortable: true,
            dataIndex: 'nombreEECC',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'Email',
			flex: .3,
            sortable: true,
            dataIndex: 'email',
            field: {
                xtype: 'textfield'
            }
        }, {
            text: 'Telefono ',
			flex: .3,
            sortable: true,
            dataIndex: 'telefono',
            field: {
                xtype: 'textfield'
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Agregar',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store2.insert(0, new Person());
                    rowEditing2.startEdit(0, 0);	
                }
            }, '-', {
                itemId: 'delete',
                text: 'Borrar',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid2.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store2.remove(selection);
                    }
                }
            }]
        }]
    };

// fin gris 2  
  
  
    var tabs2 = Ext.createWidget('tabpanel', {
        activeTab: 0,
        //width: 700,
        //height: 500,
        plain: true,
        defaults :{
            autoScroll: true,
            bodyPadding: 10
        },
        items: 
		[
			{	xtype: "container",
				title: 'Ingresar Usuarios',
                items: 
				[	
					new Ext.create('Ext.grid.Panel',grid)
				]
            },
			
			{
			xtype: "container",
			title: 'Ingrezar Empreza Contratista',
			items: [
			{
				items: [
				new Ext.create('Ext.grid.Panel',grid2)
				]					
					
			}
			]	
            },
			{
			xtype: "container",
			title: 'Ingrezar Grupo',
			items: [
			{
				items: [
					//new Ext.create('Ext.grid.Panel',grid2)
				{
					title: 'Ingrese datos EECC',	
					xtype: 'form',
					layout: 'column',
					margin: "0 0 3 0",
					bodyPadding: 5,
					items: [
								{
									xtype: 'container',
									layout: 'anchor',
									items: [ 
												{xtype: 'textfield',fieldLabel: 'Nombre del grupo', name: 'nombre'},
												{
														xtype: 'checkboxgroup',
														items:
														[
															{boxLabel: 'Priviegio 1', name: 'cb-Priviegio-1'},
															{boxLabel: 'Priviegio 2', name: 'cb-Priviegio-2', checked: true},
															{boxLabel: 'Priviegio 3', name: 'cb-Priviegio-3'},
															{boxLabel: 'Priviegio 4', name: 'cb-Priviegio-4'},
														]
												},
												{xtype: 'button',text: 'Agregar nuevo grupo'}
										   ]					   
								}
								
					
						]
				}

				]					
					
			}
			]	
            },

			
			{title: 'Usuarios agregados',
				xtype: 'fieldset',
                items: 
				[	
					//new Ext.create('Ext.grid.Panel',grid)
				]			
            },
			
			
			
			{
                title: 'Event Tab',
                listeners: {
                    activate: function(tab){
                        alert(tab.title + ' was activated.');
                    }
                },
                html: "I am tab 4's content. I also have an event listener attached."
            },{
                title: 'Disabled Tab',
                disabled: true,
                html: "Can't see me cause I'm disabled"
            }
        ]
    });
});

