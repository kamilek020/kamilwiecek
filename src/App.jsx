import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AboutMe from "./components/AboutMe";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AboutMe></AboutMe>
    </div>
  )
}

export default App
