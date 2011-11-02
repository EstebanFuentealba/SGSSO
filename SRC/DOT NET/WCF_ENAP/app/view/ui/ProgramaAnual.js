Ext.define('WCF_ENAP.view.ui.ProgramaAnual', {
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    height: 624,
    width: 831,
    title: 'Programa Anual',
    id: 'panel-ProgramaAnual',
    initComponent: function () {
        var me = this,
            winActividadProgramaAnual;

        Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').on('datachanged', function (store, opts) {
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load();
        });
        Ext.StoreManager.lookup('dsProgramaAnual').on('datachanged', function (store, opts) {
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load();
        });
        Ext.applyIf(me, {
            items: [
            {
                height: 170,
                layout: 'fit',
                margin: '5 10 5 10',
                items: [{
                    xtype: 'chart',
                    store: 'dsGraphAvanceProgramaAnual',
                    flex: 1,
                    shadow: true,
                    animate: true,
                    axes: [
            {
                type: 'Category',
                fields: [
            'NOMBRE_PROGRAMA'
            ],
                position: 'bottom',
                title: 'Programas',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial'
                }
            },
            {
                type: 'Numeric',
                fields: [
            'PERCENT_TOTAL'
            ],
                position: 'left',
                title: '% Avance',
                maximum: 100,
                minimum: 0
            }
            ],
                    series: [
            {
                type: 'column',
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'PERCENT_TOTAL',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                },
                xField: 'NOMBRE_PROGRAMA',
                yField: [
            'PERCENT_TOTAL'
            ]
            }
            ]
                }]
            },
                {
                    xtype: 'panel',
                    height: 562,
                    border: 0,
                    margin: '5 5 5 5',
                    layout: {
                        type: 'column'
                    },
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 400,
                            margin: '5 5 5 5',
                            title: 'Listado de Programas',
                            store: 'dsProgramaAnual',
                            columnWidth: 0.6,
                            viewConfig: {

                        },
                        columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_PROGRAMA',
                                    text: 'Nombre del Programa',
                                    flex: 0.4
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_DIVISION',
                                    text: 'División',
                                    flex: 0.2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'OBJETIVO',
                                    text: 'Objetivo',
                                    flex: 0.2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'META',
                                    text: 'Meta',
                                    flex: 0.2
                                }
                            ],
                        dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true,
                                    store: 'dsProgramaAnual',
                                    dock: 'bottom'
                                }
                            ],
                        listeners: {
                            itemdblclick: function (view, record, item, index, e, options) {
                                var idProgramaAnual = record.get("ID_PROGRAMA_ANUAL");

                                //if(!winActividadProgramaAnual){
                                var gridProgramaAnual = Ext.create('WCF_ENAP.view.ui.ProgramaAnualPrevencion', {
                                    recordParent: record
                                });
                                winActividadProgramaAnual = Ext.create('Ext.window.Window', {
                                    modal: true,
                                    width: 850,
                                    maximizable: true,
                                    title: record.get('NOMBRE_PROGRAMA'),
                                    items: [gridProgramaAnual]
                                });
                                //}
                                var formulario = winActividadProgramaAnual.getComponent('form_programa_anual');
                                var form = formulario.getForm();

                                /*Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').load({
                                params: { 'ID_PROGRAMA_ANUAL': idProgramaAnual },
                                callback: function (records, operation, success) {
                                //console.log(records);
                                }
                                });*/
                                form.loadRecord(record);
                                //formulario.setColumns(record.get('MES_INICIO'));
                                //console.log(record);
                                winActividadProgramaAnual.show();

                            }
                        }
                    },
                        {
                            xtype: 'form',
                            margin: '5 5 5 0',
                            bodyPadding: 10,
                            title: 'Información de Programa',
                            columnWidth: 0.4,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'NOMBRE_PROGRAMA',
                                    fieldLabel: 'Nombre Programa',
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'panel',
                                    border: 0,
                                    layout: {
                                        type: 'column'
                                    },
                                    anchor: '100%',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mes',
                                            store: 'dsMeses',
                                            valueField: 'ID_MES',
                                            displayField: 'NOMBRE_MES',
                                            labelAlign: 'top',
                                            queryMode: 'local',
                                            columnWidth: 0.5,
                                            name: 'MES_INICIO'
                                        },
                                        {
                                            xtype: 'combobox',
                                            store: Ext.create('Ext.data.ArrayStore', {
                                                fields: ['ANO'],
                                                data: [[2004], [2005], [2006], [2007], [2008], [2009], [2010], [2011], [2012]]
                                            }),
                                            margin: '0 0 0 5',
                                            fieldLabel: 'Año',
                                            labelAlign: 'top',
                                            columnWidth: 0.5,
                                            valueField: 'ANO',
                                            displayField: 'ANO',
                                            name: 'ANO_INICIO'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'ID_ORGANIZACION',
                                    fieldLabel: 'Organización',
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    displayField: 'NOMBRE_ORGANIZACION',
                                    store: 'dsOrganizacion',
                                    valueField: 'ID_ORGANIZACION',
                                    anchor: '100%',
                                    typeAhead: true,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    queryMode: 'local',
                                    lastQuery: '',
                                    selectOnFocus: true,
                                    listeners: {
                                        'change': function (cmb, newValue, oldValue, eOpts) {
                                            var cmbDepto = Ext.getCmp('cmb_programaAnual_departamento');
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
                                    disabled: true,
                                    id: 'cmb_programaAnual_departamento',
                                    name: 'ID_DEPARTAMENTO_ORGANIZACION',
                                    fieldLabel: 'Departamento',
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    displayField: 'NOMBRE_DEPARTAMENTO',
                                    store: 'dsDepartamento',
                                    valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                                    anchor: '100%',
                                    typeAhead: true,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    queryMode: 'local',
                                    lastQuery: '',
                                    selectOnFocus: true,
                                    listeners: {
                                        'change': function (cmb, newValue, oldValue, eOpts) {
                                            var cmbDiv = Ext.getCmp('cmb_programaAnual_division');
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
                                    id: 'cmb_programaAnual_division',
                                    disabled: true,
                                    name: 'ID_DIVISION',
                                    fieldLabel: 'División',
                                    labelAlign: 'top',
                                    displayField: 'NOMBRE_DIVISION',
                                    store: 'dsDivision',
                                    valueField: 'ID_DIVISION',
                                    anchor: '100%',
                                    typeAhead: true,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    emptyText: 'Selecciona un Departamento',
                                    queryMode: 'local',
                                    lastQuery: '',
                                    selectOnFocus: true
                                },
                                {
                                    xtype: 'textareafield',
                                    name: 'OBJETIVO',
                                    fieldLabel: 'Objetivo',
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'textareafield',
                                    name: 'META',
                                    fieldLabel: 'Meta',
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    anchor: '100%'
                                }
                            ],
                            buttons: [{
                                text: 'Reset',
                                handler: function () {
                                    var form = this.up("form").getForm();
                                    form.reset();
                                }
                            }, {
                                text: 'Agregar',
                                handler: function () {
                                    var new_object,
                                        errors,
                                        form;

                                    form = this.up('form').getForm();
                                    new_object = Ext.create('WCF_ENAP.model.ProgramaAnual', form.getValues());
                                    errors = new_object.validate();

                                    if (errors.isValid() && form.isValid()) {
                                        this.disable(true);
                                        Ext.data.StoreManager.lookup('dsProgramaAnual').insert(0, new_object);
                                        form.reset();
                                    } else {
                                        form.markInvalid(errors);
                                    }
                                    this.enable(true);
                                }
                            }]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});