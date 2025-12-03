// src/services/citasService.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/citas`;

export const citasService = {
  // Obtener horarios ocupados para una fecha
  async getHorariosOcupados(fecha) {
    const response = await fetch(`${API_URL}/ocupados?date=${fecha}`);

    if (!response.ok) {
      throw new Error("Error al obtener horarios");
    }

    return response.json();
  },

  // Agendar una cita
  async agendarCita(citaData) {
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

    // En producción no registramos datos sensibles en consola
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
  },

  // Obtener todas las citas (para admin)
  async getCitas(filtros = {}) {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams(filtros);
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener citas");
    }

    return response.json();
  },

  // Obtener citas filtradas por fecha (para admin)
  async getCitasAdmin(fecha) {
    const token = localStorage.getItem("token");
    let url = API_URL;
    if (fecha) {
      url += `?fecha=${fecha}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener citas");
    }

    return response.json();
  },

  // Obtener una cita por ID
  async getCitaById(id) {
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
  },

  // Actualizar cita
  async actualizarCita(id, datos) {
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
      let errorMsg = "Error al actualizar cita";
      try {
        const errorData = await response.json();
        if (errorData.message) errorMsg = errorData.message;
        else if (errorData.errors && errorData.errors.length > 0) {
          errorMsg = errorData.errors.map((e) => e.message).join(", ");
        }
      } catch {
        // Si no se puede parsear el error, se usa el mensaje por defecto
      }
      throw new Error(errorMsg);
    }

    return response.json();
  },

  // Cancelar cita
  async cancelarCita(id) {
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
  },
};
