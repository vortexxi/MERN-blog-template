const express = require('express');
//importamos el middleware multer para poder subir archivos
const multer = require('multer');
const ContactControlador = require('../controladores/contacto');
const router = express.Router();

router.post('/contact', ContactControlador.contactForm);

module.exports = router;