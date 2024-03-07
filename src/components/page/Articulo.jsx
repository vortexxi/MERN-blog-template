import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { useParams, Link } from 'react-router-dom';


export const Articulo = () => {

  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const param = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {

    const { data, cargando } = await Peticion(Global.url + 'articulo/' + param.id, 'GET');

    if (data.status === 'success') {
      setArticulo(data.articulo);
    }
    setCargando(false);
  }

  return (
    <>
      {
        cargando ? 'Loading blogs...' : (
          <>
            <div className='articulos'>

              <div className='article-container'>

                <div className='art-container'>
                  {articulo.imagen && articulo.imagen != 'imagen.jpg' && (<img className='art-img' src={Global.url + 'imagen/' + articulo.imagen} />)}
                  {articulo.imagen == 'imagen.jpg' && (<img className='art-img' src='https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg' />)}
                </div>

                <div className='art-container'>
                  <p className='art-title'>{articulo.titulo}</p>
                  <p className='art-fecha'>{articulo.fecha}</p>
                  <p className='art-parrafo'>{articulo.contenido}</p>
                  <div className='audio-player'>
                    <audio src={articulo.audio} controls />
                  </div>
                  <div className='button-container'>
                     <Link className='edit-button' to={'/edit/' + articulo._id}>Edit</Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

