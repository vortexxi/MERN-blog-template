import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listar } from './Listar';
import { useParams } from 'react-router-dom';

export const Busqueda = () => {

  const [blogPost, setBlogPost] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    console.log('paramsBuscar: ', params.buscar);
    conseguirArticulos();
  }, []);

  useEffect(() => {
    conseguirArticulos();
  }, [params]);

  const conseguirArticulos = async () => {

    const { data, cargando } = await Peticion(Global.url + 'buscar/' + params.buscar, 'GET');

    console.log('data: ', data);

    if (data.status === 'success') {
      setBlogPost(data.articulos);
    }else{
      setBlogPost([]);
    }
    setCargando(false);
  }

  return (
    <>
    {
      cargando ? 'Loading blogs...': 
        blogPost.length >= 1 ? 
          <Listar blogPost={blogPost} setBlogPost={setBlogPost} />
        :  <h1>No articles.</h1>
          
      
    }
</>
  )
}

