const AbstractClubRepositoryError = require('./error/abstractClubRepositoryError');

module.exports = class AbstractClubRepository {
    constructor() {
        if (new.target === AbstractClubRepository) {
            throw new AbstractClubRepositoryError(
                'No se puede instanciar el repositorio de clubes abstracto.'
            );
        }
    }
}