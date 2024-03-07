import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { TextPlugin, EasePack } from 'gsap/all'

export const Inicio = () => {

  const container = useRef();
  const titleRef = useRef();
  const blogRef = useRef();

  gsap.registerPlugin( TextPlugin );
  gsap.registerPlugin( EasePack );

  useGSAP(() => {

    const tl1 = gsap.timeline();

    gsap.set(blogRef.current, {autoAlpha:0, z:0.01, scale:0});

    tl1.to('.hero-title', {
      duration: 1.8,
      text : {
        value: 'Welcome to the'
      }
    })
    .to(blogRef.current, {
      duration: 0.5,
      scale:1,  
      autoAlpha: 1,
      ease:"slow(0.25, 0.9)",
    }, 2)
    .to('.jumbo-bullet span', {
      duration: 3,
      text: {
        value: 'full stack'
      }
    }, 3.5);
  }, { scope: container })

  return (
      <div className='inicio-container'>
        <video className='video-desktop' loop autoPlay muted id="video-desktop">
          <source src="src/assets/video/blog.webm" type='video/webm'/>
        </video>
        <video className='video-phone' loop autoPlay muted id="video-phone">
          <source src="src/assets/video/blog-phone.webm" type='video/webm'/>
        </video>
        <div ref={container} className='hero blur'>
          <h1 ref={ titleRef } className='hero-title'></h1>
          <h3 ref={ blogRef } className='jumbo'>BLOG!</h3>
          <h4 className='jumbo-bullet'>MERN <span>(MongoDB, Express, ReactJS, NodeJS)</span> template</h4>
          <div className="hero-div">
            <a href='/articles' className='hero-button'>Go to articles</a>
             {/* <button className='hero-button'>Go to articles</button> */}
          </div>
        </div> 
      </div>
   
  )
}
