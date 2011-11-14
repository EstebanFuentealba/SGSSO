Ext.define('WCF_ENAP.view.ui.EV2', {
    requires: [
        'Ext.ux.grid.feature.CheckGrouping',
        'Ext.ux.RowExpander'
    ],
    extend: 'Ext.form.Panel',
    maximizable: true,
    modal: true,
    bodyPadding: 10,
    autoScroll: true,
    title: 'Crea Matriz de Riesgo',
    id: 'panel-EV2',
    initComponent: function () {
        var me = this,
            pnlLugar;

        pnlLugar = Ext.create('WCF_ENAP.view.ui.PanelLugar', {
            title: 'Lugar de la Actividad',
            columnWidth: .5
        });

        Ext.StoreManager.lookup('dsActividadEvaluada').on('write', function (store, operation, index, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                try {
                    Ext.data.StoreManager.lookup('dsTempActividadEvaluada').insert(0, record);
                } catch (e) { /*Cannot call method 'addCls' of null*/ }
            }
        });

        me.items = [
        /* [FORMULARIO] */
		{
		xtype: 'panel',
		title: 'Información Básica',
		collapsible: true,
		margin: '0 0 5 0',
		layout: 'column',
		anchor: '100%',
		items: [
		/* [LUGAR ACTIVIDAD] */
				pnlLugar,
		/*  	
		[/LUGAR ACTIVIDAD]
		[DATOS ACTIVIDAD] 
		*/
				{
				xtype: 'panel',
				columnWidth: 1 / 2,
				margin: '5 5 5 5',
				layout: 'anchor',
				bodyPadding: 10,
				title: 'Información de Actividad',
				items: [
						{
						    xtype: 'combobox',
						    fieldLabel: 'Actividad General <a href="#" class="tooltip" data-qtip="Es el nombre con que se denomina a un conjunto de Actividades Específicas que se llevan a cabo para cumplir los objetivos de la operación">[<b>?</b>]</a>',
						    displayField: 'NOM_ACTIVIDAD_GENERAL',
						    store: 'dsActividadGeneral',
						    valueField: 'ID_ACTIVIDAD_GENERAL',
						    name: 'ID_ACTIVIDAD_GENERAL',
						    anchor: '100%',
						    labelWidth: 150,
						    allowBlank: false
						},
                        {
                            xtype: 'panel',
                            border: 0,
                            margin: '0 0 0 0',
                            layout: 'column',
                            title: '',
                            items: [
                                    {
                                        xtype: 'hiddenfield',
                                        name: 'NOM_ACTIVIDAD_ESPECIFICA'
                                    },
                                    {
                                        xtype: 'combobox',
                                        columnWidth: 0.94,
                                        fieldLabel: 'Actividad Específica <a class="tooltip" href="#" data-qtip="Es el conjunto de acciones que se llevan a cabo para cumplir con los objetivos de la Actividad General, mediante la utilización de los recursos humanos, materiales, técnicos, y financieros asignados a la actividad con un costo determinado.">[<b>?</b>]</a>',
                                        name: 'ID_ACTIVIDAD_ESPECIFICA',
                                        labelWidth: 150,
                                        anchor: '100%',
                                        store: 'dsActividadEspecifica',
                                        displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
                                        valueField: 'ID_ACTIVIDAD_ESPECIFICA',
                                        queryMode: 'local',
                                        listeners: {
                                            'change': function (element, newValue, oldValue, options) {
                                                // TODO: Cargar la grilla Con las evaluaciones de peligros.
                                                var record = this.store.getById(newValue);
                                                this.prev('hiddenfield').setValue(record.get('NOM_ACTIVIDAD_ESPECIFICA'));
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 5',
                                        iconCls: 'btn-add',
                                        columnWidth: 0.06,
                                        handler: function () {
                                            /* [CREA ACTIVIDAD ESPECIFICA] */
                                            Ext.application({
                                                name: 'WCF_ENAP',
                                                stores: ['dsActividadEspecifica'],
                                                launch: function () {
                                                    Ext.QuickTips.init();
                                                    var addActividadEspecifica = Ext.create('WCF_ENAP.view.ui.ActividadEspecifica', {});
                                                    var winAddActividadEspecifica = Ext.create('Ext.window.Window', {
                                                        width: '600',
                                                        maximizable: true,
                                                        title: 'Ingresa una nueva Actividad Específica',
                                                        modal: true,
                                                        items: [
													        addActividadEspecifica
												        ]
                                                    });
                                                    winAddActividadEspecifica.show();
                                                }
                                            });
                                            /* [/CREA ACTIVIDAD ESPECIFICA] */
                                        }
                                    }
                                ]
                        },
						{
						    xtype: 'panel',
						    border: 0,
						    layout: 'column',
						    items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Cargo <a class="tooltip" href="#" data-qtip="Papel, cargo u ocupación asociada a la actividad evaluada.">[<b>?</b>]</a>',
                                    labelWidth: 150,
                                    displayField: 'NOMBRE_CARGO',
                                    store: 'dsCargo',
                                    valueField: 'ID_CARGO',
                                    columnWidth: 0.94,
                                    name: 'ID_CARGO',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    iconCls: 'btn-add',
                                    columnWidth: 0.06,
                                    handler: function () {
                                        /* [CREA CARGO] */
                                        Ext.application({
                                            name: 'WCF_ENAP',
                                            stores: ['dsCargo'],
                                            launch: function () {
                                                Ext.QuickTips.init();
                                                var addCargo = Ext.create('WCF_ENAP.view.ui.Cargo', {});
                                                var winAddCargo = Ext.create('Ext.window.Window', {
                                                    width: '600',
                                                    maximizable: true,
                                                    title: 'Ingresa un nuevo Cargo',
                                                    modal: true,
                                                    items: [
													        addCargo
												    ]
                                                });
                                                winAddCargo.show();
                                            }
                                        });
                                        /* [/CREA CARGO] */

                                    }
                                }
                            ]
						},
						{
						    xtype: 'radiogroup',
						    fieldLabel: 'Es <a class="tooltip" href="#" data-qtip="Es el tipo de actividad: <ul><li>Rutinaria.</li><li>No Rutinaria.</li><li>En situación de Emergencia.</li></ul>">[<b>?</b>]</a>',
						    allowBlank: false,
						    labelWidth: 150,
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
                                ],
						    listeners: {
						        change: function (field, newValue, oldValue, options) {
						            this.up('panel').up('panel').next('panel').down('combobox').setDisabled(false);
						        }
						    }
						}
					]
}
		/* 
		[/DATOS ACTIVIDAD] 
		*/
			]
},

        {
            xtype: 'form',
            margin: '3 0 3 0',
            bodyPadding: 10,
            collapsible: true,
            title: 'Evaluación de Riesgo Puro y con Medidas Asociadas',
            titleCollapse: true,
            layout: 'anchor',
            items: [
            /* [EVALUACION PELIGRO] */
            {
            xtype: 'hiddenfield',
            name: 'NOM_PELIGRO'
        },
            {
                xtype: 'hiddenfield',
                name: 'ID_ACTIVIDAD_EVALUADA'
            },
            {
                xtype: 'combobox',
                margin: '5 5 5 5',
                disabled: true,
                fieldLabel: 'Peligro <a href="#" class="tooltip" data-qtip="Fuente, situación o acto con potencial de producir un daño, en términos de lesiones a seres humanos, o combinación de éstas">[<b>?</b>]</a>',
                name: 'ID_PELIGRO',
                labelWidth: 120,
                anchor: '100%',
                store: 'dsPeligro',
                displayField: 'NOM_PELIGRO',
                valueField: 'ID_PELIGRO',
                queryMode: 'local',
                listeners: {
                    'change': function (element, newValue, oldValue, options) {

                        var pnlEvRiesg,
                            pnlMedida,
                            pnlReEvRiesg,
                            formPrincipal,
                            values,
                            record;

                        record = this.store.getById(newValue);

                        formPrincipal = this.up('form');
                        pnlPeligro = this.up('form');
                        pnlEvRiesg = pnlPeligro.down('form');
                        pnlMedida = pnlEvRiesg.next('gridpanel');
                        pnlReEvRiesg = pnlMedida.next('form');

                        pnlEvRiesg.setDisabled(false);


                        values = pnlPeligro.up('form').getForm().getValues();

                        Ext.data.StoreManager.lookup('dsActividadEvaluada').load({
                            url: '/ActividadEvaluada/',
                            params: values,
                            callback: function (records, operation, success) {
                                if (records.length > 0) {
                                    var record = records[0];
                                    Ext.Msg.alert('Ya Existe una Evaluación', 'Ya existe una evaluación para éstos datos.');

                                    Ext.StoreManager.lookup('dsMedidaDeControl').load({
                                        params: { 'ID_ACTIVIDAD_EVALUADA': record.get('ID_ACTIVIDAD_EVALUADA') },
                                        callback: function (records, operation, success) {
                                            Ext.StoreManager.lookup('dsPeligroMedida').loadRecords(records);
                                        }
                                    });

                                    pnlPeligro.loadRecord(record);
                                    pnlEvRiesg.loadRecord(record);
                                    pnlReEvRiesg.loadRecord(record);

                                    pnlEvRiesg.setDisabled(false);
                                    pnlMedida.setDisabled(false);
                                    pnlReEvRiesg.setDisabled(false);

                                    pnlPeligro.down('hiddenfield').setValue(record.get('NOM_PELIGRO'));
                                }
                            }
                        });
                        pnlPeligro.down('hiddenfield').setValue(record.get('NOM_PELIGRO'));
                    }
                }
            },
        /* [/EVALUACION PELIGRO] */
        /* [EVALUACIÓN DEL RIESGO] */
            {
            xtype: 'panel',
            margin: '3 0 0 0',
            border: 0,
            layout: 'column',
            items: [
                    {
                        xtype: 'form',
                        disabled: true,
                        margin: '3 3 3 3',
                        bodyPadding: 10,
                        title: 'Evaluacion del Riesgo',
                        columnWidth: 1 / 3,
                        items: [
                        {
                            xtype: 'radiogroup',
                            layout: 'anchor',
                            fieldLabel: 'Probabilidad <a href="#" class="tooltip" data-qtip="Es la medida de la facilidad o dificultad con que puede materializarse el accidente <ul><li><b>Baja</b>: El accidente no ha ocurrido en ningún área y no se conocen antecedentes.</li><li><b>Media</b>: Existen antecedentes que el accidente ha ocurrido en trabajos similares alguna vez en ERBB.</li><li><b>Alta</b>: El accidente ha ocurrido en trabajos iguales o similares, al menos una vez dentro del periodo del año anterior en ERBB.</li></ul>">[<b>?</b>]</a>',
                            labelAlign: 'top',
                            allowBlank: false,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Bajo',
                                    name: 'VALORACION_PROBABILIDAD',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Medio',
                                    name: 'VALORACION_PROBABILIDAD',
                                    inputValue: 2
                                },
                                {
                                    xtype: 'radiofield',
                                    fieldLabel: '',
                                    boxLabel: 'Alto',
                                    anchor: '100%',
                                    name: 'VALORACION_PROBABILIDAD',
                                    inputValue: 3
                                }
                            ],
                            listeners: {
                                'change': function (field, newValue, oldValue, options) {
                                    if (this.isValid() && this.next('radiogroup').isValid()) {
                                        this.up('panel').next('gridpanel').setDisabled(false);
                                    } else {
                                        this.up('panel').next('gridpanel').setDisabled(true);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Consecuencia <a href="#" class="tooltip" data-qtip="Es la severidad de las consecuencia basadas en la experiencia, historia y apreciación del evaluador; para ello se ha definido los siguientes criterios: <ul><li><b>Ligeramente Dañino</b>: Lesiones superficiales, cortes y magulladuras pequeñas, irritación de los ojos, que impliquen accidentes sin tiempo perdido.</li><li><b>Dañino</b>: Quemaduras, torceduras importantes, fracturas menores, laceraciones, contusiones, dermatitis, trastornos músculo-esqueléticos, que impliquen accidentes con tiempo perdido.</li><li><b>Extremadamente Dañino</b>: Amputaciones, fracturas mayores, intoxicaciones, lesiones múltiples, lesiones fatales, que impliquen incapacidad permanente.</li></ul>">[<b>?</b>]</a>',
                            allowBlank: false,
                            labelAlign: 'top',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Ligeramente Dañino',
                                    name: 'VALORACION_CONSECUENCIA',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Dañino',
                                    name: 'VALORACION_CONSECUENCIA',
                                    inputValue: 2
                                },
                                {
                                    xtype: 'radiofield',
                                    fieldLabel: '',
                                    boxLabel: 'Extremadamente Dañino',
                                    anchor: '100%',
                                    name: 'VALORACION_CONSECUENCIA',
                                    inputValue: 3
                                }
                            ],
                            listeners: {
                                'change': function (field, newValue, oldValue, options) {
                                    if (this.isValid() && this.prev('radiogroup').isValid()) {
                                        this.up('panel').next('gridpanel').setDisabled(false);
                                    } else {
                                        this.up('panel').next('gridpanel').setDisabled(true);
                                    }
                                }
                            }
                        }
                    ]
                    },
            /* [/EVALUACIÓN DEL RIESGO] */
            /* [MEDIDAS DE CONTROL ]*/
                    {
                    xtype: 'gridpanel',
                    store: 'dsPeligroMedida',
                    disabled: true,
                    height: 239,
                    margin: '3 3 3 3',
                    autoScroll: true,
                    title: 'Aplica Medidas de Control',
                    columnWidth: 1 / 3,
                    selModel: Ext.create('Ext.selection.RowModel', { mode: 'MULTI' }),
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'NOM_MEDIDA_DE_CONTROL',
                            text: 'Medida De Control',
                            flex: 1
                        }
                    ],
                    viewConfig: {
                        multiSelect: true
                    },
                    listeners: {
                        'selectionchange': function (selModel, selections) {
                            this.down("button").next('button').setDisabled(selections.length === 0);
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Asignar',
                                    iconCls: 'btn-add',
                                    handler: function () {
                                        /* [SELECT MEDIDA] */
                                        var me = this.up('gridpanel');
                                        me.getSelectionModel().selectAll();
                                        Ext.application({
                                            name: 'WCF_ENAP',
                                            stores: ['dsMedidaDeControl'],
                                            launch: function () {
                                                Ext.QuickTips.init();
                                                Ext.StoreManager.lookup('dsMedidaDeControl').load();
                                                var addMedidas = Ext.create('WCF_ENAP.view.ui.Medidas', {
                                                    cmpPadre: me
                                                });
                                                //this.getSelectionModel().select(me.cmpPadre.getSelectionModel().getSelection());
                                                addMedidas.show();
                                            }
                                        });
                                        /* [/SELECT MEDIDA] */
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    iconCls: 'btn-delete',
                                    text: 'Eliminar',
                                    handler: function () {
                                        var grid = this.up('gridpanel');
                                        var selection = grid.getSelectionModel().getSelection()[0];
                                        if (selection) {
                                            grid.getStore().remove(selection);
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
            /* [/MEDIDAS DE CONTROL] */
            /* [RE EVALUA PELIGRO] */
                {
                xtype: 'form',
                disabled: true,
                margin: '3 3 3 3',
                bodyPadding: 10,
                title: 'Re Evaluar',
                columnWidth: 1 / 3,
                items: [
                        {
                            xtype: 'radiogroup',
                            layout: 'anchor',
                            fieldLabel: 'Probabilidad',
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Bajo',
                                    name: 'MEDIDA_VALORACION_PROBABILIDAD',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Medio',
                                    name: 'MEDIDA_VALORACION_PROBABILIDAD',
                                    inputValue: 2
                                },
                                {
                                    xtype: 'radiofield',
                                    fieldLabel: '',
                                    boxLabel: 'Alto',
                                    anchor: '100%',
                                    name: 'MEDIDA_VALORACION_PROBABILIDAD',
                                    inputValue: 3
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            layout: 'anchor',
                            fieldLabel: 'Consecuencia',
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Ligeramente Dañino',
                                    name: 'MEDIDA_VALORACION_CONSECUENCIA',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Dañino',
                                    name: 'MEDIDA_VALORACION_CONSECUENCIA',
                                    inputValue: 2
                                },
                                {
                                    xtype: 'radiofield',
                                    fieldLabel: '',
                                    boxLabel: 'Extremadamente Dañino',
                                    anchor: '100%',
                                    name: 'MEDIDA_VALORACION_CONSECUENCIA',
                                    inputValue: 3
                                }
                            ]
                        }
                    ]
            }
            /* [/RE EVALUA PELIGRO] */
            ]
        }
        ],
        buttons: [{
            text: 'Guardar Evaluación',
            iconCls: 'btn-add-save',
            handler: function () {
                var new_object,
					errors,
					form,
                    grid;

                grid = this.up('form').down('gridpanel');
                form = this.up('form').up('form').getForm();

                new_object = Ext.create('WCF_ENAP.model.ActividadEvaluada', Ext.apply({ "MEDIDAS": Ext.Array.map(grid.getStore().getRange(), function (model) { return model.get("ID_MEDIDAS_DE_CONTROL"); }) }, form.getValues()));
                errors = new_object.validate();

                if (errors.isValid() && form.isValid()) {
                    this.disable(true);
                    var storeActividadEvaluada = Ext.data.StoreManager.lookup('dsActividadEvaluada');
                    if (new_object.get("ID_ACTIVIDAD_EVALUADA") != null && new_object.get("ID_ACTIVIDAD_EVALUADA") != 0) {

                        Ext.Ajax.request({
                            url: '/ActividadEvaluada/' + new_object.get("ID_ACTIVIDAD_EVALUADA"),
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            params: Ext.JSON.encode(Ext.apply({ "MEDIDAS": Ext.Array.map(grid.getStore().getRange(), function (model) { return model.get("ID_MEDIDAS_DE_CONTROL"); }) }, form.getValues())),
                            success: function (result, request) {
                                console.log(result);
                            }
                        });

                    } else {
                        storeActividadEvaluada.insert(0, new_object);
                        storeActividadEvaluada.sync();
                    }

                } else {
                    form.markInvalid(errors);
                }
                this.enable(true);
            }
        }]
    },
    /* [/EVALUACION PELIGRO] */
    /* [/FORMULARIO] */
    /* [GRID] */
		{
		xtype: 'gridpanel',
		collapsible: true,
		height: 430,
		title: 'Actividades Evaluadas',
		anchor: '100%',
		store: 'dsTempActividadEvaluada',
		autoScroll: true,
		plugins: [
            {
                ptype: 'rowexpander',
                pluginId: 'rowexpander',
                rowBodyTpl: [
                    '<div style="margin-left: 15px; margin-bottom: 10px;"><div style="margin-left: 15px; float:left;">		<h3>Medidas de Control:</h3><ol><tpl for="MEDIDAS_NAME">			<li style="margin-left: 15px">{#}. {NOM_MEDIDA_DE_CONTROL}</li>			</tpl>		</ol>	</div></div>'
                ]
            }
        ],
		listeners: {
		    afterrender: function (component, eOpts) {
		        var me = this,
                    plugin = component.getPlugin('rowexpander'),
                    view = plugin.view;

		        view.on('collapsebody', function (rowNode, record, nextBd) {
		            me.doLayout();
		        });
		        view.on('expandbody', function (rowNode, record, nextBd) {
		            if (!Ext.isDefined(rowNode.isLoaded) || rowNode.isLoaded == false) {
		                me.setLoading(true);
		                /* aGREGAR DS MEDIDADECONTROL */
		                Ext.StoreManager.lookup('dsMedidaDeControl').load({
		                    params: { 'ID_ACTIVIDAD_EVALUADA': record.get('ID_ACTIVIDAD_EVALUADA') },
		                    callback: function (records, operation, success) {
		                        var dsRecord = me.store.getById(record.get('ID_ACTIVIDAD_EVALUADA'));
		                        dsRecord.set('MEDIDAS_NAME', Ext.Array.map(records, function (record) {
		                            return { 'NOM_MEDIDA_DE_CONTROL': record.get('NOM_MEDIDA_DE_CONTROL') };
		                        }));
		                        me.setLoading(false);
		                        me.doLayout();
		                        rowNode.isLoaded = true;
		                    }
		                });
		            }
		        });
		    }
		},
		columns: [
				{
				    xtype: 'gridcolumn',
				    dataIndex: 'ID_ACTIVIDAD_ESPECIFICA',
				    flex: 0.2,
				    text: 'Actividad Especifica',
				    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
				        return record.get('NOM_ACTIVIDAD_ESPECIFICA');
				    }
				},
				{
				    xtype: 'gridcolumn',
				    dataIndex: 'ID_PELIGRO',
				    flex: 0.3,
				    text: 'Peligro',
				    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
				        return record.get('NOM_PELIGRO');
				    }
				},
				{

				    xtype: 'gridcolumn',
				    align: 'center',
				    text: 'Evaluación del Riesgo',
				    columns: [
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'VALORACION_PROBABILIDAD',
					    text: 'P',
					    "field": {
					        xtype: "combo",
					        displayField: "NOMBRE_PROBABILIDAD",
					        valueField: "ID_PROBABILIDAD",
					        anchor: "100%",
					        queryMode: 'local',
					        store: Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_PROBABILIDAD", "type": "int" },
									{ "name": "NOMBRE_PROBABILIDAD", "type": "string" }
								],
					            data: [
									{ "ID_PROBABILIDAD": 1, "NOMBRE_PROBABILIDAD": "Bajo" },
									{ "ID_PROBABILIDAD": 2, "NOMBRE_PROBABILIDAD": "Medio" },
									{ "ID_PROBABILIDAD": 3, "NOMBRE_PROBABILIDAD": "Alto" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Medio";
					                break;
					            case '3':
					                return "Alto";
					                break;
					            default:
					                return "Bajo";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'VALORACION_CONSECUENCIA',
					    text: 'C',
					    "field": {
					        "xtype": "combo",
					        "displayField": "NOMBRE_CONSECUENCIA",
					        "valueField": "ID_CONSECUENCIA",
					        "anchor": "100%",
					        queryMode: 'local',
					        "store": Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_CONSECUENCIA", "type": "int" },
									{ "name": "NOMBRE_CONSECUENCIA", "type": "string" }
								],
					            data: [
									{ "ID_CONSECUENCIA": 1, "NOMBRE_CONSECUENCIA": "Ligeramente Dañino" },
									{ "ID_CONSECUENCIA": 2, "NOMBRE_CONSECUENCIA": "Dañino" },
									{ "ID_CONSECUENCIA": 3, "NOMBRE_CONSECUENCIA": "Extremadamente Dañino" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Dañino";
					                break;
					            case '3':
					                return "Extremadamente Dañino";
					                break;
					            default:
					                return "Ligeramente Dañino";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    text: 'MR',
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        var indicador_riesgo = parseInt(record.get('VALORACION_CONSECUENCIA')) * parseInt(record.get('VALORACION_PROBABILIDAD'));
					        if (indicador_riesgo < 3) {
					            return "<span style='display: block; background-color:green;'><center><b>Bajo</b></center></span>";
					        } else if (indicador_riesgo > 5) {
					            return "<span style='display: block; background-color:red;'><center><b>Alto</b></center></span>";
					        } else {
					            return "<span style='display: block; background-color:yellow;'><center><b>Medio</b></center></span>";
					        }
					    }
					}
					]
				},
				{
				    xtype: 'gridcolumn',
				    text: 'Re Evaluación del Riesgo',
				    align: 'center',
				    columns: [
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'MEDIDA_VALORACION_PROBABILIDAD',
					    text: 'P',
					    "field": {
					        "xtype": "combo",
					        "displayField": "NOMBRE_PROBABILIDAD",
					        "valueField": "ID_PROBABILIDAD",
					        "anchor": "100%",
					        queryMode: 'local',
					        "store": Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_PROBABILIDAD", "type": "int" },
									{ "name": "NOMBRE_PROBABILIDAD", "type": "string" }
								],
					            data: [
									{ "ID_PROBABILIDAD": 1, "NOMBRE_PROBABILIDAD": "Bajo" },
									{ "ID_PROBABILIDAD": 2, "NOMBRE_PROBABILIDAD": "Medio" },
									{ "ID_PROBABILIDAD": 3, "NOMBRE_PROBABILIDAD": "Alto" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Medio";
					                break;
					            case '3':
					                return "Alto";
					                break;
					            default:
					                return "Bajo";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    dataIndex: 'MEDIDA_VALORACION_CONSECUENCIA',
					    text: 'C',
					    "field": {
					        xtype: "combo",
					        displayField: "NOMBRE_CONSECUENCIA",
					        valueField: "ID_CONSECUENCIA",
					        anchor: "100%",
					        queryMode: 'local',
					        store: Ext.create('Ext.data.Store', {
					            fields: [
									{ "name": "ID_CONSECUENCIA", "type": "int" },
									{ "name": "NOMBRE_CONSECUENCIA", "type": "string" }
								],
					            data: [
									{ "ID_CONSECUENCIA": 1, "NOMBRE_CONSECUENCIA": "Ligeramente Dañino" },
									{ "ID_CONSECUENCIA": 2, "NOMBRE_CONSECUENCIA": "Dañino" },
									{ "ID_CONSECUENCIA": 3, "NOMBRE_CONSECUENCIA": "Extremadamente Dañino" }
								]
					        })
					    },
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        switch (value.toString()) {
					            case '2':
					                return "Dañino";
					                break;
					            case '3':
					                return "Extremadamente Dañino";
					                break;
					            default:
					                return "Ligeramente Dañino";
					                break;
					        }
					    }
					},
					{
					    xtype: 'gridcolumn',
					    text: 'MRCC',
					    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
					        var indicador_riesgo_controlado = parseInt(record.get('MEDIDA_VALORACION_CONSECUENCIA')) * parseInt(record.get('MEDIDA_VALORACION_PROBABILIDAD'));
					        if (indicador_riesgo_controlado < 3) {
					            return "<span style='display: block; background-color:green;'><center><b>Bajo</b></center></span>";
					        } else if (indicador_riesgo_controlado > 5) {
					            return "<span style='display: block; background-color:red;'><center><b>Alto</b></center></span>";
					        } else {
					            return "<span style='display: block; background-color:yellow;'><center><b>Medio</b></center></span>";
					        }
					    }
					}]
				},

			],
		dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Confirmar & Guardar',
                            iconCls: 'btn-save',
                            handler: function () {
                                Ext.data.StoreManager.lookup('dsMatrizRiesgo').insert(0, {});
                                Ext.data.StoreManager.lookup('dsTempActividadEvaluada').removeAll();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Borrar Todo',
                            iconCls: 'btn-delete',
                            handler: function () {
                                Ext.data.StoreManager.lookup('dsTempActividadEvaluada').removeAll();
                            }
                        }
                    ]
                }
            ]
}
    /* [/GRID] */
		];
    me.callParent(arguments);
}
});