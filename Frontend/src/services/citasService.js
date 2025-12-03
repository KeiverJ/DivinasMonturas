// src/services/citasService.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/citas`;

export const citasService = {
  // Obtener horarios ocupados para una fecha
  async getHorariosOcupados(fecha) {
    try {
      const response = await fetch(`${API_URL}/ocupados?date=${fecha}`);

      if (!response.ok) {
        throw new Error("Error al obtener horarios");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Agendar una cita - CAMBIO: Enviar JSON en lugar de FormData
  async agendarCita(citaData) {
    try {
      // Preparar datos en JSON
      const datosAEnviar = {
        nombre: citaData.nombre,
        email: citaData.email,
        telefono: citaData.telefono,
        fecha: citaData.fecha,
        hora: citaData.hora,
        primeraVisita: citaData.primeraVisita,
        sintomas: citaData.sintomas,
      };

      console.log("📤 Enviando datos:", datosAEnviar);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosAEnviar),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al agendar cita");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtener todas las citas (para admin)
  async getCitas(filtros = {}) {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams(filtros);

      const response = await fetch(`${API_URL}?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener citas");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtener una cita por ID
  async getCitaById(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Cita no encontrada");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Actualizar cita
  async actualizarCita(id, datos) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar cita");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Cancelar cita
  async cancelarCita(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cancelar cita");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
};
