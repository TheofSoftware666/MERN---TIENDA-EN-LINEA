import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    return jwt.sign({ id }, "q2K!9fZbP#xVwR7yL8@zMv3", {
        expiresIn : "30d",
    });
}

export default generarJWT