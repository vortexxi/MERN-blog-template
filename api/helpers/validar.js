//cargamos validator para validar los datos
//documentación: https://www.npmjs.com/package/validator
const validator = require('validator');

const validarArticulo = (parametros) => {
    //validar datos
        //parametros que quiero validar, i.e. parametros.titulo
        //isLength(str [, options]) ----  options is an object which defaults to { min: 0, max: undefined }. Note: this function takes into account surrogate pairs.
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 5, max: undefined });
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error('No se ha podido validar la información');
        };
};

module.exports = {
    validarArticulo
}