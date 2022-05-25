// externalServices.js file
// File's purpose is to make and receive requests for the opensky network's API
// OpenSky REST API source: https://openskynetwork.github.io/opensky-api/rest.html
import fetch from 'node-fetch';

const baseURL = 'https://opensky-network.org/api';

export default class ExternalServices {
    
    getData(){
        return fetch(baseURL + '/states/all?time=1458564121&icao24=3c6444')
    }

}