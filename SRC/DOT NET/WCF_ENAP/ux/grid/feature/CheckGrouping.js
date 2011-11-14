Ext.define("Ext.ux.grid.feature.CheckGrouping", {
    extend: "Ext.grid.feature.Grouping",
    requires: "Ext",
    alias: "widget.brigrouping",
    selectionMode: "MULTI",
    constructor: function () {
        this.callParent(arguments);
        this.groupHeaderTpl = ['<dl style="height:18px; border:0px !important">', '<dd id="groupcheck{name}" class="x-grid-row-checker x-column-header-text" style="width:18px; float:left;" x-grid-group-hd-text="{text}"> </dd>', '<dd style="float:left; padding:3px 0px 0px 3px;">', this.groupHeaderTpl, "</dd>", "</dl>"].join("")
    },
    onGroupClick: function (a, b, c, d, e) {
        var f = this;
        var g = Ext.get("groupcheck" + c);
        if (f.inCheckbox(g, d.getXY())) {
            f.toggleCheckbox(c, b, a)
        } else if (f.isLeftofCheckbox(g, d.getXY())) {
            f.callParent(arguments);
            if (this.selectionMode == "SINGLE") {};
        }
    },
    inCheckbox: function (a, b) {
        var c = b[0];
        var d = b[1];
        if (c >= a.getLeft() && c <= a.getRight() && d >= a.getTop() && d <= a.getBottom()) {
            return true
        }
        return false
    },
    isLeftofCheckbox: function (a, b) {
        if (b[0] < a.getLeft()) {
            return true
        }
        return false
    },
	getView : function() {
		return this.view;
	},
    getSelectionModel: function () {
        return this.view.getSelectionModel()
    },
    deSelectAll: function (a) {
        var b = this;
        var c = Ext.select(".x-grid-row-checked");
        Ext.each(c.elements, function (b, c, d) {
            var e = Ext.get(b);
            if (a.id != e.id) {
                e.removeCls("x-grid-row-checked")
            }
        });
        b.view.getSelectionModel().deselectAll()
    },
    toggleCheckbox: function (a, b, c) {
        var d = b.classList;
        var e = Ext.get(b);
        var f;
        if (!d.contains("x-grid-row-checked")) {
            e.addCls("x-grid-row-checked");
            this.deSelectAll(e);
            f = true
        } else {
            e.removeCls("x-grid-row-checked");
            f = false
        }
        var g = c.getSelectionModel();
        var h = g.store;
        var i = h.queryBy(function (b, c) {
            if (b.data[h.groupField] == a) {
                if (f) {
                    g.select(b, true)
                } else {
                    g.deselect(b)
                }
            }
        }, this)
    }
});