import myApp from './app.services';
class AppView {
	constructor(params) {
		const self = this;
		const locationList = myApp.locationList || []; //contains all the places

		self.currentLocation = ko.observable('');
        self.headerName = ko.observable('');
		self.searchNeighbors = ko.observable('');
		self.searchList = ko.observableArray(locationList.slice(0) || []);
		self.autoComplete = ko.observableArray([]);
		self.search = function() {
			const value = self.searchNeighbors();

			self.searchList.removeAll();
			myApp.locationList.forEach(function(items) {
				if (items.name.toLowerCase().includes(value.toLowerCase())) {
					self.searchList.push(items);
				}
			});
		};

		self.searchNeighbors.subscribe(() => {
			myApp.core.map.RemoveAllMarkers(myApp.core.map.AllMarkers);
			self.search();
			myApp.core.map.SetMarkers(self.searchList());
		});
		self.searchList.extend({
			rateLimit: 50
		});
		self.autoComplete.extend({
			rateLimit: 50
		});
		self.attrs = {
			callback(venue) {
				myApp.OpenInfoWindow(venue);
			}
		};
        self.attrsLoc = {
            callback(location) {
                subscribeLoc.dispose();
                self.autoComplete.removeAll();
                self.currentLocation(location.name);
                myApp.FetchDataFromAPI(location.name);
                subscribeLoc = self.currentLocation.subscribe(() => {
                                    subscribeLocation();
                                });
			},
			currentLocation: self.currentLocation,
            autoComplete: self.autoComplete
        }
        let subscribeLoc = self.currentLocation.subscribe(() => {
            subscribeLocation();
        });
        const subscribeLocation = () => {
            if (!self.currentLocation()) {
                self.autoComplete.removeAll();
                return;
            }
			myApp.core.map.AUTOCompleteService.GetPredictions(self.currentLocation(),
				(predictions, status) => {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const places = myApp.core.map.AUTOCompleteService.MapPlaces(predictions);

						self.autoComplete(places);
					} else {
						window.NOTIFY.error_message('Failed to load locations from google API. Please try again', 2000);
					}
				});
		};
		myApp.headerName = self.headerName;
		myApp.SEARCHLIST = self.searchList;

	}
}

export default AppView;