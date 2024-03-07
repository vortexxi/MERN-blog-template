

export const Peticion = async(url, metodo, datosGuardar = '', archivos = false) => {
    
    let cargando = true;

    let opciones = {
        method: 'GET'
    };

    if(metodo == 'GET' || metodo == 'DELETE'){
        opciones = {
            method: metodo
        };
    }

    if(metodo == 'PUT' || metodo == 'POST'){

        let body = '';

        //si estamos subiendo una imagen, archivos será true y body será el archivo
        if(archivos){
            opciones = {
                method: metodo,
                body: datosGuardar,
                
            };
        //si no enviamos imagenes, el body toma forma de objeto json
        }else{
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

        
    }
    let peticion = await fetch(url, opciones);
    console.log('peticion: ', peticion);
    console.log('opciones: ', opciones);
    const data = await peticion.json();
    console.log('data: ', data);

    cargando = false;

    return{
        data,
        cargando
    }

}
