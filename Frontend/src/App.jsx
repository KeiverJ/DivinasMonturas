import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import { AuthProvider } from './context/AuthContext';

import Home from './Pages/Home.jsx';
import Catalogo from './Pages/Catalogo.jsx';
import Reserva from './Pages/Reserva.jsx';
//import Nosotros from './Pages/Nosotros.jsx';
import Contacto from './Pages/Contacto.jsx';
import About from './Pages/About.jsx';
import Citas from './Pages/Citas.jsx';
import DivinaVision from './Pages/DivinaVision.jsx';
import Mayoristas from './Pages/Mayoristas.jsx';
import Login from './Pages/Login.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/reserva" element={<Reserva />} />
            {/*<Route path="/nosotros" element={<Nosotros />} />*/}
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/about" element={<About />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/divinavision" element={<DivinaVision />} />
            <Route path="/mayoristas" element={<Mayoristas />} />

            {/*Páginas para personal de empresa nada más*/}
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
