// ExternalServices.js test file
// Resource for Mocha: https://mochajs.org/
// Resource for assert: https://nodejs.org/api/assert.html
import assert from 'node:assert/strict';
import getFlightDataByModeSCode from '../src/js/ExternalServices.js';

// Look up flights for tests here: https://opensky-network.org/network/explorer
// OpenSky API Response Guide (ie what is what in the response): https://opensky-network.org/forum/application-programming-interface/97-opensky-api-response-states-array

describe('ExternalServices', function () {
  describe('getFlightDataByModeSCode()', function () {
    it('Requesting c0523f (Random but specific) flight information.', async function () {
      let data = await getFlightDataByModeSCode('c0523f');
      console.log(data);
      assert.ok(data, `data for flight c0523f wasn't available.`);
    });
  });
});