// authMiddleware.js
import User from "../../models/user.models.js"; // Ajusta la ruta según tu estructura de archivos
import router from './product.router.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    // Verificar si el usuario está autenticado
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);

      if (user) {
        // Si el usuario existe en la base de datos, está autenticado
        req.user = user; // Puedes adjuntar el usuario al objeto de solicitud si es necesario
        next(); // Continuar con la siguiente middleware o ruta
      } else {
        // Si el usuario no existe, limpiar la sesión y redirigir a la página de inicio de sesión
        req.session.destroy(() => {
          res.redirect('/login');
        });
      }
    } else {
      // Si no hay userId en la sesión, el usuario no está autenticado
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).send('Error de autenticación');
  }}
  
 export const isAdmin = (req, res, next) => {
    const user = req.session.user;
  
    // Verifica si el usuario tiene el rol de administrador
    if (user && user.role === 'admin') {
      return next();
    }
  
    // Si no es administrador, redirige a la página de acceso no autorizado o realiza alguna otra acción
    res.status(403).send('Acceso no autorizado');
  };