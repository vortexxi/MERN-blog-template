//cargamos el ezquema
const Articulo = require('../modelos/Articulos');
const { validarArticulo } = require('../helpers/validar');
//importamos file system
var fs = require('fs');
//importamos el módulo path
const path = require('path');

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: 'Mensaje de prueba del controlador'
    });
}

const usuario = (req, res) => {
    //con el método json enviamos objetos en formato json
    return res.status(200).json(
        [
            {
                nombre: 'Usuario 1',
                email: 'some@gmail.com'
            },
            {
                nombre: 'Usuario 2',
                email: 'some@gmail.com'
            },
        ]
    );
};

const crear = async (req, res) => {

    //recoger la información que llega por post

    //Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded()
    let parametros = req.body;

    try {
        //llamamos el helper para validar la información.
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error al validar'
        })
    }


    //crear el objeto a guardar
    const articulo = new Articulo(parametros);

    //Asignar valores al objeto creado
    //forma manual: 'articulo.titulo: parametros.titulo' etc
    //forma automatica

    //guardar artículo en la base de datos con el método de mongoose 'save()'
    const articuloGuardado = articulo.save();
    articuloGuardado.then(articulo => {
        return res.status(200).json({
            status: 'success',
            articulo: articulo,
            mensaje: 'Artículo creado con éxito y guardado en la base de datos!'
        })
    });

};


const listar = (req, res) => {

    let consulta = Articulo.find({});
    //mostrar sólo 3 artículos y con fecha de más reciente a más viejo
    //consulta.limit(3).sort({ fecha: -1 }).then((articulos) => {
        consulta.then((articulos) => {
        //Ha entrado a consulta de artículos exitosa
        return res.status(200).send({
            status: "success",
            articulos
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado artículos",
            error
        });
    });
};


const uno = (req, res) => {
    let id = req.params.id;
    Articulo.findById(id)
        .then((articulo) => {
            return res.status(200).json({
                status: 'success',
                articulo
            })
        })
        .catch(error => {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'No se encontró el artículo ' + error
            })
        })
};

const borrar = (req, res) => {
    let articulo_id = req.params.id;
    Articulo.findOneAndDelete({ _id: articulo_id })
        .then((articuloBorrado) => {
            return res.status(200).json({
                status: 'success',
                articulo: articuloBorrado,
                mensaje: 'Artículo eliminado'
            })
        })
        .catch(error => {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Error al borrar artículo'
            })
        })
};

const editar = async (req, res) => {

    //recoger el id del artículo a editar
    let articuloId = req.params.id;
    console.log('articleID: ', articuloId);

    //recoger datos del body
    let parametros = req.body;
    console.log('parámetros: ', parametros);

    try {
        //validar datos
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error al validar la actualización'
        });
    };

    //buscar y actualizar artículo
    Articulo.findOneAndUpdate({ _id: articuloId }, parametros, { new: true })
        .then((actualizado) => {
            return res.status(200).json({
                status: 'success',
                mensaje: 'Artículo actualizado correctamente',
                articulo: actualizado
            })
        })
        .catch((error) => {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Error al actualizar artículo',
                error
            })
        })

};

const subir = (req, res) => {
    //mostramos en consola el archivo subido
    console.log('file: ', req.file);
    //comprobar que se está subiendo un archivo
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: 'Error',
            mensaje: 'Petición inválida'
        })
    }

    //tomamos el nombre del archivo
    let nombre_archivo = req.file.originalname;
    //separamos el string en un array a partir del punto, así en el index cero tenemos el nombre y en el index 1 la extensión
    //split(separator, limit)
    let archivo_split = nombre_archivo.split('\.');
    let extension = archivo_split[1];

    //verificamos que la extensión del archivo sea válida

    if (extension != 'jpg' && extension != 'png' && extension != 'jpeg' && extension != 'gif') {
        //borrar archivo y dar respuesta
        //The fs.unlink() method is used to remove a file or symbolic link from the filesystem. 
        //fs.unlink( path, callback ). Hint: https://www.geeksforgeeks.org/node-js-fs-unlink-method/
        fs.unlink((req.file.path), (error) => {
            res.status(400).json({
                status: 'Error',
                mensaje: 'Archivo no válido'
            })
        })

    } else {

        //actualizar artículo
        //recoger el id del artículo a editar
        let articuloId = req.params.id;

        //buscar y actualizar artículo
        Articulo.findOneAndUpdate({ _id: articuloId }, { imagen: req.file.filename }, { new: true })
            .then((actualizado) => {
                return res.status(200).json({
                    status: 'success',
                    mensaje: 'Imagen actualizada correctamente',
                    articulo: actualizado,
                    fichero: req.file
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    status: 'Error',
                    mensaje: 'Error al actualizar la imagen del artículo',
                    error
                })
            })

    }
};

