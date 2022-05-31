"use strict";

// This is just a dummy file until someone else in the group starts actually creating a main.js file or the equivalent.
// If the main file ends up not being this one, then be sure to change line 5 of package.json from
// "main": "main.js", to instead use the js file you want.

// import ExternalSource from "./externalSource.js";
// import PlaneList from "./PlaneList.js";
import { MapRenderer, Jet, Jet2 } from "./mapData.js";
import getFlightDataByModeSCode from "./externalServices.js";

let myMap = new MapRenderer("map", -114.742, 44.0682, 5);

// this uses the new code
let jet1 = new Jet("N1234567", -114.742, 44.0682, false); // Same info as line below
// myMap.addJetOld("N1234567", -114.742, 44.0682);
myMap.addJetNew(jet1);
// myMap.removeJetNew(jet1);

// This uses the old code
myMap.addJet("N1234567", -116.742, 49.0682);
// myMap.removeJet('N1234567');

// const source = new ExternalSource();
// const listElement = document.querySelector(".jet-list");
// const jetList = new PlaneList(source, listElement);

// jetList.init();

function loadSavedFlights() {
  // let flights = localStorage.getItem("flightList");
  let flights = [];
  // Resource: https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
  if (!(localStorage.getItem("flightsList") === null)) {
    flights = JSON.parse(localStorage.getItem("flightsList"));

    flights.forEach(async (modeSCode) => {
      let flightData = await getFlightDataByModeSCode(modeSCode);

      let jet2 = new Jet2(flightData, false);

      myMap.addJetNew(jet2);

      // resource: https://www.techiedelight.com/add-item-html-list-javascript/
      let node = document.createElement("li");
      node.appendChild(
        document.createTextNode(
          "Callsign: " + jet2.callsign + " Mode S Code: " + jet2.modeSCode
        )
      );

      document.querySelector("#user-flights-list").appendChild(node);
    });
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event
document
  .getElementById("searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // let flights = localStorage.getItem("flightList");
    let flights = [];
    // Resource: https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
    if (!(localStorage.getItem("flightsList") === null)) {
      flights = JSON.parse(localStorage.getItem("flightsList"));
    }

    let modeSCode = document.getElementById("modeSCode").value;

    let flightData = await getFlightDataByModeSCode(modeSCode);

    let jet2 = new Jet2(flightData, false);

    myMap.addJetNew(jet2);

    // resource: https://www.techiedelight.com/add-item-html-list-javascript/
    let node = document.createElement("li");
    node.appendChild(
      document.createTextNode(
        "Callsign: " + jet2.callsign + " Mode S Code: " + jet2.modeSCode
      )
    );

    document.querySelector("#user-flights-list").appendChild(node);

    // We push the modeSCode, since we want to get recent data for the plane, not the old data stored in the jet object
    flights.push(modeSCode);

    // resource: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("flightsList", JSON.stringify(flights));
  });

loadSavedFlights();
