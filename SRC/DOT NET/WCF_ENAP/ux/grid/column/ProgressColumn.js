/**
 * @class Ext.ux.ProgressColumn
 * <p>Copyright Nige (Animal) White and Athena Capital Research, LLC. This software may be used under
 * the terms of the <a href="http://en.wikipedia.org/wiki/BSD_licenses">BSD licence.</a></p>
 * <p>This class renders a progress bar in its cells. The proportion may be calculated by configuring:</p><ul>
 * <li>A {@link #divisor}. This divides the cell's value by the specified Field's value.</li>
 * <li>A {@link #dividend}. This divides the specified Field's value by the cell's value.</li>
 * <li>An injected implementation of {@link getFraction}.</li>
 * </ul>
 * <p>A renderer function may be specified in the usual way to produce a string value to display within the bar.</p>
 * <p>The precise appearance of the background area of the cell may be specified by creating CSS rules which apply
 * to the class <code>ux-progress-cell-background</code>.</p>
 * <p>The precise appearance of the filled area of the bar may be specified by creating CSS rules which apply
 * to the class name returned from the {@link getBarClass} method.</p>
 */

Ext.define('Ext.ux.grid.column.ProgressColumn',{
	extend: 'Ext.grid.column.Column',
	alias: ['widget.progresscolumn'],
	requires: ['Ext.util.Format'],
	constructor: function(config) {
        this.callParent(arguments);
    },
	// private
    renderer: function(value, meta, record, rowIndex, colIndex, store,view) {
		var id = Ext.id();
		Ext.defer(function(idProgress){
			try{
				Ext.create('Ext.ProgressBar', {
				   renderTo: idProgress,
				   text: Ext.util.Format.number(value, "0%"),
				   value: (value/100),
				   tpl: [
						'<div class="{baseCls}-text {baseCls}-text-back">',
							'<div>&#160;</div>',
						'</div>',
						'<div class="{baseCls}-bar-red">',
							'<div class="{baseCls}-text">',
								'<div>&#160;</div>',
							'</div>',
						'</div>'
					]
				});
			}catch(e){}
		}, 25,this,[id]);
		return '<div id="'+id+'"></div>';
    }
});
