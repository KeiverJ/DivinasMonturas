// Enviar correo de cita (empresa y paciente)
export async function sendCitaEmail(data) {
  // Correo para la empresa (admin)
  await sendEmail({
    to: 'keivercj@gmail.com',
    subject: 'Nueva cita agendada',
    text: `Nueva cita registrada\n\nNombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono}\nFecha: ${data.fecha}\nHora: ${data.hora}\nPrimera visita: ${data.primeraVisita ? 'Sí' : 'No'}\nSíntomas: ${data.sintomas || '-'}\n`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 0; margin: 0;">
        <table width="100%" style="max-width: 650px; margin: 40px auto; background: #fff; border-radius: 18px; box-shadow: 0 8px 32px rgba(212,175,55,0.15); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(90deg, #222 0%, #B4941F 100%); padding: 38px 24px; text-align: center;">
              <img src='https://res.cloudinary.com/du2ulpgqh/image/upload/v1764698845/logo_ou9axy.png' alt='Divinas Monturas' style='height: 65px; margin-bottom: 16px;' />
              <h1 style='color: #D4AF37; font-size: 2.1rem; margin: 0; font-family: serif; letter-spacing: 1px;'>Nueva Cita Agendada</h1>
            </td>
          </tr>
          <tr>
            <td style='padding: 38px 32px;'>
              <h2 style='color: #222; font-size: 1.25rem; margin-bottom: 18px; font-family: serif;'>Datos del Paciente</h2>
              <table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>
                <tr><td style='padding: 10px; color: #444; font-weight: bold; width: 140px;'>Nombre:</td><td style='padding: 10px; color: #222;'>${data.nombre}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Correo:</td><td style='padding: 10px; color: #222;'>${data.email}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Teléfono:</td><td style='padding: 10px; color: #222;'>${data.telefono}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Fecha:</td><td style='padding: 10px; color: #222;'>${data.fecha}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Hora:</td><td style='padding: 10px; color: #222;'>${data.hora}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Primera visita:</td><td style='padding: 10px; color: #222;'>${data.primeraVisita ? 'Sí' : 'No'}</td></tr>
                <tr><td style='padding: 10px; color: #444; font-weight: bold;'>Síntomas:</td><td style='padding: 10px; color: #222; white-space: pre-line;'>${data.sintomas || '-'}</td></tr>
              </table>
              <div style='background: #fffbe6; border-radius: 10px; padding: 20px; color: #B4941F; font-size: 1.05rem; margin-bottom: 22px; text-align:center;'>
                <b>Recuerda:</b> Puedes gestionar esta cita desde el sistema o responder a este correo para dudas.
              </div>
              <div style='margin-top: 18px; color: #888; font-size: 0.98rem; text-align:center;'>
                Divinas Monturas &copy; 2025 | <a href='mailto:keivercj@gmail.com' style='color:#D4AF37; text-decoration:underline;'>Contacto</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `
  });

  // Correo para el cliente (paciente)
  await sendEmail({
    to: data.email,
    subject: '¡Tu cita en Divinas Monturas está confirmada!',
    text: `Hola ${data.nombre},\nTu cita ha sido agendada exitosamente.\n\nFecha: ${data.fecha}\nHora: ${data.hora}\nDirección: Cúcuta, Norte de Santander\nTeléfono: +57 (310) 123-4567\n\nPor favor, llega 10 minutos antes y trae tu documento de identidad.`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7f7f7; padding: 0; margin: 0;">
        <table width="100%" style="max-width: 650px; margin: 40px auto; background: #fff; border-radius: 18px; box-shadow: 0 8px 32px rgba(212,175,55,0.15); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(90deg, #D4AF37 0%, #B4941F 100%); padding: 40px 28px; text-align: center;">
              <img src="https://res.cloudinary.com/du2ulpgqh/image/upload/v1764698845/logo_ou9axy.png" alt="Divinas Monturas" style="height: 70px; margin-bottom: 18px;" />
              <h1 style="color: #fff; font-size: 2.3rem; margin: 0; font-family: serif; letter-spacing: 1px;">¡Cita Confirmada!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="color: #D4AF37; font-size: 1.4rem; margin-bottom: 18px; font-family: serif;">Hola ${data.nombre},</h2>
              <p style="color: #222; font-size: 1.15rem; margin-bottom: 22px;">Tu cita ha sido agendada exitosamente. Te esperamos en <b>Divinas Monturas</b>.<br>Recuerda llegar con tiempo y seguir las instrucciones para tu comodidad.</p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Fecha:</td><td style="padding: 10px; color: #222;">${data.fecha}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Hora:</td><td style="padding: 10px; color: #222;">${data.hora}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Dirección:</td><td style="padding: 10px; color: #222;">Cúcuta, Norte de Santander</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Teléfono:</td><td style="padding: 10px; color: #222;">+57 (310) 123-4567</td></tr>
              </table>
              <div style="background: #F5F5DC; border-radius: 10px; padding: 22px; color: #333; font-size: 1.05rem; margin-bottom: 22px;">
                <b>Instrucciones para tu cita:</b>
                <ul style="margin: 14px 0 0 22px; padding: 0; color: #444; list-style: disc inside;">
                  <li>Llega 10 minutos antes de tu cita</li>
                  <li>Trae tu documento de identidad</li>
                  <li>Si usas lentes de contacto, retíralos 2 horas antes</li>
                  <li>Trae tus lentes o prescripción actual</li>
                </ul>
              </div>
              <div style="background: #fffbe6; border-radius: 8px; padding: 18px; color: #B4941F; font-size: 1rem; margin-bottom: 18px; text-align:center;">
                ¿Tienes dudas? Escríbenos a <a href="mailto:keivercj@gmail.com" style="color:#D4AF37; text-decoration:underline;">keivercj@gmail.com</a>
              </div>
              <div style="text-align: center; margin-top: 32px;">
                <a href="https://divinasmonturas.com" style="display: inline-block; background: #D4AF37; color: #fff; font-weight: bold; padding: 16px 44px; border-radius: 10px; text-decoration: none; font-size: 1.15rem; letter-spacing: 1px;">Ver más servicios</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background: #222; color: #fff; text-align: center; padding: 22px 12px; font-size: 1rem;">
              Divinas Monturas &copy; 2025 | <a href="mailto:keivercj@gmail.com" style="color: #D4AF37; text-decoration: underline;">Contacto</a>
            </td>
          </tr>
        </table>
      </div>
    `
  });
}
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// src/services/emailService.js
import nodemailer from 'nodemailer';
import path from 'path';

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divinocorreovm@gmail.com', // Cambia por tu correo
    pass: 'hnop algp wajc vqhc' // Cambia por tu app password
  }
});

