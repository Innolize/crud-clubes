const { Club } = require('../entity/Club.js')

/**
 * 
 * @param {Object} objeto 
 * @returns Club
 */


const mappearClub = (objeto) => {
    const {
        id,
        name,
        shortName,
        tla,
        "crestUrl": crestURL,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue
    } = objeto

    const area = {
        id: 2072,
        name: objeto.area ? objeto.area.name : objeto.country
    }
    const lastUpdate = Date.now().toString()
    return new Club(id, name, area, shortName, tla, crestURL, address, phone, website, email, founded, clubColors, venue, lastUpdate)
}

module.exports = {
    mappearClub,
}