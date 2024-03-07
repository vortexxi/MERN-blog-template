const {Schema, model, now} = require('mongoose');

const ArticuloSchema = Schema({
    numero: {
        type: String,
        require: true
    },
    titulo: {
        type: String,
        require:true
    },
    autor:{
        type: String,
        require: true
    },
    contenido: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: 'imagen.jpg'
    },
    audio: {
        type: String,
        default: 'audio.mp3'
    },
    keywords: {
        type: String,
        default: ''
    },
    otro: {
        type: String,
        default: ''
    }
});

module.exports = model("Articulo", ArticuloSchema, "articles");
