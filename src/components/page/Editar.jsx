import React, { useState, useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  const { formulario, enviar, cambiado } = useForm({});
  const [resultado, setResultado] = useState('');
  const [articulo, setArticulo] = useState({});


  const param = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);


  const conseguirArticulo = async () => {

    const { data } = await Peticion(Global.url + 'articulo/' + param.id, 'GET');

    if (data.status === 'success') {
      setArticulo(data.articulo);
    }

  }

  const editArticle = async (e) => {
    e.preventDefault();
    //recoger datos del formulario
    let nuevoArticulo = formulario;

    //mandar datos al back end
    const { data } = await Peticion(Global.url + 'articulo/' + param.id, 'PUT', nuevoArticulo);

    if (data.status === 'success') {
      setResultado('guardado');
      console.log('1 artículo actualizado y guardado');
    } else {
      setResultado('error');
    }

    //obtengo todo el <input> y sus propiedades con querySelector
    let fileInput = document.querySelector('#file');

    if (data.status === 'success' && fileInput.files[0]) {
      setResultado('guardado');
      console.log('guardado 2');

      //creamos un constructor FormData() vacío para utilizar sus propiedades (append, keys, entries, delete, etc.)
      let formData = new FormData();
      //The append() method of the FormData interface appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
      //append(name, value, filename), donde fileInput.files nos devuelve la FileList[File], entonces tomamos su primer y -en este caso- único elemento.
      formData.append('archivo', fileInput.files[0]);
      //añadir la imagen
      let subida = await Peticion(Global.url + 'subir-imagen/' + data.articulo._id, 'POST', formData, true);

      if (subida.data.status === 'success') {
        setResultado('guardado');
        //console.log('guardado 2');
      } else {
        setResultado('error');
        //console.log('error al subir imágen!!!');
      }

    }

  }
  return (
    <div className='articulos'>
      
      <form className='formulario-crear' onSubmit={editArticle}>
        <label htmlFor='titulo'>Title</label>
        <input className='title-input' type='text' name='titulo' defaultValue={articulo.titulo} onChange={cambiado} />

        <label htmlFor='contenido'>Content</label>
        <textarea className='text-area' name='contenido' onChange={cambiado} defaultValue={articulo.contenido}></textarea>

        <label htmlFor='archivo'>Image</label>
        <div>
          {articulo.imagen && articulo.imagen != 'imagen.jpg' && (<img className='articulos-img' src={Global.url + 'imagen/' + articulo.imagen} />)}
          {/* {articulo.imagen == 'imagen.jpg' && (<img className='articulos-img' src='https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg' />)} */}

        </div>
        <input type='file' id='file' name='archivo' placeholder='File' accept=".png, .jpg, .jpeg" />

        <input className='create-button' type='submit' value='Send' />

        <strong>{resultado == 'guardado' ? (<p className='updated'>Article updated!</p>) : ''} </strong>
      <strong>{resultado == 'error' ? (<p className='not-updated'>Article not sent!</p>) : ''}</strong>
      </form>
    </div>
  )
}

