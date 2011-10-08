/*
 * File: app/store/dsGrupo.js
 * Date: Fri Aug 19 2011 13:16:53 GMT-0400 (Hora est. Sudamérica Pacífico)
 *
 * This file was generated by Ext Designer version 1.2.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */
Ext.define('Grupo', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_GRUPO',
    fields: [{ "name": "ID_GRUPO", "type": "int", "useNull": true }, { "name": "NOMBRE_GRUPO", "type": "string" }, { "name": "DESCRIPCION_GRUPO", "type": "string"}],
    validations: [{ "type": "length", "field": "NOMBRE_GRUPO", "max": 1}]
});
Ext.define('MyApp.store.dsGrupo', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            storeId: 'dsGrupo',
            pageSize: 10,
            remoteSort: true,
            model: 'Grupo',
            proxy: {
                type: 'rest',
                url: 'http://localhost:61862/Grupo/',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount'
                }
            }
        }, cfg)]);
    }
});