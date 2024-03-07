import React, { useState } from 'react'
import {useForm} from '../../hooks/useForm'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const {formulario, enviar, cambiado } = useForm();
  const [resultado, setResultado] = useState('');

  const guardarFormulario = async (e) => {
    e.preventDefault();
    //recoger datos del formulario
    let nuevoArticulo = formulario;
   
    //mandar datos al back end
    const {data, cargando} = await Peticion(Global.url + 'crear', 'POST', nuevoArticulo); 

   
    //obtengo todo el <input> y sus propiedades con querySelector
    let fileInput = document.querySelector('#file');
    let audioInput = document.querySelector('#audio');
    if(data.status === 'success' && fileInput.files[0]){
      setResultado('guardado');
    
    //creamos un constructor FormData() vacío para utilizar sus propiedades (append, keys, entries, delete, etc.)
    let formData = new FormData();
    //The append() method of the FormData interface appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
    //append(name, value, filename), donde fileInput.files nos devuelve la FileList[File], entonces tomamos su primer y -en este caso- único elemento.
    formData.append('archivo', fileInput.files[0])
    //añadir la imagen
    let subida = await Peticion(Global.url + 'subir-imagen/' + data.articulo._id, 'POST', formData, true);

      if(subida.data.status === 'success'){
        setResultado('guardado');
      }else{
      setResultado('error');
    }
    }
  }
  //numero titulo autor contenido fecha imagen audio keywords otro
  return (
    <div className='articulos'>
      
      <form className='formulario-crear' onSubmit={ guardarFormulario }>
        <label htmlFor='titulo'>Title</label>
        <input className='title-input' type='text' name='titulo' placeholder='Type the title' onChange={cambiado} />

        <label htmlFor='autor'>Author</label>
        <input className='author-input' type='text' name='autor' placeholder='Author' onChange={cambiado} />

        <label htmlFor='contenido'>Content</label>
        <textarea className='text-area' name='contenido' onChange={cambiado}></textarea>

        <label htmlFor='archivo'>Image</label>
        <input type='file' id='file' name='archivo' placeholder='File' accept=".png, .jpg, .jpeg"/>

        <label htmlFor='audio'>Audio</label>
        <input type='file' id='audio' name='audio' placeholder='.mp3 or .wav audio file' accept='.mp3, .wav'/>

        <label htmlFor='keywords'>Keywords</label>
        <input className='keywords-input' type='text' name='keywords' placeholder='Keywords separated by comma' onChange={cambiado} />

        <label htmlFor='other'>Other</label>
        <input className='other-input' type='text' name='other' placeholder='Something else?' onChange={cambiado} />

        <input className='create-button' type='submit' value='Send' />

        <strong>{resultado == 'guardado' ? (<p className='updated'>Article created!</p>) : ''} </strong>
      <strong>{resultado == 'error' ? (<p className='not-updated'>Article not created!</p>) : ''}</strong>
      
      </form>
    </div>
  )
}
