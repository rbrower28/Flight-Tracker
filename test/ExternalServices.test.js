// ExternalServices.js test file
// Resource for Mocha: https://mochajs.org/
// Resource for assert: https://nodejs.org/api/assert.html
import assert from 'node:assert/strict';
import ExternalServices from '../src/js/ExternalServices.js';

let externalServices = new ExternalServices;

// Look up flights for tests here: https://opensky-network.org/network/explorer
// OpenSky API Response Guide (ie what is what in the response): https://opensky-network.org/forum/application-programming-interface/97-opensky-api-response-states-array

describe('ExternalServices', function () {
  describe('getFlightDataByModeSCode()', function () {
    it('Requesting AC39D6 (Bill Gates) flight information.', async function () {
      let data = await externalServices.getFlightDataByModeSCode('AC39D6');
      console.log(data);
      assert.ok(data, `data for flight AC39D6 wasn't available.`);
    });
  });
});