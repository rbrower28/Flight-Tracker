/*eslint
    no-console: off
*/
/*global
    it, describe
*/

// ExternalServices.js test file
// Resource for Mocha: https://mochajs.org/
// Resource for assert: https://nodejs.org/api/assert.html
import assert from "node:assert/strict";
import { getFlightDataByModeSCode } from "../src/js/externalServices.js";

// Look up flights for tests here: https://opensky-network.org/network/explorer
// OpenSky API Response Guide (ie what is what in the response): https://opensky-network.org/forum/application-programming-interface/97-opensky-api-response-states-array

describe("ExternalServices", function () {
  describe("getFlightDataByModeSCode()", function () {
    it("Requesting 346114 (Random but specific) flight information.", async function () {
      let data = await getFlightDataByModeSCode("346114");
      console.log(data);
      assert.ok(data, "data for flight 346114 wasn't available.");
    });
  });
});
