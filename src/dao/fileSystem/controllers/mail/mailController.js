// mailController.js
import { sendPasswordResetEmail } from './emailService.js';

const sendEmail = async (req, res) => {
  try {
    const { to, resetLink } = req.body;

    // Verificar si se proporcionaron los datos necesarios
    if (!to || !resetLink) {
      return res.status(400).json({ error: 'Missing email or reset link' });
    }

    // Enviar correo electrónico
    await sendPasswordResetEmail(to, resetLink);

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email', message: error.message });
  }
};

export default sendEmail;