// Función para enviar correos
async function sendEmail(options) {
  return transporter.sendMail(options);
}
export async function sendMayoristaEmail(data) {
  // Email para la empresa (HTML profesional)
  await sendEmail({
    to: 'keivercj@gmail.com',
    subject: 'Nueva solicitud de mayorista',
    text: `Nueva solicitud de mayorista recibida\n\nNombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono}\nMensaje: ${data.mensaje}\nFecha/Hora: ${(new Date()).toLocaleString('es-ES')}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 0; margin: 0;">
        <table width="100%" style="max-width: 650px; margin: 40px auto; background: #fff; border-radius: 18px; box-shadow: 0 8px 32px rgba(212,175,55,0.15); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(90deg, #222 0%, #B4941F 100%); padding: 38px 24px; text-align: center;">
              <img src="https://res.cloudinary.com/du2ulpgqh/image/upload/v1764698845/logo_ou9axy.png" alt="Divinas Monturas" style="height: 65px; margin-bottom: 16px;" />
              <h1 style="color: #D4AF37; font-size: 2.1rem; margin: 0; font-family: serif; letter-spacing: 1px;">Nueva Solicitud Mayorista</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 38px 32px;">
              <h2 style="color: #222; font-size: 1.25rem; margin-bottom: 18px; font-family: serif;">Datos del Solicitante</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 10px; color: #444; font-weight: bold; width: 140px;">Nombre:</td><td style="padding: 10px; color: #222;">${data.nombre}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Correo:</td><td style="padding: 10px; color: #222;">${data.email}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Teléfono:</td><td style="padding: 10px; color: #222;">${data.telefono}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Mensaje:</td><td style="padding: 10px; color: #222; white-space: pre-line;">${data.mensaje}</td></tr>
                <tr><td style="padding: 10px; color: #444; font-weight: bold;">Fecha/Hora:</td><td style="padding: 10px; color: #222;">${(new Date()).toLocaleString('es-ES')}</td></tr>
              </table>
              <div style="margin-top: 18px; color: #888; font-size: 0.98rem; text-align:center;">
                Si tienes dudas, responde a este correo o contacta a <a href="mailto:keivercj@gmail.com" style="color:#D4AF37; text-decoration:underline;">keivercj@gmail.com</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background: #222; color: #fff; text-align: center; padding: 22px 12px; font-size: 1rem;">
              Divinas Monturas &copy; 2025 | <a href="mailto:keivercj@gmail.com" style="color: #D4AF37; text-decoration: underline;">Contacto</a>
            </td>
          </tr>
        </table>
      </div>
    `
  });
  // Correo para el cliente (diseño mejorado)
  await sendEmail({
    to: data.email,
    subject: '¡Gracias por tu interés en ser mayorista de Divinas Monturas!',
    text: `Hola ${data.nombre},\n\n¡Gracias por tu interés en convertirte en mayorista! Hemos recibido tu solicitud y nuestro equipo la revisará en breve.\n\nPronto nos pondremos en contacto contigo para continuar el proceso.\n\nSi tienes dudas, escríbenos a keivercj@gmail.com\n\nDivinas Monturas`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7f7f7; padding: 0; margin: 0;">
        <table width="100%" style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 6px 32px rgba(212,175,55,0.13); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(90deg, #D4AF37 0%, #B4941F 100%); padding: 36px 24px; text-align: center;">
              <img src="https://res.cloudinary.com/du2ulpgqh/image/upload/v1764698845/logo_ou9axy.png" alt="Divinas Monturas" style="height: 70px; margin-bottom: 18px;" />
              <h1 style="color: #fff; font-size: 2.2rem; margin: 0; font-family: serif; letter-spacing: 1px;">¡Solicitud Recibida!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 28px;">
              <h2 style="color: #D4AF37; font-size: 1.4rem; margin-bottom: 18px; font-family: serif;">Hola ${data.nombre},</h2>
              <p style="color: #222; font-size: 1.15rem; margin-bottom: 22px;">¡Gracias por tu interés en convertirte en <b>mayorista</b> de <b>Divinas Monturas</b>!<br>Hemos recibido tu solicitud y nuestro equipo la revisará en breve.</p>
              <div style="background: #F5F5DC; border-radius: 10px; padding: 22px; color: #333; font-size: 1.05rem; margin-bottom: 22px;">
                <b>¿Qué sigue?</b>
                <ul style="margin: 14px 0 0 22px; padding: 0; color: #444;">
                  <li>Revisaremos tu información y documentación</li>
                  <li>Te contactaremos para validar los datos</li>
                  <li>Si todo está correcto, recibirás acceso a la plataforma mayorista</li>
                  <li>Podrás realizar pedidos con precios especiales</li>
                </ul>
              </div>
              <div style="background: #fffbe6; border-radius: 8px; padding: 18px; color: #B4941F; font-size: 1rem; margin-bottom: 18px; text-align:center;">
                <b>¿Dudas?</b> Escríbenos a <a href="mailto:keivercj@gmail.com" style="color:#D4AF37; text-decoration:underline;">keivercj@gmail.com</a>
              </div>
              <div style="text-align: center; margin-top: 32px;">
                <a href="https://divinasmonturas.com" style="display: inline-block; background: #D4AF37; color: #fff; font-weight: bold; padding: 14px 38px; border-radius: 8px; text-decoration: none; font-size: 1.1rem; letter-spacing: 1px;">Visitar Divinas Monturas</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background: #222; color: #fff; text-align: center; padding: 20px 12px; font-size: 1rem;">
              Divinas Monturas &copy; 2025 | <a href="mailto:keivercj@gmail.com" style="color: #D4AF37; text-decoration: underline;">Contacto</a>
            </td>
          </tr>
        </table>
      </div>
    `
  });
}

