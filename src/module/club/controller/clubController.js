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
        app.post('/save', this.uploadMiddleware.single('logo'), this.saveTeam.bind(this))
        app.post('/remove-team/:id', this.removeTeam.bind(this))
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    index(req, res) {
        const equipos = this.clubService.getData()
        const { errors, messages } = req.session

        res.render('main-page', {
            layout: 'main',
            titulo: "CRUD",
            data: {
                equipos
            },
            errors,
            messages
        });

        req.session.messages = [];
        req.session.errors = [];
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    showSelectedTeam(req, res) {
        const id = req.params.id.toLowerCase()
        const equipo = this.clubService.getByID(id)
        console.log(equipo)

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

    saveTeam(req, res) {
        try {
            const club = mappearClub(req.body)
            if (req.file) {
                req.file.filename
                const { filename } = req.file;
                club.crestUrl = `/img/${filename}`;
            }
            this.clubService.saveTeam(club)

            if (club.id) {
                req.session.messages = [`El club con "${club.name}" se actualizó exitosamente`]
            } else {
                req.session.messages = [`Se creó el club "${club.name}"`]
            }
            res.redirect("/")
        } catch (e) {
            req.session.errors = [e.message]
            res.redirect('/')
        }

    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    removeTeam(req, res) {
        try {
            const id = req.params.id.toLowerCase()
            const equipo = this.clubService.getByID(id)
            this.clubService.deleteTeam(equipo)
            req.session.messages = [`Se elimino el club ${equipo.name} con exito!`]
        } catch (e) {
            req.session.errors = [e.message]
        }
        res.redirect(`/`)
    }

}