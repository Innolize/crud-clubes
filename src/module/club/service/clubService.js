/**
 * @typedef {import('../repository/abstractClubRepository')} abstractClubRepository
 */

const Club = require('../entity/Club')
const ClubNotDefinedError = require('./error/clubNotDefinedError')
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError')

module.exports = class Service {

    /**
     * @param {abstractClubRepository} clubRepository
     */

    constructor(clubRepository) {
        this.clubRepository = clubRepository;
    }

    getData() {
        return this.clubRepository.getData()
    }

    getByID(id) {
        if (id === undefined) {
            throw new ClubIdNotDefinedError()
        }
        return this.clubRepository.getByID(id)
    }

    saveTeam(team) {
        if (team === undefined) {
            throw new ClubNotDefinedError()
        }
        return this.clubRepository.saveTeam(team)
    }
    deleteTeam(team) {
        if (team === undefined) {
            throw new ClubNotDefinedError()
        }
        return this.clubRepository.deleteTeam(team)
    }
    editTeam(team) {
        if (team === undefined) {
            throw new ClubNotDefinedError()
        }
        return this.clubRepository.editTeam(team)
    }
}