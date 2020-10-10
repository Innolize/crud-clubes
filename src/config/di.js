const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { default: DIContainer, object, get, factory, } = require('rsdi')
const multer = require('multer')

const session = require('express-session')

const { ClubController, ClubRepository, ClubService } = require('../module/club/module')

function configureMainJSON() {
    return process.env.JSON_DB_PATH;
}

function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;

    const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: ONE_WEEK_IN_SECONDS },
    };
    return session(sessionOptions)
}

function configureMulter() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.env.CRESTS_UPLOAD_DIR)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });
    return multer({ storage })
}

function configureUuid() {
    return uuid.v4;
}

/**
 * @param {DIContainer} container
 */

function addCommonDefinitions(container) {
    container.addDefinitions({
        fs,
        uuid: factory(configureUuid),
        JSONDatabase: factory(configureMainJSON),
        Session: factory(configureSession),
        Multer: factory(configureMulter),
    })
}

/**
* @param {DIContainer} container
*/

function addClubModuleDefinitions(container) {
    container.addDefinitions({
        ClubController: object(ClubController).construct(get('Multer'), get('ClubService')),
        ClubService: object(ClubService).construct(get('ClubRepository')),
        ClubRepository: object(ClubRepository).construct(get('uuid'), get('fs'), get('JSONDatabase'))
    })
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container)
    addClubModuleDefinitions(container)
    return container
}