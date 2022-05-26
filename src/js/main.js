"use strict";

// This is just a dummy file until someone else in the group starts actually creating a main.js file or the equivalent.
// If the main file ends up not being this one, then be sure to change line 5 of package.json from
// "main": "main.js", to instead use the js file you want.

import ExternalSource from "./externalSource.js";
import PlaneList from "./PlaneList.js";
import { MapRenderer } from "./mapData.js";
import getFlightDataByModeSCode from "./ExternalServices.js";

let myMap = new MapRenderer("map", -114.742, 44.0682, 5);
myMap.addJet("N1234567", -114.742, 44.0682);
myMap.addJet("N1234567", -116.742, 49.0682);
// myMap.removeJet('N1234567');

const source = new ExternalSource();
const listElement = document.querySelector(".jet-list");
const jetList = new PlaneList(source, listElement);

jetList.init();

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event
document
  .getElementById("searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let modeSCode = document.getElementById("modeSCode").value;

    let flightData = await getFlightDataByModeSCode(modeSCode);

    myMap.addJet(
      flightData.states[0][0],
      flightData.states[0][5],
      flightData.states[0][6]
    );
  });
