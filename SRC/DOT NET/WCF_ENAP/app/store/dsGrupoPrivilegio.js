Ext.define('WCF_ENAP.model.GrupoPrivilegio', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_GRUPO_PRIVILEGIO',
    fields: [
        {
            "name": "ID_GRUPO_PRIVILEGIO",
            convert: function (v, record) {
                if (record.get('ID_NODO') == 0 || record.get('ID_GRUPO') == 0) {
                    return null;
                }
                return record.get('ID_NODO') + '_' + record.get('ID_GRUPO');

            },
            useNull: true
        },
        { "name": "ID_NODO", "type": "int" },
        { "name": "ID_GRUPO", "type": "int" },
        { "name": "ALLOW_READ", "type": "bool" },
        { "name": "ALLOW_WRITE", "type": "bool" },
        { "name": "ALLOW_EDIT", "type": "bool" },
        { "name": "ALLOW_DELETE", "type": "bool" },
        { "name": "ALLOW_PRINT", "type": "bool" },
        { "name": "ALLOW_CRUD", "type": "bool" }
    ]
});
Ext.define('WCF_ENAP.store.dsGrupoPrivilegio', {
    extend: 'Ext.data.Store',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'dsGrupoPrivilegio',
            pageSize: 200,
            remoteSort: true,
            model: 'WCF_ENAP.model.GrupoPrivilegio',
            proxy: {
                type: 'rest',
                url: '/GrupoPrivilegio/',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount',
                    successProperty: 'success'
                }
            }
        }, cfg)]);
    }
});