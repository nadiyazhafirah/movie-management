const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key_movie_app_2026';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Mengambil token dari format 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak! Token tidak ditemukan.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid atau kadaluarsa.' });
        }
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    });
};

module.exports = { verifyToken, JWT_SECRET };