//This lists all the geo location related
//operation on the map
class GeoLocationService {
    constructor(navigatorObj) {
        this.navigator = navigatorObj;
        this.geocoder = new google.maps.Geocoder();
    }

    /**
     * Take current location and return it
     * if not then the take the default location
     */
    GetCurrentLocation(callback) {
        if (this.navigator.geolocation) {
            return this.navigator
            .geolocation.getCurrentPosition(
                position => callback(position),
                () => callback(false));
        } 

        return false;
    }

    /**
     * Get the lat-lng for 
     * a place adress
     */
    GetLocationName({lat, lng}, callback) {
         this.geocoder.geocode({
            location: {
                lat,
                lng
            }
        }, callback);
    }

    /**
     * Get the adress
     * for lat-lng
     */
    GetLocation(address, callback) {
         this.geocoder.geocode({
            address
        }, callback);
    }
}
export default GeoLocationService;