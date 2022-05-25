
export default class ExternalSource {

  getPeopleData() {
    // Here we retrieve json data of each famous person and their jet
    return fetch('./data/jets.json').then(response => response.json()).then(data => data.jets);
  }

  getPlaneData(id) {
    // This will retrieve individual jet data via an external API
    return id
  }
  
}