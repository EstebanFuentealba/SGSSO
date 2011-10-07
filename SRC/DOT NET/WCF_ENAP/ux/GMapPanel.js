/**
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @author Shea Frederick
 */
Ext.define('Ext.ux.GMapPanel', {
    extend: 'Ext.Panel',
    
    alias: 'widget.gmappanel',
    
    requires: ['Ext.window.MessageBox'],
    
    initComponent : function(){
        this.highlightCircle = null;
		this.mapMarkers = [];
        var defConfig = {
            plain: true,
            zoomLevel: 3,
            yaw: 180,
            pitch: 0,
            zoom: 0,
            gmapType: 'map',
            border: false
        };
        
        Ext.applyIf(this,defConfig);
        
        this.callParent();        
    },
    
    afterRender : function(){
        try {
			var wh = this.ownerCt.getSize(),
				point;
				
			Ext.applyIf(this, wh);
			
			this.callParent();     
			
			if (this.gmapType === 'map'){
				this.gmap = new GMap2(this.body.dom);
				this.gmap.setMapType(G_SATELLITE_MAP);
			}
			
			if (this.gmapType === 'panorama'){
				this.gmap = new GStreetviewPanorama(this.body.dom);
			}
			
			if (typeof this.addControl == 'object' && this.gmapType === 'map') {
				this.gmap.addControl(this.addControl);
			}
			point = new GLatLng(this.setCenter.lat,this.setCenter.lng);
			this.gmap.setCenter(point, this.zoomLevel);    
			
			this.onMapReady();
        }catch(e){console.log(e);}

    },
    onMapReady : function(){
		
        this.addMarkers(this.markers);
        this.addMapControls();
        this.addOptions(); 
		if (typeof this.listener.onload === 'function') {
			this.listener.onload(this.getMap());
		}
		
    },
    afterComponentLayout : function(w, h){

        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        
        this.callParent(arguments);

    },
    setSize : function(width, height, animate){
        
        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        
        this.callParent(arguments);
        
    },
    getMap : function(){
        
        return this.gmap;
        
    },
    getCenter : function(){
        
        return this.getMap().getCenter();
        
    },
    getCenterLatLng : function(){
        
        var ll = this.getCenter();
        return {lat: ll.lat(), lng: ll.lng()};
        
    },
    addMarkers : function(markers) {
        if (Ext.isArray(markers)){
            for (var i = 0; i < markers.length; i++) {
				
                var mkr_point = new GLatLng(markers[i].lat,markers[i].lng);
				
                this.addMarker(mkr_point,markers[i].marker,false,markers[i].setCenter, markers[i].listeners, markers[i].marker.icon_url,markers[i].marker.tipo,markers[i].marker.clasificacion);
            }
        }
        
    },
    addMarker : function(point, marker, clear, center, listeners,icon_url,tipo,clasificacion){
        var evt;
		if(typeof icon_url != 'undefined' && icon_url != null) {
			var tinyIcon = new GIcon();
			tinyIcon.image = icon_url;
			tinyIcon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
			tinyIcon.iconSize = new GSize(12, 20);
			tinyIcon.shadowSize = new GSize(22, 20);
			tinyIcon.iconAnchor = new GPoint(6, 20);
			tinyIcon.infoWindowAnchor = new GPoint(5, 1);
			Ext.applyIf(marker,{icon:tinyIcon});
		} else {
			Ext.applyIf(marker,G_DEFAULT_ICON);
		}
        if (clear === true){
            this.getMap().clearOverlays();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel);
        }

        var mark = new GMarker(point,marker);
        if (typeof listeners === 'object'){
            for (evt in listeners) {
                if (!listeners.hasOwnProperty(evt)) {
                    continue;
                }
                GEvent.bind(mark, evt, this, listeners[evt]);
            }
        }
        this.getMap().addOverlay(mark);
		var gclass = this;
		GEvent.addListener(mark,"mouseover",function(){ 
			var highlight = gclass.addHighlightCircle(mark,20,"#FF0000");
			GEvent.addListener(highlight,"mouseout",function(){ 
				gclass.getMap().removeOverlay(highlight);
			});
			gclass.getMap().addOverlay(highlight); 
		});
		this.mapMarkers.push({
			event_id: marker.evento_id,
			tipo: tipo,
			clasificacion: clasificacion,
			marker: mark
		});
		return mark;
    },
	getMarkerByEventId:function(id){
		var result = null;
		for (var i = 0; i < this.mapMarkers.length; i++) {
			if(this.mapMarkers[i].event_id == id) {
				result = this.mapMarkers[i].marker;
				break;
			}
		}
		return result;
	},
	getMarkers:function(){
		return this.mapMarkers;
	},
	addHighlightCircle:function(marker,radio,color) {
		if(this.highlightCircle != null){
			this.getMap().removeOverlay(this.highlightCircle);
		}
		var mapNormalProj = G_NORMAL_MAP.getProjection();
		var mapZoom = this.getMap().getZoom();
		var clickedPixel = mapNormalProj.fromLatLngToPixel(marker.getPoint(), mapZoom);
		var polySmallRadius = radio;
		var polyNumSides = 20;
		var polySideLength = 18;
		var polyPoints = Array();
		for (var a = 0; a<(polyNumSides+1); a++) {
			var aRad = polySideLength*a*(Math.PI/180);
			var polyRadius = polySmallRadius;
			var pixelX = clickedPixel.x + polyRadius * Math.cos(aRad);
			var pixelY = clickedPixel.y + polyRadius * Math.sin(aRad);
			var polyPixel = new GPoint(pixelX,pixelY);
			var polyPoint = mapNormalProj.fromPixelToLatLng(polyPixel,mapZoom);
			polyPoints.push(polyPoint);
		}
		
		this.highlightCircle = new GPolygon(polyPoints,"#000000",2,0.0,color,.2);
		return this.highlightCircle;

	},
    addMapControls : function(){
        
        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for(var i=0;i<this.mapControls.length;i++){
                    this.addMapControl(this.mapControls[i]);
                }
            }else if(typeof this.mapControls === 'string'){
                this.addMapControl(this.mapControls);
            }else if(typeof this.mapControls === 'object'){
                this.getMap().addControl(this.mapControls);
            }
        }
        
    },
    addMapControl : function(mc){
        
        var mcf = window[mc];
        if (typeof mcf === 'function') {
            this.getMap().addControl(new mcf());
        }    
        
    },
    addOptions : function(){
        
        if (Ext.isArray(this.mapConfOpts)) {
            for(var i=0;i<this.mapConfOpts.length;i++){
                this.addOption(this.mapConfOpts[i]);
            }
        }else if(typeof this.mapConfOpts === 'string'){
            this.addOption(this.mapConfOpts);
        }        
        
    },
    addOption : function(mc){
        
        var mcf = this.getMap()[mc];
        if (typeof mcf === 'function') {
            this.getMap()[mc]();
        }    
        
    },
    geoCodeLookup : function(addr) {
        
        this.geocoder = new GClientGeocoder();
        this.geocoder.getLocations(addr, Ext.Function.bind(this.addAddressToMap, this));
        
    },
    addAddressToMap : function(response) {
        var place, addressinfo, accuracy, point;
        if (!response || response.Status.code != 200) {
            Ext.MessageBox.alert('Error', 'Code '+response.Status.code+' Error Returned');
        }else{
            place = response.Placemark[0];
            addressinfo = place.AddressDetails;
            accuracy = addressinfo.Accuracy;
            if (accuracy === 0) {
                Ext.MessageBox.alert('Unable to Locate Address', 'Unable to Locate the Address you provided');
            }else{
                if (accuracy < 7) {
                    Ext.MessageBox.alert('Address Accuracy', 'The address provided has a low accuracy.<br><br>Level '+accuracy+' Accuracy (8 = Exact Match, 1 = Vague Match)');
                }else{
                    point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
                    if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
                        this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true, this.setCenter.listeners);
                    }
                }
            }
        }
        
    }
 
});
