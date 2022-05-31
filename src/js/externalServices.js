// externalServices.js file
// File's purpose is to make and receive requests for the opensky network's API
// OpenSky REST API source: https://openskynetwork.github.io/opensky-api/rest.html
// OpenSky API Response Guide (ie what is what in the response): https://opensky-network.org/forum/application-programming-interface/97-opensky-api-response-states-array
// Resource used: https://itnext.io/async-and-await-in-javascript-the-extension-to-a-promise-f4e0048964ac

// Mode S Code effectively means icao24 code; they're the same thing.
// So when you see Mode S Code for a flight here: https://opensky-network.org/network/explorer
// That's what's going into the function as a parameter.

import fetch from "node-fetch"; //eslint-disable-line
const baseURL = "https://opensky-network.org/api";

export async function getFlightDataByModeSCode(modeSCode) {
  let data = await fetch(baseURL + "/states/all?icao24=" + modeSCode);

  if (data.status == 200) {
    let json = await data.json();
    return json;
  }

  throw new Error(data.status);
}

// Fetches all of the flights that are in the air at this exact moment in time.
// It would be nice to trim down the size of the response, but I couldn't find a
// way to do so within the OpenSky API
export async function getRandomListOfFlights() {
  let data = await fetch(baseURL + "/states/all");

  if (data.status == 200) {
    let json = await data.json();
    return json;
  }

  throw new Error(data.status);
}
