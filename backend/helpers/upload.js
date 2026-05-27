import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Crea un objeto multer configurable
 * @param {string} folder - Carpeta donde se guardará el archivo
 * @param {Array} allowedTypes - Tipos MIME permitidos
 * @param {number} maxSizeMB - Tamaño máximo en MB
 */

export function createMulter(folder, allowedTypes = ["image/jpeg", "image/png"], maxSizeMB = 5) {
  const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../uploads/${folder}`));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, file.originalname + ext);
    }
  });

  return multer({
    storage,
    fileFilter: async (req, file, cb) => {
      
      // Validacion del tipo de archivo
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error(`Solo se permiten archivos: ${allowedTypes.join(", ")}`), false);
      }

      cb(null, true);
    }
    // ,limits: { fileSize: maxSizeMB * 1024 * 1024 } Limite de Megas
  });
}
