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
        src: "../../images/jet-logo.png",
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

  addJet(jet) {
    // block below is map stuff, though the long and lat are where we'll put in our jet

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.transform(
          [jet.longitude, jet.latitude],
          "EPSG:4326",
          "EPSG:3857"
        )
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
    vectorLayer.set("name", jet.callsign);
    this.map.addLayer(vectorLayer);
  }

  removeJet(jet) {
    var element = null;
    this.map.getLayers().forEach(function (el) {
      if (el.get("name") === jet.callsign) {
        element = el;
      }
    });
    this.map.removeLayer(element);
  }
}

// Good for use when creating a large batch of jets through the API
export class BulkJet {
  constructor(flightData, userTracked) {
    this.modeSCode = flightData[0];
    this.callsign = flightData[1];
    this.country = flightData[2];
    this.longitude = flightData[5];
    this.latitude = flightData[6];
    // uses Geostationary altitude (i.e. based on GPS)
    this.altitude = flightData[13];
    this.velocity = flightData[9];
    this.heading = flightData[10];
    this.userTracked = userTracked;
  }
}

// This one takes JSON data from the OpenSky API as a parameter for the constructor
export class Jet {
  constructor(flightData, userTracked) {
    this.modeSCode = flightData.states[0][0];
    this.callsign = flightData.states[0][1];
    this.country = flightData.states[0][2];
    this.longitude = flightData.states[0][5];
    this.latitude = flightData.states[0][6];
    // uses Geostationary altitude (i.e. based on GPS)
    this.altitude = flightData.states[0][13];
    this.velocity = flightData.states[0][9];
    this.heading = flightData.states[0][10];
    this.userTracked = userTracked;
  }
}
