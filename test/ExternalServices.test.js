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
    it('Requesting aad213 (Random but specific) flight information.', async function () {
      let data = await externalServices.getFlightDataByModeSCode('aad213');
      console.log(data);
      assert.ok(data, `data for flight aad213 wasn't available.`);
    });
    it('Requesting A835AF (Elon Musk) flight information.', async function () {
      let data = await externalServices.getFlightDataByModeSCode('A835AF');
      console.log(data);
      assert.ok(data, `data for flight A835AF wasn't available.`);
    });
    // it('Requesting A7E0DB (Kanye West) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A7E0DB');
    //   console.log(data);
    //   assert.ok(data, `data for flight A7E0DB wasn't available.`);
    // });
    // it('Requesting A6D9E0 (Oprah Winfrey) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A6D9E0');
    //   console.log(data);
    //   assert.ok(data, `data for flight A6D9E0 wasn't available.`);
    // });
    // it('Requesting A21FE6 (Michael Jordan) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A21FE6');
    //   console.log(data);
    //   assert.ok(data, `data for flight A21FE6 wasn't available.`);
    // });
    // it('Requesting AC39D6 (Bill Gates) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('AC39D6');
    //   console.log(data);
    //   assert.ok(data, `data for flight AC39D6 wasn't available.`);
    // });
    // it('Requesting A55B7F (Beyonce Knowles) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A55B7F');
    //   console.log(data);
    //   assert.ok(data, `data for flight A55B7F wasn't available.`);
    // });
    // it('Requesting A2AA92 (Jeff Bezos 1) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A2AA92');
    //   console.log(data);
    //   assert.ok(data, `data for flight A2AA92 wasn't available.`);
    // });
    // it('Requesting AA3908 (Jeff Bezos 2) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('AA3908');
    //   console.log(data);
    //   assert.ok(data, `data for flight AA3908 wasn't available.`);
    // });
    // it('Requesting AC64C6 (Taylor Swift) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('AC64C6');
    //   console.log(data);
    //   assert.ok(data, `data for flight AC64C6 wasn't available.`);
    // });
    // it('Requesting AAE5EB (Mark Cuban) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('AAE5EB');
    //   console.log(data);
    //   assert.ok(data, `data for flight AAE5EB wasn't available.`);
    // });
    // it('Requesting A0F9E7 (Jim Carrey) flight information.', async function () {
    //   let data = await externalServices.getFlightDataByModeSCode('A0F9E7');
    //   console.log(data);
    //   assert.ok(data, `data for flight A0F9E7 wasn't available.`);
    // });
  });
});