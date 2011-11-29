Ext.define('WCF_ENAP.view.ui.NuevoPrograma', {
    extend: 'Ext.panel.Panel',
    title: 'Información de Nuevo Programa',
    margin: '5 5 5 5',
    initComponent: function () {
        var me = this, 
            yearsList = [],
            yearStep = 4,
            yearNow = (new Date()).getFullYear();

        for (var yInicio = (yearNow + yearStep); yInicio > (yearNow - yearStep); yInicio--) {
            yearsList.push([yInicio]);
        };

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'form_add_nuevo_programa',
                    border: 0,
                    margin: '5 5 5 5',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'panel',
                            border: 0,
                            margin: '5 5 5 5',
                            layout: {
                                type: 'column'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Crear un Programa Plantilla',
                                    columnWidth: 0.5
                                },
                                {
                                    xtype: 'panel',
                                    border: 0,
                                    layout: {
                                        type: 'column'
                                    },
                                    columnWidth: 0.5,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            store: 'dsTemplate',
                                            margin: '0 5 0 0',
                                            fieldLabel: 'Asignar a',
                                            columnWidth: 0.9
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'btn-add',
                                            columnWidth: 0.1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'NOMBRE_PROGRAMA',
                            fieldLabel: 'Nombre Programa',
                            labelAlign: 'top',
                            labelWidth: 150,
                            anchor: '100%'
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
                                    margin: '0 5 0 0',
                                    name: 'MES_INICIO',
                                    fieldLabel: 'Mes de Inicio del Programa',
                                    labelAlign: 'top',
                                    displayField: 'NOMBRE_MES',
                                    queryMode: 'local',
                                    store: 'dsMeses',
                                    valueField: 'ID_MES',
                                    columnWidth: 0.5
                                },
                                {
                                    xtype: 'combobox',
                                    store: Ext.create('Ext.data.ArrayStore', {
                                        fields: ['ANO'],
                                        data: yearsList
                                    }),
                                    name: 'ANO_INICIO',
                                    fieldLabel: 'Año en el que se ejecutará',
                                    labelAlign: 'top',
                                    displayField: 'ANO',
                                    valueField: 'ANO',
                                    columnWidth: 0.5
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Organización',
                            labelAlign: 'top',
                            allowBlank: false,
                            selectOnFocus: true,
                            displayField: 'NOMBRE_ORGANIZACION',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'dsOrganizacion',
                            typeAhead: true,
                            valueField: 'ID_ORGANIZACION',
                            anchor: '100%',
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
                            selectOnFocus: true,
                            displayField: 'NOMBRE_DEPARTAMENTO',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'dsDepartamento',
                            typeAhead: true,
                            valueField: 'ID_DEPARTAMENTO_ORGANIZACION',
                            anchor: '100%',
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
                            disabled: true,
                            id: 'cmb_programaAnual_division',
                            name: 'ID_DIVISION',
                            fieldLabel: 'División',
                            labelAlign: 'top',
                            selectOnFocus: true,
                            displayField: 'NOMBRE_DIVISION',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'dsDivision',
                            typeAhead: true,
                            valueField: 'ID_DIVISION',
                            anchor: '100%',
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
                            name: 'NOMBRE_DIVISION',
                            fieldLabel: 'Label',
                            anchor: '100%'
                        },
                        {
                            xtype: 'textareafield',
                            name: 'OBJETIVO_META',
                            fieldLabel: 'Objetivo & Meta',
                            labelAlign: 'top',
                            allowBlank: false,
                            anchor: '100%'
                        }
                    ]
                }
            ],
            buttons: [{
                text: 'Reset',
                handler: function () {
                    var form = Ext.getCmp('form_add_nuevo_programa').getForm();
                    form.reset();
                }
            }, {
                text: 'Agregar',
                handler: function () {
                    var new_object,
                                errors,
                                form;

                    form = Ext.getCmp('form_add_nuevo_programa').getForm();

                    new_object = Ext.create('WCF_ENAP.model.ProgramaAnual', Ext.apply({ 'PERCENT_TOTAL': 0 }, form.getValues()));
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
        });
        me.callParent(arguments);
    }
});