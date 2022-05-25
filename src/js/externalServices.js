// externalServices.js file
// File's purpose is to make and receive requests for the opensky network's API
// OpenSky REST API source: https://openskynetwork.github.io/opensky-api/rest.html
import fetch from 'node-fetch';

const baseURL = 'https://opensky-network.org/api';

export default class ExternalServices {

    // Resource used: https://itnext.io/async-and-await-in-javascript-the-extension-to-a-promise-f4e0048964ac
    
    async getData(){
        let data = await fetch(baseURL + '/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226');
        
        if (data.status == 200) {
            let json = await data.json();
            return json;
        }

        throw new Error(data.status);
    }

}