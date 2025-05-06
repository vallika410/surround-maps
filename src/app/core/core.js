import * as dom from './dom/domInit';
import mapCore from './map/map';
import apiCore from './api/apiFetch';

export default {
    map: new mapCore(),
    api: new apiCore()
};


