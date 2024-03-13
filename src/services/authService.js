import userModel from "../dao/models/user.models.js"
import { createHash, isValidPassword } from "../utils/utils.js";

// Registra a un nuevo usuario.
export const registerUser = async (name, email, password) => {
  try {
    const user = new User({ name, email, password: createHash(password) });
    await user.save();
    delete user.password;
    return user;
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};

// Autentica a un usuario y almacena la información en la sesión.
export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }, { email: 1, name: 1, password: 1 });

    if (!user) {
      throw new Error("Usuario y/o contraseña incorrecta 1");
    }

    if (!isValidPassword(user, password)) {
      throw new Error("Usuario y/o contraseña incorrecta 2");
    }

    delete user.password;
    return user;
  } catch (error) {
    throw new Error("Error, credenciales inválidas");
  }
};

//Cierra la sesión del usuario.
export const logOutUser = async (req) => {
  try {
    // Verifica si el usuario está autenticado antes de cerrar la sesión
    if (req.session.user) {
      delete req.session.user;
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar la sesión", err);
          throw new Error("Error al cerrar la sesión");
        }
      });
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    throw new Error("Error al cerrar la sesión");
  }
};

export const recoveryPassword = async (email, password) => {
  try {
    await User.updateOne({ email }, { password: createHash(password) });
  } catch (error) {
    console.error("Error al recuperar contraseña", error);
    throw new Error("Error al recuperar contraseña");
  }
};

