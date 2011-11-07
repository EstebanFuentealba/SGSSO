Ext.define('WCF_ENAP.view.ui.MenuGenerator', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],
    height: 600,
    layout: {
        type: 'column'
    },
    title: 'Genera Menú',
    id: 'panel-MenuGenerator',
    initComponent: function () {

        var me = this, winPrivilegios;
        Ext.define('Icons', {
            extend: 'Ext.data.Model',
            fields: [
                { 'name': 'ID_ICON', type: 'string' }
            ]
        });
        Ext.StoreManager.lookup('dsGrupoPrivilegio').on('write', function (store, operation, eOpts) {
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action);
            if (name == 'Update') {
                this.load({
                    params: { 'ID_NODO': recordAction.raw.ID_NODO },
                    callback: function (records, operation, success) {
                    }
                });
            }
        });
        var rowEditingPrivilegios = Ext.create('Ext.grid.plugin.RowEditing');
        var recordAction = null;
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Agrega Nodo',
                    iconCls: 'btn-add',
                    handler: function (widget, event) {
                        var form = Ext.getCmp('form_datos_nodo').getForm();
                        form.reset();
                        Ext.getCmp('STORE_LIST').removeAll();
                        var storeNode, 
                            recordNode,
                            idx;
                         try {
                            storeNode = Ext.data.StoreManager.lookup('dsNode');
                            idx = storeNode.find('ID_NODO', recordAction.raw.ID_NODO);
                            recordNode = storeNode.getAt(idx);
                            Ext.getCmp('cmb_parent_node').select(recordNode.get('ID_NODO'));
                            Ext.getCmp('btn_action_submit').setText('Agregar');
                        } catch (ex) {
                            storeNode = Ext.data.StoreManager.lookup('dsNode');
                            idx = storeNode.find('ID_NODO', 1);
                            recordNode = storeNode.getAt(idx);
                            Ext.getCmp('cmb_parent_node').select(recordNode.get('ID_NODO'));
                            Ext.getCmp('btn_action_submit').setText('Agregar');

                        }
                    }
                },
                {
                    text: 'Edita Nodo',
                    iconCls: 'btn-edit',
                    handler: function (widget, event) {
                        var form = Ext.getCmp('form_datos_nodo').getForm();
                        form.reset();
                        Ext.getCmp('STORE_LIST').removeAll();
                        try {
                            var storeNode = Ext.data.StoreManager.lookup('dsNode');
                            var idx = storeNode.find('ID_NODO', recordAction.raw.ID_NODO);
                            var recordNode = storeNode.getAt(idx);
                            form.loadRecord(recordNode);
                            Ext.getCmp('STORE_LIST').setRawValue(recordNode.get('STORE_LIST'));
                            Ext.getCmp('btn_action_submit').setText('Editar');
                        } catch (ex) { }
                    }
                },
                {
                    text: 'Asignar Permisos al Nodo',
                    iconCls: 'btn-edit',
                    handler: function (widget, event) {
                        if (!winPrivilegios) {
                            winPrivilegios = Ext.create('Ext.window.Window', {
                                height: 416,
                                width: 641,
                                closeAction: 'hide',
                                title: 'Permisos de Nodos (Módulos/Componentes)',
                                modal: true,
                                items: [
                                {
                                    xtype: 'form',
                                    height: 372,
                                    margin: '5 5 5 5',
                                    bodyPadding: 10,
                                    title: 'Permisos',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_asigna_privilegio_nodo',
                                            fieldLabel: 'Nodo',
                                            displayField: 'NOMBRE_MODULO',
                                            store: 'dsNode',
                                            valueField: 'ID_NODO',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            height: 297,
                                            title: 'Permisos del Nodo',
                                            store: 'dsGrupoPrivilegio',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ID_NODO',
                                                    text: 'Nodo',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var storeNodo = Ext.StoreManager.lookup('dsNode');
                                                        var idx = storeNodo.find('ID_NODO', value);
                                                        return idx !== -1 ? storeNodo.getAt(idx).get('NOMBRE_MODULO') : '';
                                                    },
                                                    field: {
                                                        xtype: 'combobox',
                                                        name: 'ID_NODO',
                                                        disabled: true,
                                                        displayField: 'NOMBRE_MODULO',
                                                        store: 'dsNode',
                                                        valueField: 'ID_NODO',
                                                        anchor: '100%'
                                                    }
                                                },
                                                  {
                                                      xtype: 'gridcolumn',
                                                      dataIndex: 'ID_GRUPO',
                                                      flex: 0.4,
                                                      text: 'Grupo',
                                                      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                          var storeGrupo = Ext.StoreManager.lookup('dsGrupo');
                                                          var idx = storeGrupo.find('ID_GRUPO', value);
                                                          return idx !== -1 ? storeGrupo.getAt(idx).get('NOMBRE_GRUPO') : '';
                                                      },
                                                      field: {
                                                          xtype: 'combobox',
                                                          name: 'ID_GRUPO',
                                                          displayField: 'NOMBRE_GRUPO',
                                                          store: 'dsGrupo',
                                                          valueField: 'ID_GRUPO',
                                                          anchor: '100%'
                                                      }
                                                  },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_READ',
                                                    flex: 0.1,
                                                    text: 'Visualizar',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_READ'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_WRITE',
                                                    flex: 0.1,
                                                    text: 'Crear',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_WRITE'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_EDIT',
                                                    flex: 0.1,
                                                    text: 'Modificar',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_EDIT'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_DELETE',
                                                    flex: 0.1,
                                                    text: 'Eliminar',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_DELETE'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_PRINT',
                                                    flex: 0.1,
                                                    text: 'Imprimir',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_PRINT'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ALLOW_CRUD',
                                                    flex: 0.1,
                                                    text: 'Mantener',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value) {
                                                            return "<span style='display: block; background-color:green;'><center><b>SI</b></center></span>";
                                                        }
                                                        return "<span style='display: block; background-color:red;'><center><b>NO</b></center></span>";
                                                    },
                                                    field: {
                                                        xtype: 'checkboxfield',
                                                        anchor: '100%',
                                                        name: 'ALLOW_CRUD'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            text: 'Asignar',
                                                            handler: function () {
                                                                Ext.StoreManager.lookup('dsGrupoPrivilegio').insert(0, Ext.create('WCF_ENAP.model.GrupoPrivilegio', {
                                                                    'ID_NODO': Ext.getCmp('cmb_asigna_privilegio_nodo').getValue()
                                                                }));
                                                                rowEditingPrivilegios.startEdit(0, 0);
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: 'Eliminar',
                                                            itemId: 'deletePrivilegio',
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    store: 'dsGrupoPrivilegio',
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                            plugins: [
                                                rowEditingPrivilegios
                                            ],
                                            listeners: {
                                                selectionchange: function (selModel, selections) {
                                                    this.down('#deletePrivilegio').setDisabled(selections.length === 0);
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                            });
                        }

                        //
                        winPrivilegios.show();
                        var storeGrupoPrivilegio = Ext.StoreManager.lookup('dsGrupoPrivilegio');
                        storeGrupoPrivilegio.load({
                            params: { 'ID_NODO': recordAction.raw.ID_NODO },
                            callback: function (records, operation, success) {
                                Ext.getCmp('cmb_asigna_privilegio_nodo').select(recordAction.raw.ID_NODO);
                            }
                        });
                    }
                }
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    id: 'tree_administration',
                    height: 331,
                    margin: '5 5 5 5',
                    title: 'Vista Previa',
                    store: 'dsNodes',
                    columnWidth: 0.4,
                    viewConfig: {

                },
                listeners: {
                    itemcontextmenu: function (view, rec, node, index, e) {
                        e.stopEvent();
                        recordAction = rec;
                        contextMenu.showAt(e.getXY());
                        return false;
                    }
                    /*itemclick: function (view, record, item, index, e, eOpts) {
                        
                    }*/
                }
            },
                {
                    xtype: 'form',
                    height: 500,
                    margin: '5 5 5 0',
                    bodyPadding: 10,
                    title: 'Datos del Nodo',
                    id: 'form_datos_nodo',
                    columnWidth: 0.6,
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'ID_NODO'
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Tipo de Nodo',
                            anchor: '100%',
                            id: 'radio_tipo_nodo',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    name: 'TIPO_NODO',
                                    boxLabel: 'Módulo',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Componente',
                                    name: 'TIPO_NODO',
                                    inputValue: 2
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Nodo Padre',
                            store: 'dsNode',
                            anchor: '100%',
                            name: 'NODO_PADRE',
                            displayField: 'NOMBRE_MODULO',
                            valueField: 'ID_NODO',
                            id: 'cmb_parent_node'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nombre del Nodo',
                            name: 'NOMBRE_MODULO',
                            anchor: '100%'
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Tipo ExtJS Componente',
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    name: 'TIPO_DISPLAY',
                                    boxLabel: 'Ext.panel.Panel',
                                    inputValue: 1
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Ext.window.Window',
                                    name: 'TIPO_DISPLAY',
                                    inputValue: 2
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Identificador',
                            name: 'ID_COMPONENTE',
                            anchor: '100%'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Posición en el Arbol',
                            name: 'N_ORDER',
                            anchor: '100%'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Icono',
                            name: 'ICONCLS',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: false,
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.Store', {
                                model: 'Icons',
                                data: [{
                                    ID_ICON: 'btn-add'
                                }, {
                                    ID_ICON: 'btn-del'
                                }, {
                                    ID_ICON: 'generator-editor-icon'
                                }, {
                                    ID_ICON: 'excel-icon'
                                }, {
                                    ID_ICON: 'update-programaanual-icon'
                                }, {
                                    ID_ICON: 'add-programaanual-icon'
                                }, {
                                    ID_ICON: 'grupo-icon'
                                }, {
                                    ID_ICON: 'btn-search'
                                }, {
                                    ID_ICON: 'btn-delete'
                                }, {
                                    ID_ICON: 'btn-add-save'
                                }, {
                                    ID_ICON: 'btn-save'
                                }, {
                                    ID_ICON: 'btn-add'
                                }, {
                                    ID_ICON: 'buscar-icon'
                                }, {
                                    ID_ICON: 'add-matriz-icon'
                                }, {
                                    ID_ICON: 'add-actividad-evaluada-icon'
                                }, {
                                    ID_ICON: 'matriz-icon'
                                }, {
                                    ID_ICON: 'reportes-icon'
                                }, {
                                    ID_ICON: 'administracion-icon'
                                }, {
                                    ID_ICON: 'user-icon'
                                }, {
                                    ID_ICON: 'programa-icon'
                                }, {
                                    ID_ICON: 'login-icon'
                                }, {
                                    ID_ICON: 'logout-icon'
                                }, {
                                    ID_ICON: 'seguimiento-icon'
                                }, {
                                    ID_ICON: 'add-evento-icon'
                                }, {
                                    ID_ICON: 'evento-icon'
                                }]
                            }),
                            anchor: '100%',
                            displayField: 'ID_ICON',
                            valueField: 'ID_ICON',
                            listConfig: {
                                getInnerTpl: function () {
                                    return '<span style="display: block; width: 16px; height: 16px;" class="{ID_ICON}"></span> {ID_ICON}';
                                }
                            }
                        },
                        {
                            xtype: 'itemselector',
                            fieldLabel: 'Stores',
                            id: 'STORE_LIST',
                            fieldLabel: 'Data Stores del Nodo',
                            imagePath: '/ux/css/images/',
                            store: 'dsStores',
                            anchor: '100%',
                            displayField: 'NOMBRE_STORE',
                            valueField: 'ID_STORE'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Reset',
                            handler: function () {
                                var form = this.up('form').getForm();
                                Ext.getCmp('STORE_LIST').removeAll();
                                form.reset();
                                Ext.getCmp('btn_action_submit').setText('Agregar');
                            }
                        }, {
                            xtype: 'button',
                            id: 'btn_action_submit',
                            text: 'Agregar',
                            handler: function () {
                                var new_object,
									errors,
									form;

                                form = this.up('form').getForm();
                                new_object = Ext.create('WCF_ENAP.model.Node', Ext.apply({ 'STORE_LIST': Ext.getCmp('STORE_LIST').getRawValue() }, form.getValues()));

                                errors = new_object.validate();

                                if (errors.isValid() && form.isValid()) {
                                    this.disable(true);
                                    var idNode = this.up('form').getComponent(0).getValue();
                                    var nodeStore = Ext.data.StoreManager.lookup('dsNode');
                                    if (idNode != "") {
                                        Ext.Ajax.request({
                                            url: nodeStore.proxy.url + idNode,
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json; charset=utf-8'
                                            },
                                            params: Ext.JSON.encode(Ext.apply({ 'STORE_LIST': Ext.getCmp('STORE_LIST').getRawValue() }, form.getValues())),
                                            success: function (result, request) {
                                                Ext.StoreManager.lookup('dsNodes').load();
                                                Ext.getCmp('tree_administration').getView().refresh();
                                            }
                                        }); ;
                                    } else {
                                        nodeStore.insert(0, new_object);
                                        Ext.StoreManager.lookup('dsNodes').load();
                                        Ext.getCmp('tree_administration').getView().refresh();
                                    }
                                    Ext.getCmp('STORE_LIST').removeAll();
                                    form.reset();
                                    Ext.getCmp('btn_action_submit').setText('Agregar');
                                    Ext.getCmp('tree_administration').getView().refresh();
                                } else {
                                    form.markInvalid(errors);
                                }

                                this.enable(true);


                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});