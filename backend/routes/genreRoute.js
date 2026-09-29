const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

router.use(verifyToken); // Melindungi seluruh endpoint genre

router.get('/genres', genreController.getGenres);
router.get('/genres/:id', genreController.getGenreById);
router.post('/genres', genreController.createGenre);
router.patch('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;