const AbstractClubRepository = require('../abstractClubRepository')
const ClubNotFoundError = require('../error/clubNotFoundError')
const ClubNotDefinedError = require('../error/clubIdNotDefinedError')
const Club = require('../../entity/Club')

module.exports = class ClubRepository extends AbstractClubRepository {

    /**
     * @param {import('uuid/v4')} uuid
     * @param {import('fs')} fileSystem
     * @param {String} dbFilePath
     */

    constructor(uuid, fileSystem, dbFilePath) {
        super()
        this.uuid = uuid
        this.fileSystem = fileSystem
        this.dbFilePath = dbFilePath
    }

    getData() {
        const data = this.fileSystem.readFileSync('./data/equipos.json')
        let parsedData
        try {
            parsedData = JSON.parse(data)
        } catch (e) {
            parsedContent = []
        }
        return parsedData
    }

    getByID(id) {
        const equipos = this.getData()
        const equipo = equipos.filter(x => x.id == id).pop()
        if (!equipo) {
            return console.log(`No se encontro club con id ${id}`)
        }
        return equipo
    }

    /**
     * @param {import('../../entity/Club')} club 
     */

    saveTeam(club) {
        const clubs = this.getData()

        let clubToSave

        if (club.id) {
            const clubIndex = clubs.findIndex(x => JSON.stringify(x.id) === club.id)
            if (clubIndex === -1) {
                throw new ClubNotFoundError(
                    `No se pudo actualizar el club ${club.name} porque no se encontró`
                )
            }
            const oldClub = clubs[clubIndex]
            clubs[clubIndex] = club;
            clubToSave = club

            if (!club.crestUrl) {
                clubs[clubIndex].crestUrl = oldClub.crestUrl
            }
        } else {
            clubToSave = { ...club, ...{ id: this.uuid() } }
            clubs.push(clubToSave)
        }

        this.saveData(clubs)
    }

    /**
     * @param {Array} content
     */

    saveData(content) {
        this.fileSystem.writeFileSync(this.dbFilePath, JSON.stringify(content));
    }


    /**
     * 
     * @param {import('../../entity/Club')} club
     */

    deleteTeam(club) {

        if (!club || !club.id) {
            throw new ClubNotDefinedError('El ID del club no está definido')
        }

        const equipos = this.getData()
        const indexABorrar = equipos.findIndex(x => x.id === club.id)
        equipos.splice(indexABorrar, 1);
        this.saveData(equipos)

    }

    editTeam(equipoModificado) {
        const equipos = this.getData()
        const nuevosEquipos = equipos.map(equipo => JSON.stringify(equipo.id) === equipoModificado.id ? Object.assign(equipo, equipoModificado) : equipo)
        console.log(nuevosEquipos)
        this.saveData(nuevosEquipos)

    }

}