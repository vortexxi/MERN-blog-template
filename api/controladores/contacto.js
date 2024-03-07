const Contact = require('../modelos/Contacto');
const { validarArticulo } = require('../helpers/validar');
//importamos el módulo path
const path = require('path');

const contactForm = (req, res) => {

    const parametros = req.body;
    console.log('parametros: ', parametros);
   
    //Crear el objeto a guardar en la colección de la base de datos
    //const { name, email, message } = req.body;
    const contactForm = new Contact(parametros);

    const contactoGuardado = contactForm.save();
    contactoGuardado.then(contactForm => {
        return res.status(200).json({
            status: 'success',
            contacto: contactForm,
            mensaje: 'Contacto creado con éxito y guardado en la base de datos!'
        })
    })


};

module.exports = {
    contactForm
}