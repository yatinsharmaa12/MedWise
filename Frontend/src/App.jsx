import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Consult from './pages/Consult'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Report from './pages/Report'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consult" element={<Consult />} />
      <Route path="/report" element={<Report />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
