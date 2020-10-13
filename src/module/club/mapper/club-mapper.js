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
    return new Club(id, name, area, shortName, tla, crestURL, address, phone, website, email, founded, clubColors, venue)
}

module.exports = {
    mappearClub,
}