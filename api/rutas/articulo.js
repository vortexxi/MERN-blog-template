const express = require('express');
//importamos el middleware multer para poder subir archivos
const multer = require('multer');
const ArticuloControlador = require('../controladores/articulo');
const router = express.Router();

/////IMAGE FILES

//configurar el almacenamiento de imagenes
//Multer incorpora los mecanismos de almacenamiento DiskStorage y MemoryStorage
const almacenamientoImg = multer.diskStorage({
    //Multer añade un objeto body y un objeto file o files al objeto req.
    destination:  function(req, file, cb){
        cb(null, './imagenes/articulos/')
      },
      filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        //usamos la propiedad originalname del objeto file de multer
        cb(null, uniqueSuffix + '-' +  file.originalname )
      }
});

//utilizamos la opción de multer 'storage' para indicar dónde se guardarán los archivos
const imSubidas = multer({ storage: almacenamientoImg });

/////AUDIO FILES

const almacenamientoAudio = multer.diskStorage({
    destination:  function(req, file, cb){
        cb(null, './audios/articulos/')
      },
      filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' +  file.originalname )
      }
});

const audioSubidas = multer({storage: almacenamientoAudio });


//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get('/usuario', ArticuloControlador.usuario);


//rutas
//usamos post para mandar información en vez de get que recibe
router.post('/crear', ArticuloControlador.crear);
router.get('/articulos', ArticuloControlador.listar);
router.get('/articulo/:id', ArticuloControlador.uno);
router.delete('/articulo/:id', ArticuloControlador.borrar);
router.put('/articulo/:id', ArticuloControlador.editar);
//single(fieldname) Acepta un único archivo con el nombre fieldname. Dicho archivo será guardado en req.file.
router.post('/subir-imagen/:id',imSubidas.single('archivo'), ArticuloControlador.subir);
router.get('/imagen/:fichero', ArticuloControlador.image);

router.post('/subir-audio/:id', audioSubidas.single('archivoAudio'), ArticuloControlador.subirAudio);
router.get('/audio/:audioFile',  ArticuloControlador.audio);

router.get('/buscar/:busqueda', ArticuloControlador.buscador);

module.exports = router;