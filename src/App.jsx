import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ColorBar } from './colorbar'
import { ImageWithMask } from './imageWithMask'
import flowerImage from './flower'

function App() {
  const [TargetHue, setTargetHue] = useState(20);
  const [Threshold, setThreshold] = useState(5);

  var width = 735;
  var height = 491;
  var img = new Image();
  img.src = flowerImage();
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var idata;
  let buffer = new Uint8ClampedArray(width * height * 4);

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0);
  // create imageData object
  idata = ctx.getImageData(0, 0, width, height);
  ctx.putImageData(idata, 0, 0);


  const handleTargetHue = (event) => {
    setTargetHue(Math.round(event.target.value / 400  * 360));
  };
  const handleThreshold = (event) => {
    setThreshold(parseInt( event.target.value));
  };

  return (
    <>
      <div>
      <ColorBar/>
      </div>
      <div>
      <ColorBar target_hue={TargetHue} threshold={Threshold}/>
      </div>
      <div>
        <input defaultValue={TargetHue} type="range" min="0" max="399" style={{width: "400px"}} onChange={handleTargetHue} id="myRange"/>
      </div>
      <h4 style={{margin: 0}}>Target hue: {TargetHue}</h4>
      <div>
        <input defaultValue={Threshold} onChange={handleThreshold}  type="range" min="0" max="170" style={{width: "400px"}} id="myRange2"/>
      </div>
      <h4 style={{margin: 0}}>Threshold: {Threshold}</h4>
      <div>
        <ImageWithMask target_hue={TargetHue} threshold={Threshold} width={width} height={height} ctx={ctx} idata={idata} buffer={buffer}/>
      </div>
    </>
  )
}

export default App
