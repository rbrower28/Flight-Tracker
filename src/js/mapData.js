var iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../images/jet-logo.png',
      scale: 0.0625
  })
});

// Render the map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-114.7420, 44.0682]),
    zoom: 5
  })
});

function addJet(jetName, long, lat) {
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857")),
    name: 'Null',
  });

  iconFeature.setStyle(iconStyle);

  var vectorSource = new ol.source.Vector({
    features: [iconFeature]
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  vectorLayer.set('name', jetName); 
  map.addLayer(vectorLayer);
}

function removeJet(jetName) {
  map.getLayers().forEach(function(el) {
    if (el.get('name') === jetName) {
      map.removeLayer(el);
    }
  })
}

addJet('N123456', -114.7420, 44.0682);
addJet('N543632', -116.7420, 45.0682);

// removeJet('N543632');  