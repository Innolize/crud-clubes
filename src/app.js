require('dotenv').config()
const express = require('express')
const exphbr = require('express-handlebars')
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser')
const mapperClub = require('./mapeadores/club-mapper.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/imagenes')
    },
    filename: function (req, file, cb) {
        cb(null, 'test.jpg')
    }
})

const app = express()
const PUERTO = 8080;

const upload = multer({ storage })
const hbs = exphbr.create({
    layoutsDir: `${__dirname}/views/layouts`,
})



// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/uploads`))
app.use(express.static('public'))
app.set('views', __dirname + '/views');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Rutas

app.get('/', function (req, res) {
    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))

    res.render('main-page', {
        layout: 'main',
        titulo: "CRUD",
        data: {
            equipos
        }
    });
});

app.get('/team/:selectedTeam', function (req, res) {
    const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
    const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
    const equipo = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()

    res.render('view-team', {
        layout: 'main',
        titulo: equipo.name,
        equipo

    });
});

app.get('/edit-team/:selectedTeam', function (req, res) {
    const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
    const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
    const equipoFiltrado = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()
    const equipo = mapperClub.mappearClub(equipoFiltrado)

    res.render('edit-team', {
        layout: 'main',
        titulo: equipo.name,
        equipo

    });
});

app.get('/delete-team/:selectedTeam', function (req, res) {
    const equipoSeleccionado = req.params.selectedTeam.toLocaleLowerCase()
    const equipos = JSON.parse(fs.readFileSync(`./data/equipos.json`))
    const equipo = equipos.filter(x => x.tla.toLocaleLowerCase() === equipoSeleccionado).pop()

    res.render('delete-team', {
        layout: 'main',
        titulo: equipo.name,
        equipo

    });
});

app.get('/create-team', function (req, res) {
    res.render('create-team', {
        layout: 'main',
        titulo: "New team"
    });
});


app.post('/form', upload.single('logo'), function (req, res) {
    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
    const nuevoClub = mapperClub.mappearClub(req.body, req.file.filename)
    const nuevosEquipos = JSON.stringify([...equipos, nuevoClub])
    fs.writeFileSync('./data/equipos.json', nuevosEquipos)

    res.render('exito', {
        layout: 'main'
    })
})

app.post('/edit-team/:team', upload.single('logo'), function (req, res) {
    const teamAEditar = req.params.team.toUpperCase()
    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
    const nuevoClub = mapperClub.mappearClub(req.body, req.file.filename)
    console.log(req.file.filename)
    const nuevosEquipos = equipos.map(equipo => equipo.tla === teamAEditar ? Object.assign(equipo, nuevoClub) : equipo)

    fs.writeFileSync('./data/equipos.json', JSON.stringify(nuevosEquipos))
    res.redirect(`/team/${teamAEditar}`)

})

app.post('/remove-team/:team', function (req, res) {
    const teamAEliminar = req.params.team.toLowerCase()
    const equipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
    const nuevosEquipos = equipos.filter(equipo => equipo.tla.toLowerCase() !== teamAEliminar)
    fs.writeFileSync('./data/equipos.json', JSON.stringify(nuevosEquipos))
    res.redirect(`/`)
})

app.listen(PUERTO, () => console.log(`Escuchando en http://localhost:${PUERTO}`)); 
