import React, { useEffect, useState } from 'react'

export const Footer = () => {
  const [fecha, setFecha] = useState('');
  const date = () => {
    let nowDate = new Date();
    let nowString = nowDate.toDateString();
    setFecha(nowString);
  };
  useEffect(() => {
    console.log('Actualizado');
    date();
  }, [fecha])
  return (
    <footer className='footer-content blur'>
      <div className='footer-div'>
        <p>Development by <a className='footer-link' href='https://www.multiversions.com' target='_blank'>MultiVersions</a> - {fecha}</p>
      </div>
    </footer>
  )
}
