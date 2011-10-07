/*====================================================================
* Individual checkbox/radio examples
*====================================================================*/

var individual = 
{
	xtype: 'container',
	margin: '0 0 10',
	items: 
	[{
		xtype: 'fieldset',
		flex: 1,
		title: 'Antecedentes',
		defaultType: 'checkbox', 
		layout: 'column',
		items: [{
			xtype: 'container',
			layout: 'column',
			items: [{
				xtype: 'container',
				layout: 'column',
				items: [
							{ xtype: 'datefield', fieldLabel: 'Fecha', name: 'fecha', anchor: '96%' },
							{ xtype: 'timefield', fieldLabel: 'Hora', name: 'hora', anchor: '96%' },
							{ xtype: 'textfield', fieldLabel: '/', name: 'hora', anchor: '96%' },
							{ xtype: 'combo',
								mode: 'local',
								value: 'd',
								fieldLabel: 'MMMMM',
								name: 'turno',
								displayField: 'name',
								queryMode: 'local',
								store: Ext.create('Ext.data.Store', 
									{
										fields: ['name', 'value'],
										data: [
											{ name: 'Gerencia', value: 'gerencia' },
											{ name: 'Departamento', value: 'departamento'},
											{ name: 'Division', value: 'division' }
										]
									}
								)
							}

					   ]
			},
				{ xtype: 'container',  layout: 'anchor',
					items: 
					[
						{
							xtype: 'container',  layout: 'column',
							items: [
										{
											xtype: 'combo',
											mode: 'local',
											value: 'd',
											fieldLabel: 'Turno',
											name: 'turno',
											displayField: 'name',
											queryMode: 'local',
											store: Ext.create
											('Ext.data.Store', 
												{
													fields: ['name', 'value'],
													data: [
														{ name: 'D', value: 'd' },
														{ name: 'T', value: 't' },
														{ name: 'N', value: 'n' }
													]
												}
											)
										},

										{
											xtype: 'combo',
											mode: 'local',
											value: 'd',
											fieldLabel: 'Grupo',
											name: 'grupo',
											displayField: 'name',
											queryMode: 'local',
											store: Ext.create
											('Ext.data.Store', 
												{
													fields: ['name', 'value'],
													data: 
													[
														{ name: 'A', value: 'a' },
														{ name: 'B', value: 'b' },
														{ name: 'C', value: 'c' },
														{ name: 'D', value: 'd' }
													]
												}
											)
										}

									]
						},
						{ xtype: 'textfield', fieldLabel: 'Admiistrativo', name: 'admiistrativo', anchor: '100%' },
						{ xtype: 'label', fieldLabel: '-', name: '-', anchor: '100%' },
						{ xtype: 'textfield', fieldLabel: 'Lugar del evento', name: 'lugardelevento', anchor: '100%' },
					]
				}]
		}]
	}]
};




