const AbstractClubRepository = require('../abstractClubRepository')
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
    saveTeam(team) {
        const equipos = this.getData()
        const clubToSave = { ...team, id: this.uuid() }
        equipos.push(clubToSave)
        this.saveData(equipos)
    }

    saveData(content) {
        this.fileSystem.writeFileSync(this.dbFilePath, JSON.stringify(content));
    }

}