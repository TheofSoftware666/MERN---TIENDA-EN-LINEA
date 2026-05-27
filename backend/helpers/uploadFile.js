/**
 * Middleware genérico para subir archivos con multer y capturar errores
 * @param {multer} upload - Objeto multer
 * @param {string} fieldName - Nombre del campo en el formulario
 */
export const subirArchivo = (upload, fieldName) => (req, res, next) => {
  upload.array(fieldName)(req, res, function (err) {
    if (err){
        console.log("Middleware subirArchivo error:");
        console.log(err.message);
        // const error = new Error(err.message);
        return res.status(400).json({ error: err.message });
    }
    next();
  });
};