/*====================================================================
* descripcionn del evento 2
*====================================================================*/
var descripcion = 
{
	xtype: 'fieldset',
	title: 'Descripcion',
	layout: 'anchor',
	collapsible: true,
	collapsed: false, // para q aparesca desplegado false
	items: [{
				xtype: 'textfield',
				name: 'txt-test3',
				fieldLabel: 'Descripcion del Evento'
	}]
};


 /*====================================================================
* consecuencias 3
*====================================================================*/
var consecuencias = 
{
	xtype: 'fieldset',
	title: 'Consecuencias',
	layout: 'anchor',
	collapsible: true,
	collapsed: true, // para q aparesca desplegado false
	items: [
			{
				xtype: 'radiogroup',
				fieldLabel: 'Lesiones',
				cls: 'x-check-group-alt',
				items: [
					{ boxLabel: 'Leves', name: 'leves', inputValue: 1 },
					{ boxLabel: 'Graves', name: 'graves', inputValue: 2, checked: true },
				]
			},
			{
				xtype: 'textfield',
				name: 'txt-test3',
				fieldLabel: 'Descripcion de las consecuencias'
			}
			
			]
};



 /*====================================================================
* clasificacion 4
*====================================================================*/
var clasificacion = 
{	
   
	xtype: 'fieldset',
	title: 'Clasificacion',
	layout: 'anchor',
	collapsible: true,
	collapsed: true, // para q aparesca desplegado false
	items: [{
		xtype: 'container',
		layout: 'column',
		items: [{
			xtype: 'container',
			
			layout: 'anchor',
			items: [
						{
						xtype: 'combo',
						mode: 'local',
						value: 'd',
						fieldLabel: 'Accidente',
						name: 'Accidente',
						displayField: 'name',
						queryMode: 'local',
						store: Ext.create
						('Ext.data.Store', 
							{
								fields: ['name', 'value'],
								data: 
								[
									{ name: 'AL', value: 'al' },
									{ name: 'APG', value: 'apg' },
									{ name: 'AG', value: 'ag' }
								]
							}
						)
					}
				   ]
		},
			{ xtype: 'container',  layout: 'anchor',
				items: 
				[
					{
						xtype: 'combo',
						mode: 'local',
						value: 'd',
						fieldLabel: 'Incidente',
						name: 'turno2',
						displayField: 'name',
						queryMode: 'local',
						store: Ext.create
						('Ext.data.Store', 
							{
								fields: ['name', 'value'],
								data: 
								[
									{ name: 'IL', value: 'il' },
									{ name: 'IPG', value: 'ipg' },
									{ name: 'IG', value: 'ig' }
								]
							}
						)
					}
				]
			}]
	}]

};


 /*====================================================================
* tipo de evento 5
*====================================================================*/
var tipevento = 
{
	xtype: 'fieldset',
	title: 'Tipo de evento',
	layout: 'anchor',
	collapsible: true,
	collapsed: false, // para q aparesca desplegado false
	items: [
			 {
			xtype: 'checkboxgroup',
			fieldLabel: 'Eventos',
			cls: 'x-check-group-alt',
			vertical: true,
			items: [
			{ boxLabel: 'Golpes', name: 'cb-custwidth', inputValue: 1 },
			{ boxLabel: 'Caída a Nivel / Desnivel', name: 'cb-custwidth', inputValue: 2, checked: true },
			{ boxLabel: 'Atrapamiento', name: 'cb-custwidth', inputValue: 3 },
			{ boxLabel: 'Contacto con Químicos', name: 'cb-custwidth', inputValue: 4 },
			{ boxLabel: 'Contacto con Temperaturas', name: 'cb-custwidth', inputValue: 5 },
			{ boxLabel: 'Exposición a Llamas', name: 'cb-custwidth', inputValue: 6 },
			{ boxLabel: 'Contacto con objetos punzantes o cortantes', name: 'cb-custwidth', inputValue: 7 },
			{ boxLabel: 'Sobreesfuerzo', name: 'cb-custwidth', inputValue: 8 },
			{ boxLabel: 'Contacto con corriente Eléctrica', name: 'cb-custwidth', inputValue: 9 },
			{ boxLabel: 'Exposición a Radiación', name: 'cb-custwidth', inputValue: 10 },
			{ boxLabel: 'Contacto  Arco Eléctrico', name: 'cb-custwidth', inputValue: 11 },
			{ boxLabel: 'Asfixia (deficiencia de O2)', name: 'cb-custwidth', inputValue: 12 },
			{ boxLabel: 'Cortocircuito  ', name: 'cb-custwidth', inputValue: 13 },
			{ boxLabel: 'Caída de objeto', name: 'cb-custwidth', inputValue: 14 },
			{ boxLabel: 'Incendio', name: 'cb-custwidth', inputValue: 15 },
			{ boxLabel: 'Derrame', name: 'cb-custwidth', inputValue: 16 },
			{ boxLabel: 'Fuga', name: 'cb-custwidth', inputValue: 17 },
			{ boxLabel: 'Pérdida de Energía', name: 'cb-custwidth', inputValue: 18 },
			{ boxLabel: 'Reactividad Química', name: 'cb-custwidth', inputValue: 19 },
			{ boxLabel: 'Explosión', name: 'cb-custwidth', inputValue: 20 },
			{ boxLabel: 'Transgredir  un Estándar', name: 'cb-custwidth', inputValue: 21 },
			{ boxLabel: 'Transgredir  un Procedimiento', name: 'cb-custwidth', inputValue: 22 },
			{ boxLabel: 'Rotura ', name: 'cb-custwidth', inputValue: 23 },
			{ boxLabel: 'Otros', name: 'cb-custwidth', inputValue: 24 }
		]
		}
			
			
			]
};











// combine all that into one huge form
var formularioAddEvento = Ext.create('Ext.FormPanel', {
	title: 'Ingreso de Evento',
	id: 'add-evento-panel',
	bodyPadding: 20,
	items: [
		individual, //1
		descripcion, //2
		consecuencias, //3
		clasificacion, //4
		tipevento //5
	],
	buttons: [{
		text: 'Save',
		handler: function () {
			if (formularioAddEvento.getForm().isValid()) {
				Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />' +
					formularioAddEvento.getForm().getValues(true).replace(/&/g, ', '));
			}
		}
	}, {
		text: 'Reset',
		handler: function () {
			formularioAddEvento.getForm().reset();
		}
	}]
});

