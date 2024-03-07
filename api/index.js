const {conexion} = require('./basesdatos/conexion');
const express = require('express');
const cors = require('cors');

//inicializar app
console.log('conexión exitosa!');

//conectando a la base de datos
conexion();

//crear servidor node
//Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//convertir body en un objeto java script

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//cargar las rutas del router a partir de una url que quiera, por ejemplo '/api'

const rutas_articulo = require('./rutas/articulo');
const rutas_contact = require('./rutas/contacto-route');

app.use('/api', rutas_articulo);
app.use('/api', rutas_contact);



//crear rutas de endpoints (get, put, etc.)
app.get('/', (req, res) => {
    return res.status(200).send(
        `<p>Hello HOME</p>`
    );
});



//crear servidor y escuchar peticiones HTTP
app.listen(puerto, () => {console.log('Servidor conectado al puerto: '+puerto)});