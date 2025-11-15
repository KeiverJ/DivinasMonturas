
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';

import Home from './Pages/Home.jsx';
import Catalogo from './Pages/Catalogo.jsx';
import Reserva from './Pages/Reserva.jsx';
import Nosotros from './Pages/Nosotros.jsx';
import Contacto from './Pages/Contacto.jsx';
import About from './Pages/About.jsx';
import Citas from './Pages/Citas.jsx';
import DivinaVision from './Pages/DivinaVision.jsx';
import Mayoristas from './Pages/Mayoristas.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/about" element={<About />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/divinavision" element={<DivinaVision />} />
          <Route path="/mayoristas" element={<Mayoristas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
