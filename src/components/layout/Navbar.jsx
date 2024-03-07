import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'


export const Navbar = () => {

  const [isActive, setActive] = useState(false);

  const ref = useRef();

  //Detecting a Click Outside Navigation Widget
  useEffect(() => {
    const handler = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setActive(false)
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
    };
  }, [isActive]);


  const hacerBusqueda = (e) => {
    e.preventDefault();
    let searchText = e.target.busqueda.value;
    navegar('/buscar/' + searchText, { replace: true });
  }

  const navegar = useNavigate();
  return (
    <>
      <nav className='navbar blur'>
        <div className='myblog'>
            <img className='myblog-img' src='src/assets/images/multiVersions.webp' alt='MultiVersions' />
        </div>
        <div className='ul-div'>
          <div className='li-div'>
            <Link className='nav-link' to='/home'>Home</Link>
          </div>
          <div className='li-div'>
            <Link className='nav-link' to='/articles'>Articles</Link>
          </div>
          <div className='li-div'>
            <Link className='nav-link' to='/create'>Create</Link>
          </div>
          <div className='li-div'>
            <Link className='nav-link' to='/contact'>Contact</Link>
          </div>
        </div>

        <form className='horizontal-form' onSubmit={hacerBusqueda}>
          {/* <label className='image-label' htmlFor='busqueda'>
          </label> */}
          <input className='search-field' type='text' placeholder='Type your search...' name='busqueda' id='busqueda' />
          <input className='search-button' type='submit' value='Search' />
        </form>
      </nav>

      {/* RESPONSIVE NAV */}
      <nav className='navbar-phone'>
        <div className='myblog'>MY BLOG</div>
        <button className='toggle' onClick={() => setActive(!isActive)}>
          {isActive ? (
            <MdClose style={{ width: '32px', height: '32px' }} />
          ) : (
            <FiMenu
              style={{
                width: '32px',
                height: '32px',
              }}
            />
          )}
        </button>
        <div className={`blur menu-nav${isActive ? ' show-menu' : ''}`}>
          <div className='ul-phone'>
            <div className='li-phone'>
              <Link className={isActive ? 'nav-link' : 'active'} to='/home'>Home</Link>
            </div>
            <div className='li-phone'>
              <Link className={isActive ? 'nav-link' : 'active'} to='/articles'>Articles</Link>
            </div>
            <div className='li-phone'>
              <Link className={isActive ? 'nav-link' : 'active'} to='/create'>Create</Link>
            </div>
            <div className='li-phone'>
              <Link className={isActive ? 'nav-link' : 'active'} to='/contact'>Contact</Link>
            </div>
          </div>
          <hr className='solid' />
          <form className='horizontal-form' onSubmit={hacerBusqueda}>
            {/* <label className='image-label' htmlFor='busqueda'>
            </label> */}
            <input className='search-field' type='text' placeholder='Type your search...' name='busqueda' id='busqueda' />
            <input className='search-button' type='submit' value='Search' />
          </form>
        </div>
      </nav>
    </>
  )
}
