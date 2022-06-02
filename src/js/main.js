"use strict";

import { MapRenderer, BulkJet, Jet } from "./mapData.js";
import {
  getFlightDataByModeSCode,
  getRandomListOfFlights,
} from "./externalServices.js";

let myMap = new MapRenderer("map", -114.742, 44.0682, 5);

function loadSavedFlights() {
  // let flights = localStorage.getItem("flightList");
  let flights = [];
  // Resource: https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set

  function removeSelf(e) {
    let element = e.target.parentElement;
    let modeSCode = element.children[2].children[0].textContent;
    let curr_flights = JSON.parse(localStorage.getItem("flightsList"));
    curr_flights.splice(flights.indexOf(modeSCode), 1);
    localStorage.setItem("flightsList", JSON.stringify(curr_flights));
    element.remove();
  }

  if (!(localStorage.getItem("flightsList") === null)) {
    flights = JSON.parse(localStorage.getItem("flightsList"));

    flights.forEach(async (modeSCode) => {
      let flightData = await getFlightDataByModeSCode(modeSCode);

      let jet = new Jet(flightData, false);

      myMap.addJet(jet);

      // resource: https://www.techiedelight.com/add-item-html-list-javascript/
      let node = document.createElement("li");

      // creates each element and populates with jet data
      let li_country = document.createElement("h4");
      li_country.textContent = jet.country;
      let li_callsign = document.createElement("p");
      li_callsign.textContent = "Callsign: " + jet.callsign;
      let li_modeScode = document.createElement("p");
      let code = document.createElement("span");
      code.textContent = jet.modeSCode;
      li_modeScode.textContent = "Mode S Code: ";
      li_modeScode.appendChild(code);
      let li_delete = document.createElement("button");
      li_delete.textContent = "Remove";
      li_delete.addEventListener("click", removeSelf);

      if (jet.country) {
        node.appendChild(li_country);
      }
      if (jet.callsign) {
        node.appendChild(li_callsign);
      }
      if (jet.modeSCode) {
        node.appendChild(li_modeScode);
      }
      if (jet.modeSCode) {
        node.appendChild(li_delete);
      }

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

    // called in the button - removes element from localstorage and deletes from page
    function removeSelf(e) {
      let element = e.target.parentElement;
      let mcode = element.children[2].children[0].textContent;
      let curr_flights = JSON.parse(localStorage.getItem("flightsList"));
      curr_flights.splice(flights.indexOf(mcode), 1);
      localStorage.setItem("flightsList", JSON.stringify(curr_flights));
      element.remove();
    }

    // Resource: https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
    if (!(localStorage.getItem("flightsList") === null)) {
      flights = JSON.parse(localStorage.getItem("flightsList"));
    }

    let modeSCode = document.getElementById("modeSCode").value;

    if (modeSCode === "") {
      alert("You can't track a flight without a number!");
    } else if (flights.includes(modeSCode)) {
      alert("This flight is already being tracked!");
    } else {
      let flightData = await getFlightDataByModeSCode(modeSCode);

      let jet = new Jet(flightData, false);

      myMap.addJet(jet);

      // resource: https://www.techiedelight.com/add-item-html-list-javascript/
      let node = document.createElement("li");

      // creates each element and populates with jet data
      let li_country = document.createElement("h4");
      li_country.textContent = jet.country;
      let li_callsign = document.createElement("p");
      li_callsign.textContent = "Callsign: " + jet.callsign;
      let li_modeScode = document.createElement("p");
      let code = document.createElement("span");
      code.textContent = jet.modeSCode;
      li_modeScode.textContent = "Mode S Code: ";
      li_modeScode.appendChild(code);
      let li_delete = document.createElement("button");
      li_delete.textContent = "Remove";
      li_delete.addEventListener("click", removeSelf);

      if (jet.country) {
        node.appendChild(li_country);
      }
      if (jet.callsign) {
        node.appendChild(li_callsign);
      }
      if (jet.modeSCode) {
        node.appendChild(li_modeScode);
      }
      if (jet.modeSCode) {
        node.appendChild(li_delete);
      }

      document.querySelector("#user-flights-list").appendChild(node);

      // We push the modeSCode, since we want to get recent data for the plane, not the old data stored in the jet object
      flights.push(modeSCode);

      // resource: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
      localStorage.setItem("flightsList", JSON.stringify(flights));
    }
  });

loadSavedFlights();

// random flights are generated each time the page loads
window.addEventListener("load", async function () {
  const loader = document.querySelector("#loader");
  let randomFlights = [];

  // This needs to be cleared every time the page loads - no sense in letting
  // flights pile up if they aren't on the map
  if (!(localStorage.getItem("randomFlights") === null)) {
    this.localStorage.removeItem("randomFlights");
  }

  // spinner exists on the page only until the flights have loaded
  loader.style.display = "block";
  let flightData = await getRandomListOfFlights();
  loader.style.display = "none";

  // when generating random numbers, makes sure that we don't exceed the size of
  // the array
  let length = flightData.states.length;

  function copyToClipBoard(e) {
    let element = e.target.parentElement;
    let modeSCode = element.children[2].children[0].textContent;

    navigator.clipboard
      .writeText(modeSCode)
      .then(() => {
        alert("Successfully Copied.");
      })
      .catch((err) => {
        alert("error: try again.");
      });
  }

  // change the limit of i to change the number of flights that will be shown.
  // in this case, there will be 15 flights loaded
  for (let i = 0; i < 15; i++) {
    let index = Math.floor(Math.random() * length);
    let jet = new BulkJet(flightData.states[index], true);
    myMap.addJet(jet);

    // add each jet to the random jet list
    let node = document.createElement("li");

    // creates each element and populates with jet data
    let li_country = document.createElement("h4");
    li_country.textContent = jet.country;
    let li_callsign = document.createElement("p");
    li_callsign.textContent = "Callsign: " + jet.callsign;
    let li_modeScode = document.createElement("p");
    let code = document.createElement("span");
    code.textContent = jet.modeSCode;
    li_modeScode.textContent = "Mode S Code: ";
    li_modeScode.appendChild(code);
    let li_copy = document.createElement("button");
    li_copy.textContent = "Copy to clipboard";
    li_copy.addEventListener("click", copyToClipBoard);

    if (jet.country) {
      node.appendChild(li_country);
    }
    if (jet.callsign) {
      node.appendChild(li_callsign);
    }
    if (jet.modeSCode) {
      node.appendChild(li_modeScode);
    }
    if (jet.modeSCode) {
      node.appendChild(li_copy);
    }

    document.querySelector("#random-flights-list").appendChild(node);
    randomFlights.push(jet.modeSCode);
  }

  // add the list of random jet modeSCodes to localStorage - storing the S Codes
  // should make things a lot easier for whoever is updating the page every 30
  // seconds
  localStorage.setItem("randomFlights", JSON.stringify(randomFlights));
});
