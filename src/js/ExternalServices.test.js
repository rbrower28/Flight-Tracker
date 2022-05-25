// externalServices.js test file
// Jest guide here: https://jestjs.io/docs/getting-started 
import ExternalServices from './ExternalServices.js';

let externalServices = new ExternalServices;

test('getData returns a JSON object', () => {
  expect(externalServices.getData()).toBe(JSON);
});