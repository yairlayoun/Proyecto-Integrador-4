import multer from 'multer';

// Definir las opciones de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationFolder = '';
    if (file.fieldname === 'profileImage') {
      destinationFolder = 'profiles';
    } else if (file.fieldname === 'productImage') {
      destinationFolder = 'products';
    } else if (file.fieldname === 'document') {
      destinationFolder = 'documents';
    }
    cb(null, `uploads/${destinationFolder}`); // Guardar en la carpeta correspondiente
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantener el nombre original del archivo
  },
});

// Crear instancia de Multer con las opciones de almacenamiento
const upload = multer({ storage: storage });

export default upload;
