

Ext.define('WCF_ENAP.view.ui.Usuario', {
    extend: 'Ext.panel.Panel',

    height: 570,
    id: 'panel-Usuario',
    title: 'Usuario',
    autoScroll: true,
    bodyPadding: 10,

    initComponent: function () {
        var me = this, winGrupo, winEmpresa;
        me.items = [
            {
                xtype: 'form',
                margin: '5 5 5 5',
                bodyPadding: 10,
                collapsible: true,
                title: 'Crear Usuario',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5',
                        fieldLabel: 'RUT',
                        name: 'RUT_TRABAJADOR',
                        allowBlank: false,
                        anchor: '100%',
                        vtype: 'rut'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Nombres',
                        name: 'NOMBRES',
                        allowBlank: false,
                        vtype: 'alpha',
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Apellido Paterno',
                        name: 'APELLIDO_PATERNO',
                        allowBlank: false,
                        vtype: 'alpha',
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Apellido Materno',
                        name: 'APELLIDO_MATERNO',
                        allowBlank: false,
                        vtype: 'alpha',
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Teléfono',
                        name: 'TELEFONO',
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Email',
                        name: 'EMAIL',
                        allowBlank: false,
                        vtype: 'email',
                        anchor: '100%'
                    },
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
                                margin: '5 5 5 5',
                                anchor: '100%',
                                name: 'ID_EMPRESA',
                                store: 'dsEmpresa',
                                displayField: 'NOMBRE_EMPRESA',
                                valueField: 'ID_EMPRESA',
                                fieldLabel: 'Pertenece a ',
                                allowBlank: false,
                                columnWidth: 0.94
                            },
                            {
                                xtype: 'button',
                                margin: '0 0 0 3',
                                iconCls: 'btn-add',
                                columnWidth: 0.06,

                                handler: function () {
                                    if (!winEmpresa) {
                                        winEmpresa = Ext.create('Ext.window.Window', {
                                            width: 673,
                                            closeAction: 'hide',
                                            title: 'Ingresa una nueva Empresa',
                                            modal: true,
                                            items: [
                                            // ...Formulario ...
                                                  {
                                                  xtype: 'form',
                                                  id: 'Form_Empresa',
                                                  collapsible: true,
                                                  margin: '5 5 5 5',
                                                  bodyPadding: 10,
                                                  title: 'Ingrese nueva Empresa Contratistas',
                                                  items: [{ "xtype": "textfield", "fieldLabel": "Nombre Empresa", "anchor": "100%", "name": "NOMBRE_EMPRESA" },
                                                            { "xtype": "textfield", "fieldLabel": "Direccion Empresa", "anchor": "100%", "name": "DIRECCION_EMPRESA" },
                                                            { "xtype": "textfield", "fieldLabel": "Fono Empresa", "anchor": "100%", "name": "FONO_EMPRESA" },
                                                            { "xtype": "textfield", "fieldLabel": "Email Empresa", "anchor": "100%", vtype: 'email', "name": "EMAIL_EMPRESA" },
                                                            { "xtype": "textfield", "fieldLabel": "Nombre Contrato", "anchor": "100%", "name": "NOMBRE_CONTRATO"}],
                                                  buttons: [{
                                                      text: 'Agregar',
                                                      handler: function () {
                                                          var new_object,
                                                                    errors,
                                                                    form;

                                                          form = this.up('form').getForm();
                                                          new_object = Ext.create('WCF_ENAP.model.Empresa', form.getValues());
                                                          errors = new_object.validate();

                                                          if (errors.isValid() && form.isValid()) {
                                                              this.disable(true);
                                                              Ext.data.StoreManager.lookup('dsEmpresa').insert(0, new_object);
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
                                    winEmpresa.show();
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 5 5 ',
                        fieldLabel: 'Password',
                        name: 'PASSWORD',
                        allowBlank: false,
                        inputType: 'password',
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
                        new_object = Ext.create('WCF_ENAP.model.Usuario', form.getValues());
                        errors = new_object.validate();

                        if (errors.isValid() && form.isValid()) {
                            this.disable(true);
                            Ext.data.StoreManager.lookup('dsUsuario').insert(0, new_object);
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
                title: 'Listado de Usuarios',
                collapsible: true,
                height: 200,
                store: 'dsUsuario',
                columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'RUT_TRABAJADOR',
                                flex: 0.12,
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
                                    flex: 0.15,
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
                                    flex: 0.14,
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
                                    flex: 0.14,
                                    anchor: '100%'
                                },
                                text: 'Apellido Materno'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'TELEFONO',
                                editor: {
                                    xtype: 'textfield',
                                    name: 'TELEFONO',
                                    allowBlank: false,
                                    flex: 0.14,
                                    anchor: '100%'
                                },
                                text: 'Teléfono'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'EMAIL',
                                editor: {
                                    xtype: 'textfield',
                                    name: 'EMAIL',
                                    allowBlank: false,
                                    vtype: 'email',
                                    flex: 0.14,
                                    anchor: '100%'
                                },
                                text: 'Email'
                            },
                            {
                                "xtype": "gridcolumn",
                                "dataIndex": "ID_EMPRESA",
                                "text": "Id Empresa",
                                "sortable": true,
                                "field": {
                                    "xtype": "combo",
                                    "displayField": "NOMBRE_EMPRESA",
                                    "valueField": "ID_EMPRESA",
                                    "anchor": "100%",
                                    "store": "dsEmpresa",
                                    "name": "ID_EMPRESA"
                                },
                                "renderer": function (value, metaData, record, rowIndex, colIndex, store) {
                                    var idx = Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).find('ID_EMPRESA', value.toString());
                                    return idx !== -1 ? Ext.data.StoreManager.lookup(this.columns[colIndex].field.store).getAt(idx).get('NOMBRE_EMPRESA') : ''
                                }
                            } ,
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'PASSWORD',
                                flex: 0.14,
                                inputType: 'password',
                                text: 'Password'
                            }
                        ],
                viewConfig: {

            },
            dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                store: 'dsUsuario',
                                displayInfo: true,
                                dock: 'bottom'
                            }
                        ],
            plugins: [
                            Ext.create('Ext.grid.plugin.RowEditing', {

                        })
                        ]
        }
        ];
        me.callParent(arguments);
    }
});