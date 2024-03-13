// emailService.js
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "process.env.EMAIL_USER",  
    pass: 'process.env.EMAIL_PASSWORD',        
  },
});

export const sendPasswordResetEmail = (to, resetLink) => {
  const mailOptions = {
    from: "process.env.EMAIL_USER",  
    to,
    subject: 'Restablecimiento de contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}</p>`,
  };

  return transporter.sendMail(mailOptions);
};
