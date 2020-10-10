const AbstractController = require("./AbstractController");



module.exports = class ClubController extends AbstractController {
    constructor(uploadMiddleware, clubService) {
        super();
        this.ROUTE_BASE = "/club";
        this.uploadMiddleware = uploadMiddleware
        this.clubService = clubService
    }

    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE

        app.get(`/`, this.index.bind(this));
        app.get('/team/:selectedTeam', this.showSelectedTeam.bind(this))
        app.get('/edit-team/:selectedTeam', this.editSelectedTeam.bind(this))
        app.get('/delete-team/:selectedTeam', this.deleteSelectedTeam.bind(this))
        app.get('/create-team', this.createTeam.bind(this))
        app.post('/form', this.uploadMiddleware.single('logo'), this.save.bind(this))
        app.post('/edit-team/:team', this.uploadMiddleware.single('logo'), this.editTeam.bind(this))
        app.post('/remove-team/:team', this.removeTeam.bind(this))
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    index(req, res) {
        const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))

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
        const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
        const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
        const equipo = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()

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
        const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
        const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
        const equipoFiltrado = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()
        const equipo = mapperClub.mappearClub(equipoFiltrado)

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
        const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
        const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
        const equipo = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()

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
        const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
        const nuevoClub = mapperClub.mappearClub(req.body, req.file.filename)
        const nuevosEquipos = JSON.stringify([...equipos, nuevoClub])
        fs.writeFileSync('./data/equipos.json', nuevosEquipos)

        res.render('exito', {
            layout: 'main'
        })
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    editTeam(req, res) {
        const teamAEditar = req.params.team.toUpperCase()
        const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
        const nuevoClub = mapperClub.mappearClub(req.body, req.file.filename)
        console.log(req.file.filename)
        const nuevosEquipos = equipos.map(equipo => equipo.tla === teamAEditar ? Object.assign(equipo, nuevoClub) : equipo)

        fs.writeFileSync('./data/equipos.json', JSON.stringify(nuevosEquipos))
        res.redirect(`/team/${teamAEditar}`)
    }

    /**
    *@param {import('express').Request} req
    *@param {import('express').Response} res
    */

    removeTeam(req, res) {
        const teamAEliminar = req.params.team.toLowerCase()
        const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
        const nuevosEquipos = equipos.filter(equipo => equipo.tla.toLowerCase() !== teamAEliminar)
        fs.writeFileSync('./data/equipos.json', JSON.stringify(nuevosEquipos))
        res.redirect(`/`)
    }

}