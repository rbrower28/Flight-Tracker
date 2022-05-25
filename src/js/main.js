'use strict';

import ExternalSource from './externalSource.js';
import PlaneList from './PlaneList.js';

const source = new ExternalSource();
const listElement = document.querySelector('.jet-list');
const jetList = new PlaneList(source, listElement);

jetList.init();