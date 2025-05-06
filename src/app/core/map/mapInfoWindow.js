class MapInfoWindow {
    constructor() {

    }

    /**
     * Create a new info window with content only
     */
    CreateInfoWindow(content) {
        return new google.maps.InfoWindow({
            content
        });
    }

    /**
     * Setup the content of the info window
     */
    SetInfoWindowContent(infoWindow, content) {
        infoWindow.setContent(content);
    }

    /**
     * Open the info window in the map
     */
    OpenInfoWindow(infoWindow, map, marker) {
        infoWindow.open(map, marker);
    }
}

export default MapInfoWindow;