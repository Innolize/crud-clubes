const AbstractClubRepository = require('../abstractClubRepository')
const Club = require('../../entity/Club')

module.exports = class ClubRepository extends AbstractClubRepository {

    /**
     * @param {import('uuid/v4')} uuid
     * @param {import('fs')} fileSystem
     * @param {String} dbFilePath
     */

    constructor(uuid, fileSystem, dbFilePath){
        super()
        this.uuid = uuid
        this.fileSystem = fileSystem
        this.dbFilePath = dbFilePath
    }

    getData(){
        const data = fs.readFileSync('./data/equipos.json')
        let parsedData
        try{
            parsedData = JSON.parse(data)
        }catch(e){
            parsedContent = []
        }
        return parsedData
    }

}