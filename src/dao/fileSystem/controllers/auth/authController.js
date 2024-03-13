import * as authService from "../../../../services/authService.js";
import * as emailService from '../../../../services/emailService.js';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/auth.log' })
  ],
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    req.session.user = user;
    res.redirect("/profile");
    logger.info(`Usuario registrado: ${email}`);
  } catch (error) {
    logger.error(`Error al registrar usuario: ${error.message}`);
    console.log(error);
    res.redirect("/");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    req.session.user = user;
    res.redirect("/profile");
    logger.info(`Inicio de sesión exitoso: ${email}`);
  } catch (error) {
    logger.error(`Error al iniciar sesión: ${error.message}`);
    console.log("Error, credenciales inválidas", error);
    res.redirect("/error");
  }
};

export const logOutUser = async (req, res) => {
  try {
    await authService.logOutUser(req);
    res.redirect("/login");
    logger.info('Usuario cerró sesión');
  } catch (error) {
    logger.error(`Error al cerrar la sesión: ${error.message}`);
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

export const recoveryPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await authService.recoveryPassword(email, password);
    res.redirect("/login");
    logger.info(`Contraseña recuperada para el usuario: ${email}`);
  } catch (error) {
    logger.error(`Error al recuperar contraseña: ${error.message}`);
    console.error("Error al recuperar contraseña", error);
    res.status(500).send("Error al recuperar contraseña");
  }
};

// Función para generar un token único
function generateResetToken() {
  return uuidv4();
}


export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const resetToken = generateResetToken();
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    await emailService.sendPasswordResetEmail(email, resetLink);

    // Almacenar el token y su expiración en el usuario
    await authService.storeResetToken(user._id, resetToken);

    res.json({ message: 'Correo de restablecimiento enviado con éxito' });
  } catch (error) {
    console.error('Error en requestPasswordReset controller', error);
    res.status(500).json({ error: 'Error al solicitar el restablecimiento de contraseña', message: error.message });
  }
};

export const renderResetPasswordPage = (req, res) => {
  const { resetToken, error, success } = req.params;
  res.render('reset-password', { resetToken, error, success });
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await authService.getUserByResetToken(token);

    if (!user || token !== user.resetToken || Date.now() > user.resetTokenExpiration) {
      logger.error('Token inválido o expirado:', { token, userId: user ? user._id : null });
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    const isSamePassword = await authService.comparePasswords(newPassword, user.password);
    if (isSamePassword) {
      logger.error('La nueva contraseña debe ser diferente de la actual:', { userId: user._id });
      return res.status(400).json({ error: 'La nueva contraseña debe ser diferente de la actual' });
    }

    await authService.resetPassword(user._id, newPassword);
    logger.info('Contraseña restablecida con éxito:', { userId: user._id });

    res.json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    logger.error('Error en resetPassword controller:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña', message: error.message });
  }
};
