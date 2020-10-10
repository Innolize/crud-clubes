const { Club } = require('../entity/Club.js')

/**
 * 
 * @param {Object} objeto 
 * @returns Club
 */


const mappearClub = (objeto, imagen = '') => {
    const {
        name,
        shortName,
        tla,
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
    const crestUrl = imagen ? `/imagenes/${imagen}` : objeto.crestUrl
    const lastUpdate = Date.now().toString()
    return new Club(name, area, shortName, tla, crestUrl, address, phone, website, email, founded, clubColors, venue, lastUpdate)
}

module.exports = {
    mappearClub,
}