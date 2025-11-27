// src/Pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/catalogo-admin');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden flex items-center justify-center z-[9999]">
      {/* Botón volver */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al inicio</span>
      </Link>

      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

      {/* Partículas doradas flotantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Círculo que sigue el mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, #D4AF37, transparent)',
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Contenedor principal */}
      <div className="relative w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Logo y título */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-4xl font-serif tracking-wider mb-4"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DIVINAS MONTURAS
            </h1>
            <p className="text-gray-400 tracking-wide">Panel de Administración</p>
          </motion.div>

          {/* Formulario con glass-morphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative p-8 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.1)',
            }}
          >
            {/* Efecto de brillo animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />

            <div className="relative z-10">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Email */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300 tracking-wide">
                    Correo Electrónico
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <FaEnvelope className="w-5 h-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all duration-300"
                      placeholder="admin@divinasmonturas.com"
                    />
                  </div>
                </div>

                {/* Campo Password */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300 tracking-wide">
                    Contraseña
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all duration-300"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 z-10"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Botón de Login */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="group relative w-full py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                    color: '#000',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <FaLock className="w-5 h-5" />
                    {loading ? 'Verificando...' : 'Acceder al Panel'}
                  </span>
                </motion.button>
              </form>

              {/* Mensaje inferior */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Acceso exclusivo para personal autorizado
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decoración inferior */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaLock className="w-4 h-4" />
              <span>Conexión segura y encriptada</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Efecto de vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}