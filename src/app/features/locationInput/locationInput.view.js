class LocationInputView {
    constructor(params) {
        this.attrsLoc = params && params.attrsLoc || {};

        this.currentLocation = this.attrsLoc.currentLocation || ko.observable('');
        this.searchPlaces = this.attrsLoc.autoComplete || ko.observableArray([]);
    }
}

export default LocationInputView;