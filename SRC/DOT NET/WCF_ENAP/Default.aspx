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
<<<<<<< HEAD
    
=======
>>>>>>> 2ef980ec12d7594fc6269c8567c8f7cdaf32a0ef
    <link href="/js/layouts/css/layout-browser.css" rel="stylesheet" type="text/css" />
	<link href="/ux/css/data-view.css" rel="stylesheet" type="text/css" />
    <link href="/ux/css/CenterLayout.css" rel="stylesheet" type="text/css" />
    
    <script src="/ext-4.0.2a/ext-all-debug.js" type="text/javascript"></script>
	<script src="/ext-4.0.2a/locale/ext-lang-es.js"></script>
    

    <!--<script type="text/javascript" src="/js/layouts/basic.js"></script>
    <script type="text/javascript" src="/js/layouts/custom.js"></script> 
    <script type="text/javascript" src="/js/layouts/combination.js"></script>--> 
	<script type="text/javascript" src="/js/layouts/layout-browser.js?01"></script>
    
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
    .btn-add-save{background:transparent url(/icons/database_add.png) 0 0 no-repeat !important;}
    .btn-delete{background:transparent url(/icons/database_delete.png) 0 0 no-repeat !important;}
    .btn-search{background:transparent url(/icons/magnifier.png) 0 0 no-repeat !important;}
    .grupo-icon{background:transparent url(/icons/group.png) 0 0 no-repeat !important;}
    .add-programaanual-icon{background:transparent url(/icons/chart_organisation_add.png) 0 0 no-repeat !important;}
    .update-programaanual-icon{background:transparent url(/icons/chart_organisation.png) 0 0 no-repeat !important;}
    .excel-icon {background:transparent url(/icons/page_excel.png) 0 0 no-repeat !important;}
    .generator-editor-icon {background:transparent url(/icons/cog_edit.png) 0 0 no-repeat !important;}
    .tooltip
    {
        float: right;        
    }
    </style>
    <script type="text/javascript">
        Ext.require([
            'Ext.ux.grid.FiltersFeature',
            'Ext.ux.form.MultiSelect',
            'Ext.ux.form.ItemSelector'
            /*,'Ext.ux.grid.LockingGridGroupSummary'*/
        ]);
        
        /**
        * Rewrite of Ext.util.JSON to support .NET dates
        */
        var rymoore = {};
        rymoore.JSON = new (function () {
            var useHasOwn = {}.hasOwnProperty ? true : false;
            var pad = function (n) {
                return n < 10 ? "0" + n : n;
            };
            var m = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"': '\\"',
                "\\": '\\\\'
            };
            var fixDate = function (obj) {
                // /Date(
                for (property in obj) {
                    var type = typeof obj[property];
                    switch (type) {
                        case 'string':
                            if (obj[property].indexOf('/Date(') > -1) {
                                var ms = obj[property].substring(6);
                                ms = ms.substring(0, ms.indexOf(')/'));
                                obj[property] = new Date(parseInt(ms));
                            }
                            break;
                        case 'object':
                            fixDate(obj[property]);
                            break;
                    }
                }
            }
            var encodeString = function (s) {
                if (/["\\\x00-\x1f]/.test(s)) {
                    return '"' +
            s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                var c = m[b];
                if (c) {
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                Math.floor(c / 16).toString(16) +
                (c % 16).toString(16);
            }) +
            '"';
                }
                return '"' + s + '"';
            };
            var encodeArray = function (o) {
                var a = ["["], b, i, l = o.length, v;
                for (i = 0; i < l; i += 1) {
                    v = o[i];
                    switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (b) {
                                a.push(',');
                            }
                            a.push(v === null ? "null" : rymoore.JSON.encode(v));
                            b = true;
                    }
                }
                a.push("]");
                return a.join("");
            };
            // here is the new EncodeDate function
            var encodeDate = function (o) {
                var ret = '"\\/Date(' + o.getTime() + ')\\/"';
                return ret;
            };
            this.encode = function (o) {
                if (typeof o == "undefined" || o === null) {
                    return "null";
                }
                else {
                    if (Ext.isArray(o)) {
                        return encodeArray(o);
                    }
                    else {
                        if (Ext.isDate(o)) {
                            return encodeDate(o);
                        }
                        else {

                            if (typeof o == "string") {
                                return encodeString(o);
                            }
                            else {
                                if (typeof o == "number") {
                                    return isFinite(o) ? String(o) : "null";
                                }
                                else {
                                    if (typeof o == "boolean") {
                                        return String(o);
                                    }
                                    else {
                                        var a = ["{"], b, i, v;
                                        for (i in o) {
                                            if (!useHasOwn || o.hasOwnProperty(i)) {
                                                v = o[i];
                                                switch (typeof v) {
                                                    case "undefined":
                                                    case "function":
                                                    case "unknown":
                                                        break;
                                                    default:
                                                        if (b) {
                                                            a.push(',');
                                                        }
                                                        a.push(this.encode(i), ":", v === null ? "null" : this.encode(v));
                                                        b = true;
                                                }

                                            }

                                        }
                                        a.push("}");
                                        return a.join("");
                                    }
                                }
                            }
                        }
                    }
                }
            };
            this.decode = function (json) {

                var obj = json;

                var type = typeof json;

                if (type == 'string') {

                    if (json.indexOf('{') == 0) {

                        //original script returned eval result here

                        obj = eval('(' + json + ')');

                    }

                    else {

                        //original script returned eval result here

                        obj = eval('(\'' + json + '\')');

                    }

                }



                // new call to fix date objects

                fixDate(obj);



                return obj;

            };
            /**
            * Converts dates within an object to .NET JS encoded date string
            */
            this.fixObjectDates = function (obj) {
                fixDate(obj);
            }
            /**
            * Encodes a date object to to the standard .NET JavaScript encoded date string
            */
            this.convertDateToString = function (obj) {
                return encodeDate(obj);
            }
        })();
        // override the default Ext JSON Serialization/deserialization
        Ext.JSON.encode = rymoore.JSON.encode;
        Ext.JSON.decode = rymoore.JSON.decode;

        


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
                if (!console) {
                    var console = {
                        log: Ext.emptyFn,
                        debug: Ext.emptyFn,
                        info: Ext.emptyFn,
                        warn: Ext.emptyFn,
                        error: Ext.emptyFn,
                        trace: Ext.emptyFn,
                        dir: Ext.emptyFn
                    };
                }
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
