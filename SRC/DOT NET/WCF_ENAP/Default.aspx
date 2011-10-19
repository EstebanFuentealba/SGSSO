<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WCF_ENAP.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
    <title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="es" />
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <link href="/ext-4.0.2a/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
    <link href="/js/layouts/css/layout-browser.css" rel="stylesheet" type="text/css" />
	<link href="/ux/css/data-view.css" rel="stylesheet" type="text/css" />
    <link href="/ux/css/CenterLayout.css" rel="stylesheet" type="text/css" />
    <script src="/ext-4.0.2a/ext-all-debug.js" type="text/javascript"></script>
	<script src="/ext-4.0.2a/locale/ext-lang-es.js"></script>
    <!--
    <script type="text/javascript">
        Ext.define('Ext.ux.CheckboxGroupData', {
            extend: 'Ext.form.CheckboxGroup',
            alias: ['widget.checkboxgroupdata'],
            initComponent: function () {
                var me = this;
                if (!me.store) {
                    Ext.Error.raise("You must specify a store config");
                }
                if (!me.displayField || !me.valueField) {
                    Ext.Error.raise("You must specify displayField and valueField config");
                }
                me.store = Ext.data.StoreManager.lookup(me.store);
                me.mon(me.store, {
                    load: Ext.Function.bind(me.onDataLoaded, this)
                });
                me.callParent(arguments);
            },
            onDataLoaded: function (store, records, successful, operation, options) {
                var me = this, checks = [];
                Ext.each(records, function (name, index, record) {
                    me.add(Ext.create("Ext.form.field.Checkbox", {
                        boxLabel: records[index].get(me.displayField),
                        inputValue: records[index].get(me.valueField),
                        columnWidth: 0.25
                    }));
                });
            }
        });
        Ext.define('WCF_ENAP.view.ui.MyTabPanel', {
            extend: 'Ext.tab.Panel',

            height: 432,
            width: 781,
            activeTab: 0,

            initComponent: function () {
                var me = this;
                me.items = [
            {
                xtype: 'panel',
                height: 260,
                width: 472,
                title: 'Antecedentes',
                items: [
                    {
                        xtype: 'form',
                        margin: '5 5 5 5',
                        bodyPadding: 10,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Empresa',
                                displayField: 'NOMBRE_EMPRESA',
                                store: 'dsEmpresa',
                                valueField: 'ID_EMPRESA',
                                name: 'ID_EMPRESA',
                                anchor: '100%',
                                editable: false,
                                typeAhead: true,
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Selecciona una Empresa',
                                queryMode: 'local',
                                lastQuery: '',
                                selectOnFocus: true
                            },
                            {
                                xtype: 'checkboxgroup',
                                fieldLabel: 'Afecta a',
                                allowBlank: false,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: 'Persona',
                                        listeners: {
                                            change: function (field, newValue, oldValue, options) {
                                                if (newValue) {
                                                    Ext.data.StoreManager.lookup('dsDatoEvento').load({
                                                        params: { 'TIPO': 1 },
                                                        callback: function (records, operation, success) {
                                                            /* Muestra  Tab*/

                                                            //Ext.getCmp('tab_nuevo_evento_tipo_evento').show();
                                                            
                                                            //this.up("tabpanel").doLayout();
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: 'Patrimonio'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: 'Pérdida de Proceso'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        boxLabel: 'Medio Ambiente'
                                    }
                                ]
                            },
                            {
                                xtype: 'filefield',
                                fieldLabel: 'Archivo Adjunto',
                                anchor: '100%'
                            },
                            {
                                xtype: 'htmleditor',
                                height: 150,
                                style: 'background-color: white;',
                                fieldLabel: 'Descripción detallada',
                                anchor: '100%'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'form',
                hidden: true,
                id: 'tab_nuevo_evento_tipo_evento',
                title: 'Tipo de Evento',
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '5 5 5 5',
                        title: 'Personas',
                        items: [
                        {
                            xtype: 'checkboxgroupdata',
                            id: 'adad',
                            store: 'dsDatoEvento',
                            displayField: 'NOMBRE_TIPO_EVENTO',
                            valueField: 'ID_TIPO_EVENTO',
                            layout: {
                                type: 'column'
                            },
                            columns: 4
                        }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                title: 'Involucrados'
            },
            {
                xtype: 'panel',
                title: 'Causas'
            }
        ];
                me.callParent(arguments);
            }
        });



        Ext.Loader.setConfig({ enabled: true });
        Ext.onReady(function () {
            Ext.application({
                name: 'WCF_ENAP',
                stores: ["dsOrganizacion", "dsDepartamento", "dsEvento", "dsEmpresa","dsDatoEvento"],
                launch: function () {
                    Ext.QuickTips.init();
                    var cmp = Ext.create('WCF_ENAP.view.ui.MyTabPanel', { renderTo: Ext.getBody() });
                    cmp.show();
                }
            });
        });
    </script>
    -->


    <script type="text/javascript" src="/js/layouts/basic.js"></script> 
    <script type="text/javascript" src="/js/layouts/custom.js"></script> 
    <script type="text/javascript" src="/js/layouts/combination.js"></script> 
	<script type="text/javascript" src="/js/layouts/layout-browser.js?00"></script>
    
    <style type="text/css">
    .evento-icon{background:transparent url(/icons/application_form.png) 0 0 no-repeat !important;}
    .add-evento-icon{background:transparent url(/icons/application_form_add.png) 0 0 no-repeat !important;}
    .seguimiento-icon{background:transparent url(/icons/arrow_divide.png) 0 0 no-repeat !important;}
    .logout-icon{background:transparent url(/icons/door_out.png) 0 0 no-repeat !important;}  
    .login-icon{background:transparent url(/icons/door_in.png) 0 0 no-repeat !important;}
    .programa-icon{background:transparent url(/icons/sitemap_color.png) 0 0 no-repeat !important;} 
    .user-icon{background:transparent url(/icons/user.png) 0 0 no-repeat !important;}
    .administracion-icon{background:transparent url(/icons/wrench.png) 0 0 no-repeat !important;}
    .reportes-icon{background:transparent url(/icons/chart_bar.png) 0 0 no-repeat !important;}
    .matriz-icon{background:transparent url(/icons/bricks.png) 0 0 no-repeat !important;}
    .add-actividad-evaluada-icon{background:transparent url(/icons/brick_add.png) 0 0 no-repeat !important;}
    .add-matriz-icon{background:transparent url(/icons/brick_add.png) 0 0 no-repeat !important;}
    .buscar-icon{background:transparent url(/icons/magnifier.png) 0 0 no-repeat !important;}
    .btn-add{background:transparent url(/icons/add.png) 0 0 no-repeat !important;}
    .btn-save{background:transparent url(/icons/database_save.png) 0 0 no-repeat !important;}
    .grupo-icon{background:transparent url(/icons/group.png) 0 0 no-repeat !important;}
    .add-programaanual-icon{background:transparent url(/icons/chart_organisation_add.png) 0 0 no-repeat !important;}
    .update-programaanual-icon{background:transparent url(/icons/chart_organisation.png) 0 0 no-repeat !important;}
    .excel-icon {background:transparent url(/icons/page_excel.png) 0 0 no-repeat !important;};
    .tooltip
    {
        float: right;        
    }
    </style>
    <script type="text/javascript">
        Ext.define('Ext.grid.feature.CheckGrouping', {
            extend: 'Ext.grid.feature.Grouping',
            requires: 'Ext',
            alias: 'widget.brigrouping',
            selectionMode: "MULTI",
            constructor: function () {
                this.callParent(arguments);
                this.groupHeaderTpl = ['<dl style="height:18px; border:0px !important">',
                    '<dd id="groupcheck{name}" class="x-grid-row-checker x-column-header-text" style="width:18px; float:left;" x-grid-group-hd-text="{text}">&nbsp;</dd>',
                    '<dd style="float:left; padding:3px 0px 0px 3px;">',
                    this.groupHeaderTpl,
                    '</dd>',
                    '</dl>'
                ].join('');
            },
            onGroupClick: function (view, node, group, e, options) {
                var me = this;


                var checkbox = Ext.get('groupcheck' + group);
                if (me.inCheckbox(checkbox, e.getXY())) {
                    me.toggleCheckbox(group, node, view);
                } else if (me.isLeftofCheckbox(checkbox, e.getXY())) {
                    me.callParent(arguments);
                    if (this.selectionMode == "SINGLE") { }
                }

            },

            inCheckbox: function (checkbox, xy) {
                var x = xy[0];
                var y = xy[1];
                if (x >= checkbox.getLeft() &&
                    x <= checkbox.getRight() &&
                    y >= checkbox.getTop() &&
                    y <= checkbox.getBottom()) {
                    return true;
                }
                return false;
            },
            isLeftofCheckbox: function (checkbox, xy) {
                if (xy[0] < checkbox.getLeft()) {
                    return true;
                }
                return false;
            },
            getSelectionModel: function () {
                return this.view.getSelectionModel();
            },
            deSelectAll: function (node) {
                var me = this;
                var checkboxs = Ext.select('.x-grid-row-checked');
                Ext.each(checkboxs.elements, function (name, index, obj) {
                    var nd = Ext.get(name);
                    if (node.id != nd.id) {
                        nd.removeCls('x-grid-row-checked');
                    }
                });
                me.view.getSelectionModel().deselectAll();
            },
            toggleCheckbox: function (group, node, view) {
                var classes = node.classList;
                var nodeEl = Ext.get(node);
                var addingCheck;

                if (!classes.contains('x-grid-row-checked')) {
                    nodeEl.addCls('x-grid-row-checked');
                    this.deSelectAll(nodeEl);
                    addingCheck = true;
                }
                else {
                    nodeEl.removeCls('x-grid-row-checked');

                    addingCheck = false;
                }
                var sm = view.getSelectionModel();
                var ds = sm.store;

                var records = ds.queryBy(
                    function (record, id) {
                        if (record.data[ds.groupField] == group) {
                            if (addingCheck) {
                                sm.select(record, true);
                            }
                            else {
                                sm.deselect(record);
                            }
                        }
                    }, this
                );
            }
        });
        Ext.onReady(function () {
            /*
            UTILIDADES
            */
            Ext.apply(Ext.form.field.VTypes, {
                rut: function (val, field) {
                    if (!val) {
                        return false;
                    }
                    var getDigitoVerificador = function (numero) {
                        var nuevo_numero = numero.toString().split("").reverse().join("");
                        for (var i = 0, j = 2, suma = 0; i < nuevo_numero.length; i++, ((j == 7) ? j = 2 : j++)) {
                            suma += (parseInt(nuevo_numero.charAt(i)) * j);
                        }
                        var n_dv = 11 - (suma % 11);
                        return ((n_dv == 11) ? 0 : ((n_dv == 10) ? "K" : n_dv));

                    };
                    if (val.toString().indexOf("-") != -1) {
                        var data = val.replace(/\./g, '').split("-");
                        if (getDigitoVerificador(data[0]) == data[1]) {
                            return true;
                        }
                    }
                    return false;
                },
                rutText: 'Rut debe ser válido con el formato: <ul><li>(XXXXXXXX-X)</li><li>(XX.XXX.XXX-X)</li><ul>',
                daterange: function (val, field) {
                    var date = field.parseDate(val);

                    if (!date) {
                        return false;
                    }
                    if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                        var start = field.up('form').down('#' + field.startDateField);
                        start.setMaxValue(date);
                        start.validate();
                        this.dateRangeMax = date;
                    }
                    else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                        var end = field.up('form').down('#' + field.endDateField);
                        end.setMinValue(date);
                        end.validate();
                        this.dateRangeMin = date;
                    }
                    return true;
                },
                daterangeText: 'La primera Fecha debe ser Menor a la Segunda'
            });

        });
    </script>
</head>
<body>
	<div style="display:none;">
		<!-- [WELCOME] -->
		<div id="start-div"> 
			<div style="float:left;" ></div> 
			<div style="margin-left:100px;"> 
				<h2>Bienvenido!</h2> 
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p> 
				<p>Expetenda tincidunt in sed, ex partem placerat sea, porro commodo ex eam. His putant aeterno interesset at. Usu ea mundi tincidunt, omnium virtute aliquando ius ex. Ea aperiri sententiae duo. Usu nullam dolorum quaestio ei, sit vidit facilisis ea. Per ne impedit iracundia neglegentur. Consetetur neglegentur eum ut, vis animal legimus inimicus id.</p> 
			</div> 
		</div>
	</div>
</body>
</html>
