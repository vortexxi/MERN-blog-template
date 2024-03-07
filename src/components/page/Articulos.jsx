import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { Listar } from './Listar'


export const Articulos = () => {

  const [blogPost, setBlogPost] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {

    const { data, cargando } = await Peticion(Global.url + 'articulos', 'GET');

    if (data.status === 'success') {
      setBlogPost(data.articulos);
    }
    setCargando(false);
  }

  return (
    <div className="inicio-container">
      {
        cargando ? <div className='loading'>Loading... is the database connected?</div> : (

          <Listar blogPost={blogPost} setBlogPost={setBlogPost} />
        )
      }
    </div>
  )
}
