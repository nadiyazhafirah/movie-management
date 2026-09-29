const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

router.use(verifyToken); // Melindungi seluruh endpoint film

router.get('/films', filmController.getFilms);
router.get('/films/:id', filmController.getFilmById);
router.post('/films', filmController.createFilm);
router.patch('/films/:id', filmController.updateFilm);
router.delete('/films/:id', filmController.deleteFilm);

module.exports = router;