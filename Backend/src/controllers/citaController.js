import nodemailer from 'nodemailer';
import Cita from '../models/Cita.js';
import config from '../config/config.js';

/**
 * POST /api/citas
 * Crear una nueva cita
 */
export const createCita = async (req, res) => {
  try {
    const { name, email, phone, firstVisit, symptoms, date, time } = req.body;
    const file = req.file;

    // Validar datos requeridos
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    // Verificar si el horario ya está ocupado
    const existe = await Cita.findOne({ date, time });
    if (existe) {
      return res.status(409).json({ error: 'Horario ya ocupado.' });
    }

    // Guardar la cita en la BD
    const cita = new Cita({
      name,
      email,
      phone,
      firstVisit: firstVisit === 'true' || firstVisit === true,
      symptoms,
      date,
      time
    });
    await cita.save();

    // Enviar correos de notificación si está configurado
    if (config.email && config.email.user && config.email.pass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: config.email.user,
            pass: config.email.pass,
          },
        });

        // 1. Email a la óptica (notificación de nueva cita)
        const mailToOptica = {
          from: config.email.user,
          to: config.email.recipient,
          subject: '🔔 Nueva cita agendada - Divinas Monturas',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #D4AF37;">Nueva Cita Agendada</h2>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Primera visita:</strong> ${firstVisit ? 'Sí' : 'No'}</p>
                <p><strong>Síntomas/Motivo:</strong> ${symptoms || 'No especificado'}</p>
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Hora:</strong> ${time}</p>
              </div>
            </div>
          `,
          attachments: file ? [{
            filename: file.originalname,
            content: file.buffer
          }] : []
        };

        // 2. Email al cliente (confirmación de cita)
        const mailToCliente = {
          from: config.email.user,
          to: email,
          subject: '✅ Confirmación de cita - Divinas Monturas',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #D4AF37;">¡Tu cita ha sido confirmada!</h2>
              <p>Hola <strong>${name}</strong>,</p>
              <p>Tu cita en Divinas Monturas ha sido agendada exitosamente.</p>

              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #D4AF37; margin-top: 0;">Detalles de tu cita</h3>
                <p><strong>📅 Fecha:</strong> ${date}</p>
                <p><strong>🕐 Hora:</strong> ${time}</p>
                <p><strong>📍 Dirección:</strong> DIVINA VISIÓN, 123 Luxury Ave, Fashion District</p>
                <p><strong>📞 Teléfono:</strong> +1 (555) 123-4567</p>
              </div>

              <div style="background-color: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Instrucciones importantes:</h4>
                <ul>
                  <li>Llega 10 minutos antes de tu cita</li>
                  <li>Trae tu seguro y documentación</li>
                  <li>Si usas lentes de contacto, retíralos 2 horas antes del examen</li>
                  <li>Trae tus lentes o prescripción actual</li>
                </ul>
              </div>

              <p style="color: #666; font-size: 12px;">
                Si necesitas cancelar o reprogramar tu cita, por favor contáctanos con al menos 24 horas de anticipación.
              </p>

              <p>¡Te esperamos!</p>
              <p><strong>Equipo Divinas Monturas</strong></p>
            </div>
          `
        };

        // Enviar ambos correos
        await Promise.all([
          transporter.sendMail(mailToOptica),
          transporter.sendMail(mailToCliente)
        ]);

        console.log(`✅ Emails enviados: notificación a óptica y confirmación a ${email}`);
      } catch (emailError) {
        console.error('Error al enviar correo:', emailError);
        // No falla la petición si el correo falla
      }
    }

    res.status(200).json({
      message: 'Cita agendada exitosamente.',
      data: {
        id: cita._id,
        name: cita.name,
        date: cita.date,
        time: cita.time
      }
    });
  } catch (err) {
    console.error('Error al crear cita:', err);
    res.status(500).json({ error: 'Error al agendar la cita.' });
  }
};

/**
 * GET /api/citas/ocupados?date=YYYY-MM-DD
 * Obtener horarios ocupados de una fecha específica
 */
export const getHorariosOcupados = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Fecha requerida' });
    }

    const citas = await Cita.find({ date });
    const horarios = citas.map(c => c.time);

    res.json({ horarios });
  } catch (err) {
    console.error('Error al consultar horarios:', err);
    res.status(500).json({ error: 'Error al consultar horarios ocupados.' });
  }
};

/**
 * GET /api/citas
 * Obtener todas las citas (para panel de administración)
 */
export const getAllCitas = async (req, res) => {
  try {
    const { date, page = 1, limit = 50 } = req.query;

    const filter = date ? { date } : {};
    const skip = (page - 1) * limit;

    const citas = await Cita.find(filter)
      .sort({ date: -1, time: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Cita.countDocuments(filter);

    res.json({
      citas,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error al obtener citas:', err);
    res.status(500).json({ error: 'Error al obtener citas.' });
  }
};

/**
 * DELETE /api/citas/:id
 * Eliminar una cita
 */
export const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByIdAndDelete(id);

    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada.' });
    }

    res.json({ message: 'Cita eliminada exitosamente.' });
  } catch (err) {
    console.error('Error al eliminar cita:', err);
    res.status(500).json({ error: 'Error al eliminar cita.' });
  }
};
