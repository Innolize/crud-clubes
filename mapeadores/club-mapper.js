const club = require('../entidades/Club.js')

const mappearClub = (objeto, imagen = '') => {
    console.log(objeto)
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
    return new club.Club(name, area, shortName, tla, crestUrl, address, phone, website, email, founded, clubColors, venue, lastUpdate)
}

exports.mappearClub = mappearClub