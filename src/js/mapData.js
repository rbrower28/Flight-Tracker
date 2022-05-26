export class MapRenderer {
  constructor(target, long, lat, zoom) {
    this.target = target;
    this.long = long;
    this.lat = lat;
    this.zoom = zoom;

    this.iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../images/jet-logo.png',
          scale: 0.0625
      })
    });
    
    this.map = new ol.Map({
      target: this.target,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.long, this.lat]),
        zoom: this.zoom
      })
    });
  }

  addJet(jetName, long, lat) {
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857")),
      name: 'Null',
    });
  
    iconFeature.setStyle(this.iconStyle);
  
    var vectorSource = new ol.source.Vector({
      features: [iconFeature]
    });
  
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
  
    vectorLayer.set('name', jetName); 
    this.map.addLayer(vectorLayer);
  }

  removeJet(jetName) {
    var element = null;
    this.map.getLayers().forEach(function(el) {
      if (el.get('name') === jetName) {
        element = el;
      }
    })
    this.map.removeLayer(element);
  }
}