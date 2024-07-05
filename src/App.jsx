import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ColorBar } from './colorbar'
import { ImageWithMask } from './imageWithMask'

function App() {
  const [TargetHue, setTargetHue] = useState(20);
  const [Threshold, setThreshold] = useState(5);
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
        <ImageWithMask target_hue={TargetHue} threshold={Threshold}/>
      </div>
    </>
  )
}

export default App
