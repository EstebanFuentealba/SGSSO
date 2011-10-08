/*
 * File: designer.js
 * Date: Fri Sep 02 2011 11:03:55 GMT-0300 (Hora verano Sudamérica Pacífico)
 *
 * This file was generated by Ext Designer version 1.2.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'WCF_ENAP',

    stores: [
        'dsOrganizacion',
        'dsDivision',
        'dsArea',
        'dsDepartamento',
        'dsActividadGeneral',
        'dsRol',
        'dsActividadEspecifica',
        'dsActividadEspecificaMatriz',
        'dsMatrizRiesgoIdentificado',
        'dsPeligro',
        'dsPeligroMedida',
        'dsMatrizRiesgo',
        'dsMedidaDeControl'
    ],

    launch: function () {
        Ext.QuickTips.init();

        var cmp1 = Ext.create('WCF_ENAP.view.MatrizRiesgo', {
            renderTo: Ext.getBody()
        });
        cmp1.show();
        var formPanelDropTarget = Ext.create('Ext.dd.DropTarget', Ext.getCmp('grid-evalua-peligro').body.dom, {
            ddGroup: 'firstGridDDGroup',
            notifyEnter: function (ddSource, e, data) {

                //Add some flare to invite drop.
                Ext.getCmp('grid-evalua-peligro').body.stopAnimation();
                Ext.getCmp('grid-evalua-peligro').body.highlight();
            },
            notifyDrop: function (ddSource, e, data) {

                // Reference the record (single selection) for readability
                var selectedRecord = ddSource.dragData.records[0];

                // Load the record into the form
                Ext.getCmp('grid-evalua-peligro').loadRecord(selectedRecord);

                // Delete record from the source store.  not really required.
                //Ext.getCmp('grid-peligros-actividad').getSelectionModel().select(0);
                //ddSource.view.store.remove(selectedRecord);

                return true;
            }
        });
    }
});