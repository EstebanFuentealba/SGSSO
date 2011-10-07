Ext.define('WCF_ENAP.view.ui.MatrizRiesgo', {
    extend: 'Ext.panel.Panel',
    maximizable: true,
    width: 905,
    bodyPadding: 10,
    autoScroll: true,
    title: 'Crea Matriz de Riesgo',
    id: 'panel-MatrizRiesgo',
    initComponent: function () {
        var me = this;
        var winMedidas;
        me.items = [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                items: [
                   {
                       xtype: 'panel',
                       margin: '',
                       title: 'Paso 1',
                       items: [{
                           xtype: 'form',
                           id: 'form_nueva_actividad',
                           title: 'Nueva Actividad Específica',
                           margin: '5 5 5 5',
                           layout: 'column',
                           items: [
                                {
                                    xtype: 'form',
                                    columnWidth: 1 / 2,
                                    margin: '5 5 5 5',
                                    bodyPadding: 10,
                                    title: 'Lugar de La Actividad',
                                    collapsible: true,
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
                                        id: 'organizacion_departamento',
                                        displayField: 'NOMBRE_DEPARTAMENTO',
                                        store: 'dsDepartamento',
                                        valueField: 'ID_DEPARTAMENTO',
                                        name: 'ID_DEPARTAMENTO',
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
                                columnWidth: 1 / 2,
                                margin: '5 5 5 5',
                                bodyPadding: 10,
                                collapsible: true,
                                title: 'Datos de Actividad',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'General',
                                        displayField: 'NOM_ACTIVIDAD_GENERAL',
                                        store: 'dsActividadGeneral',
                                        valueField: 'ID_ACTIVIDAD_GENERAL',
                                        name: 'ID_ACTIVIDAD_GENERAL',
                                        anchor: '100%',
                                        allowBlank: false
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Específica',
                                        anchor: '100%',
                                        name: 'NOM_ACTIVIDAD_ESPECIFICA',
                                        allowBlank: false
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Cargo',
                                        store: 'dsRol',
                                        displayField: 'NOM_ROL',
                                        valueField: 'ID_ROL',
                                        anchor: '100%',
                                        name: 'ID_ROL',
                                        allowBlank: false
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        fieldLabel: 'Es',
                                        allowBlank: false,
                                        items: [
                                            {
                                                xtype: 'radiofield',
                                                name: 'ID_CONDICION',
                                                boxLabel: 'Rutinario',
                                                inputValue: 1
                                            },
                                            {
                                                xtype: 'radiofield',
                                                name: 'ID_CONDICION',
                                                boxLabel: 'No Rutinario',
                                                inputValue: 2
                                            },
                                            {
                                                xtype: 'radiofield',
                                                name: 'ID_CONDICION',
                                                fieldLabel: '',
                                                boxLabel: 'Emergencia',
                                                inputValue: 3
                                            }
                                        ]
                                    }
                                ]
                            }],
                           buttons: [{
                               text: 'Agregar',
                               handler: function () {
                                   var new_object,
                                                errors,
                                                form;

                                   form = Ext.getCmp('form_nueva_actividad').getForm();
                                   new_object = Ext.create('WCF_ENAP.model.ActividadEspecifica', form.getValues());
                                   errors = new_object.validate();

                                   if (errors.isValid() && form.isValid()) {
                                       this.disable(true);

                                       Ext.data.StoreManager.lookup('dsActividadEspecifica').insert(0, new_object);
                                       //form.reset();
                                   } else {
                                       form.markInvalid(errors);
                                   }
                                   this.enable(true);
                               }
                           }]
                       },
                            {
                                xtype: 'gridpanel',
                                margin: '5 5 5 5',
                                title: 'Listado de Actividades',
                                store: 'dsActividadEspecifica',
                                viewConfig: {

                            },
                            dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'dsActividadEspecifica',
                                        dock: 'bottom'
                                    }
                                ],
                            columns: [
                                    {
                                        xtype: 'numbercolumn',
                                        dataIndex: 'ID_ACTIVIDAD_ESPECIFICA',
                                        text: 'ID',
                                        flex: 0.1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ID_ACTIVIDAD_GENERAL',
                                        text: 'Actividad General',
                                        flex: 0.2,
                                        field: {
                                            "xtype": "combo",
                                            "displayField": "NOM_ACTIVIDAD_GENERAL",
                                            "valueField": "ID_ACTIVIDAD_GENERAL",
                                            "anchor": "100%",
                                            "store": "dsActividadGeneral",
                                            "name": "ID_ACTIVIDAD_GENERAL"
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ACTIVIDAD_GENERAL', value.toString());
                                            return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOM_ACTIVIDAD_GENERAL') : ''
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ID_ROL',
                                        flex: 0.2,
                                        text: 'Rol',
                                        field: {
                                            "xtype": "combo",
                                            "displayField": "NOM_ACTIVIDAD_GENERAL",
                                            "valueField": "ID_ROL",
                                            "anchor": "100%",
                                            "store": "dsRol",
                                            "name": "ID_ROL"
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ROL', value.toString());
                                            return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOM_ROL') : ''
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ID_CONDICION',
                                        text: 'Condición',
                                        flex: 0.2,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            switch (value.toString()) {
                                                case '1':
                                                    return "Rutinario";
                                                    break;
                                                case '2':
                                                    return "No Rutinario";
                                                    break;
                                                default:
                                                    return "Emergencia";
                                                    break;
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'NOM_ACTIVIDAD_ESPECIFICA',
                                        text: 'Actividad Especifica',
                                        flex: 0.3
                                    }
                                ]
                        }
                        ],
                       buttons: [{
                           text: 'Siguiente',
                           handler: function () {
                               var new_object,
                                errors,
                                form;

                               this.up('tabpanel').getComponent(1).setDisabled(false);
                               this.up('tabpanel').setActiveTab(1);

                               this.enable(true);
                           }
                       }]
                   },
                   {
                       xtype: 'panel',
                       disabled: true,
                       margin: '',
                       title: 'Paso 2',
                       items: [
                        {
                                    xtype: 'form',
                                    margin: '5 5 5 5',
                                    bodyPadding: 10,
                                    title: 'Lugar de La Actividad',
                                    collapsible: true,
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
                                        id: 'organizacion_departamento',
                                        displayField: 'NOMBRE_DEPARTAMENTO',
                                        store: 'dsDepartamento',
                                        valueField: 'ID_DEPARTAMENTO',
                                        name: 'ID_DEPARTAMENTO',
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
                                },{
                            xtype: 'form',
                            id: 'form_evalua_peligro_actividad',
                            margin: '5 5 5 5',
                            bodyPadding: 10,
                            collapsed: false,
                            collapsible: true,
                            title: 'Evalua Peligros de una Actividad',
                            titleCollapse: true,
                            items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Actividad General',
                                        displayField: 'NOM_ACTIVIDAD_GENERAL',
                                        store: 'dsActividadGeneral',
                                        valueField: 'ID_ACTIVIDAD_GENERAL',
                                        name: 'ID_ACTIVIDAD_GENERAL',
                                        anchor: '100%',
                                        labelWidth: 150,
                                        allowBlank: false
                                    },
        {
            xtype: 'combobox',
            fieldLabel: 'Actividad Específica',
            name: 'ID_ACTIVIDAD_ESPECIFICA',
            labelWidth: 150,
            anchor: '100%',
            store: 'dsActividadEspecifica',
            displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
            valueField: 'ID_ACTIVIDAD_ESPECIFICA',
            listeners: {
                'change': function (element, newValue, oldValue, options) {
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
                    Ext.getCmp('cmb_peligro_evalua').setDisabled(false);
                }
            }
        },
        {
            xtype: 'combobox',
            id: 'cmb_peligro_evalua',
            disabled: true,
            fieldLabel: 'Peligro',
            labelWidth: 150,
            anchor: '100%',
            store: 'dsPeligro',
            displayField: 'NOM_PELIGRO',
            valueField: 'ID_PELIGRO',
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
            border: 0,
            layout: {
                type: 'column'
            },
            title: '',
            items: [
                {
                    xtype: 'form',
                    id: 'form_evalua_peligro',
                    disabled: true,
                    margin: '0 0 0 3',
                    bodyPadding: 10,
                    title: 'Evaluacion del Riesgo',
                    columnWidth: 1 / 3,
                    items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'ID Peligro',
                            name: 'ID_PELIGRO',
                            labelAlign: 'top',
                            anchor: '100%'
                        }, {
                            xtype: 'textfield',
                            id: 'txt_nombre_peligro_riesgo',
                            fieldLabel: 'Nombre Peligro',
                            name: 'NOM_PELIGRO',
                            labelAlign: 'top',
                            anchor: '100%'
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'radio_probabilidad_puro',
                            layout: {
                                type: 'anchor'
                            },
                            fieldLabel: 'Probabilidad',
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

                                        /*
                                        TODO: Colorear
                                        */
                                        var indicador_riesgo = parseInt(Ext.getCmp('radio_probabilidad_puro').getValue()) * parseInt(Ext.getCmp('radio_consecuencia_puro').getValue());
                                        if (indicador_riesgo < 3) {
                                            /* GREEN */
                                            console.log("RIESGO VERDE");
                                        } else if (indicador_riesgo > 5) {
                                            /* RED */
                                            console.log("RIESGO ROJO");
                                        } else {
                                            /* YELLOW */
                                            console.log("RIESGO AMARILLO");
                                        }
                                    } else {
                                        Ext.getCmp('grid-asigna-medidas').setDisabled(true);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'radio_consecuencia_puro',
                            layout: {
                                type: 'anchor'
                            },
                            fieldLabel: 'Consecuencia',
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
                    height: 285,
                    margin: '0 0 0 3',
                    autoScroll: true,
                    title: 'Asigna Medidas de Control',
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
                                    text: 'Agregar',
                                    handler: function () {
                                        if (!winMedidas) {
                                            winMedidas = Ext.create('Ext.window.Window', {
                                                width: 673,
                                                closeAction: 'hide',
                                                title: 'Medidas de Control',
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
                                                                text: 'Medida de Control'
                                                            }
                                                        ],
                                                        viewConfig: {

                                                    },
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {
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
                                                                dock: 'bottom',
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        text: 'Guardar',
                                                                        handler: function () {
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
                    margin: '0 0 0 3',
                    bodyPadding: 10,
                    title: 'Re Evaluar',
                    columnWidth: 1 / 3,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nombre Peligro',
                            name: 'NOM_PELIGRO',
                            labelAlign: 'top',
                            anchor: '100%'
                        },
                        {
                            xtype: 'radiogroup',
                            layout: {
                                type: 'anchor'
                            },
                            fieldLabel: 'Probabilidad',
                            labelAlign: 'top',
                            allowBlank: false,
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
                            allowBlank: false,
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
            ]
        }
    ],
                            buttons: [{
                                text: 'Siguiente',
                                handler: function () {
                                    /* */
                                    var new_object,
									errors,
									form;

                                    form = Ext.getCmp('form_evalua_peligro_actividad').getForm();

                                    Ext.getCmp('grid-asigna-medidas').getSelectionModel().selectAll();
                                    var medidas_asignadas = Ext.getCmp('grid-asigna-medidas').getSelectionModel().getSelection();
                                    Ext.getCmp('grid-asigna-medidas').getSelectionModel().deselectAll();

                                    var post_medidas = [];
                                    Ext.Array.each(medidas_asignadas, function (name, index, media) {
                                        post_medidas.push(name.get('ID_MEDIDAS_DE_CONTROL'));
                                    });


                                    new_object = Ext.create('WCF_ENAP.model.MatrizRiesgo', Ext.apply({ "MEDIDAS": post_medidas }, form.getValues()));
                                    errors = new_object.validate();

                                    if (errors.isValid() && form.isValid()) {
                                        this.disable(true);
                                        Ext.data.StoreManager.lookup('dsMatrizRiesgo').insert(0, new_object);
                                        //form.reset();
                                    } else {
                                        form.markInvalid(errors);
                                    }

                                    this.enable(true);
                                }
                            }]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_actividades_evaluadas',
                            store: 'dsMatrizRiesgo',
                            margin: '5 5 5 5',
                            height: 430,
                            title: 'Actividades Evaluadas',
                            columns: [
        {

            xtype: 'gridcolumn',
            dataIndex: 'ID_ACTIVIDAD_ESPECIFICA',
            flex: 0.2,
            text: 'Actividad Especifica',
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                return record.get("NOM_ACTIVIDAD_ESPECIFICA");
                /*var idx = Ext.data.StoreManager.lookup('dsMatrizRiesgo').find('ID_ACTIVIDAD_ESPECIFICA', value.toString());
                var stest = Ext.data.StoreManager.lookup('dsActividadEspecifica');
                console.log(stest);
                var nombre_peligro = stest.getAt(idx).get("NOM_ACTIVIDAD_ESPECIFICA");
                return idx !== -1 ? nombre_peligro : ''
                */
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'ID_PELIGRO',
            flex: 0.3,
            text: 'Peligro',
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                console.log(record);
                return record.get("NOM_PELIGRO");
                /*console.log(value);
                var idx = Ext.data.StoreManager.lookup('dsPeligro').find('ID_PELIGRO', value.toString());
                var stest = Ext.data.StoreManager.lookup('dsPeligro');
                console.log(stest);
                var nombre_peligro = stest.getAt(idx).get("NOM_PELIGRO");
                return idx !== -1 ? nombre_peligro : ''
                */
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
                    align: 'center',
                    text: 'Medidas de Control',
                    flex: 0.2,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        /*
                        Ext.data.StoreManager.lookup('dsPeligroMedida').load({
                        params: { 'ID_MATRIZ_RIESGO': record.get('ID_MATRIZ_RIESGO') },
                        callback: function (records, operation, success) {
                        if (Ext.isArray(records) && records.length > 0) {
                        var retorna_list = "<ul>";
                        Ext.Array.each(records, function (name, index, data) {
                        var nombre = Ext.data.StoreManager.lookup('dsMedidaDeControl').getAt(index).get("NOM_MEDIDA_DE_CONTROL");
                        retorna_list +="<li>"+nombre+"</li>";
                        });
                        retorna_list = "</ul>";
                        console.log(retorna_list)
                        }
                        }
                        });
                        */
                    }
                }, {

                    xtype: 'gridcolumn',
                    text: 'Re Evaluación del Riesgo',
                    align: 'center',
                    columns: [
                {
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
                        /*{
                        xtype: 'pagingtoolbar',
                        width: 360,
                        displayInfo: true,
                        dock: 'bottom'
                        }*/
    ]
                    }
                        ]
                   }
                /*,
                {
                xtype: 'panel',
                margin: '',
                title: 'Paso 2',
                items: [
                {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                id: 'form-evaluacion-riesgos-puros',
                title: 'Evaluación de Riesgos Puros',
                items: [
                {
                xtype: 'hiddenfield',
                labelAlign: 'top',
                anchor: '100%',
                name: 'MEDIDA_ID_VALORACION_CONSECUENCIA',
                value: null
                },
                {
                xtype: 'hiddenfield',
                labelAlign: 'top',
                anchor: '100%',
                name: 'MEDIDA_ID_VALORACION_PROBABILIDAD',
                value: null
                },
                {
                xtype: 'combobox',
                fieldLabel: 'Actividad Específica',
                labelWidth: 150,
                name: 'ID_ACTIVIDAD_ESPECIFICA',
                displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
                store: 'dsActividadEspecifica',
                valueField: 'ID_ACTIVIDAD_ESPECIFICA',
                anchor: '100%',
                listeners: {
                'change': function (element, newValue, oldValue, options) {
                Ext.data.StoreManager.lookup('dsMatrizRiesgo').load({
                params: { 'ID_ACTIVIDAD_ESPECIFICA': newValue },
                callback: function (records, operation, success) {
                if (Ext.isArray(records) && records.length > 0) {
                }
                }
                });
                Ext.getCmp('grid-peligros-actividad').setDisabled(false);

                }
                }
                },
                {
                xtype: 'panel',
                border: 0,
                height: 348,
                defaults: {
                flex: 1
                },
                layout: {
                align: 'stretch',
                padding: 5,
                type: 'hbox'
                },
                title: '',
                items: [
                {
                xtype: 'gridpanel',
                disabled: true,
                title: 'Peligros de la Actividad',
                store: 'dsPeligro',
                id: 'grid-peligros-actividad',

                viewConfig: {
                plugins: [
                Ext.create('Ext.grid.plugin.DragDrop', {
                ddGroup: 'firstGridDDGroup'
                })
                ]
                },
                columns: [
                {
                xtype: 'gridcolumn',
                hidden: true,
                dataIndex: 'ID_PELIGRO',
                text: 'ID_PELIGRO'
                },
                {
                xtype: 'gridcolumn',
                dataIndex: 'NOM_PELIGRO',
                flex: 1,
                text: 'Peligro'
                }
                ],
                listeners: {
                'selectionchange': function (selModel, records) {
                this.up('panel').down('form').setDisabled(false);
                if (records[0]) {
                Ext.getCmp('grid-evalua-peligro').getForm().loadRecord(records[0]);
                }
                }
                }
                },
                {
                xtype: 'form',
                disabled: true,
                margin: '0 0 0 3',
                bodyPadding: 10,
                title: 'Evaluar Peligro',
                id: 'grid-evalua-peligro',
                flex: 1,
                items: [
                {
                xtype: 'hiddenfield',
                fieldLabel: 'Id Peligro',
                labelAlign: 'top',
                anchor: '100%',
                name: 'ID_PELIGRO'
                },
                {
                xtype: 'textfield',
                fieldLabel: 'Nombre Peligro',
                labelAlign: 'top',
                anchor: '100%',
                name: 'NOM_PELIGRO',
                disabled: true
                },
                {
                xtype: 'radiogroup',
                layout: {
                type: 'anchor'
                },
                allowBlank: false,
                fieldLabel: 'Probabilidad',
                labelAlign: 'top',
                anchor: '',
                items: [
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Bajo',
                inputValue: 1
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Medio',
                inputValue: 2
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Alto',
                inputValue: 3
                }
                ]
                },
                {
                xtype: 'radiogroup',
                layout: {
                type: 'anchor'
                },
                allowBlank: false,
                fieldLabel: 'Consecuencia',
                labelAlign: 'top',
                items: [
                {
                xtype: 'radiofield',
                name: 'VALORACION_CONSECUENCIA',
                boxLabel: 'Ligeramente Dañino',
                inputValue: 1
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_CONSECUENCIA',
                boxLabel: 'Dañino',
                inputValue: 2
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_CONSECUENCIA',
                fieldLabel: '',
                boxLabel: 'Extremadamente Dañino',
                anchor: '100%',
                inputValue: 3
                }
                ]
                }
                ],
                buttons: [{
                text: 'Agregar',
                handler: function () {
                var new_object,
                errors,
                form;
                form = Ext.getCmp('form-evaluacion-riesgos-puros').getForm();
                console.log(form.getValues());

                new_object = Ext.create('WCF_ENAP.model.MatrizRiesgo', form.getValues());
                errors = new_object.validate();

                if (errors.isValid() && form.isValid()) {
                this.disable(true);
                Ext.data.StoreManager.lookup('dsMatrizRiesgo').insert(0, new_object);
                form.reset();
                } else {
                form.markInvalid(errors);
                }
                this.enable(true);
                }
                }]
                },
                {
                xtype: 'gridpanel',
                margin: '0 0 0 3',
                title: 'Peligros Evaluados',
                store: 'dsMatrizRiesgo',
                viewConfig: {
                },
                columns: [
                {
                xtype: 'gridcolumn',
                dataIndex: 'ID_PELIGRO',
                text: 'Peligro',
                flex: .8,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                var idx = Ext.data.StoreManager.lookup('dsMatrizRiesgo').find('ID_PELIGRO', value.toString());
                console.log(idx);
                return idx !== -1 ? Ext.data.StoreManager.lookup('dsPeligro').getAt(idx).get('NOM_PELIGRO') : ''
                }
                },
                {
                xtype: 'gridcolumn',
                dataIndex: 'VALORACION_PROBABILIDAD',
                text: 'P',
                flex: .1,
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
                flex: .1,
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
                }
                ]
                }
                ]
                }
                ]
                }
                ],
                buttons: [{
                text: 'Anterior',
                handler: function () {
                var new_object,
                errors,
                form;

                this.up('tabpanel').getComponent(0).setDisabled(false);
                this.up('tabpanel').setActiveTab(0);

                this.enable(true);
                }
                }, {
                text: 'Siguiente',
                handler: function () {
                var new_object,
                errors,
                form;

                this.up('tabpanel').getComponent(2).setDisabled(false);
                this.up('tabpanel').setActiveTab(2);

                this.enable(true);
                }
                }]
                },
                {
                xtype: 'panel',
                margin: '',
                title: 'Paso 3',
                items: [
                {
                xtype: 'form',
                height: 491,
                margin: '5 5 5 5',
                bodyPadding: 10,
                title: 'Re evaluación de Magnitud de Riesgo',
                items: [
                {
                xtype: 'combobox',
                fieldLabel: 'Actividad Específica',
                labelWidth: 150,
                store: 'dsActividadEspecificaMatriz',
                displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
                valueField: 'ID_MATRIZ_RIESGO',
                anchor: '100%',
                fieldLabel: 'Actividad Específica',
                displayField: 'NOM_ACTIVIDAD_ESPECIFICA',
                store: 'dsActividadEspecificaMatriz',
                valueField: 'ID_ACTIVIDAD_ESPECIFICA',
                editable: false,
                allowBlank: false,
                triggerAction: 'all',
                emptyText: 'Selecciona una Actividad para Re Evaluación',
                listeners: {
                'change': function (cmb, newValue, oldValue, eOpts) {
                console.log("SELECT " + newValue);
                Ext.data.StoreManager.lookup('dsMatrizRiesgoIdentificado').load({
                params: { 'ID_ACTIVIDAD_ESPECIFICA': newValue },
                callback: function (records, operation, success) {
                if (Ext.isArray(records) && records.length > 0) {
                }
                }
                });
                }
                }
                },
                {
                xtype: 'panel',
                border: 0,
                height: 421,
                defaults: {
                flex: 1
                },
                layout: 'column',
                title: '',
                items: [
                {
                xtype: 'gridpanel',
                title: 'Peligros Identificados',
                store: 'dsMatrizRiesgoIdentificado',
                columnWidth: 1 / 3,
                heigth: '100%',
                viewConfig: {
                plugins: [
                Ext.create('Ext.grid.plugin.DragDrop', {
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
                })
                ]
                },
                columns: [
                {
                xtype: 'gridcolumn',
                dataIndex: 'ID_PELIGRO',
                text: 'Peligro',
                flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                var idx = Ext.data.StoreManager.lookup('dsMatrizRiesgoIdentificado').find('ID_PELIGRO', value.toString());
                return idx !== -1 ? Ext.data.StoreManager.lookup('dsPeligro').getAt(idx).get('NOM_PELIGRO') : ''
                }
                }
                ],
                listeners: {
                'selectionchange': function (selModel, records) {
                console.log(records);
                if (records[0]) {
                Ext.getCmp('form-evaluacion-medidas').getForm().loadRecord(records[0]);
                }
                }
                }
                },
                {
                xtype: 'form',
                margin: '0 0 0 3',
                bodyPadding: 10,
                id: 'form-evaluacion-medidas',
                title: 'Evaluación con Medidas de Control',
                columnWidth: 2 / 3,
                items: [
                {
                xtype: 'hiddenfield',
                name: 'ID_PELIGRO',
                fieldLabel: 'Nombre Peligro',
                labelAlign: 'top',
                anchor: '100%',
                listeners: {
                change: function (field, newValue, oldValue, options) {
                var idx = Ext.data.StoreManager.lookup('dsMatrizRiesgoIdentificado').find('ID_PELIGRO', newValue.toString());
                var nuevo_valor = idx !== -1 ? Ext.data.StoreManager.lookup('dsPeligro').getAt(idx).get('NOM_PELIGRO') : ''
                Ext.getCmp('lbl_nombre_peligro_reevaluacion').setValue(nuevo_valor);

                }
                }
                },
                {
                xtype: 'textfield',
                id: 'lbl_nombre_peligro_reevaluacion',
                fieldLabel: 'Nombre Peligro',
                labelAlign: 'top',
                anchor: '100%'
                },
                {
                xtype: 'gridpanel',
                autoScroll: true,
                title: 'Selecciona medidas de Control',
                store: 'dsMedidaDeControl',
                height: 200,
                collapsible: true,
                viewConfig: {

                },
                columns: [
                {
                xtype: 'gridcolumn',
                dataIndex: 'NOM_MEDIDA_DE_CONTROL',
                text: 'Medida De Control',
                flex: 1
                }
                ]
                },
                {
                xtype: 'radiogroup',
                fieldLabel: 'Probabilidad',
                labelAlign: 'top',
                items: [
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Bajo'
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Medio'
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_PROBABILIDAD',
                fieldLabel: '',
                boxLabel: 'Alto'
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
                name: 'VALORACION_CONSECUENCIA',
                boxLabel: 'Ligeramente Dañino'
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_CONSECUENCIA',
                boxLabel: 'Dañino'
                },
                {
                xtype: 'radiofield',
                name: 'VALORACION_CONSECUENCIA',
                fieldLabel: '',
                boxLabel: 'Extremadamente Dañino',
                anchor: '100%'
                }
                ]
                }
                ]
                }
                ]
                }
                ]
                }
                ]
                },
                {
                xtype: 'panel',
                disabled: true,
                title: 'Paso 4'
                }*/
                ]
            }
        ];

        me.callParent(arguments);
        Ext.data.StoreManager.lookup('dsActividadEspecifica').addListener("write", function (store, operation) {
            /*
            var record = operation.getRecords()[0],
            name = Ext.String.capitalize(operation.action);
            if (name == 'Create') {
            var data = {
            ID_ACTIVIDAD_ESPECIFICA: record.getId()
            };
            Ext.apply(data, Ext.getCmp('form_nueva_actividad').getForm().getValues());
            var new_object = Ext.create('WCF_ENAP.model.Registro', Ext.getCmp('form_nueva_actividad').getForm().getValues());
            console.log(new_object);
            Ext.data.StoreManager.lookup('dsRegistro').insert(0, new_object);
            }
            */
        });
    }
});