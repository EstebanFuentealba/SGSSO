Ext.ns('Ext.ux');
/**
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @author Shea Frederick
 */
Ext.define('Ext.ux.GMapPanel', {
    
    extend: 'Ext.panel.Panel',
	requires: ['Ext.view.AbstractView'],
    alias: 'widget.gmappanel',
    
    requires: ['Ext.window.MessageBox'],
    /**
     * @cfg {Boolean} border
     * Defaults to <tt>false</tt>.  See {@link Ext.Panel}.<code>{@link Ext.Panel#border border}</code>.
     */
    border: false,

    /**
     * @cfg {Array} respErrors
     * An array of msg/code pairs.
     */
    respErrors: [{
            code: 'UNKNOWN_ERROR',
            msg: 'A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.' 
        },{
            code: 'ERROR',
            msg: 'There was a problem contacting the Google servers.'
        },{
            code: 'ZERO_RESULTS',
            msg: 'The request did not encounter any errors but returns zero results.'
        },{
            code: 'INVALID_REQUEST',
            msg: 'This request was invalid.' 
        },{
            code: 'REQUEST_DENIED',
            msg: 'The webpage is not allowed to use the geocoder for some reason.' 
        },{
            code: 'OVER_QUERY_LIMIT',
            msg: 'The webpage has gone over the requests limit in too short a period of time.' 
    }],
    /**
     * @cfg {Array} locationTypes
     * An array of msg/code/level pairs.
     */
    locationTypes: [{
            level: 4,
            code: 'ROOFTOP',
            msg: 'The returned result is a precise geocode for which we have location information accurate down to street address precision.' 
        },{
            level: 3,
            code: 'RANGE_INTERPOLATED',
            msg: 'The returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.'
        },{
            level: 2,
            code: 'GEOMETRIC_CENTER',
            msg: 'The returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).'
        },{
            level: 1,
            code: 'APPROXIMATE',
            msg: 'The returned result is approximate.' 
    }],
    /**
     * @cfg {String} respErrorTitle
     * Defaults to <tt>'Error'</tt>.
     */
    respErrorTitle : 'Error',
    /**
     * @cfg {String} geoErrorMsgUnable
     * Defaults to <tt>'Unable to Locate the Address you provided'</tt>.
     */
    geoErrorMsgUnable : 'Unable to Locate the Address you provided',
    /**
     * @cfg {String} geoErrorTitle
     * Defaults to <tt>'Address Location Error'</tt>.
     */
    geoErrorTitle : 'Address Location Error',
    /**
     * @cfg {String} geoErrorMsgAccuracy
     * Defaults to <tt>'The address provided has a low accuracy.<br><br>{0} Accuracy.'</tt>.
     * <div class="mdetail-params"><ul>
     * <li><b><code>ROOFTOP</code></b> : <div class="sub-desc"><p>
     * The returned result is a precise geocode for which we have location information accurate down to street address precision.
     * </p></div></li>
     * <li><b><code>RANGE_INTERPOLATED</code></b> : <div class="sub-desc"><p>
     * The returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.
     * </p></div></li>
     * <li><b><code>GEOMETRIC_CENTER</code></b> : <div class="sub-desc"><p>
     * The returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).
     * </p></div></li>
     * <li><b><code>APPROXIMATE</code></b> : <div class="sub-desc"><p>
     * The returned result is approximate.
     * </p></div></li>
     * </ul></div>
     */
    geoErrorMsgAccuracy : 'The address provided has a low accuracy.<br><br>"{0}" Accuracy.<br><br>{1}',
    /**
     * @cfg {String} gmapType
     * The type of map to display, generic options available are: 'map', 'panorama'.
     * Defaults to <tt>'map'</tt>. 
     * More specific maps can be used by specifying the google map type:
     * <div class="mdetail-params"><ul>
     * <li><b><code>G_NORMAL_MAP</code></b> : <div class="sub-desc"><p>
     * Displays the default road map view
     * </p></div></li>
     * <li><b><code>G_SATELLITE_MAP</code></b> : <div class="sub-desc"><p>
     * Displays Google Earth satellite images
     * </p></div></li>
     * <li><b><code>G_HYBRID_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a mixture of normal and satellite views
     * </p></div></li>
     * <li><b><code>G_DEFAULT_MAP_TYPES</code></b> : <div class="sub-desc"><p>
     * Contains an array of the above three types, useful for iterative processing.
     * </p></div></li>
     * <li><b><code>G_PHYSICAL_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a physical map based on terrain information. 
     * </p></div></li>
     * <li><b><code>G_MOON_ELEVATION_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a shaded terrain map of the surface of the Moon, color-coded by altitude.
     * </p></div></li>
     * <li><b><code>G_MOON_VISIBLE_MAP</code></b> : <div class="sub-desc"><p>
     * Displays photographic imagery taken from orbit around the moon.
     * </p></div></li>
     * <li><b><code>G_MARS_ELEVATION_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a shaded terrain map of the surface of Mars, color-coded by altitude.
     * </p></div></li>
     * <li><b><code>G_MARS_VISIBLE_MAP</code></b> : <div class="sub-desc"><p>
     * Displays photographs taken from orbit around Mars.
     * </p></div></li>
     * <li><b><code>G_MARS_INFRARED_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a shaded infrared map of the surface of Mars, where warmer areas appear brighter and colder areas appear darker.
     * </p></div></li>
     * <li><b><code>G_SKY_VISIBLE_MAP</code></b> : <div class="sub-desc"><p>
     * Displays a mosaic of the sky, as seen from Earth, covering the full celestial sphere.
     * </p></div></li>
     * </ul></div>
     * Sample usage:
     * <pre><code>
     * gmapType: G_MOON_VISIBLE_MAP
     * </code></pre>
     */
    gmapType : 'map',
    /**
     * @cfg {Object} setCenter
     * The initial center location of the map. The map needs to be centered before it can be used.
     * A marker is not required to be specified. 
     * More markers can be added to the map using the <code>{@link #markers}</code> array.
     * For example:
     * <pre><code>
setCenter: {
    geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
    marker: {title: 'Fenway Park'}
},

// or just specify lat/long
setCenter: {
    lat: 42.345573,
    lng: -71.098326
}
     * </code></pre>
     */
    /**
     * @cfg {Number} zoomLevel
     * The zoom level to initialize the map at, generally between 1 (whole planet) and 40 (street).
     * Also used as the zoom level for panoramas, zero specifies no zoom at all.
     * Defaults to <tt>3</tt>.
     */
    zoomLevel: 3,
    /**
     * @cfg {Number} yaw
     * The Yaw, or rotational direction of the users perspective in degrees. Only applies to panoramas.
     * Defaults to <tt>180</tt>.
     */
    yaw: 180,
    /**
     * @cfg {Number} pitch
     * The pitch, or vertical direction of the users perspective in degrees.
     * Defaults to <tt>0</tt> (straight ahead). Valid values are between +90 (straight up) and -90 (straight down). 
     */
    pitch: 0,
    /**
     * @cfg {Boolean} displayGeoErrors
     * True to display geocoding errors to the end user via a message box.
     * Defaults to <tt>false</tt>.
     */
    displayGeoErrors: false,
    /**
     * @cfg {Boolean} minGeoAccuracy
     * The level to display an accuracy error below. Defaults to <tt>ROOFTOP</tt>. For additional information
     * see <a href="http://code.google.com/apis/maps/documentation/reference.html#GGeoAddressAccuracy">here</a>.
     */
    minGeoAccuracy: 'ROOFTOP',
    /**
     * @cfg {Array} mapConfOpts
     * Array of strings representing configuration methods to call, a full list can be found
     * <a href="http://code.google.com/apis/maps/documentation/reference.html#GMap2">here</a>.
     * For example:
     * <pre><code>
     * mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
     * </code></pre>
     */
    /**
     * @cfg {Array} mapControls
     * Array of strings representing map controls to initialize, a full list can be found
     * <a href="http://code.google.com/apis/maps/documentation/reference.html#GControlImpl">here</a>.
     * For example:
     * <pre><code>
     * mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl']
     * </code></pre>
     */
    /**
     * @cfg {Array} markers
     * Markers may be added to the map. Instead of specifying <code>lat</code>/<code>lng</code>,
     * geocoding can be specified via a <code>geoCodeAddr</code> string.
     * For example:
     * <pre><code>
markers: [{
    //lat: 42.339641,
    //lng: -71.094224,
    // instead of lat/lng:
    geoCodeAddr: '465 Huntington Avenue, Boston, MA, 02215-5597, USA',
    marker: {title: 'Boston Museum of Fine Arts'},
    listeners: {
        click: function(e){
            Ext.Msg.alert('Its fine', 'and its art.');
        }
    }
},{
    lat: 42.339419,
    lng: -71.09077,
    marker: {title: 'Northeastern University'}
}]
     * </code></pre>
     */
    // private
    mapDefined: false,
    // private
    mapDefinedGMap: false,
	radius: 0.2, /* KM */
	min_radius: 0.1, 
	max_radius: 0.7, 
    initComponent : function(){
        
        this.addEvents(
            /**
             * @event mapready
             * Fires when the map is ready for interaction
             * @param {GMapPanel} this
             * @param {GMap} map
             */
            'mapready',
            /**
             * @event apiready
             * Fires when the Google Maps API is loaded
             */
            'apiready'
        );
        
        Ext.applyIf(this,{
			cache: {
				marker: [],
				polyline: [],
				infowindow: []
			},
			store : null,
			dataMarker : null
		});
        this.dataMarker = Ext.create('Ext.util.HashMap',{});
        Ext.ux.GMapPanel.superclass.initComponent.call(this);        

        if (window.google && window.google.maps){
          this.on('afterrender', this.apiReady, this);
        }else{
          window.gmapapiready = Ext.Function.bind(this.apiReady,this);
          this.buildScriptTag('http://maps.google.com/maps/api/js?sensor=false&callback=gmapapiready');
        }

    },
    apiReady : function(){
        
        if (this.rendered){

          Ext.defer(function(){            
              if (this.gmapType === 'map'){            
                  this.gmap = new google.maps.Map(this.getEl().dom, {zoom:this.zoomLevel,mapTypeId: google.maps.MapTypeId.SATELLITE});
                  this.mapDefined = true;
                  this.mapDefinedGMap = true;
              }
              
              if (this.gmapType === 'panorama'){
                  this.gmap = new GStreetviewPanorama(this.getEl().dom);
                  this.mapDefined = true;
              }
      
              if (!this.mapDefined && this.gmapType){
                 this.gmap = new google.maps.Map(this.getEl().dom, {zoom:this.zoomLevel,mapTypeId: google.maps.MapTypeId.SATELLITE});
                 this.gmap.setMapTypeId(this.gmapType);
                 this.mapDefined = true;
                 this.mapDefinedGMap = true;
              }
              
              google.maps.event.addListenerOnce(this.getMap(), 'tilesloaded', Ext.Function.bind(this.onMapReady, this));
              google.maps.event.addListener(this.getMap(), 'dragend', Ext.Function.bind(this.dragEnd, this));

              
              if (typeof this.setCenter === 'object') {
                  if (typeof this.setCenter.geoCodeAddr === 'string'){
                      this.geoCodeLookup(this.setCenter.geoCodeAddr, this.setCenter.marker, false, true, this.setCenter.listeners);
                  }else{
                      if (this.gmapType === 'map'){
                          var point = new google.maps.LatLng(this.setCenter.lat,this.setCenter.lng);
                          this.getMap().setCenter(point, this.zoomLevel);
                          this.lastCenter = point;  
                      }
                      if (typeof this.setCenter.marker === 'object' && typeof point === 'object') {
                          this.addMarker(point, this.setCenter.marker, this.setCenter.marker.clear,null,this.setCenter.marker.listeners);
                      }
                  }
                  if (this.gmapType === 'panorama'){
                      this.getMap().setLocationAndPOV(new google.maps.LatLng(this.setCenter.lat,this.setCenter.lng), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoomLevel});
                  }
              }          
        }, 200,this); // Ext.defer
          
        }else{
          this.on('afterrender', this.apiReady, this);
        }
		//this.buildScriptTag('js/distancewidget.js');
    },
	getStore : function(){
        return this.store;
    },
	bindStore : function(store) {
        var me = this;
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            me.mon(store, {
                add: Ext.Function.bind(me.onAdd,this),
				write: Ext.Function.bind(me.onWrite,this),
				load: Ext.Function.bind(me.onLoad,this),
				beforeload: function( store,operation,eOpts ) {
					me.setLoading(true);
				}
            });
            if (me.loadMask) {
                me.loadMask.bindStore(store);
            }
        }
        me.store = store;
        if (store && (store.getCount())) {
            me.refresh(true);
        }
    },
	refresh: function() {
        var me = this,
            el,
            records;

        if (!me.rendered) {
            return;
        }
        records = me.store.getRange();
		me.recoresToMarkers(records);
        me.fireEvent('refresh', me);
		
    },
	createMarkerFromRecord :  function (record) {
		return {
			id: record.get('ID_EVENTO'),
			lat: record.get('LAT_EVENTO'),
			lng: record.get('LNG_EVENTO'),
			marker: {
				title: record.get('NOMBRE_DEPARTAMENTO'),
				//animation: google.maps.Animation.DROP,
				infoWindow: {
					content: '<h1>Hola</h1><p>' + record.get('DESCRIPCION_GENERAL') + '</p>'
				}
			}
		};
	},
	// private
	onLoad: function(store, records, successful, operation, eOpts ) {
		var me = this;
		me.deleteOverlays(true);
		me.dataMarker.clear();
		me.recoresToMarkers(records);
		me.setLoading(false);
	},
	onWrite : function(store, operation, eOpts){
		var me = this;
		var records = operation.getRecords(),
			name = Ext.String.capitalize(operation.action);
		if (name == 'Create') {
			me.recoresToMarkers(records);
		}
	},
    onAdd : function(ds, records, index) {
        var me = this;
		//me.recoresToMarkers(records);
    },
	deleteOverlays: function(removeMarkers) {
		var me = this;
		if (me.dataMarker) {
			me.dataMarker.each(function(key,value,length) {
				if(value.circleRadio.dragMarker != null){
					value.circleRadio.dragMarker.setMap(null);
				}
				if(value.circleRadio.circle != null) {
					value.circleRadio.circle.setMap(null);
				}
				if(removeMarkers){
					value.setMap(null);
				}
			});
		}
	},
	recoresToMarkers: function(records,searched) {
		var me = this,
			startIndex = 0,
			endIndex = (records.length - 1);
			
        for(var i = startIndex; i <= endIndex; i++){
			var rec = records[i];
			var marker = me.addSingleMarker(me.createMarkerFromRecord(rec));
			me.dataMarker.add(rec.get('ID_EVENTO'),Ext.applyIf(marker,{
				circleRadio: {
					idSearched: searched,
					dragMarker: null,
					circle: null
				}
			}));
        }
		
	},
	getMarkerById: function(id){
		var me = this;
		var record = me.dataMarker.get(id);
		record.setMap(me.getMap());
		return record;
	},
    // private
    afterRender : function(){
        
        var wh = this.ownerCt.getSize();
        Ext.applyIf(this, wh);
        Ext.ux.GMapPanel.superclass.afterRender.call(this);
    },
    // private
    buildScriptTag: function(filename, callback) {
        var script  = document.createElement('script'),
        head        = document.getElementsByTagName("head")[0];
        script.type = "text/javascript";
        script.src  = filename;    
        
        return head.appendChild(script);
    },
    // private
    onMapReady : function(){
                
        this.addMapControls();
        this.addOptions();
        
        //this.addMarkers(this.markers);
        this.addMapListeners();
        
        this.fireEvent('mapready', this, this.getMap());
		if (this.store) {
            this.bindStore(this.store);
        }
        return this;
    },
    // private
    addMapListeners : function () {
      	if (this.maplisteners){
      		Ext.iterate(this.maplisteners, function(key,val){
      			google.maps.event.addListener(this.getMap(), key, Ext.Function.bind(val,this));
      		},this);
      	}
    }, 
    // private
    onResize : function(w, h){
        
        Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);

        // check for the existance of the google map in case the onResize fires too early
        if (typeof this.getMap() == 'object') {
            google.maps.event.trigger(this.getMap(), 'resize');
            if (this.lastCenter){
              this.getMap().setCenter(this.lastCenter, this.zoomLevel);
            }
        }

    },
    // private
    setSize : function(width, height, animate){
        
        Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);

        // check for the existance of the google map in case setSize is called too early
        if (Ext.isObject(this.getMap())) {
            google.maps.event.trigger(this.getMap(), 'resize');
            if (this.lastCenter){
              this.getMap().setCenter(this.lastCenter, this.zoomLevel);
            }
        }
        
    },
    // private
    dragEnd: function(){
      this.lastCenter = this.getMap().getCenter();
    },
    /**
     * Returns the current google map which can be used to call Google Maps API specific handlers.
     * @return {GMap} this
     */
    getMap : function(){
        
        return this.gmap;
        
    },
    /**
     * Returns the maps center as a GLatLng object
     * @return {GLatLng} this
     */
    getCenter : function(){
        
        return this.getMap().getCenter();
        
    },
    /**
     * Returns the maps center as a simple object
     * @return {Object} this has lat and lng properties only
     */
    getCenterLatLng : function(){
        
        var ll = this.getCenter();
        return {lat: ll.lat(), lng: ll.lng()};
        
    },
	addSingleMarker : function(marker) {
		if (typeof marker.geoCodeAddr == 'string') {
			this.geoCodeLookup(marker.geoCodeAddr, marker.marker, false, marker.setCenter, marker.listeners);
		} else {
			var mkr_point = new google.maps.LatLng(marker.lat, marker.lng);
			return this.addMarker(mkr_point, marker.marker, false,marker.setCenter, marker.listeners);
		}
	},
    /**
     * Creates a single marker.
     * @param {Object} point a GLatLng point
     * @param {Object} marker a marker object consisting of at least lat and lng
     * @param {Boolean} clear clear other markers before creating this marker
     * @param {Boolean} center true to center the map on this marker
     * @param {Object} listeners a listeners config
     */
    addMarker : function(point, marker, clear, center, listeners){
        
        Ext.applyIf(marker,{});

        if (clear === true){
            this.clearMarkers();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel)
            this.lastCenter = point;
        }

        var mark = new google.maps.Marker(Ext.apply(marker, {
            position: point
        }));
        
        if (marker.infoWindow){
            this.createInfoWindow(marker.infoWindow, point, mark);
        }
        
        this.cache.marker.push(mark);
        mark.setMap(this.getMap());

        if (typeof listeners === 'object'){
            for (evt in listeners) {
                google.maps.event.addListener(mark, evt, listeners[evt]);
            }
        }
        
        return mark;
        
    },
    /**
     * Creates a single polyline.
     * @param {Array} points an array of polyline points
     * @param {Object} linestyle an object defining the line style to use
     */
    addPolyline : function(points, linestyle){
        
        var plinepnts = new google.maps.MVCArray, pline, linestyle = linestyle ? linestyle : {
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        };
        
        Ext.each(points, function(point){
            plinepnts.push(new google.maps.LatLng(point.lat, point.lng));
        }, this);
        
        var pline = new google.maps.Polyline(Ext.apply({
          path: plinepnts
        },linestyle));
        
        this.cache.polyline.push(pline);
        
        pline.setMap(this.getMap());

    },
    /**
     * Creates an Info Window.
     * @param {Object} inwin an Info Window configuration
     * @param {GLatLng} point the point to show the Info Window at
     * @param {GMarker} marker a marker to attach the Info Window to
     */
    createInfoWindow : function(inwin, point, marker){
        
        var me = this, infoWindow = new google.maps.InfoWindow({
            content: inwin.content,
            position: point
        });
        
        if (marker) {
            google.maps.event.addListener(marker, 'click', function(){
                me.hideAllInfoWindows();
                infoWindow.open(me.getMap());
            });
        }
        
        this.cache.infowindow.push(infoWindow);

        return infoWindow;

    },
	distanceBetweenPoints : function(p1, p2) {
		if (!p1 || !p2) {
			return 0;
		}
		var R = 6371000; // Radius of the Earth in km
		var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
		var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d;
	},
	getLatLngDragMarkerCircle:function(center, new_radius) {
		var me = this,
			latConv,
			lngConv,
			step,
			counter = 0,
			CirclePoints,
			nodes = new_radius * 40; 
		if(new_radius < 1) {
			nodes = 40;
		}
		latConv = (me.distanceBetweenPoints(center, new google.maps.LatLng(center.lat() + 0.1, center.lng())) / 100);
		lngConv = (me.distanceBetweenPoints(center, new google.maps.LatLng(center.lat(), center.lng() + 0.1))) / 100;
		
		var cLat = center.lat() + (new_radius / latConv * Math.cos(90 * Math.PI / 180)); 
		var cLng = center.lng() + (new_radius / lngConv * Math.sin(90 * Math.PI / 180));
		return new google.maps.LatLng(cLat,cLng);
	},
	addCircleMarker : function(conf) {
		var me = this, 
			circle,
			markerDragable,
			circleStore;
		markerDragable = new google.maps.Marker({
			icon: '/icons/resize-off.png',
			flat: true,
			draggable: true,
			title: 'Arrastra para aumentar el Radio',
			position: me.getLatLngDragMarkerCircle(conf.marker.getPosition(),me.radius)
		});
        markerDragable.setMap(me.getMap());
		circle = new google.maps.Circle({
			map: me.getMap(),
			radius: (me.radius * 1000),
			strokeWeight: 1
		});
		google.maps.event.addListener(markerDragable, 'dragstart', function(point) {
			circle.set('fillColor', '#59b');
			markerDragable.set('icon','/icons/resize.png');
		});
		google.maps.event.addListener(markerDragable, 'dblclick', function(point) {
			Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
		});
		google.maps.event.addListener(markerDragable, 'drag', function(point) {
			var mapCenter = conf.marker.getPosition();
			var latLng 		= new google.maps.LatLng(mapCenter.lat() , markerDragable.getPosition().lng());
			markerDragable.setPosition(latLng);
			var new_radius 	= (me.distanceBetweenPoints(latLng,mapCenter) / 1000);
			if (new_radius < me.min_radius) {
				new_radius = me.min_radius;
				markerDragable.setPosition(me.getLatLngDragMarkerCircle(mapCenter,me.min_radius));
			}
			if (new_radius > me.max_radius) {
				new_radius = me.max_radius;
				markerDragable.setPosition(me.getLatLngDragMarkerCircle(mapCenter,me.max_radius));
			}
			if(markerDragable.getPosition().lng() < mapCenter.lng()) {
				markerDragable.setPosition(me.getLatLngDragMarkerCircle(mapCenter,me.min_radius));
			}else {
				circle.set('radius', (new_radius * 1000));
			}
		});
		
		google.maps.event.addListener(markerDragable, 'dragend', function(point) {
			circle.set('fillColor', '#00AAFF');
			markerDragable.set('icon','/icons/resize-off.png');
			if(conf.listeners != null && Ext.isFunction(conf.listeners.dragEnd)) {
				conf.listeners.dragEnd(conf.marker.getPosition(),circle.get('radius'),circleStore);
			}			
		});
		circle.bindTo('center', conf.marker, 'position');
		/* Store Search */
		if (conf.store) {
            conf.store = Ext.data.StoreManager.lookup(conf.store);
        }
        circleStore = conf.store;
        if (conf.store && (conf.store.getCount())) {
            /*Refresh*/
        }
		
		return {
			circle: circle,
			dragMarker: markerDragable,
			store: circleStore
		};
	},
    // private
    hideAllInfoWindows : function(){
        for (var i = 0; i < this.cache.infowindow.length; i++) {
            this.cache.infowindow[i].close();
        }
    },
    // private
    clearMarkers : function(){
        
        this.hideAllInfoWindows();
        this.hideMarkers();

    },
    // private
    hideMarkers : function(){
		var me = this;
		if (me.dataMarker) {
			me.dataMarker.each(function(key,value,length) {
				value.setMap(null);
			});
		}
    },
    // private
    showMarkers : function(){
		var me = this;
		if (me.dataMarker) {
			me.dataMarker.each(function(key,value,length) {
				value.setMap(me.getMap());
			});
		}
    },
    // private
    addMapControls : function(){
        
        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for(i=0;i<this.mapControls.length;i++){
                    //this.addMapControl(this.mapControls[i]);
                }
            }else if(typeof this.mapControls === 'string'){
                //this.addMapControl(this.mapControls);
            }else if(typeof this.mapControls === 'object'){
                //this.getMap().add_control(this.mapControls);
            }
        }
        
    },
    /**
     * Adds a GMap control to the map.
     * @param {String} mc a string representation of the control to be instantiated.
     */
    addMapControl : function(mc){
        
        var mcf = window[mc];
        if (typeof mcf === 'function') {
            //this.getMap().addControl(new mcf());
        }    
        
    },
    // private
    addOptions : function(){
        
        if (Ext.isArray(this.mapConfOpts)) {
            var mc;
            for(i=0;i<this.mapConfOpts.length;i++){
                //this.addOption(this.mapConfOpts[i]);
            }
        }else if(typeof this.mapConfOpts === 'string'){
            //this.addOption(this.mapConfOpts);
        }        
        
    },
    /**
     * Adds a GMap option to the map.
     * @param {String} mo a string representation of the option to be instantiated.
     */
    addOption : function(mo){
        
        var mof = this.getMap()[mo];
        if (typeof mof === 'function') {
            this.getMap()[mo]();
        }    
        
    },
    /**
     * Looks up and address and optionally add a marker, center the map to this location, or
     * clear other markers. Sample usage:
     * <pre><code>
buttons: [
    {
        text: 'Fenway Park',
        handler: function(){
            var addr = '4 Yawkey Way, Boston, MA, 02215-3409, USA';
            Ext.getCmp('my_map').geoCodeLookup(addr, undefined, false, true, undefined);
        }
    },{
        text: 'Zoom Fenway Park',
        handler: function(){
            Ext.getCmp('my_map').zoomLevel = 19;
            var addr = '4 Yawkey Way, Boston, MA, 02215-3409, USA';
            Ext.getCmp('my_map').geoCodeLookup(addr, undefined, false, true, undefined);
        }
    },{
        text: 'Low Accuracy',
        handler: function(){
            Ext.getCmp('my_map').geoCodeLookup('Paris, France', undefined, false, true, undefined);
        }
    },{

        text: 'Bogus Address',
        handler: function(){
            var addr = 'Some Fake, Address, For, Errors';
            Ext.getCmp('my_map').geoCodeLookup(addr, undefined, false, true, undefined);
        }
    }
]
     * </code></pre>
     * @param {String} addr the address to lookup.
     * @param {Object} marker the marker to add (optional).
     * @param {Boolean} clear clear other markers before creating this marker
     * @param {Boolean} center true to set this point as the center of the map.
     * @param {Object} listeners a listeners config
     */
    geoCodeLookup : function(addr, marker, clear, center, listeners) {
        
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        this.geocoder.geocode({
    			address: addr
    		}, Ext.Function.bind(this.addAddressToMap, this, [addr, marker, clear, center, listeners], true));
        
    },
  	// private 
  	centerOnClientLocation : function(){
  		this.getClientLocation(function(loc){
  			var point = new google.maps.LatLng(loc.latitude,loc.longitude);
        this.getMap().setCenter(point, this.zoomLevel);
        this.lastCenter = point;
  		});
  	},
  	// private
  	getClientLocation : function(fn, errorFn){
  		if (!errorFn) {
          errorFn = Ext.emptyFn;
      }
  		if (!this.clientGeo) {
  			this.clientGeo = google.gears.factory.create('beta.geolocation');
  		}
  		geo.getCurrentPosition(Ext.Function.bind(fn, this), errorFn);
  	},
    // private
    addAddressToMap : function(response, status, addr, marker, clear, center, listeners){
        if (!response || status !== 'OK') {
            this.respErrorMsg(status);
        }else{
            var place = response[0].geometry.location,
			          accuracy = this.getLocationTypeInfo(response[0].geometry.location_type,'level'),
			          reqAccuracy = this.getLocationTypeInfo(this.minGeoAccuracy,'level');
            if (accuracy === 0) {
                this.geoErrorMsg(this.geoErrorTitle, this.geoErrorMsgUnable);
            }else{
                if (accuracy < reqAccuracy) {
                    this.geoErrorMsg(this.geoErrorTitle, String.format(this.geoErrorMsgAccuracy, response[0].geometry.location_type, this.getLocationTypeInfo(response[0].geometry.location_type,'msg')));
                }else{
                    point = new google.maps.LatLng(place.lat(),place.lng());
                    if (center){
                        this.getMap().setCenter(point, this.zoomLevel);
                        this.lastCenter = point;
                    }
                    if (typeof marker === 'object') {
                        if (!marker.title){
                            marker.title = response.formatted_address;
                        }
                        var mkr = this.addMarker(point, marker, clear, false, listeners);
                        if (marker.callback){
                          marker.callback.call(this, mkr, point);
                        }
                    }
                }
            }
        }
        
    },
    // private
    geoErrorMsg : function(title,msg){
        if (this.displayGeoErrors) {
            Ext.MessageBox.alert(title,msg);
        }
    },
    // private
    respErrorMsg : function(code){
        Ext.each(this.respErrors, function(obj){
            if (code == obj.code){
                Ext.MessageBox.alert(this.respErrorTitle, obj.msg);
            }
        }, this);
    },
    // private
    getLocationTypeInfo: function(location_type,property){
      var val = 0;
      Ext.each(this.locationTypes, function(itm){
        if (itm.code === location_type){
          val = itm[property];
        }
      });
      return val;
    }
});