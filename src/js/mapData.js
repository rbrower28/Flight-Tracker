/*global
    ol
*/

export class MapRenderer {
  constructor(target, long, lat, zoom) {
    this.target = target;
    this.long = long;
    this.lat = lat;
    this.zoom = zoom;

    this.iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "../images/jet-logo.png",
        scale: 0.0625,
      }),
    });

    this.map = new ol.Map({
      target: this.target,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.long, this.lat]),
        zoom: this.zoom,
      }),
    });
  }


  addJet(jetName, long, lat) {
    // block below is map stuff, though the long and lat are where we'll put in our jet
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857")
      ),
      name: "Null",
    });

    // This is where we would change the style of the jet's icon
    iconFeature.setStyle(this.iconStyle);

    // No clue what this does; I assume it's map stuff
    var vectorSource = new ol.source.Vector({
      features: [iconFeature],
    });

    // Nor this; I assume it's map stuff
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });

    // nor even this; I assume it's map stuff
    vectorLayer.set("name", jetName);
    this.map.addLayer(vectorLayer);
  }

  addJetNew(jet) {
    // block below is map stuff, though the long and lat are where we'll put in our jet

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.transform([jet.longitude, jet.latitude], "EPSG:4326", "EPSG:3857")
      ),
      name: "Null",
    });

    // This is where we would change the style of the jet's icon
    iconFeature.setStyle(this.iconStyle); //old 
    // iconFeature.setStyle(this.iconStyle); //new 

    // No clue what this does; I assume it's map stuff
    var vectorSource = new ol.source.Vector({
      features: [iconFeature],
    });

    // Nor this; I assume it's map stuff
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });

    // nor even this; I assume it's map stuff
    vectorLayer.set("name", jet.name);
    this.map.addLayer(vectorLayer);
  }

  removeJet(jetName) {
    var element = null;
    this.map.getLayers().forEach(function (el) {
      if (el.get("name") === jetName) {
        element = el;
      }
    });
    this.map.removeLayer(element);
  }

  removeJetNew(jet) {
    var element = null;
    this.map.getLayers().forEach(function (el) {
      if (el.get("name") === jet.name) {
        element = el;
      }
    });
    this.map.removeLayer(element);
  }
}

export class Jet {
  constructor(name, longitude, latitude, userTracked) {
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.userTracked = userTracked;

  }
}