import { Routes, Route } from 'react-router-dom';
import NavbarPublico from './Components/Navbar.jsx';
import NavbarAdmin from './Components/NavbarAdmin.jsx';
import Footer from './Components/Footer.jsx';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

import Home from './Pages/Home.jsx';
import Catalogo from './Pages/Catalogo.jsx';
import Reserva from './Pages/Reserva.jsx';
import About from './Pages/About.jsx';
import Citas from './Pages/Citas.jsx';
import CitasAdmin from './Pages/CitasAdmin.jsx';
import DivinaVision from './Pages/DivinaVision.jsx';
import Mayoristas from './Pages/Mayoristas.jsx';
import Login from './Pages/Login.jsx';
import CatalogoPublico from './Pages/CatalogoPublico.jsx';
import CatalogoDivinaVision from './Pages/CatalogoDivinaVision.jsx';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated ? <NavbarAdmin /> : <NavbarPublico />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoPublico />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/about" element={<About />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/divinavision" element={<DivinaVision />} />
          <Route path="/catalogo-divinavision" element={<CatalogoDivinaVision />} />
          <Route path="/mayoristas" element={<Mayoristas />} />

          {/*Páginas para personal de empresa nada más*/}
          <Route path='/login' element={<Login />} />
          <Route path="/catalogo-admin" element={
            <ProtectedRoute>
              <Catalogo />
            </ProtectedRoute>
          } />
          <Route path="/citas-admin" element={
            <ProtectedRoute>
              <CitasAdmin />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App