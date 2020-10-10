const uuid = require('uuid')
const fs = require('fs')
const {default: DIContainer, object, get, factory} = require('rsdi')
const multer = require('multer')

const session = require('express-session')

const ClubController = require('../controller/clubController')

function configureMainJSON(){
    return process.env.JSON_DB_PATH;
}