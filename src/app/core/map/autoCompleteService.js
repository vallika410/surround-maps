import Places from './places';

class AutoCompleteService {
    constructor() {
        this.service = new google.maps.places.AutocompleteService();
    }

    GetPredictions(input, callback) {
        this.service.getQueryPredictions({
            input
        }, callback);
    }
    
    MapPlaces(predictions) {
        return predictions.map(prediction => new Places(prediction));
    }
}
export default AutoCompleteService;