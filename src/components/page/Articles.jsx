import React, { useEffect, useState } from 'react'
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

//Providing Grid Width
const ResponsiveGridLayout = WidthProvider(Responsive);

export const Articles = () => {

    // const [mounted, setMounted] = useState(false);

    // const [layout, setLayout] = useState([
    //     { i: "1", x: 0, y: 0, w: 1, h: 1 },
    //     { i: "2", x: 1, y: 0, w: 1, h: 1 },
    //     { i: "3", x: 2, y: 0, w: 1, h: 1 },
    //     { i: "4", x: 3, y: 0, w: 1, h: 1 },
    //     { i: "5", x: 4, y: 0, w: 1, h: 1 },
    //     { i: "6", x: 2, y: 0, w: 1, h: 1 },
    // ]);



    let cardHeight = 3 + Math.random();

    const layout = [
        { i: "0", x: 3, y: 0, w: 1, h: 6, static: true },
        { i: "1", x: 0, y: 0, w: 1, h: 3 + Math.random() },
        { i: "2", x: 1, y: 0, w: 1, h: 3 + Math.random() },
        { i: "3", x: 2, y: 0, w: 1, h: 3 + Math.random() },
        { i: "4", x: 0, y: 1, w: 1, h: 3 + Math.random() },
        { i: "5", x: 1, y: 1, w: 1, h: 3 + Math.random() },
        { i: "6", x: 2, y: 1, w: 1, h: 3 + Math.random() },
        { i: "7", x: 0, y: 2, w: 1, h: 3 + Math.random() },
        { i: "8", x: 1, y: 2, w: 1, h: 3 + Math.random() },
        { i: "9", x: 2, y: 2, w: 1, h: 3 + Math.random() },
      ];

    let arrayX = [ 0, 1, 2];
    let arrayY = [ 0, 0, 0];

    layout.map(lay => {
      console.log('map: ', lay.i);
    })

    

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    // useEffect(() => {
    //     setMounted(true);
    // })

    return (
        <div className='articles'>
            <ResponsiveGridLayout     
                layouts={{lg:layout}}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 3, sm: 1, xs: 1, xxs: 1 }}
                // compactType='vertical'
                autoSize
                className="layout"
                isBounded
                containerPadding={[20,20]}
                
                //onResize={()=>{}}
                //cols={{ lg:3,  }}
                
            >
                <div className='item' key="0">0</div>
                <div className='item' key="1">1</div>
                <div className='item' key="2">2</div>
                <div className='item' key="3">3</div>
                <div className='item' key="4">4</div>
                <div className='item' key="5">5</div>
                <div className='item' key="6">6</div>
                <div className='item' key="7">7</div>
                <div className='item' key="8">8</div>
                <div className='item' key="9">9</div>
             
            </ResponsiveGridLayout>
        </div>


    )
}
