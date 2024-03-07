const mongoose = require('mongoose');
const conexion = async() => {
    try{
        //await mongoose.connect('mongodb://localhost:27017/mi_blog');
        await mongoose.connect('mongodb://0.0.0.0:27017/blogMultiversions');

        //en caso de aviso, parámetros dentro del objeto:

        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true
        console.log('Conoectado a la base de datos blogMultiversions');
    }
    catch(error){
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    conexion
}