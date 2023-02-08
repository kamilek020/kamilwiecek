import { useState } from 'react'
import './App.css'
import Title from "./components/Title.jsx";
import TimeNow from "./components/TimeNow.jsx";
import Table from "./components/Table.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Title></Title>
      <TimeNow></TimeNow>
      <Table></Table>
    </div>
  )
}

export default App
