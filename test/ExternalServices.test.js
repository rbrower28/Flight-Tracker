// ExternalServices.js test file
// Resource for Mocha: https://mochajs.org/
// Resource for assert: https://nodejs.org/api/assert.html
import assert from 'node:assert/strict';
import ExternalServices from '../src/js/ExternalServices.js';

let externalServices = new ExternalServices;

describe('ExternalServices', function () {
  describe('getData()', function () {
    it('Checking to see if data is received', function () {
      assert.ok(externalServices.getData(), "Data was not received.");
    });
    console.log('test');
    // We're saving another response here to see what we've got
    
    it('Checking icao24 is at index 0 0', async function () {
      let data = await externalServices.getData();
      console.log(data);
      assert.ok(data[0][0], `data[0][0] wasn't available. See ${console.log(data)}`);
    });
  });
});