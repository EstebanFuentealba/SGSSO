Ext.define('WCF_ENAP.view.ui.ProgramaAnual', {
    requires: [
        'Ext.ux.RowExpander',
        'Ext.ux.grid.column.ProgressColumn'
    ],
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    height: 624,
    width: 831,
    title: 'Programa Anual',
    id: 'panel-ProgramaAnual',
    initComponent: function () {
        var me = this,
            winActividadProgramaAnual,
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();

        for (var yInicio = (yearNow + yearStep); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        }
        Ext.StoreManager.lookup('dsActividadProgramaAnualPrevencion').on('datachanged', function (store, opts) {
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load();
        });
        Ext.StoreManager.lookup('dsProgramaAnual').on('datachanged', function (store, opts) {
            Ext.StoreManager.lookup('dsGraphAvanceProgramaAnual').load();
        });
        var groupingSummary = Ext.create('Ext.grid.feature.GroupingSummary', {
            groupHeaderTpl: '{name}'
        });
    Ext.applyIf(me, {
        items: [
            {
                height: 170,
                layout: 'fit',
                margin: '5 10 5 10',
                items: [
                    {
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
                            id: 'grid_programas_list',
                            title: 'Listado de Programas',
                            store: 'dsProgramaAnual',
                            columnWidth: 0.6,
                            viewConfig: {

                        },
                        features: [groupingSummary],
                        plugins: [
                            {
                                ptype: 'rowexpander',
                                pluginId: 'rowexpanderprograma',
                                rowBodyTpl: [
                                    '<div style="margin-left: 15px;"><div style="margin-left: 15px; float:left;"><h3>Objetivo:</h3>{OBJETIVO}<br /><h3>Meta:</h3>{META}<br /></div></div>'
                                ]
                            }
		                ],
                        columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'NOMBRE_PROGRAMA',
                                    text: 'Nombre del Programa',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ID_DIVISION',
                                    text: 'División',
                                    flex: 0.3,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        return record.get('NOMBRE_DIVISION');
                                    }
                                },
                                {
                                    xtype: 'progresscolumn',
                                    dataIndex: 'PERCENT_TOTAL',
                                    text: '% Avance',
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
                            afterrender: function (component, eOpts) {
                                var me = this,
                                    plugin = me.getPlugin('rowexpanderprograma'),
                                    view = groupingSummary.view,
                                    viewPlugin = plugin.view;

                                view.on('collapsebody', function (rowNode, record, nextBd) {
                                    me.doLayout();
                                });
                                view.on('expandbody', function (rowNode, record, nextBd) {
                                    me.doLayout();
                                });
                            },
                            itemdblclick: function (view, record, item, index, e, options) {
                                var idProgramaAnual = record.get("ID_PROGRAMA_ANUAL");


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
                                var formulario = winActividadProgramaAnual.getComponent('form_programa_anual');
                                var form = formulario.getForm();
                                form.loadRecord(record);
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
                                                data: yearsList
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
                                    emptyText: 'Selecciona una División',
                                    queryMode: 'local',
                                    lastQuery: '',
                                    selectOnFocus: true,
                                    listeners: {
                                        'change': function (cmb, newValue, oldValue, eOpts) {
                                            try {
                                                var storeDivision = Ext.StoreManager.lookup('dsDivision');
                                                var id_division_record = storeDivision.find('ID_DIVISION', newValue);
                                                Ext.getCmp('txt_nombre_division_programa').setValue(storeDivision.getAt(id_division_record).get('NOMBRE_DIVISION'));
                                            } catch (e) { /*Record no contiene la ID*/ }
                                        }
                                    }
                                },
                                {
                                    xtype: 'hiddenfield',
                                    id: 'txt_nombre_division_programa',
                                    name: 'NOMBRE_DIVISION'
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
                                    var cmbAno = this.up('panel').down('combobox').next('combobox');
                                    var nameDivision = Ext.getCmp('txt_nombre_division_programa').getValue();
                                    var programaName = '[' + cmbAno.getValue() + '] ' + nameDivision;

                                    new_object = Ext.create('WCF_ENAP.model.ProgramaAnual', Ext.apply({ 'PROGRAMA': programaName, 'PERCENT_TOTAL': 0 }, form.getValues()));
                                    errors = new_object.validate();

                                    groupingSummary.disable();

                                    console.log(new_object);
                                    if (errors.isValid() && form.isValid()) {
                                        this.disable(true);
                                        Ext.data.StoreManager.lookup('dsProgramaAnual').insert(0, new_object);
                                        groupingSummary.enable();
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