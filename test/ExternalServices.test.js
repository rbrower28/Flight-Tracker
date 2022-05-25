// externalServices.js test file
// Resource for assert: https://nodejs.org/api/assert.html
import assert from 'node:assert/strict';
import ExternalServices from '../src/js/ExternalServices.js';

let externalServices = new ExternalServices;


describe('ExternalServices', function () {
  describe('getData()', function () {
    it('should return a JSON object', function () {
      assert.ok(externalServices.getData(), "Data was not received.");
    });
  });
});