import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Inicio } from '../components/page/Inicio'
import { Articulo } from '../components/page/Articulo'
import { Articulos } from '../components/page/Articulos'
import { Navbar } from '../components/layout/Navbar'
import { Crear } from '../components/page/Crear'
import { Contacto } from '../components/page/Contacto'
import { Busqueda } from '../components/page/Busqueda'
import { Editar } from '../components/page/Editar'
import { Articles } from '../components/page/Articles'

export const Rutas = () => {
  return (

    <BrowserRouter>
      {/* LAYOUT */}
      <Navbar />
      <section className='content'>
        <div className='articulo'>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/home' element={<Inicio />} />
            <Route path='/article/:id' element={<Articulo />} />
            <Route path='/articles' element={<Articulos />} />
            <Route path='/create' element={<Crear />} />
            <Route path='/contact' element={<Contacto />} />
            <Route path='/buscar/:buscar' element={<Busqueda />} />
            <Route path='/list' element={ <Articles />} />
            <Route path='/edit/:id' element={<Editar />} />
            <Route path='*' element={
              <div>
                <h1>ERROR 404!</h1>
              </div>
            } />
          </Routes>
        </div>
      </section>
    </BrowserRouter>

  )
}
