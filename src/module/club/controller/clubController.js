const AbstractController = require("../../AbstractController");
const { mappearClub } = require('../mapper/club-mapper')



module.exports = class ClubController extends AbstractController {

    /**
     * 
     * @param {import('../service/clubService')} clubService 
     */

    constructor(uploadMiddleware, clubService) {
        super();
        this.ROUTE_BASE = "/club";
        this.uploadMiddleware = uploadMiddleware
        this.clubService = clubService
    }

    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE

        app.get(`/`, this.index.bind(this));
        app.get('/team/:id', this.showSelectedTeam.bind(this))
        app.get('/edit-team/:id', this.editSelectedTeam.bind(this))
        app.get('/delete-team/:id', this.deleteSelectedTeam.bind(this))
        app.get('/create-team', this.createTeam.bind(this))
        app.post('/form', this.uploadMiddleware.single('logo'), this.save.bind(this))
        app.post('/edit-team/:id', this.uploadMiddleware.single('logo'), this.editTeam.bind(this))
        app.post('/remove-team/:id', this.removeTeam.bind(this))
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    index(req, res) {
        const equipos = this.clubService.getData()

        res.render('main-page', {
            layout: 'main',
            titulo: "CRUD",
            data: {
                equipos
            }
        });
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    showSelectedTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipo = this.clubService.getByID(id)
        this.clubService

        res.render('view-team', {
            layout: 'main',
            titulo: equipo.name,
            equipo
        });
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    editSelectedTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipoPorID = this.clubService.getByID(id)
        const equipo = mappearClub(equipoPorID)

        res.render('edit-team', {
            layout: 'main',
            titulo: equipo.name,
            equipo
        });
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    deleteSelectedTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipo = this.clubService.getByID(id)

        res.render('delete-team', {
            layout: 'main',
            titulo: equipo.name,
            equipo
        });
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    createTeam(req, res) {
        res.render('create-team', {
            layout: 'main',
            titulo: "New team"
        });
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    save(req, res) {
        const nuevoClub = mappearClub(req.body, req.file.filename)
        this.clubService.saveTeam(nuevoClub)

        res.render('exito', {
            layout: 'main'
        })
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    editTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipoModificado = mappearClub(req.body, req.file.filename)
        console.log(equipoModificado)
        this.clubService.editTeam(equipoModificado)

        res.redirect(`/team/${id}`)
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    removeTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipo = this.clubService.getByID(id)
        this.clubService.deleteTeam(equipo)
        res.redirect(`/`)
    }

}