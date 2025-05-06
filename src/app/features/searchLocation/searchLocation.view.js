import myApp from '../app.services';

class SearchLocationView {
    constructor(params) {
        this.searchNeighbors = params.search;
        this.searchLocList = params.locations;
        this.attrs = params.attrs;
    }
}

export default SearchLocationView;