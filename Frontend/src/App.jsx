import { Routes, Route } from 'react-router-dom'
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

import Home from '../Pages/Home.jsx'
import Catalogo from '../Pages/Catalogo'
import Reserva from '../Pages/Reserva'
import Nosotros from '../Pages/Nosotros'
import Contacto from '../Pages/Contacto'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
