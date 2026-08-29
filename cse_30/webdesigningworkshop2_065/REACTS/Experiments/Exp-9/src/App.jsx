import { useState } from 'react'
import './App.css'
import Registrationform from './component/Registrationform'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Registrationform/>
    </>
  )
}

export default App