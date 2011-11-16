Ext.define('WCF_ENAP.view.ui.DatosTrabajador', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    modal: true,
    width: 850,
    //height : 520,
    maximizable: true,
    cmpPadre: null,
    title: 'Agregar Datos',
    initComponent: function () {

        var me = this,
        winAcciones,
        //tipo incidente persona
        dsPeligroLista,
        //causas inmediatas acciones
        dsCausaListaAccion,
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada,
        dsCausaListaFactoresCapPsicologicaInadecuada,
        dsCausaListaFactoresCapMental,
        dsCausaListaFactoresTencionMental,
        dsCausaListaFactoresFaltaConocimiento,
        dsCausaListaFactoresFaltaHabilidad,
        dsCausaListaFactoresMotivacionInadecuada,
        dsCausaListaFactoresAutocuidado;

        //tipo incidente persona
        dsPeligroLista = Ext.create('WCF_ENAP.store.dsPeligro', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        //causas inmediatas acciones
        dsCausaListaAccion = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        //inicio
        //causas basicas factores de la persona
        dsCausaListaFactoresCapFisicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresCapPsicologicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
        dsCausaListaFactoresCapMental = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
         dsCausaListaFactoresTencionMental = Ext.create('WCF_ENAP.store.dsCausa', {
             autoLoad: false,
             autoSync: false,
             pageSize: 50
         }),
        dsCausaListaFactoresFaltaConocimiento = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        }),
         dsCausaListaFactoresFaltaHabilidad = Ext.create('WCF_ENAP.store.dsCausa', {
             autoLoad: false,
             autoSync: false,
             pageSize: 50
         }),
          dsCausaListaFactoresMotivacionInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
              autoLoad: false,
              autoSync: false,
              pageSize: 50
          }),
        dsCausaListaFactoresAutocuidado = Ext.create('WCF_ENAP.store.dsCausa', {
            autoLoad: false,
            autoSync: false,
            pageSize: 50
        });
        me.items = [

                            {
                                xtype: 'tabpanel',
                                margin: '5 5 5 5',
                                bodyPadding: 10,
                                columnWidth: 0.5,
                                title: 'Datos Trabajador',
                                tabIndex: 1,
                                items: [
                                {
                                    xtype: 'form',
                                    title: 'Datos Generales',
                                    anchor: '100%',
                                    layout: 'column',
                                    defaults: {
                                        margin: '5 5 5 5'
                                    },
                                    items: [
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'RUT',
                                                        emptyText: 'Ingrese RUT',
                                                        name: 'RUT_TRABAJADOR',
                                                       // allowBlank: false,
                                                        anchor: '100%',
                                                        vtype: 'rut',
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Nombres',
                                                        name: 'NOMBRES',
                                                        emptyText: 'Ingrese los Nombres del trabajador',
                                                       // allowBlank: false,
                                                        anchor: '100%',
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Apellido Paterno',
                                                        emptyText: 'Ingrese Apellido Paterno del Trabajador',
                                                        name: 'APELLIDO_PATERNO',
                                                        //allowBlank: false,
                                                        anchor: '100%',
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Apellido Materno',
                                                        name: 'APELLIDO_MATERNO',
                                                        emptyText: 'Ingrese Apellido Materno del Trabajador',
                                                        //allowBlank: false,
                                                        anchor: '100%',
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Cargo',
                                                        name: 'ID_CARGO',
                                                        store: 'dsCargo',
                                                        emptyText: 'Seleccione el cargo del trabajador',
                                                        displayField: 'NOMBRE_CARGO',
                                                        valueField: 'ID_CARGO',
                                                        anchor: '100%',
                                                        //allowBlank: false,
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'radiogroup',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Calificacion',
                                                        name: '',
                                                        store: '',
                                                        displayField: '',
                                                        valueField: '',
                                                        columns: 2,
                                                        columnWidth: .5,
                                                        items: [
				                                                        { boxLabel: 'Mayor', name: 'calificacion', inputValue: '1' },
                                                                        { boxLabel: 'Leve', name: 'calificacion', inputValue: '4' },
                                                                        { boxLabel: 'Serio', name: 'calificacion', inputValue: '2' },
                                                                        { boxLabel: 'Sin Efecto', name: 'calificacion', inputValue: '5' },
                                                                        { boxLabel: 'Relevante', name: 'calificacion', inputValue: '3' }
				                                                   ]
                                                    },
                                                    {
                                                        xtype: 'numberfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Años de experiencia Laboral en ENAP',
                                                        name: 'ANOS_EXPERIENCIA_LABORAL',
                                                        name: 'ANOS_EXPERIENCIA_LABORAL',
                                                        //allowBlank: false,
                                                        anchor: '100%',
                                                        columnWidth: .5
                                                    },
                                                    {
                                                        xtype: 'numberfield',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Años de experiencia en el Cargo',
                                                        name: 'ANOS_EXPERIENCIA_CARGO',
                                                        //allowBlank: false,
                                                        anchor: '100%',
                                                        columnWidth: .5
                                                    }

				                               ],
                                    buttons: [{
                                        text: 'Siguiente >>>',
                                        handler: function () {
                                            var new_object,
                                            errors,
                                            form;   
                                            form = this.up('form').getForm();
                                            new_object = Ext.create('WCF_ENAP.model.Trabajador', form.getValues());
                                            errors = new_object.validate();
                                            if (errors.isValid() && form.isValid()) {
                                                this.disable(true);
                                                Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                this.up('tabpanel').setActiveTab(1);
                                                //form.reset();
                                            }
                                            else {
                                                form.markInvalid(errors);
                                            }
                                            this.enable(true);
                                        }
                                    }]
                                },
                                    {
                                        xtype: 'form',
                                        title: 'Tipo de Incidente a Persona',
                                        id: 'panel_tipo_incidente_persona',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 2,
                                        items: [
                                                   {
                                                       xtype: 'itemselector',
                                                       id: 'STORE_LIST_DOS',
                                                       store: dsPeligroLista,
                                                       anchor: '100%',
                                                       displayField: 'NOM_PELIGRO',
                                                       valueField: 'ID_PELIGRO'
                                                   }
                                            ],
                                    buttons: [{
                                        text: '<<< Anterior',
                                        handler: function () {
                                            var new_object,
                                            errors,
                                            form;
                                            form = this.up('form').getForm();
                                            new_object = Ext.create('WCF_ENAP.model.Peligro', form.getValues());
                                            errors = new_object.validate();
                                            if (errors.isValid() && form.isValid()) {
                                                this.disable(true);
                                                //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                this.up('tabpanel').setActiveTab(0);
                                                //form.reset();
                                            }
                                            else {
                                                form.markInvalid(errors);
                                            }
                                            this.enable(true);
                                        }
                                    }, {
                                        text: 'Siguiente >>>',
                                        handler: function () {
                                            var new_object,
                                            errors,
                                            form;
                                            form = this.up('form').getForm();
                                            new_object = Ext.create('WCF_ENAP.model.Peligro', form.getValues());
                                            errors = new_object.validate();
                                            if (errors.isValid() && form.isValid()) {
                                                this.disable(true);
                                                //Ext.data.StoreManager.lookup(dsPeligroLista).insert(0, new_object);
                                                this.up('tabpanel').setActiveTab(2);
                                                //form.reset();
                                            }
                                            else {
                                                form.markInvalid(errors);
                                            }
                                            this.enable(true);
                                        }
                                    }]
                                    },
                                    {
                                        xtype: 'form',
                                        title: 'Causa Inmediatas Accion',
                                        id: 'panel_Causa_Inmediatas_Accion',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 3,
                                        items: [
                                                {
                                                    xtype: 'itemselector',
                                                    id: 'STORE_LIST_CUATRO',
                                                    store: dsCausaListaAccion,
                                                    anchor: '100%',
                                                    displayField: 'DESCRIPCION',
                                                    valueField: 'ID_CAUSA'
                                                }
                                            ],
                                        buttons: [{
                                            text: '<<< Anterior',
                                            handler: function () {
                                                var new_object,
                                                errors,
                                                form;
                                                form = this.up('form').getForm();
                                                new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                                                errors = new_object.validate();
                                                if (errors.isValid() && form.isValid()) {
                                                    this.disable(true);
                                                    //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                    this.up('tabpanel').setActiveTab(1);
                                                    //form.reset();
                                                }
                                                else {
                                                    form.markInvalid(errors);
                                                }
                                                this.enable(true);
                                            }
                                        }, {
                                        text: 'Siguiente >>>',
                                        handler: function () {
                                            var new_object,
                                            errors,
                                            form;
                                            form = this.up('form').getForm();
                                            new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                                            errors = new_object.validate();
                                            if (errors.isValid() && form.isValid()) {
                                                this.disable(true);
                                                //Ext.data.StoreManager.lookup(dsCausaListaAccion).insert(0, new_object);
                                                this.up('tabpanel').setActiveTab(3);
                                                //form.reset();
                                            }
                                            else {
                                                form.markInvalid(errors);
                                            }
                                            this.enable(true);
                                        }
                                    }]
                                    },
                                    {
                                        xtype: 'form',
                                        title: 'Factores de la Persona',
                                        id: 'panel_Facotores_de_la_Personas',
                                        anchor: '100%',
                                        layout: 'anchor',
                                        tabIndex: 4,
                                        items: [
                                                  {
                                                      xtype: 'combobox',
                                                      labelAlign: 'top',
                                                      emptyText: 'Seleccione la o las ',
                                                      margin: '5 5 5 5',
                                                      anchor: '100%',
                                                      name: 'ID_CAUSA',
                                                      store: dsCausaListaFactoresCapFisicaInadecuada,
                                                      displayField: 'DESCRIPCION',
                                                      valueField: 'ID_CAUSA',
                                                      multiSelect: true,
                                                      fieldLabel: 'Capacidad Fisica Inadecuada',
                                                      queryMode: 'local'
                                                  },
                                                    {
                                                        //5
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresCapPsicologicaInadecuada,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Capacidad Psicologica Inadecuada',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //6
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresCapMental,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Tencion Fisica o Fisiologica',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //7
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresTencionMental,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Tencion Mental o Psicologica',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //8
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresFaltaConocimiento,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Falta de Conocimiento',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //9
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresFaltaHabilidad,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Falta de Habilidad',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //10
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresMotivacionInadecuada,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'Motivacion Deficiente',
                                                        queryMode: 'local'
                                                    },
                                                    {
                                                        //19
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        emptyText: 'Seleccione la o las ',
                                                        margin: '5 5 5 5',
                                                        anchor: '100%',
                                                        name: 'ID_CAUSA',
                                                        store: dsCausaListaFactoresAutocuidado,
                                                        displayField: 'DESCRIPCION',
                                                        valueField: 'ID_CAUSA',
                                                        multiSelect: true,
                                                        fieldLabel: 'AUTOCUIDADOS',
                                                        queryMode: 'local'
                                                    }

                                                ],
                                            buttons: [{
                                                text: '<<< Anterior',
                                                handler: function () {
                                                    var new_object,
                                                    errors,
                                                    form;
                                                    form = this.up('form').getForm();
                                                    new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                                                    errors = new_object.validate();
                                                    if (errors.isValid() && form.isValid()) {
                                                        this.disable(true);
                                                        //Ext.data.StoreManager.lookup('dsTrabajador').insert(0, new_object);
                                                        this.up('tabpanel').setActiveTab(2);
                                                        //form.reset();
                                                    }
                                                    else {
                                                        form.markInvalid(errors);
                                                    }
                                                    this.enable(true);
                                                }
                                            }, {
                                                text: 'Guardar',
                                                handler: function () {
                                                    var new_object,
                                                    errors,
                                                    form;
                                                    form = this.up('form').getForm();
                                                    new_object = Ext.create('WCF_ENAP.model.Causa', form.getValues());
                                                    errors = new_object.validate();
                                                    if (errors.isValid() && form.isValid()) {
                                                        this.disable(true);
                                                        //Ext.data.StoreManager.lookup(dsCausaListaAccion).insert(0, new_object);
                                                        this.up('tabpanel').setActiveTab(4);
                                                        //form.reset();
                                                    }
                                                    else {
                                                        form.markInvalid(errors);
                                                    }
                                                    this.enable(true);
                                                }
                                            }]

                                    }
                                    ],
                                listeners: {
                                    tabchange: function (tabPanel, newCard, oldCard, options) {
                                        //tipo incidente persona
                                        if (newCard.getId() == 'panel_tipo_incidente_persona') {
                                            dsPeligroLista.load({
                                                params: { 'TIPO_PELIGRO': 1 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                        }
                                        //causas inmediatas acciones
                                        if (newCard.getId() == 'panel_Causa_Inmediatas_Accion') {
                                            dsCausaListaAccion.load({
                                                params: { 'TIPO_CAUSA': 2 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                        }
                                        //causas basicas factores de la persona
                                        if (newCard.getId() == 'panel_Facotores_de_la_Personas') {
                                            dsCausaListaFactoresCapFisicaInadecuada.load({
                                                params: { 'TIPO_CAUSA': 4 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresCapPsicologicaInadecuada.load({
                                                params: { 'TIPO_CAUSA': 5 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresCapMental.load({
                                                params: { 'TIPO_CAUSA': 6 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresTencionMental.load({
                                                params: { 'TIPO_CAUSA': 7 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresFaltaConocimiento.load({
                                                params: { 'TIPO_CAUSA': 8 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresFaltaHabilidad.load({
                                                params: { 'TIPO_CAUSA': 9 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresMotivacionInadecuada.load({
                                                params: { 'TIPO_CAUSA': 10 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                            dsCausaListaFactoresAutocuidado.load({
                                                params: { 'TIPO_CAUSA': 19 },
                                                callback: function (records, operation, success) {
                                                }
                                            });
                                        }
                                        if (newCard.getId() == 'panel_Acciones_Correctivas') {
                                            dsCausaListaAccion.load();
                                        }
                                    }
                                }
                            }
        /*,
        {
        xtype: 'gridpanel',
        margin: '0 0 0 5',
        title: 'Listado de Trabajadores',
        columnWidth: 0.5,
        store: 'dsTrabajador',
        columns: [
        {
        xtype: 'gridcolumn',
        dataIndex: 'RUT_TRABAJADOR',
        //flex: 0.12,
        text: 'Rut'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'NOMBRES',
        editor: {
        xtype: 'textfield',
        name: 'NOMBRES',
        allowBlank: false,
        vtype: 'alpha',
        //flex: 0.15,
        anchor: '100%'
        },
        text: 'Nombres'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'APELLIDO_PATERNO',
        editor: {
        xtype: 'textfield',
        name: 'APELLIDO_PATERNO',
        allowBlank: false,
        vtype: 'alpha',
        //flex: 0.14,
        anchor: '100%'
        },
        text: 'Apellido Paterno'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'APELLIDO_MATERNO',
        editor: {
        xtype: 'textfield',
        name: 'APELLIDO_MATERNO',
        allowBlank: false,
        vtype: 'alpha',
        //flex: 0.14,
        anchor: '100%'
        },
        text: 'Apellido Materno'
        },
        {
        "xtype": "gridcolumn",
        "dataIndex": "ID_CARGO",
        "text": "Cargo",
        "sortable": true,
        "field": {
        "xtype": "combo",
        "displayField": "NOMBRE_CARGO",
        "valueField": "ID_CARGO",
        "anchor": "100%",
        "store": "dsCargo",
        "name": "ID_CARGO"
        },
        "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
        var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_CARGO', value.toString());
        return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_CARGO') : ''
        }
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'ANOS_EXPERIENCIA_LABORAL',
        editor: {
        xtype: 'textfield',
        name: 'ANOS_EXPERIENCIA_LABORAL',
        allowBlank: false,
        //vtype: 'alpha',
        //flex: 0.14,
        anchor: '100%'
        },
        text: 'Años Experiencia Laboral'
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'ANOS_EXPERIENCIA_CARGO',
        editor: {
        xtype: 'textfield',
        name: 'ANOS_EXPERIENCIA_CARGO',
        allowBlank: false,
        //vtype: 'alpha',
        //flex: 0.14,
        anchor: '100%'
        },
        text: 'Años Experiencia Cargo'
        }
                    
        ],
        viewConfig: {
        },
        dockedItems: [
        {
        xtype: 'pagingtoolbar',
        store: 'dsTrabajador',
        displayInfo: true,
        dock: 'bottom'
        }
        ],
        plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
        })
        ]
        }*/

			];
        me.callParent(arguments);
    }
});