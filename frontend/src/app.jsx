import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cours from './pages/Cours.jsx'
import CoursInscription from './pages/CoursInscription.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/cours-create" element={<Cours />} />
        <Route path="/inscription" element={<CoursInscription />} />
        
      </Routes>
    </BrowserRouter>
  )
}
export default App
