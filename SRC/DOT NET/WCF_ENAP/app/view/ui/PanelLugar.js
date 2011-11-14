Ext.define('WCF_ENAP.view.ui.PanelLugar', {
    requires: [
        'Ext.ux.form.field.ClearButton'
    ],
    extend: 'Ext.panel.Panel',
    margin: '5 5 5 5',
    bodyPadding: 10,
    layout: 'anchor',
    items: [
		    {
		        xtype: 'combobox',
		        plugins: ['clearbutton'],
		        fieldLabel: 'Organización',
		        displayField: 'NOMBRE_ORGANIZACION',
		        store: 'dsOrganizacion',
		        valueField: 'ID_ORGANIZACION',
		        name: 'ID_ORGANIZACION',
		        anchor: '100%',
		        mode: 'local',
		        editable: false,
		        allowBlank: false,
		        triggerAction: 'all',
		        emptyText: 'Selecciona una Organización',
		        listeners: {
		            'change': function (cmb, newValue, oldValue, eOpts) {
		                var record,
                            cmbDepto = this.next('combobox');
		                cmbDepto.clearValue();

		                if (newValue != null) {
		                    record = Ext.create('WCF_ENAP.model.Organizacion', { 'ID_ORGANIZACION': newValue });
		                    Ext.data.StoreManager.lookup('dsDepartamento').load({
		                        params: record.data,
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
		        name: 'ID_DEPARTAMENTO_ORGANIZACION'
		    },
            {
                xtype: 'combobox',
                plugins: ['clearbutton'],
                fieldLabel: 'Departamento',
                displayField: 'NOMBRE_DEPARTAMENTO',
                store: 'dsDepartamento',
                valueField: 'ID_DEPARTAMENTO',
                name: 'ID_DEPARTAMENTO',
                anchor: '100%',
                editable: false,
                disabled: true,
                typeAhead: true,
                forceSelection: true,
                triggerAction: 'all',
                emptyText: 'Selecciona un Departamento',
                queryMode: 'local',
                lastQuery: '',
                selectOnFocus: true,
                listeners: {
                    'change': function (cmb, newValue, oldValue, eOpts) {
                        var record,
                            cmbDiv;
                        cmbDiv = this.next('combobox');
                        cmbDiv.clearValue();

                        if (newValue != null) {
                            record = this.store.getById(newValue);
                            this.prev('hiddenfield').setValue(record.get('ID_DEPARTAMENTO_ORGANIZACION'));
                            Ext.data.StoreManager.lookup('dsDivision').load({
                                params: record.data,
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
		        plugins: ['clearbutton'],
		        fieldLabel: 'División',
		        displayField: 'NOMBRE_DIVISION',
		        store: 'dsDivision',
		        valueField: 'ID_DIVISION',
		        name: 'ID_DIVISION',
		        anchor: '100%',
		        editable: false,
		        disabled: true,
		        typeAhead: true,
		        forceSelection: true,
		        triggerAction: 'all',
		        emptyText: 'Selecciona un División',
		        queryMode: 'local',
		        lastQuery: '',
		        selectOnFocus: true,
		        listeners: {
		            'change': function (cmb, newValue, oldValue, eOpts) {
		                var cmbArea = this.next('combobox');
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
		        plugins: ['clearbutton'],
		        fieldLabel: 'Area',
		        displayField: 'NOMBRE_AREA',
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
});