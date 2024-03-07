import React, { useState } from 'react'
//importar el hook useNavigate para redireccionar
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {

  const [buscar, setBuscar] = useState('');
  const navegar = useNavigate();

  const hacerBusqueda = (e) => {
      e.preventDefault();
      let searchText = e.target.busqueda.value;
      //navigate function has two signatures: pass a To value or Pass the delta you want to go in the history stack. For example, navigate(-1) is equivalent to hitting the back button.
      //g replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one
      navegar('/buscar/'+searchText, { replace: true });
  }
  return (
    <div>
      <form className='formulario' onSubmit={hacerBusqueda}>
        {/* htmlFor: A string. For <label> and <output>, lets you associate the label with some control. Same as for HTML attribute. */}
        <label htmlFor='busqueda'>Search</label>
        <input type='text' placeholder='Type your search...' name='busqueda' />
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}
