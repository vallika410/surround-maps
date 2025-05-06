import contentData from './content.template.html';

class AppServices {
    constructor() {
        this.locationList = [];
        this.allVenues = [];
        this.duration = 4000;
    }

    INIT(element, address) {
        if (address) {
            this.core.map.address = address;
        }

        this.core.map.initMap(element, (location) => {
                this.core.api.GetAPIInfo(location).then((resp) => {
                    this.headerName(this.core.map.address);
                    this.updateAllInfo(resp);
                }, (err) => window.NOTIFY.error_message('Failed to load location venue data. Please try again.', this.duration));
            });
    }

    /**
     * Generate markers and populate the venue details
     */
    GenerateMarkers(venues) {
        const map = this.core.map;
        
        //Clear locations and markers
        this.RemoveLocations();
        map.ClearMarkers(map.AllMarkers);
        
        //Add markers and update location
        venues.forEach((item) => {
            const marker = map.MAPMarker.AddMarker(item.location.position, map.DrawnMap);

            map.AllMarkers = marker;
            this.locationList.push(Object.assign(item, {marker}));
        });
        

    }

    /**
     * Generate info window and content
     */
    GenerateInfoWindows() {
        const map = this.core.map;
        const self = this;

        this.locationList.forEach((item) => {
            //ADD event listeners to markers
            item.src = map.FetchStreetView(item.location.position);
            item.content = self.PrepareContent(item);
            console.log(item.content);
            item.marker.addListener('click', () => {
                self.OpenInfoWindow(item);
            });
        });
    }

    /**
     * Removes and clears the location list
     */
    RemoveLocations() {
        this.locationList.splice(0);
    }

    //Hack to update the observable mutated array on initialisation
    UpdateSearchData() {
        const data = this.locationList.slice(0);

        this.SEARCHLIST.removeAll();
        this.SEARCHLIST(data);
    }

    PrepareContent(venue) {
        const domValue = contentData.replace(/name/g, venue.name).replace(/url/, venue.url || '#').replace(/<img>/ig, `<img src="${venue.src}" alt="${venue.name}">`);

        return domValue;
    }

    OpenInfoWindow(venue) {
        this.core.api.GetAPIWikiInfo(venue.name).then(
            resp => {
                venue.content = venue.content.replace(/CONTENT/ig, resp);
            },
            err => {
                window.NOTIFY.error_message(err.error, this.duration);
            }
        ).done(() => this.core.map.OpenInfo(venue));
        
    }

    //TODO: Fetch from foursquare the location
    //venue details using api /near
    FetchDataFromAPI(location) {
        this.INIT(null, location);
    }

    updateAllInfo(resp) {
        this.allVenues = resp;
        this.GenerateMarkers(resp);
        //Add info window support
        this.GenerateInfoWindows();
        this.UpdateSearchData();
    }

}

export default new AppServices();