const image = (req, res) => {
    //llamamos la variable 'fichero' para que coincida con la ruta dinámica en el router
    let fichero = req.params.fichero;
    let ruta = "./imagenes/articulos/" + fichero;
    //The fs.stat() method is used to return information about the given file or directory. It returns an fs.Stat object
    //fs.stat( path, options, callback ) hint: https://www.geeksforgeeks.org/node-js-fs-stat-method/
    fs.stat(ruta, (error, existe) => {
        if (existe) {
            //res.sendFile(path [, options] [, function])
            //The path.resolve() method is used to resolve a sequence of path-segments to an absolute path. 
            //path.resolve( [...paths] )
            return res.sendFile(path.resolve(ruta));
        } else {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Error al mostrar imagen!',
                existe,
                fichero,
                ruta
            })
        }
    })
};

const audio = (req, res) => {
    //llamamos la variable 'fichero' para que coincida con la ruta dinámica en el router
    let audioFile = req.params.audioFile;
    let ruta = "./audios/articulos/" + audioFile;
    //The fs.stat() method is used to return information about the given file or directory. It returns an fs.Stat object
    //fs.stat( path, options, callback ) hint: https://www.geeksforgeeks.org/node-js-fs-stat-method/
    fs.stat(ruta, (error, existe) => {
        if (existe) {
            //res.sendFile(path [, options] [, function])
            //The path.resolve() method is used to resolve a sequence of path-segments to an absolute path. 
            //path.resolve( [...paths] )
            return res.sendFile(path.resolve(ruta));
        } else {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Error al mostrar el audio!',
                existe,
                audioFile,
                ruta
            })
        }
    })
};

const subirAudio = (req, res) => {
      //mostramos en consola el archivo subido
      console.log('file: ', req.file);
      console.log('files: ', req.files);
      //comprobar que se está subiendo un archivo
      if (!req.file && !req.files) {
          return res.status(404).json({
              status: 'Error',
              mensaje: 'Petición inválida'
          })
      }
  
      //tomamos el nombre del archivo. usamos el objeto file de multer y su propiedad originalname
      let nombre_archivo_audio = req.file.originalname;
      //separamos el string en un array a partir del punto, así en el index cero tenemos el nombre y en el index 1 la extensión
      //split(separator, limit)
      let archivo_split = nombre_archivo_audio.split('\.');
      let extension = archivo_split[1];
  
      //verificamos que la extensión del archivo sea válida
  
      if (extension != 'mp3' && extension != 'wav' && extension != 'ogg' && extension != 'm4a') {
          //borrar archivo y dar respuesta
          //The fs.unlink() method is used to remove a file or symbolic link from the filesystem. 
          //fs.unlink( path, callback ). Hint: https://www.geeksforgeeks.org/node-js-fs-unlink-method/
          fs.unlink((req.file.path), (error) => {
              res.status(400).json({
                  status: 'Error',
                  mensaje: 'Archivo no válido'
              })
          })
  
      } else {
  
          //actualizar artículo
          //recoger el id del artículo a editar
          let articuloId = req.params.id;
  
          //buscar y actualizar artículo
          Articulo.findOneAndUpdate({ _id: articuloId }, { audio: req.file.filename }, { new: true })
              .then((actualizado) => {
                  return res.status(200).json({
                      status: 'success',
                      mensaje: 'Audio actualizado correctamente',
                      articulo: actualizado,
                      fichero: req.file
                  })
              })
              .catch((error) => {
                  return res.status(400).json({
                      status: 'Error',
                      mensaje: 'Error al actualizar la audio del artículo',
                      error
                  })
              })
  
      }
    console.log('audio subido');
};


const buscador = (req, res) => {
    //obtener el string de la búsqueda
    let busqueda = req.params.busqueda;

    //usamos la función OR '$or'
    Articulo.find({
        '$or': [
            {//si el título incluye la búsqueda...
                'titulo': {
                    '$regex': busqueda,
                    "$options": "i"
                }
            },
            {//si el contenido incluye la búsqueda...
                'contenido': {
                    '$regex': busqueda,
                    "$options": "i"
                }
            },
             {//si la imagen incluye la búsqueda...
                'imagen': {
                    '$regex': busqueda,
                    "$options": "i"
                }
            }
        ]
    })//ordenamos de más nuevo a más viejo
    .sort({fecha: -1})
    //.exec()//ejecutar consulta
    .then((articulosEncontrados) => {

        if(!articulosEncontrados || articulosEncontrados.length <= 0){
            return res.status(404).json({
                status: 'Error',
                mensaje: 'No se encontraron coincidencias',
            })
        }else{
            return res.status(200).json({
                status: 'success',
                articulos: articulosEncontrados
            })
        }

        
    })
    .catch((error) => {
        //devolver resultado si se cumplen las condiciones 
        return res.status(404).json({
            status: 'Error',
            mensaje: 'Problemas en la búsqueda',
            error
        })        

    })
}

module.exports = {
    prueba,
    usuario,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    image,
    audio,
    subirAudio,
    buscador
}