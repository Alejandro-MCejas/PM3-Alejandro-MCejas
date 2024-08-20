import Home from './views/Home/Home'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import NuevosTurnos from './views/NuevosTurnos/NuevosTurnos'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="/nuevos-turnos" element={<NuevosTurnos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
    
  )
}

export default App
