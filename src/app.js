require('dotenv').config()
const express = require('express')
const exphbr = require('express-handlebars')
const bodyParser = require('body-parser')

const configureDependencyInjection = require('./config/di')
const { init: initClubModule } = require('./module/club/module')

const app = express()
const PUERTO = 8080;

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

const container = configureDependencyInjection(app);
app.use(container.get('Session'));

initClubModule(app, container)

app.listen(PUERTO, () => console.log(`Escuchando en http://localhost:${PUERTO}`)); 
