import React from 'react'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { Link } from 'react-router-dom'
import { Expand } from '../layout/Expand'

export const Listar = ({ blogPost, setBlogPost }) => {

  const eliminar = async (id) => {


    let { data } = await Peticion(Global.url + 'articulo/' + id, 'DELETE');

    if (data.status === 'success') {
      let articulosActualizados = blogPost.filter(articulo => articulo._id !== id);
      setBlogPost(articulosActualizados);
    }

  }
  return (
    <div className='articulos'>
      {

        blogPost.length >= 1 ? (
          blogPost.map(articulo => {
            return (
              <div key={articulo._id} className='tarjeta'>
                <div>
                  {articulo.imagen && articulo.imagen != 'imagen.jpg' && (<img className='articulos-img' src={Global.url + 'imagen/' + articulo.imagen} />)}
                  {/* {articulo.imagen == 'imagen.jpg' && (<img className='articulos-img' src='https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg' />)} */}

                </div>
                <div className='articulos-info'>
                  <Link className='title-link' to={'/article/' + articulo._id}><p>{articulo.titulo}</p></Link>

                  <p className='date'>{articulo.fecha}</p>

                  <span className='article-content'>
                    <Expand descriptionLength={300}>
                      {articulo.contenido}
                    </Expand>
                  </span>

                  {/* <div className='button-container'>
                    <button className='delete-button' onClick={() => { eliminar(articulo._id) }}>Delete</button>
                  </div> */}
                </div>
              </div>
            )
          })
        ) : (
          <h4>No hay articulos</h4>
        )
      }
    </div>
  )
}
