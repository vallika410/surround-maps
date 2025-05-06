class Location {
    constructor({
        address,
        city,
        country,
        lat,
        lng,
        postalCode,
        state
    }) {
        this.address = address;
        this.city = city;
        this.country = country;
        this.position = {
            lat,
            lng
        };
        this.postalCode = postalCode;
        this.state = state;
    }
}
export default Location;