import GeoServices from './geoServices';
import MapMarker from './mapMarker';
import MapInfoWindow from './mapInfoWindow';
import AutoCompleteService from './autoCompleteService';

class MapOperations {
	constructor() {
		//Assigning default location
		//to map
		this.area = {
			lat: 40.74,
			lng: -73.99
		};
		this.address = 'Paris';
		this.zoom = 17;

		//Assigning the services
	}

	/**
	 * Returns the map object
	 * Keeps the map object 
	 */
	get DrawnMap() {
		return this.map;
	}

	/**
	 * Assigning the services
	 */

	//Geo Service
	get GEOServices() {
		this.geoServices = this.geoServices || new GeoServices(window.navigator);
		return this.geoServices;
	}
	//Map Marker
	get MAPMarker() {
		this.mapMarker = this.mapMarker || new MapMarker();
		return this.mapMarker;
	}
	//Map Info Window
	get MAPINFOWindow() {
		this.mapInfoWindow = this.mapInfoWindow || new MapInfoWindow();
		return this.mapInfoWindow;
	}
	//Map Auto Complete Service
	get AUTOCompleteService() {
		this.autoCompleteService = this.autoCompleteService || new AutoCompleteService();
		return this.autoCompleteService;
	}

	/**
	 * Initializes the map functions
	 */
	initMap(element, apiFetch) {
		// this.setupMap(element, this.area, this.zoom);
		this.GEOServices.GetLocation(this.address, (results, status) => {
			if (status === 'OK') {
				const location = results[0].geometry.location;
				this.area = {
					lat: location.lat(),
					lng: location.lng()
				};
			} else {
				window.NOTIFY.error_message('Failed to load location data. Please try again.', 2000);
			}
			this.setupMap(element, this.area, this.zoom);
			if (apiFetch) {
				apiFetch(this.area);
			}
			
        
		});
	}

	/**
	 * AllMarkers
	 */
	get AllMarkers() {
		this.allMarkers = this.allMarkers || [];
		return this.allMarkers;
	}

	set AllMarkers(marker) {
		this.allMarkers.push(marker);
	}

	/**
	 * ClearMarkers
	 */
	ClearMarkers(markers) {
		this.RemoveAllMarkers(markers);
		markers.splice(0);
	}

	/**
	 * Remove All Markers
	 */
	RemoveAllMarkers(markers) {
		markers.forEach((marker) => this.MAPMarker.RemoveMarker(marker));
	}

	/**
     * Set markers up for visible data
     */
    SetMarkers(allData) {
        allData.forEach((item) => {
            this.MAPMarker.SetMapMarker(item.marker, this.DrawnMap);
        });
    }

	/**
	 * Get Info Window
	 */
	get INFOWindow() {
		this.infoWindow = this.infoWindow || this.MAPINFOWindow.CreateInfoWindow('');
		return this.infoWindow;
	}

	/**
	 * Event to open info window1
	 */
	OpenInfo({content, marker}) {
		this.removeMarkerAnimation();
		this.setMarkerAnimation(marker);
		this.MAPINFOWindow.SetInfoWindowContent(this.INFOWindow, content || '');
		this.MAPINFOWindow.OpenInfoWindow(this.INFOWindow, this.DrawnMap, marker);
	}

	/**
	 * Provide image from street view
	 */
	FetchStreetView(location) {
		const endpoint = `//maps.googleapis.com/maps/api/streetview?size=300x300
		&location=${location.lat},${location.lng}&key=AIzaSyAI4ADzGBzGZeWFsAlrvnNW_1p0MRd4jX4`;

		return endpoint;
	}
	/**
	 * Removes animation from
	 * current marker if any
	 */
	removeMarkerAnimation() {
		if(this.currentMarker) {
			this.MAPMarker.RemoveAnimation(this.currentMarker);
		}
	}

	/**
	 * Sets the marker animation
	 */
	setMarkerAnimation(marker) {
		this.currentMarker = marker;
		this.MAPMarker.SetAnimation(this.currentMarker);
	}

	/**
	 * Initialize new google Map
	 */
	setupMap(ele, center, zoom) {
		if (this.DrawnMap) {
			//TODO: change the center and zoom if any
			this.map.panTo(center);
		} else {
			this.map = new google.maps.Map(ele, {center, zoom});
		}
	}
}
export default MapOperations;
