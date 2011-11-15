var rowEditinge0063 = Ext.create('Ext.grid.plugin.RowEditing', {});

Ext.define('WCF_ENAP.view.ui.e0063', {
    extend: 'Ext.panel.Panel',

    height: 531,
    maximizable: true,
    layout: 'anchor',
    title: 'Evento!!',
    id: 'panel-e0063',
    autoScroll :'true',
    initComponent: function () {
        var me = this,
                winAcciones , 
                winPeligros, 
                winHerramientas,
                storeCargo = Ext.data.StoreManager.lookup('dsCargo'),
                
                dsPeligroLista = Ext.create('WCF_ENAP.store.dsPeligro', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsPeligroListaTipoIncidentePatrimonio = Ext.create('WCF_ENAP.store.dsPeligro', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaAccion = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaCondcion = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
               // dsCausaListaFactoresCapFisicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                //dsCausaListaFactoresCapPsicologicaInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
               // dsCausaListaFactoresCapMental = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
               // dsCausaListaFactoresTencionMental = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                //dsCausaListaFactoresFaltaConocimiento = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
               // dsCausaListaFactoresFaltaHabilidad = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
              //  dsCausaListaFactoresMotivacionInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                // dsCausaListaFactoresAutocuidado = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresFaltaLiderazgo = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresIngInadecuada = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresComprasInadecuadas = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresMantenimientoInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresEstTrabajoInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresHerrEquioInadecuado = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresUsoDesgaste = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
                dsCausaListaFactoresAbuso = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                }),
               
                dsCausaListaFactoresErrores = Ext.create('WCF_ENAP.store.dsCausa', {
                    autoLoad: false,
                    autoSync: false,
                    pageSize: 50
                });
        /*storeCargo.on('load', function(store, records, successful, operation, options){
            var storeTrabajador = Ext.data.StoreManager.lookup('dsTrabajador');
            storeTrabajador.load();
        }); 
        // INICIO
        dsPeligroLista.load({
            params: { 'TIPO_PELIGRO': 2 },
            callback: function (records, operation, success) {
            }
        });
        dsPeligroListaTipoIncidentePatrimonio.load({
            params: { 'TIPO_PELIGRO': 3 },
            callback: function (records, operation, success) {
            }
        });
        dsCausaListaAccion.load({
            params: { 'TIPO_CAUSA': 2 }, 
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaCondcion.load({
            params: { 'TIPO_CAUSA': 3 },
            callback: function (records, operation, success) {
            }
        });

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

        dsCausaListaFactoresFaltaLiderazgo.load({
            params: { 'TIPO_CAUSA': 11 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresIngInadecuada.load({
            params: { 'TIPO_CAUSA': 12 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresComprasInadecuadas.load({
            params: { 'TIPO_CAUSA': 13 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresMantenimientoInadecuado.load({
            params: { 'TIPO_CAUSA': 14 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresEstTrabajoInadecuado.load({
            params: { 'TIPO_CAUSA': 15 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresHerrEquioInadecuado.load({
            params: { 'TIPO_CAUSA': 16 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresUsoDesgaste.load({
            params: { 'TIPO_CAUSA': 17 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresAbuso.load({
            params: { 'TIPO_CAUSA': 18 },
            callback: function (records, operation, success) {
            }
        });

        dsCausaListaFactoresAutocuidado.load({
            params: { 'TIPO_CAUSA': 19 },
            callback: function (records, operation, success) {
            }
        });
        dsCausaListaFactoresErrores.load({
            params: { 'TIPO_CAUSA': 20 },
            callback: function (records, operation, success) {
            }
        });
        // FIN 
        */
       

        me.items = [
           {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'column',
                id: 'panel-MuevoEvento',
                title: 'Registrar Nuevo Evento',
                 items: [
                             {
				                xtype: 'form',
				                margin: '0 5 0 0',
				                bodyPadding: 10,
								columnWidth: 0.5,
                                id: 'panel-DatosGenerales',
				                title: 'Datos Generales del Evento',
				                items: [    //revisar donde keda conectado organizacion-departamento con empresa contratistas
                                            {
                                                xtype: 'combobox',
                                                margin: '5 5 5 5',
                                                labelAlign: 'top',
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
                                                emptyText: 'Seleccione la Organización',
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
                                                margin: '5 5 5 5',
                                                labelAlign: 'top',
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
                                                emptyText: 'Seleccione el Departamento',
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
                                                margin: '5 5 5 5',
                                                labelAlign: 'top',
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
                                                emptyText: 'Seleccione la División',
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
                                                margin: '5 5 5 5',
                                                labelAlign: 'top',
                                                fieldLabel: 'Area',
                                                displayField: 'NOMBRE_AREA',
                                                id: 'organizacion_area',
                                                store: 'dsArea',
                                                valueField: 'ID_AREA',
                                                name: 'ID_AREA',
                                                anchor: '100%',
                                                disabled: true,
                                                editable: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                triggerAction: 'all',
                                                emptyText: 'Seleccione el  Area',
                                                queryMode: 'local',
                                                lastQuery: '',
                                                selectOnFocus: true
                                            },
					                        {
					                            xtype: 'panel',
					                            border: 0,
					                            layout:'column',
					                                items: [
					                                            {
					                                                xtype: 'datefield',
                                                                    margin: '5 5 5 5',
					                                                name: 'FECHA_HORA_EVENTO',
					                                                fieldLabel: 'Fecha',
                                                                    labelAlign: 'top',
					                                                store: 'dsEvento',
                                                                    emptyText: 'Fecha del Evento',
					                                                allowBlank: false,
					                                                columnWidth: 0.5
					                                            },
					                                            {
					                                                xtype: 'timefield',
					                                                margin: '5 5 5 0',
                                                                    labelAlign: 'top',
					                                                name: 'FECHA_HORA_EVENTO',
                                                                    emptyText: 'Hora del Evento',
					                                                fieldLabel: 'Hora',
					                                                allowBlank: false,
					                                                increment: 5,
					                                                columnWidth: 0.5
					                                            }
					                                        ]
					                        },
                                             {
                                                xtype: 'checkboxgroup',
                                                margin: '5 5 5 5',
                                                labelAlign: 'top',
                                                fieldLabel: 'Afecta a',
                                                columns: 2,
                                                //allowBlank: false,
                                                items: [
                                                            { boxLabel: 'Persona', name: 'afecta', inputValue: '1' },
                                                            { boxLabel: 'Patrimonio', name: 'afecta', inputValue: '2' },
                                                            { boxLabel: 'Perdida de Proceso', name: 'afecta', inputValue: '3' },
                                                            { boxLabel: 'Medio Ambiente', name: 'afecta', inputValue: '4' },
                                                            { boxLabel: 'Imagen', name: 'afecta', inputValue: '5' }
                                                      ]
                                            },
                                            {
                                                xtype: 'htmleditor',
                                                labelAlign: 'top',
                                                margin: '5 5 5 5',
                                                height: 150,
                                                name: 'ID_EVENTO_EMPRESA',
                                                store: 'dsEventoEmpresa',
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_EVENTO_EMPRESA',
                                                style: 'background-color: white;',
                                                fieldLabel: 'Descripcion del Evento',
                                                anchor: '100%'         
                                            }, 
					                        {
					                            xtype: 'hiddenfield',
					                            name: 'LAT_EVENTO',
					                            anchor: '100%'
					                        },
					                        {
					                            xtype: 'hiddenfield',
					                            name: 'LNG_EVENTO',
					                            anchor: '100%'
					                        }
				                       ]  
				            },
                            {
					            xtype: 'panel',
					            height: 303,
					            id: 'gmap-panel',
					            margin: '0 0 0 5',
					            title: 'Geo Localización del Evento',
					            columnWidth: 0.5
					        }          
                       ]  
            },  
            {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'column',
                id: 'panel-Trabajadores',
                title: 'Trabajador',
                 items: [
                            {
				                xtype: 'form',
				                margin: '5 5 5 5',
				                bodyPadding: 10,
								columnWidth: 0.4,
				                title: 'Datos Trabajador',
				                items: [
				                             {
                                                xtype: 'textfield',
                                                labelAlign: 'top',
                                                fieldLabel: 'RUT',
                                                emptyText: 'Ingrese RUT',
                                                name: 'RUT_TRABAJADOR',
                                                allowBlank: false,
                                                anchor: '100%',
                                                vtype: 'rut'
                                            },
                                            {
                                                xtype: 'textfield',
                                                labelAlign: 'top',
                                                fieldLabel: 'Nombres',
                                                name: 'NOMBRES',
                                                emptyText: 'Ingrese los Nombres del trabajador',
                                                allowBlank: false,
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                labelAlign: 'top',
                                                fieldLabel: 'Apellido Paterno',
                                                emptyText: 'Ingrese Apellido Paterno del Trabajador',
                                                name: 'APELLIDO_PATERNO',
                                                allowBlank: false,
                                                anchor: '100%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                labelAlign: 'top',
                                                fieldLabel: 'Apellido Materno',
                                                name: 'APELLIDO_MATERNO',
                                                emptyText: 'Ingrese Apellido Materno del Trabajador',
                                                allowBlank: false,
                                                anchor: '100%'
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
				                                    allowBlank: false
				                            },
                                            {
				                                    xtype: 'radiogroup',
                                                    labelAlign: 'top',
				                                    fieldLabel: 'Calificacion',
                                                    name:'',
                                                    store:'',
                                                    displayField:'',
                                                    valueField: '',
                                                    columns: 2,
                                                    //allowBlank: false,
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
                                            },
                                            {
                                                xtype: 'numberfield',
                                                labelAlign: 'top',
                                                fieldLabel: 'Años de experiencia en el Cargo',
                                                name: 'ANOS_EXPERIENCIA_CARGO',
                                                //allowBlank: false,
                                                anchor: '100%'
                                            }         
				                       ],
                                        buttons: [{
                                                    text: 'Agregar',
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
                                margin: '5 5 5 5',
                                title: 'Listado de Trabajadores',
                                columnWidth: 0.6,
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
                                            /*{
                                                "xtype": "gridcolumn",
                                                "dataIndex": "ID_EVENTO",
                                                "text": "Tipo Evento",
                                                "sortable": true,
                                                "field": {
                                                            "xtype": "combo",
                                                            "displayField": "TIPO_EVENTO",
                                                            "valueField": "ID_EVENTO",
                                                            "anchor": "100%",
                                                            "store": "dsEvento",
                                                            "name": "ID_EVENTO"
                                                        },
                                                    "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EVENTO', value.toString());
                                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('TIPO_EVENTO') : ''
                                                }
                                            },*/
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
                        }    
                       ] 
            },   
            
            // Incio de FORM Herramientas Utilizadas    
            {
	            xtype: 'form',
	            margin: '5 5 5 5',
	            bodyPadding: 10,
	            collapsible: true,
	            layout: 'column',
	            id: 'panel-Herramientas',
	            title: 'Herramientas Utilizadas',
	                items: [
                            {
				                xtype: 'form',
					            margin: '5 5 5 5',
					            bodyPadding: 10,
					            columnWidth: 0.5,
					            title: 'Agregue Herramientas',
					            items: [
                                           {
	                                            xtype: 'panel',
	                                            border: 0,
	                                            margin: '0 0 0 0 ',
	                                            layout: {
		                                            type: 'column'
	                                            },
	                                            anchor: '100%',
	                                            items: [
		                                             {
			                                            xtype: 'combobox',
			                                            labelAlign: 'top',
			                                            margin: '5 5 5 5',
			                                            anchor: '100%',
			                                            name: 'ID_HERRAMIENTA',
			                                            store: 'dsHerramienta',
			                                            displayField: 'NOMBRE_HERRAMIENTA',
			                                            valueField: 'ID_HERRAMIENTA',
			                                            fieldLabel: 'Herramienta',
			                                            emptyText: 'Listado de Herramientas',
			                                            multiSelect: true,
			                                            allowBlank: false,
			                                            columnWidth: 0.94
		                                            },
		                                            {
														xtype: 'button',
														margin: '0 0 0 3',
														iconCls: 'btn-add',
														columnWidth: 0.06,

														handler: function () {
															if (!winHerramientas) {
																winHerramientas = Ext.create('Ext.window.Window', {
																	width: 673,
																	closeAction: 'hide',
																	title: 'Ingresa una nueva Herramienta',
																	modal: true,
																	items: [
																	// ...Formulario ...
																		  {
																		  xtype: 'form',
																		  id: 'Form_NewHerramienta',
																		  collapsible: true,
																		  margin: '5 5 5 5',
																		  bodyPadding: 10,
																		  title: 'Ingrese nueva Herramienta',
																		  items: [
																					{
										                                                xtype: 'textfield',
					                                                                    labelAlign: 'top',
										                                                margin: '5 5 5 5',
	                                                                                    name: 'NOMBRE_HERRAMIENTA',
	                                                                                    store: 'dsHerramienta',
					                                                                    anchor: '100%',
	                                                                                    displayField: 'NOMBRE_HERRAMIENTA',
	                                                                                    valueField: 'ID_HERRAMIENTA',
										                                                fieldLabel: 'Herramienta',
					                                                                    emptyText: 'Herramientas',
										                                                allowBlank: false
										                                            }
																					
																				],
																		 buttons: [{
										                                            text: 'Agregar',
										                                            handler: function () {
											                                            var new_object,
												                                            errors,
												                                            form;
			
											                                            form = this.up('form').getForm();
											                                            new_object = Ext.create('WCF_ENAP.model.Herramienta', form.getValues());
											                                            errors = new_object.validate();
			
											                                            if (errors.isValid() && form.isValid()) {
												                                            this.disable(true);
												                                            Ext.data.StoreManager.lookup('dsHerramienta').insert(0, new_object);
												                                            form.reset();
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
															winHerramientas.show();
														}
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
                        
                                                        form = this.up('form').getForm();
                                                        new_object = Ext.create('WCF_ENAP.model.AccionCorrectiva', form.getValues());
                                                        errors = new_object.validate();
                        
                                                        if (errors.isValid() && form.isValid()) {
                                                            this.disable(true);
                                                            Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
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
					            margin: '5 5 5 5',
					            title: 'Listado de Herramientas',
					            columnWidth: 0.5,
                                anchor: '100%',
					            store: 'dsHerramienta',
					            columns: [
								            {
									            xtype: 'gridcolumn',
									            dataIndex: 'NOMBRE_HERRAMIENTA',
									            editor: {
										                    xtype: 'textfield',
					                                        labelAlign: 'top',
										                    margin: '5 5 5 5',
	                                                        name: 'NOMBRE_HERRAMIENTA',
	                                                        store: 'dsHerramienta',
					                                        anchor: '100%',
	                                                        displayField: 'NOMBRE_HERRAMIENTA',
	                                                        valueField: 'ID_HERRAMIENTA',
										                    fieldLabel: 'Herramienta',
					                                        emptyText: 'Herramientas',
										                    allowBlank: false
									                    },
									            text: 'Otras Herramientas'
								            }
							            ],
					            viewConfig: {
				            },
				            dockedItems: [
								            {
									            xtype: 'pagingtoolbar',
									            store: 'dsHerramienta',
									            displayInfo: true,
									            dock: 'bottom'
								            }
							            ],
				            plugins: [
							            Ext.create('Ext.grid.plugin.RowEditing', {
						            })
						            ]
			            }    
		                ] 
            }, 
             // FIN de FORM Herramientas Utilizadas      
            {
               xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'anchor',
                id: 'panel-TipoIncidentePersona',
                title: 'Tipo de Incidente a Persona',
                 items: [
                            {
                                xtype: 'itemselector',
                                id: 'STORE_LIST_DOS',
                                store: dsPeligroLista,
                                anchor: '100%',
                                displayField: 'NOM_PELIGRO',
                                valueField: 'ID_PELIGRO'
                            }                  
                        ]  
            },
            {
               xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'anchor',
                id: 'panel-TipoIncidentePPMA',
                title: 'Tipo de Incidente a Patrimonio Proceso Medio Ambiente',
                 items: [
                           {
                                xtype: 'itemselector',
                                id: 'STORE_LIST_TRES',
                                store: dsPeligroListaTipoIncidentePatrimonio,
                                anchor: '100%',
                                displayField: 'NOM_PELIGRO',
                                valueField: 'ID_PELIGRO'
                            }                 
                        ]  
            },
            {
               xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'anchor',
                id: 'panel-CausaInmediatasAccion',
                title: 'Causas Inmediatas Acciones',
                 items: [
                           {
                                xtype: 'itemselector',
                                id: 'STORE_LIST_CUATRO',
                                store: dsCausaListaAccion,
                                anchor: '100%',
                                displayField: 'DESCRIPCION',
                                valueField: 'ID_CAUSA'
                            }                 
                        ]  
            },
            {
               xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'anchor',
                id: 'panel-CausaInmediatasCondicion',
                title: 'Causas Inmediatas Condiciones',
                 items: [
                           {
                                xtype: 'itemselector',
                                id: 'STORE_LIST_CINCO',
                                store: dsCausaListaCondcion,
                                anchor: '100%',
                                displayField: 'DESCRIPCION',
                                valueField: 'ID_CAUSA'
                            }                 
                        ]  
            },
            {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'column',
                title: 'Causas Basicas',
                items: [
                            {
                                xtype: 'form',
                                margin: '0 5 0 0',
                                bodyPadding: 10,
                                columnWidth: 0.5,
                                title: 'Facotores de la Personas',
                                items: [    
                                            {
                                                //4
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
                                            
                                       ]
                            },
                            {
                                xtype: 'form',
                                margin: '0 0 0 5',
                                bodyPadding: 10,
                                columnWidth: 0.5,
                                title: 'Factores del Trabajo',
                                items: [     
                                            {
                                                //11
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresFaltaLiderazgo,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Supervisión Deficientes',
                                                queryMode: 'local'
                                            },
                                            {
                                                //12
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresIngInadecuada,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Ingeniería Inadecuada',
                                                queryMode: 'local'
                                            },
                                            {
                                                //13
                                               xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresComprasInadecuadas,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Deficiencia en las Adquisiciones',
                                                queryMode: 'local'
                                            },
                                            {
                                                //14
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresMantenimientoInadecuado,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Mantención Deficiente',
                                                queryMode: 'local'
                                            },
                                            {
                                                //15
                                               xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresHerrEquioInadecuado,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Herramientas y equipos inadecuada',
                                                queryMode: 'local'
                                            },
                                            {
                                                //16
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresUsoDesgaste,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Uso y Desgaste',
                                                queryMode: 'local'
                                            },
                                            {
                                                //17
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresAbuso,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'Abuso o Maltrato',
                                                queryMode: 'local'
                                            },
                                            {
                                                //18
                                                xtype: 'combobox',
                                                labelAlign: 'top',
                                                emptyText: 'Seleccione la o las ',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CAUSA',
                                                store: dsCausaListaFactoresErrores,
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_CAUSA',
                                                multiSelect: true,
                                                fieldLabel: 'ERRORES',
                                                queryMode: 'local'
                                            }        
                                        ]
                            }
                       ]
            },
            {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                layout: 'column',
                id: 'panel-AccionesCorrectivas',
                title: 'ACCIONES CORRECTIVAS / PREVENTIVAS TOMADAS Y/O RECOMENDADAS',
                items: [
				            {
				                xtype: 'form',
				                margin: '5 5 5 5',
				                bodyPadding: 10,
				                columnWidth: 0.4,
				                title: 'Acción Correctiva',
				                items: [
                                           {
	                                            xtype: 'panel',
	                                            border: 0,
	                                            layout: {
		                                            type: 'column'
	                                            },
	                                            items: [    
		                                             {
			                                            xtype: 'combobox',
                                                        margin: '5 5 5 5',
			                                            name: 'ID_ACCION',
			                                            store: 'dsAccion',
			                                            displayField: 'NOMBRE_ACCION',
			                                            valueField: 'ID_ACCION',
			                                            fieldLabel: 'Acciones',
			                                            emptyText: 'Listado de Acciones Correctivas',
			                                            multiSelect: true,
			                                            allowBlank: false,
                                                        anchor: '100%',
			                                            columnWidth: 0.94
		                                            },
		                                            {
														xtype: 'button',
                                                        margin: '5 5 5 0',
														iconCls: 'btn-add',
														columnWidth: 0.06,

														handler: function () {
															if (!winAcciones) {
																winAcciones = Ext.create('Ext.window.Window', {
																	width: 673,
																	closeAction: 'hide',
																	title: 'Ingresa una nueva Empresa',
																	modal: true,
																	items: [
																	// ...Formulario ...
																		  {
																		  xtype: 'form',
																		  id: 'Form_NewAccion',
																		  collapsible: true,
																		  margin: '5 5 5 5',
																		  bodyPadding: 10,
																		  title: 'Ingrese nueva Accion',
																		  items: [
																					{
										                                                xtype: 'textfield',
					                                                                    labelAlign: 'top',
										                                                margin: '5 5 5 5',
	                                                                                    name: 'NOMBRE_ACCION',
	                                                                                    store: 'dsAccion',
					                                                                    anchor: '100%',
	                                                                                    displayField: 'NOMBRE_ACCION',
	                                                                                    valueField: 'ID_ACCION',
										                                                fieldLabel: 'Accion',
					                                                                    emptyText: 'Accion Correctiva',
										                                                allowBlank: false
										                                            }
																					
																				],
																		  buttons: [{
																			  text: 'Agregar',
																			  handler: function () {
																				  var new_object,
																							errors,
																							form;

																				  form = this.up('form').getForm();
																				  new_object = Ext.create('WCF_ENAP.model.Accion', form.getValues());
																				  errors = new_object.validate();

																				  if (errors.isValid() && form.isValid()) {
																					  this.disable(true);
																					  Ext.data.StoreManager.lookup('dsAccion').insert(0, new_object);
																					  form.reset();
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
															winAcciones.show();
														}
													}
	                                            ]
                                            },
                                            {
                                                xtype: 'combobox',
                                                margin: '5 5 5 5',
                                                anchor: '100%',
                                                name: 'ID_CARGO',
                                                store: 'dsCargo',
                                                displayField: 'NOMBRE_CARGO',
                                                valueField: 'ID_CARGO',
                                                fieldLabel: 'Responsable',
                                                emptyText: 'Responsable',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'panel',
                                                border: 0,
                                                layout: {
                                                    type: 'column'
                                                },
                                                items: [
                                                    {
					                                    xtype: 'datefield',
                                                        labelAlign: 'top',
                                                        name: 'ID_ACCION_CORRECTIVA',
					                                    displayField: 'FECHA_CREACION',
                                                        margin: '5 5 5 5',
					                                    fieldLabel: 'Fecha Inicio',
                                                        anchor: '100%',
					                                    store: 'dsAccionCorrectiva',
                                                        emptyText: 'Fecha Inicio',
					                                    allowBlank: false,
					                                    columnWidth: 0.5
					                                },
                                                    {
					                                    xtype: 'datefield',
                                                        labelAlign: 'top',
                                                        name: 'ID_ACCION_CORRECTIVA',
					                                    displayField: 'FECHA_PLAZO',
                                                        margin: '5 5 5 5',
					                                    fieldLabel: 'Fecha Plazo',
                                                        anchor: '100%',
					                                    store: 'dsAccionCorrectiva',
                                                        emptyText: 'Fecha Finalizacion',
					                                    allowBlank: false,
					                                    columnWidth: 0.5
					                                }
                                                ]
                                            },
                                            {
                                                xtype: 'htmleditor',
                                                labelAlign: 'top',
                                                height: 150,
                                                margin: '5 5 5 5',
                                                name: 'ID_ACCION_CORRECTIVA',
                                                store: 'dsAccionCorrectiva',
                                                displayField: 'DESCRIPCION',
                                                valueField: 'ID_ACCION_CORRECTIVA',
                                                style: 'background-color: white;',
                                                fieldLabel: 'Descripcion de la o las acciones Correctivas',
                                                anchor: '100%'         
                                            }
						                ],
                                         buttons: [{
                                                    text: 'Agregar',
                                                    handler: function () {
                                                        var new_object,
                                                            errors,
                                                            form;
                        
                                                        form = this.up('form').getForm();
                                                        new_object = Ext.create('WCF_ENAP.model.AccionCorrectiva', form.getValues());
                                                        errors = new_object.validate();
                        
                                                        if (errors.isValid() && form.isValid()) {
                                                            this.disable(true);
                                                            Ext.data.StoreManager.lookup('dsAccionCorrectiva').insert(0, new_object);
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
					            margin: '5 5 5 5',
					            title: 'Acciones Correctivas',
					            columnWidth: 0.6,
					            store: 'dsAccionCorrectiva',
					            columns: [
								            {
									            xtype: 'gridcolumn',
									            dataIndex: 'NOMBRE_ACCION',
									            editor: {
										                    xtype: 'textfield',
				                                            labelAlign: 'top',
									                        margin: '5 5 5 5',
                                                            name: 'ID_ACCION',
                                                            store: 'dsAccion',
				                                            anchor: '100%',
                                                            displayField: 'NOMBRE_ACCION',
                                                            valueField: 'ID_ACCION',
									                        fieldLabel: 'Accion',
				                                            emptyText: 'Accion Correctiva',
									                        allowBlank: false
									                    },
									            text: 'Accion Correctiva'
								            },
                                            {
                                                "xtype": "gridcolumn",
                                                "dataIndex": "ID_CARGO",
                                                "text": "Responsable",
                                                flex: 0.33,
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
                                                "xtype": "gridcolumn",
                                                "dataIndex": "FECHA_CREACION",
                                                "text": "Fecha Creacion",
                                                "sortable": true,
                                                "field": {
                                                            xtype: 'datefield',
                                                            labelAlign: 'top',
                                                            name: 'ID_ACCION_CORRECTIVA',
					                                        displayField: 'FECHA_CREACION',
                                                            margin: '5 5 5 5',
                                                            anchor: '100%',
					                                        store: 'dsAccionCorrectiva',
                                                            emptyText: 'Fecha Inicio',
					                                        allowBlank: false,
					                                        //columnWidth: 0.5
                                                        },
                                                
                                                "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ACCION_CORRECTIVA', value.toString());
                                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('FECHA_CREACION') : ''
                                                }
                                            },
                                            {
                                                "xtype": "gridcolumn",
                                                "dataIndex": "FECHA_PLAZO",
                                                "text": "Fecha Creacion",
                                                "sortable": true,
                                                "field": {
                                                            xtype: 'datefield',
                                                            labelAlign: 'top',
                                                            name: 'ID_ACCION_CORRECTIVA',
					                                        displayField: 'FECHA_PLAZO',
                                                            margin: '5 5 5 5',
                                                            anchor: '100%',
					                                        store: 'dsAccionCorrectiva',
                                                            emptyText: 'Fecha Finalizacion',
					                                        allowBlank: false,
					                                        //columnWidth: 0.5
                                                        },
                                                
                                                "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_ACCION_CORRECTIVA', value.toString());
                                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('FECHA_PLAZO') : ''
                                                }
                                            }
							            ],
					            viewConfig: {
				            },
				            dockedItems: [
								            {
									            xtype: 'pagingtoolbar',
									            store: 'dsAccionCorrectiva',
									            displayInfo: true,
									            dock: 'bottom'
								            }
							            ],
				            plugins: [
							            Ext.create('Ext.grid.plugin.RowEditing', {
						            })
						            ]
			            }    
				             
				        
		                ]
            }
        ];
        me.callParent(arguments);
    }
});