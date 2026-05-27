
const generarCodigo = () => {
    // return Date.now().toString(32) + Math.random().toString(32).substring(2);
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

const generarToken = () => {
  return [...Array(32)]
    .map(() => Math.random().toString(36).charAt(2))
    .join('').toLowerCase();
};

export { generarCodigo, generarToken } 