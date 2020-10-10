class Club {
    constructor(name, area, shortName, tla, crestUrl, address, phone, website, email, founded, clubColors, venue, lastUpdate) {
        this.area = area,
            this.name = name,
            this.shortName = shortName,
            this.tla = tla,
            this.crestUrl = crestUrl
        this.address = address,
            this.phone = phone,
            this.website = website,
            this.email = email,
            this.founded = founded,
            this.clubColors = clubColors,
            this.venue = venue,
            this.lastUpdate = lastUpdate
    }
}

module.exports = {
    Club
} 