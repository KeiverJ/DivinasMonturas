import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  firstVisit: { type: Boolean, default: false },
  symptoms: { type: String },
  date: { type: String, required: true }, // formato YYYY-MM-DD
  time: { type: String, required: true }, // Ej: "9:00 AM"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cita', citaSchema);
