// sessionsController.js
import * as sessionsService from "../services/sessionsService.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sessionsService.loginUser(email, password);

    if (user) {
      req.session.user = { id: user._id, email: user.email, first_name: user.first_name };
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error("Error en loginUser controller", error);
    res.status(500).json({ error: 'Error al iniciar sesión', message: error.message });
  }
};
