export default class t {
  getPeopleData() {
    return fetch("./data/jets.json")
      .then((e) => e.json())
      .then((e) => e.jets);
  }
  getPlaneData(e) {
    return e;
  }
}
