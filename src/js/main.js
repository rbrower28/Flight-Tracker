"use strict";

// import ExternalSource from "./externalSource.js";
// import PlaneList from "./PlaneList.js";
import { MapRenderer, BulkJet, Jet } from "./mapData.js";
import { getFlightDataByModeSCode, getRandomListOfFlights } from "./externalServices.js";

let myMap = new MapRenderer("map", -114.742, 44.0682, 5);

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

      let jet = new Jet(flightData, false);

      myMap.addJetNew(jet);

      // resource: https://www.techiedelight.com/add-item-html-list-javascript/
      let node = document.createElement("li");
      node.appendChild(
        document.createTextNode(
          "Callsign: " + jet.callsign + " Mode S Code: " + jet.modeSCode
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

    let jet = new Jet(flightData, false);

    myMap.addJetNew(jet);

    // resource: https://www.techiedelight.com/add-item-html-list-javascript/
    let node = document.createElement("li");
    node.appendChild(
      document.createTextNode(
        "Callsign: " + jet.callsign + " Mode S Code: " + jet.modeSCode
      )
    );

    document.querySelector("#user-flights-list").appendChild(node);

    // We push the modeSCode, since we want to get recent data for the plane, not the old data stored in the jet object
    flights.push(modeSCode);

    // resource: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("flightsList", JSON.stringify(flights));
  });

loadSavedFlights();

window.addEventListener("load", async function() {
  const loader = document.querySelector('#loader')
  loader.style.display = "block";
  let flightData = await getRandomListOfFlights();
  loader.style.display = "none";
  let length = flightData.states.length;
  for (let i = 0; i < 15; i++) {
    let index = Math.floor(Math.random() * length);
    let jet = new BulkJet(flightData.states[index], true);
    myMap.addJetNew(jet);

    let node = document.createElement("li");
    node.appendChild(
      document.createTextNode(
        "Callsign: " + jet.callsign + " Mode S Code: " + jet.modeSCode
      )
    );

    document.querySelector("#random-flights-list").appendChild(node);
  }
});
