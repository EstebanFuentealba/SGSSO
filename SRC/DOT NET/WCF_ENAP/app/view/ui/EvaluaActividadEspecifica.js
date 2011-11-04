Ext.define('WCF_ENAP.view.ui.EvaluaActividadEspecifica', {
    extend: 'Ext.form.Panel',
    bodyPadding: 10,
    autoScroll: true,
    title: 'Evaluar Matriz',
    id: 'panel-EvaluaActividadEspecifica',
    initComponent: function () {
        var me = this,
                    winMedidas,
                    winMedida,
                    winActividadEspecifica,
                    winAddCargo,
                    tempStore,
                    isLoadedActividadEspecifica = false,
                    isLoadedPeligro = false;
        var storeActividadEspecifica = Ext.data.StoreManager.lookup('dsActividadEspecifica'),
            storePeligro = Ext.data.StoreManager.lookup('dsPeligro'),
            storeActividadEvaluada = Ext.data.StoreManager.lookup('dsActividadEvaluada'),
            storeMatrizRiesgo = Ext.data.StoreManager.lookup('dsMatrizRiesgo');


        Ext.StoreManager.lookup('dsActividadEspecifica').on('write', function (store, operation, index, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                try {
                    Ext.getCmp('cmb_evalua_actividad_especifica').select(record);
                } catch (e) { /*Cannot call method 'addCls' of null*/ }
            }
        });
        Ext.StoreManager.lookup('dsCargo').on('write', function (store, operation, index, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                try {
                    Ext.getCmp('cmb_matriz_cargo').select(record);
                } catch (e) { /*Cannot call method 'addCls' of null*/ }
            }
        });


        storeActividadEspecifica.on('load', function (store, records, options, grid) {
            isLoadedActividadEspecifica = true;
            onLoadedAll();
        });
        storePeligro.on('load', function (store, records, options, grid) {
            isLoadedPeligro = true;
            onLoadedAll();
        });
        var onLoadedAll = function () {
            if (isLoadedActividadEspecifica && isLoadedPeligro) {
                Ext.getCmp('panel-EvaluaActividadEspecifica').add({
                    xtype: 'gridpanel',
                    id: 'grid_actividades_evaluadas',
                    store: 'dsTempActividadEvaluada',
                    bodyPadding: 10,
                    height: 430,
                    title: 'Actividades Evaluadas',
                    columns: [
		            {
		                xtype: 'gridcolumn',
		                dataIndex: 'ID_ACTIVIDAD_ESPECIFICA',
		                flex: 0.2,
		                text: 'Actividad Especifica',
		                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
		                    var store = Ext.data.StoreManager.lookup('dsActividadEspecifica');
		                    var idx = store.find('ID_ACTIVIDAD_ESPECIFICA', value);
		                    return idx !== -1 ? store.getAt(idx).get('NOM_ACTIVIDAD_ESPECIFICA') : '';

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
		                            case '1':
		                                return "<span style='display: block; background-color:green;'>B</span>";
		                                break;
		                            case '2':
		                                return "<span style='display: block; background-color:yellow;'>M</span>";
		                                break;
		                            case '3':
		                                return "<span style='display: block; background-color:red;'>A</span>";
		                                break;

		                            default:
		                                return "";
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
			                        case '1':
			                            return "<span style='display: block; background-color:green;'>B</span>";
			                            break;
			                        case '2':
			                            return "<span style='display: block; background-color:yellow;'>M</span>";
			                            break;
			                        case '3':
			                            return "<span style='display: block; background-color:red;'>A</span>";
			                            break;
			                        default:
			                            return "";
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
			                    if (indicador_riesgo_controlado > 0 && indicador_riesgo_controlado < 3) {
			                        /* GREEN */
			                        return "<span style='display: block; background-color:green;'>B</span>";
			                    } else if (indicador_riesgo_controlado > 5) {
			                        /* RED */
			                        return "<span style='display: block; background-color:red;'>B</span>";
			                    } else if (indicador_riesgo_controlado >= 3 && indicador_riesgo_controlado <= 5) {
			                        /* YELLOW */
			                        return "<span style='display: block; background-color:yellow;'>B</span>";
			                    } else {
			                        return "";
			                    }
			                }
			            }
		            ]
		            }],
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
                                        //Ext.data.StoreManager.lookup('dsActividadEvaluada').insert(0, {});
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
                });
            }

        };
        var getColorByValue = function (value) {
            var colorHex = "";
            if (value == 1) {
                colorHex = "008000";
            } else if (value == 2) {
                colorHex = "FFFF00";
            } else if (value == 3) {
                colorHex = "FF0000";
            }
            return colorHex;
        };


        me.items = [
            {
                xtype: 'panel',
                margin: '0 0 0 0',
                layout: {
                    type: 'column'
                },
                collapsed: false,
                collapsible: true,
                title: 'Información Básica',
                titleCollapse: true,
                items: [
                    {
                        xtype: 'form',
                        margin: '3 3 3 3',
                        bodyPadding: 10,
                        title: 'Lugar de Actividad',
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Organización',
                                displayField: 'NOMBRE_ORGANIZACION',
                                store: 'dsOrganizacion',
                                valueField: 'ID_ORGANIZACION',
                                name: 'ID_ORGANIZACION',
                                id: 'organizacion_organizacion',
                                anchor: '100%',
                                mode: 'local',
                                editable: false,
                                allowBlank: false,
                                triggerAction: 'all',
                                emptyText: 'Selecciona una Organización',
                                listeners: {
                                    'change': function (cmb, newValue, oldValue, eOpts) {
                                        var cmbDepto = Ext.getCmp('organizacion_departamento');
                                        cmbDepto.clearValue();
                                        if (newValue != null) {
                                            Ext.data.StoreManager.lookup('dsDepartamento').load({
                                                params: { 'ID_ORGANIZACION': newValue },
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
                                        fieldLabel: 'Departamento',
                                        id: 'organizacion_departamento',
                                        displayField: 'NOMBRE_DEPARTAMENTO',
                                        store: 'dsDepartamento',
                                        valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                                        name: 'ID_DEPARTAMENTO_ORGANIZACION',
                                        anchor: '100%',
                                        editable: false,
                                        disabled: true,
                                        allowBlank: false,
                                        typeAhead: true,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        emptyText: 'Selecciona un Departamento',
                                        queryMode: 'local',
                                        lastQuery: '',
                                        selectOnFocus: true,
                                        listeners: {
                                            'change': function (cmb, newValue, oldValue, eOpts) {
                                                var cmbDiv = Ext.getCmp('organizacion_division');
                                                cmbDiv.clearValue();
                                                if (newValue != null) {
                                                    Ext.data.StoreManager.lookup('dsDivision').load({
                                                        params: { 'ID_DEPARTAMENTO': newValue },
                                                        callback: function (records, operation, success) {
                                                            cmbDiv.setDisabled(!(Ext.isArray(records) && records.length > 0));
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'División',
                                        id: 'organizacion_division',
                                        displayField: 'NOMBRE_DIVISION',
                                        store: 'dsDivision',
                                        valueField: 'ID_DIVISION',
                                        name: 'ID_DIVISION',
                                        anchor: '100%',
                                        editable: false,
                                        disabled: true,
                                        allowBlank: false,
                                        typeAhead: true,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        emptyText: 'Selecciona un División',
                                        queryMode: 'local',
                                        lastQuery: '',
                                        selectOnFocus: true,
                                        listeners: {
                                            'change': function (cmb, newValue, oldValue, eOpts) {
                                                var cmbArea = Ext.getCmp('organizacion_area');
                                                cmbArea.clearValue();
                                                if (newValue != null) {
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
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Area',
                                        displayField: 'NOMBRE_AREA',
                                        id: 'organizacion_area',
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
                        margin: '3 3 3 3',
                        bodyPadding: 10,
                        title: 'Información de Actividad',
                        columnWidth: 0.5,
                        items: [
                           {
                               xtype: 'combobox',
                               fieldLabel: 'Actividad General <a href="#" class="tooltip" data-qtip="Es el nombre con que se denomina a un conjunto de Actividades Específicas que se llevan a cabo para cumplir los objetivos de la operación">[<b>?</b>]</a>',
                               displayField: 'NOM_ACTIVIDAD_GENERAL',
                               store: 'dsActividadGeneral',
                               valueField: 'ID_ACTIVIDAD_GENERAL',
                               id: 'ID_ACTIVIDAD_GENERAL',
                               name: 'ID_ACTIVIDAD_GENERAL',
                               anchor: '100%',
                               labelWidth: 150,
                               allowBlank: false
                           },
                           {
                               xtype: 'panel',
                               border: 0,
                               margin: '0 0 0 0',
                               layout: {
                                   type: 'column'
                               },
                               title: '',
                               items: [
                                    {
                                        xtype: 'combobox',
                                        columnWidth: 0.94,
                                        fieldLabel: 'Actividad Específica <a class="tooltip" href="#" data-qtip="Es el conjunto de acciones que se llevan a cabo para cumplir con los objetivos de la Actividad General, mediante la utilización de los recursos humanos, materiales, técnicos, y financieros asignados a la actividad con un costo determinado.">[<b>?</b>]</a>',
                                        name: 'ID_ACTIVIDAD_ESPECIFICA',
                                        id: 'cmb_evalua_actividad_especifica',
                                        labelWidth: 150,
                                        anchor: '100%',
                                        store: 'dsActividadEspecifica',
                                        displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
                                        valueField: 'ID_ACTIVIDAD_ESPECIFICA',
                                        queryMode: 'local',
                                        listeners: {
                                            'select': function (element, newValue, oldValue, options) {
                                                /*
                                                TODO:
                                                Cargar la grilla Con las evaluaciones de peligros
					
                                                Ext.data.StoreManager.lookup('dsMatrizRiesgo').load({
                                                params: { 'ID_ACTIVIDAD_ESPECIFICA': newValue },
                                                callback: function (records, operation, success) {
                                                if (Ext.isArray(records) && records.length > 0) { }
                                                }
                                                });
                                                */

                                            }
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 5',
                                        iconCls: 'btn-add',
                                        columnWidth: 0.06,
                                        handler: function () {
                                            if (!winActividadEspecifica) {
                                                winActividadEspecifica = Ext.create('Ext.window.Window', {
                                                    width: 673,
                                                    closeAction: 'hide',
                                                    title: 'Ingresa una nueva Actividad Específica',
                                                    modal: true,
                                                    items: [
                                                        {
                                                            xtype: 'form',
                                                            margin: '5 5 5 5',
                                                            bodyPadding: 10,
                                                            title: 'Actividad Específica',
                                                            items: [
                                                                { "xtype": "textfield", "fieldLabel": "Nombre", "anchor": "100%", "name": "NOM_ACTIVIDAD_ESPECIFICA", allowBlank: false }
                                                            ],
                                                            buttons: [{
                                                                text: 'Agregar',
                                                                handler: function () {
                                                                    var new_object,
                                                                        errors,
                                                                        form;

                                                                    form = this.up('form').getForm();
                                                                    new_object = Ext.create('WCF_ENAP.model.ActividadEspecifica', form.getValues());
                                                                    errors = new_object.validate();

                                                                    if (errors.isValid() && form.isValid()) {
                                                                        this.disable(true);
                                                                        Ext.data.StoreManager.lookup('dsActividadEspecifica').insert(0, new_object);
                                                                        form.reset();
                                                                        winActividadEspecifica.hide();
                                                                    } else {
                                                                        form.markInvalid(errors);
                                                                    }
                                                                    this.enable(true);
                                                                }
                                                            }]
                                                        }
                                                    ]
                                                });
                                            }
                                            winActividadEspecifica.show();

                                        }
                                    }
                                ]
                           },
                           {
                               xtype: 'panel',
                               border: 0,
                               layout: {
                                   type: 'column'
                               },
                               items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmb_matriz_cargo',
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
                                        if (!winAddCargo) {
                                            winAddCargo = Ext.create('Ext.window.Window', {
                                                modal: true,
                                                closeAction: 'hide',
                                                title: 'Agrega Cargo',
                                                width: 600,
                                                items: [
                                                    {
                                                        xtype: 'form',

                                                        id: 'Form_Cargo',
                                                        margin: '5 5 5 5',
                                                        bodyPadding: 10,
                                                        title: 'Datos del Cargo',
                                                        items: [{ "xtype": "textfield", "fieldLabel": "Nombre Cargo", "anchor": "100%", "name": "NOMBRE_CARGO", "labelWidth": 120}],
                                                        buttons: [{
                                                            text: 'Agregar',
                                                            handler: function () {
                                                                var new_object,
                                                                    errors,
                                                                    form;

                                                                form = this.up('form').getForm();
                                                                new_object = Ext.create('WCF_ENAP.model.Cargo', form.getValues());
                                                                errors = new_object.validate();

                                                                if (errors.isValid() && form.isValid()) {
                                                                    this.disable(true);
                                                                    Ext.data.StoreManager.lookup('dsCargo').insert(0, new_object);
                                                                    form.reset();
                                                                    winAddCargo.hide();
                                                                } else {
                                                                    form.markInvalid(errors);
                                                                }
                                                                this.enable(true);
                                                            }
                                                        }]
                                                    }
                                                ]

                                            });

                                        }
                                        winAddCargo.show();
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
                                        Ext.getCmp('cmb_peligro_evalua').setDisabled(false);
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'form',
                margin: '3 0 3 0',
                bodyPadding: 10,
                collapsible: true,
                title: 'Evaluación de Riesgo Puro y con Medidas Asociadas',
                titleCollapse: true,
                items: [{
                    xtype: 'combobox',
                    margin: '5 5 5 5',
                    id: 'cmb_peligro_evalua',
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
                            /*
                            TODO: load record en formulario
                            */
                            var record = this.store.getById(newValue);
                            Ext.getCmp('form_evalua_peligro').getForm().loadRecord(record);
                            Ext.getCmp('form_re_evaluacion').getForm().loadRecord(record);
                            Ext.getCmp('form_evalua_peligro').setDisabled(false);
                        }
                    }
                },

            {
                xtype: 'panel',
                margin: '3 0 0 0',
                border: 0,
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'form',
                        id: 'form_evalua_peligro',
                        disabled: true,
                        margin: '3 3 3 3',
                        bodyPadding: 10,
                        title: 'Evaluacion del Riesgo',
                        columnWidth: 1 / 3,
                        items: [
                        {
                            xtype: 'radiogroup',
                            id: 'radio_probabilidad_puro',
                            layout: {
                                type: 'anchor'
                            },
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
                                    if (Ext.getCmp('radio_probabilidad_puro').isValid() && Ext.getCmp('radio_consecuencia_puro').isValid()) {
                                        Ext.getCmp('grid-asigna-medidas').setDisabled(false);
                                    } else {
                                        Ext.getCmp('grid-asigna-medidas').setDisabled(true);
                                    }
                                    /*
                                    TODO: Colorear
                                    */
                                    /*
                                    var probabilidad = parseInt(Ext.getCmp('radio_probabilidad_puro').getValue().VALORACION_PROBABILIDAD),
                                    consecuencia = parseInt(Ext.getCmp('radio_consecuencia_puro').getValue());
                                    if (Ext.getCmp('radio_probabilidad_puro').isValid() && Ext.getCmp('radio_consecuencia_puro').isValid()) {
                                    try {
                                    var indicador_riesgo = parseInt(Ext.getCmp('radio_probabilidad_puro').getValue()) * parseInt(Ext.getCmp('radio_consecuencia_puro').getValue());

                                    if (indicador_riesgo < 3) {
                                    console.log("RIESGO VERDE");
                                    } else if (indicador_riesgo > 5) {
                                    console.log("RIESGO ROJO");
                                    } else {
                                    console.log("RIESGO AMARILLO");
                                    }
                                    Ext.getCmp('grid-asigna-medidas').setDisabled(false);
                                    } catch (e) { }
                                    } else {
                                    Ext.getCmp('form_evalua_peligro').body.highlight(getColorByValue(probabilidad), { attr: 'backgroundColor', duration: 2000 });
                                    Ext.getCmp('grid-asigna-medidas').setDisabled(true);
                                    }
                                    */

                                }
                            }
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'radio_consecuencia_puro',
                            layout: {
                                type: 'anchor'
                            },
                            fieldLabel: 'Consecuencia <a href="#" class="tooltip" data-qtip="Es la severidad de las consecuencia basadas en la experiencia, historia y apreciación del evaluador; para ello se ha definido los siguientes criterios: <ul><li><b>Ligeramente Dañino</b>: Lesiones superficiales, cortes y magulladuras pequeñas, irritación de los ojos, que impliquen accidentes sin tiempo perdido.</li><li><b>Dañino</b>: Quemaduras, torceduras importantes, fracturas menores, laceraciones, contusiones, dermatitis, trastornos músculo-esqueléticos, que impliquen accidentes con tiempo perdido.</li><li><b>Extremadamente Dañino</b>: Amputaciones, fracturas mayores, intoxicaciones, lesiones múltiples, lesiones fatales, que impliquen incapacidad permanente.</li></ul>">[<b>?</b>]</a>',
                            allowBlank: false,
                            labelAlign: 'top',
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
                                    if (Ext.getCmp('radio_probabilidad_puro').isValid() && Ext.getCmp('radio_consecuencia_puro').isValid()) {
                                        Ext.getCmp('grid-asigna-medidas').setDisabled(false);
                                    } else {
                                        Ext.getCmp('grid-asigna-medidas').setDisabled(true);
                                    }
                                    /*
                                    var probabilidad = parseInt(Ext.getCmp('radio_probabilidad_puro').getValue()),
                                    consecuencia = parseInt(Ext.getCmp('radio_consecuencia_puro').getValue());


                                    if (Ext.getCmp('radio_probabilidad_puro').isValid() && Ext.getCmp('radio_consecuencia_puro').isValid()) {
                                    try {
                                    var indicador_riesgo = parseInt(Ext.getCmp('radio_probabilidad_puro').getValue()) * parseInt(Ext.getCmp('radio_consecuencia_puro').getValue());

                                    if (indicador_riesgo < 3) {
                                    console.log("RIESGO VERDE");
                                    } else if (indicador_riesgo > 5) {
                                    console.log("RIESGO ROJO");

                                    } else {
                                    console.log("RIESGO AMARILLO");
                                    }
                                    Ext.getCmp('grid-asigna-medidas').setDisabled(false);
                                    } catch (e) { }
                                    } else {
                                    Ext.getCmp('form_evalua_peligro').body.highlight(getColorByValue(consecuencia), { attr: 'backgroundColor', duration: 10000 });
                                    Ext.getCmp('grid-asigna-medidas').setDisabled(true);
                                    }
                                    */
                                }
                            }
                        }
                    ]
                    },
                {
                    xtype: 'gridpanel',
                    /*
                    TODO:
                    Aqui debe ir el store de MedidaPeligro
                    */
                    store: 'dsPeligroMedida',
                    id: 'grid-asigna-medidas',
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
                            Ext.getCmp('btn_delete_medida_asignar').setDisabled(selections.length === 0);
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
                                        if (!winMedidas) {
                                            winMedidas = Ext.create('Ext.window.Window', {
                                                width: 673,
                                                closeAction: 'hide',
                                                maximizable: true,
                                                title: 'Medidas de Control',
                                                listeners: {
                                                    resize: function (win, width, height, options) {
                                                        Ext.getCmp('grid-medidas-de-control').setHeight(height - 40);
                                                        Ext.getCmp('grid-medidas-de-control').doLayout();
                                                    }
                                                },
                                                modal: true,
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'grid-medidas-de-control',
                                                        height: 300,
                                                        autoScroll: true,
                                                        store: 'dsMedidaDeControl',
                                                        margin: '5 5 5 5',
                                                        title: 'Selecciona las Medidas a tomar',
                                                        columns: [

                                                            {
                                                                xtype: 'gridcolumn',
                                                                flex: 1,
                                                                dataIndex: 'NOM_MEDIDA_DE_CONTROL',
                                                                text: 'Medida de Control',
                                                                filter: {
                                                                    type: 'string'
                                                                    // specify disabled to disable the filter menu
                                                                    //, disabled: true
                                                                }
                                                            }
                                                        ],
                                                        viewConfig: {

                                                    },
                                                    features: [{
                                                        ftype: 'filters',
                                                        // encode and local configuration options defined previously for easier reuse
                                                        encode: false, // json encode the filter query
                                                        local: true,   // defaults to false (remote filtering)

                                                        // Filters are most naturally placed in the column definition, but can also be
                                                        // added here.
                                                        filters: [
                                                            {
                                                                type: 'boolean',
                                                                dataIndex: 'visible'
                                                            }
                                                        ]
                                                    }],
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                        checkOnly: true,
                                                        allowDeselect: true,
                                                        listeners: {
                                                            selectionchange: function (sm, selections) {

                                                                if (selections.length == 0) {
                                                                    Ext.getCmp('form_re_evaluacion').setDisabled(true);
                                                                } else {
                                                                    Ext.getCmp('form_re_evaluacion').setDisabled(false);
                                                                }
                                                                Ext.getCmp('grid-asigna-medidas').getStore().loadData(selections);
                                                            }
                                                        }
                                                    }),
                                                    dockedItems: [
                                                            {
                                                                xtype: 'toolbar',
                                                                dock: 'top',
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        text: 'Agregar',
                                                                        iconCls: 'btn-add',
                                                                        handler: function () {
                                                                            /*
                                                                            TODO: Ventana para Agregar Medida de Control
                                                                            */
                                                                            if (!winMedida) {
                                                                                winMedida = Ext.create('Ext.window.Window', {
                                                                                    width: 673,
                                                                                    closeAction: 'hide',
                                                                                    title: 'Medidas de Control',
                                                                                    modal: true,
                                                                                    items: [{
                                                                                        xtype: 'form',
                                                                                        margin: '5 5 5 5',
                                                                                        bodyPadding: 10,
                                                                                        title: 'Agrega Medida de Control',
                                                                                        items: [{ "xtype": "textfield", "fieldLabel": "Nom Medida De Control", "anchor": "100%", "name": "NOM_MEDIDA_DE_CONTROL"}],
                                                                                        buttons: [{
                                                                                            text: 'Agregar',
                                                                                            handler: function () {
                                                                                                var new_object,
                                                                                                    errors,
                                                                                                    form;

                                                                                                form = this.up('form').getForm();
                                                                                                new_object = Ext.create('WCF_ENAP.model.MedidaDeControl', form.getValues());
                                                                                                errors = new_object.validate();

                                                                                                if (errors.isValid() && form.isValid()) {
                                                                                                    this.disable(true);
                                                                                                    Ext.data.StoreManager.lookup('dsMedidaDeControl').insert(0, new_object);
                                                                                                    form.reset();
                                                                                                } else {
                                                                                                    form.markInvalid(errors);
                                                                                                }
                                                                                                this.enable(true);
                                                                                            }
                                                                                        }]
                                                                                    }]
                                                                                });
                                                                            }
                                                                            winMedida.show();
                                                                            /* FIN AGREGAR MEDIDA */
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'toolbar',
                                                                dock: 'bottom',
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        text: 'Guardar',
                                                                        iconCls: 'btn-save',
                                                                        handler: function () {
                                                                            winMedidas.hide();

                                                                            //Ext.getCmp('grid-asigna-medidas').getStore().loadData(Ext.getCmp('grid-medidas-de-control').getSelectionModel())
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                }
                                                ]
                                            });
                                        }
                                        if (winMedidas.isVisible()) {
                                            winMedidas.hide();
                                        } else {
                                            winMedidas.show();
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'btn_delete_medida_asignar',
                                    iconCls: 'btn-delete',
                                    text: 'Eliminar',
                                    handler: function () {
                                        var selection = Ext.getCmp('grid-asigna-medidas').getSelectionModel().getSelection()[0];
                                        if (selection) {
                                            Ext.getCmp('grid-asigna-medidas').getStore().remove(selection);
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: 'form_re_evaluacion',
                    disabled: true,
                    margin: '3 3 3 3',
                    bodyPadding: 10,
                    title: 'Re Evaluar',
                    columnWidth: 1 / 3,
                    items: [
                        {
                            xtype: 'radiogroup',
                            layout: {
                                type: 'anchor'
                            },
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
                            layout: {
                                type: 'anchor'
                            },
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
                ], buttons: [{
                    text: 'Guardar Evaluación',
                    iconCls: 'btn-add-save',
                    handler: function () {

                        var new_object,
									errors,
									form;
                        var temp_matriz = Ext.isArray(Ext.util.Cookies.get('nuevamatriz')) ? Ext.util.Cookies.get('nuevamatriz') : [];
                        form = Ext.getCmp('panel-EvaluaActividadEspecifica').getForm();

                        Ext.getCmp('grid-asigna-medidas').getSelectionModel().selectAll();
                        var medidas_asignadas = Ext.getCmp('grid-asigna-medidas').getSelectionModel().getSelection();
                        Ext.getCmp('grid-asigna-medidas').getSelectionModel().deselectAll();

                        var post_medidas = [];
                        Ext.Array.each(medidas_asignadas, function (name, index, media) {
                            post_medidas.push(name.get('ID_MEDIDAS_DE_CONTROL'));
                        });


                        new_object = Ext.create('WCF_ENAP.model.TempActividadEvaluada', Ext.apply({ "MEDIDAS": post_medidas }, form.getValues()));

                        errors = new_object.validate();

                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);

                            Ext.data.StoreManager.lookup('dsTempActividadEvaluada').insert(0, new_object);
                            Ext.getCmp('grid-medidas-de-control').getSelectionModel().deselectAll();
                            Ext.getCmp('form_evalua_peligro').getForm().reset();
                            Ext.getCmp('form_re_evaluacion').getForm().reset();
                            Ext.getCmp('cmb_peligro_evalua').reset();
                        } else {
                            form.markInvalid(errors);
                        }

                        this.enable(true);
                    }
                }]
            }]
            }

        ];
        me.callParent(arguments);


        storeActividadEspecifica.on('write', function (store, operation, options) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                //Ext.getCmp('cmb_evalua_actividad_especifica').select(record);
            }
        });
        storeMatrizRiesgo.on('write', function (store, operation, options) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
                if (record.get('ID_MATRIZ')) {
                    var idNuevaMatriz = record.get('ID_MATRIZ');
                    var winOk = Ext.create('Ext.window.Window', {
                        width: 673,
                        title: 'Agregado con éxito',
                        modal: true,
                        items: [
                        {
                            xtype: 'label',
                            height: 14,
                            margin: '10 10 10 10',
                            width: 47,
                            text: 'Se guardó la matriz con éxito, ¿ Quieres Descargar un Documento ?'
                        },
                        {
                            xtype: 'panel',
                            frame: true,
                            margin: '5 5 5 5',
                            layout: {
                                type: 'column'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    text: 'Planilla de Reconocimiento de Riesgo',
                                    columnWidth: 0.5,
                                    iconCls: 'matriz-icon',
                                    handler: function () {
                                        window.location = "/utils/Export-Planilla.aspx?ID_MATRIZ=" + idNuevaMatriz;
                                        Ext.Msg.alert('Advertencia', 'Espera un momento mientras se genera el documento, ésto puede tardar varios segundos.');
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    text: 'Matriz de Riesgo',
                                    /* disabled: function () {
                                    if (record.get('MEDIDA_VALORACION_CONSECUENCIA') == 0 || record.get('MEDIDA_VALORACION_PROBABILIDAD') == 0) {
                                    return true;
                                    }
                                    return false;
                                    },*/
                                    columnWidth: 0.5,
                                    iconCls: 'matriz-icon',
                                    handler: function () {
                                        window.location = "/utils/Export-Matriz.aspx?ID_MATRIZ=" + idNuevaMatriz;
                                        Ext.Msg.alert('Advertencia', 'Espera un momento mientras se genera el documento, ésto puede tardar varios segundos.');
                                    }
                                }
                            ]
                        }

                        ]
                    });
                    winOk.show();
                }
            }
        });

    }
});