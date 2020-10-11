/**
 * @typedef {import('../repository/abstractClubRepository')} abstractClubRepository
 */

const Club = require('../entity/Club')

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
        return this.clubRepository.getByID(id)
    }

    saveTeam(team) {
        return this.clubRepository.saveTeam(team)
    }
    deleteTeam(team) {
        return this.clubRepository.deleteTeam(team)
    }
    editTeam(team) {
        return this.clubRepository.editTeam(team)
    }
}