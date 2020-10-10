const ClubController = require('./controller/clubController');
/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */

 function init(app, container){
     /**
      * @type {ClubController} controller;
      */
    const controller = container.get('ClubController');
    controller.configureRoutes(app)
 }

 module.exports = {
     init,
     ClubController
 }