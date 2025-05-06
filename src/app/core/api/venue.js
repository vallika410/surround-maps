import Location from './location';

class Venue {
    constructor({
        id,
        location,
        name,
        url
    }) {
        this.id = id;
        this.location = new Location(location);
        this.name = name;
        this.url = url;
    }
}
export default Venue;