const {Schema, model} = require('mongoose');

const ContactSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
});

module.exports = model('Contact', ContactSchema, "contact");