// main.js file

// This is just a dummy file until someone else in the group starts actually creating a main.js file or the equivalent.
// If the main file ends up not being this one, then be sure to change line 5 of package.json from
// "main": "main.js", to instead use the js file you want.
import {MapRenderer} from './mapData.js';
let myMap = new MapRenderer('map', -114.7420, 44.0682, 5);
myMap.addJet('N1234567', -114.7420, 44.0682);
myMap.addJet('N1234567', -116.7420, 49.0682);
// myMap.removeJet('N1234567');
