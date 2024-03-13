// routes/user.router.js
import express from 'express';
import * as userController from "../dao/fileSystem/controllers/user/userController.js";
import multer from 'multer';
import upload from "../middleware/multer/multer.js";

const router = express.Router();
const documentUpload = multer({ dest: 'uploads/' }); // Define multer para la carga de documentos

// Middleware para verificar si el usuario ha cargado los documentos requeridos
async function checkDocumentsUploaded(req, res, next) {
  const { uid } = req.params;
  try {
    const user = await userController.getUserById(uid);
    // Verificar si el usuario ha cargado los documentos requeridos
    if (user && user.documents && user.documents.identification && user.documents.addressProof && user.documents.bankStatement) {
      // Si el usuario ha cargado todos los documentos, continuar con la siguiente función de middleware o controlador
      next();
    } else {
      // Si falta algún documento, devolver un error
      res.status(400).json({ error: 'El usuario debe cargar todos los documentos requeridos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar los documentos del usuario', message: error.message });
  }
}

// Ruta para actualizar a usuario premium solo si ha cargado los documentos requeridos
router.put('/premium/:uid', documentUpload.single('document'), checkDocumentsUploaded, async (req, res) => {
  const { uid } = req.params;
  try {
    // Llamar a la función de controlador para actualizar al usuario a premium
    await userController.upgradeToPremium(uid);
    // Responder con un mensaje de éxito
    res.json({ message: 'Usuario actualizado a premium exitosamente' });
  } catch (error) {
    console.error(`Error al actualizar el usuario a premium: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar el usuario a premium', message: error.message });
  }
});

export default router;
