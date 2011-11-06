Ext.define('WCF_ENAP.view.ui.NuevoEvento', {
    extend: 'Ext.window.Window',
    modal: true,
    width: 850,
    maximizable: true,
    cmpPadre: null,
    title: 'AGREGA NUEVO INCIDENTE',
    initComponent: function () {
        var me = this;

        me.items = [
		{
		    xtype: 'form',
		    margin: '5 5 5 5',
		    bodyPadding: 10,
		    layout: 'column',
		    title: 'Registrar Nuevo Evento',
		    items: [
			{
			    xtype: 'form',
			    margin: '0 5 0 0',
			    bodyPadding: 10,
			    columnWidth: 0.5,
			    id: 'panel-DatosGenerales',
			    title: 'Datos Generales del Evento',
			    items: [
					{
					    xtype: 'combobox',
					    margin: '5 5 5 5',
					    labelAlign: 'top',
					    fieldLabel: 'Organización',
					    displayField: 'NOMBRE_ORGANIZACION',
					    store: 'dsOrganizacion',
					    valueField: 'ID_ORGANIZACION',
					    name: 'ID_ORGANIZACION',
					    id: 'form_addevento_organizacion',
					    anchor: '100%',
					    mode: 'local',
					    editable: false,
					    allowBlank: false,
					    triggerAction: 'all',
					    emptyText: 'Seleccione la Organización',
					    listeners: {
					        'change': function (cmb, newValue, oldValue, eOpts) {
					            var cmbDepto = Ext.getCmp('form_addevento_organizacion_departamento');
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
                        xtype: 'hiddenfield',
                        name: 'NOMBRE_DEPARTAMENTO',
                        id: 'form_addevento_nombre_departamento'
                    },
					{
					    xtype: 'combobox',
					    margin: '5 5 5 5',
					    labelAlign: 'top',
					    fieldLabel: 'Departamento',
					    id: 'form_addevento_organizacion_departamento',
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
					    emptyText: 'Seleccione el Departamento',
					    queryMode: 'local',
					    lastQuery: '',
					    selectOnFocus: true,
					    listeners: {
					        'change': function (cmb, newValue, oldValue, eOpts) {
					            var cmbDiv = Ext.getCmp('form_addevento_organizacion_division');
					            Ext.getCmp('form_addevento_nombre_departamento').setValue(cmb.getRawValue());
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
					    margin: '5 5 5 5',
					    labelAlign: 'top',
					    fieldLabel: 'División',
					    id: 'form_addevento_organizacion_division',
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
					            var cmbArea = Ext.getCmp('form_addevento_organizacion_area');
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
					    margin: '5 5 5 5',
					    labelAlign: 'top',
					    fieldLabel: 'Area',
					    displayField: 'NOMBRE_AREA',
					    id: 'form_addevento_organizacion_area',
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
					    layout: 'column',
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
										    name: 'HORA_EVENTO',
										    emptyText: 'Hora del Evento',
										    fieldLabel: 'Hora',
										    format: 'H:i',
										    allowBlank: false,
										    increment: 5,
										    columnWidth: 0.5
										}
									]
					},
					{
					    xtype: 'htmleditor',
					    labelAlign: 'top',
					    margin: '5 5 5 5',
					    height: 150,
					    name: 'DESCRIPCION_GENERAL',
					    style: 'background-color: white;',
					    fieldLabel: 'Descripcion del Evento',
					    anchor: '100%'
					},
					{
					    xtype: 'hiddenfield',
					    name: 'LAT_EVENTO',
					    id: 'form_lat_evento',
					    anchor: '100%'
					},
					{
					    xtype: 'hiddenfield',
					    name: 'LNG_EVENTO',
					    id: 'form_lng_evento',
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
			    columnWidth: 0.5,
			    layout: {
			        type: 'fit'
			    },
			    items: [
                    {
                        xtype: 'gmappanel',
                        id: 'dragable',
                        zoomLevel: 14,
                        gmapType: 'map',
                        mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
                        mapControls: ['GSmallMapControl', 'GMapTypeControl'],
                        setCenter: {
                            lat: -36.779860,
                            lng: -73.125072,
                            marker: {
                                title: 'Incidente Ocurrido',
                                draggable: true,
                                listeners: {
                                    dragend: function (e) {
                                        Ext.getCmp('form_lat_evento').setValue(e.latLng.Na);
                                        Ext.getCmp('form_lng_evento').setValue(e.latLng.Oa);
                                    }
                                }
                            }
                        }
                    }
                ]
			}
		],
		    buttons: [{
		        text: 'Guardar',
		        handler: function () {
		            var new_object,
                            errors,
                            form;

		            form = this.up('form').getForm();
		            new_object = Ext.create('WCF_ENAP.model.Evento', form.getValues());
		            errors = new_object.validate();

		            if (errors.isValid() && form.isValid()) {
		                this.disable(true);
		                Ext.data.StoreManager.lookup('dsEvento').insert(0, new_object);
		                form.reset();
		            } else {
		                form.markInvalid(errors);
		            }
		            this.enable(true);
		        }
		    }]
		}];
        me.callParent(arguments);
    }
});