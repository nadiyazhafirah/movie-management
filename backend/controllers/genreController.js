const Genre = require('../models/Genre.js');

exports.getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre tidak ditemukan.' });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGenre = async (req, res) => {
    try {
        const { nama_genre } = req.body;
        if (!nama_genre || nama_genre.trim().length < 3) {
            return res.status(400).json({ message: 'Nama genre minimal 3 karakter.' });
        }
        const newGenre = await Genre.create({ nama_genre });
        res.status(201).json({ message: 'Genre berhasil ditambahkan.', data: newGenre });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const { nama_genre } = req.body;
        if (!nama_genre || nama_genre.trim().length < 3) {
            return res.status(400).json({ message: 'Nama genre minimal 3 karakter.' });
        }
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre tidak ditemukan.' });

        await genre.update({ nama_genre });
        res.json({ message: 'Genre berhasil diperbarui.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre tidak ditemukan.' });

        await genre.destroy();
        res.json({ message: 'Genre berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Tidak dapat menghapus genre yang terikat dengan film.' });
    }
};