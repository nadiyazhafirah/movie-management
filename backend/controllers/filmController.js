const Film = require('../models/Film.js');
const Genre = require('../models/Genre.js');

exports.getFilms = async (req, res) => {
    try {
        const films = await Film.findAll({
            include: [{ model: Genre, attributes: ['id', 'nama_genre'] }]
        });
        res.json(films);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFilmById = async (req, res) => {
    try {
        const film = await Film.findByPk(req.params.id, {
            include: [{ model: Genre, attributes: ['id', 'nama_genre'] }]
        });
        if (!film) return res.status(404).json({ message: 'Film tidak ditemukan.' });
        res.json(film);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFilm = async (req, res) => {
    try {
        const { judul, sutradara, tahun_rilis, durasi, genre_id } = req.body;

        // Validasi Dasar & Tambahan
        if (!judul || judul.trim().length < 3) return res.status(400).json({ message: 'Judul minimal 3 karakter.' });
        if (!sutradara) return res.status(400).json({ message: 'Sutradara wajib diisi.' });
        if (!tahun_rilis || tahun_rilis < 1888 || tahun_rilis > new Date().getFullYear() + 5) {
            return res.status(400).json({ message: 'Tahun rilis tidak valid.' });
        }
        if (!durasi || Number(durasi) <= 0) return res.status(400).json({ message: 'Durasi harus angka positif.' });
        if (!genre_id) return res.status(400).json({ message: 'Genre wajib dipilih.' });

        const newFilm = await Film.create({
            judul,
            sutradara,
            tahun_rilis: Number(tahun_rilis),
            durasi: Number(durasi),
            genre_id: Number(genre_id)
        });

        res.status(201).json({ message: 'Film berhasil ditambahkan.', data: newFilm });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFilm = async (req, res) => {
    try {
        const { judul, sutradara, tahun_rilis, durasi, genre_id } = req.body;
        const film = await Film.findByPk(req.params.id);
        if (!film) return res.status(404).json({ message: 'Film tidak ditemukan.' });

        if (!judul || judul.trim().length < 3) return res.status(400).json({ message: 'Judul minimal 3 karakter.' });
        if (!sutradara) return res.status(400).json({ message: 'Sutradara wajib diisi.' });
        if (!tahun_rilis || tahun_rilis < 1888 || tahun_rilis > new Date().getFullYear() + 5) {
            return res.status(400).json({ message: 'Tahun rilis tidak valid.' });
        }
        if (!durasi || Number(durasi) <= 0) return res.status(400).json({ message: 'Durasi harus angka positif.' });
        if (!genre_id) return res.status(400).json({ message: 'Genre wajib dipilih.' });

        await film.update({
            judul,
            sutradara,
            tahun_rilis: Number(tahun_rilis),
            durasi: Number(durasi),
            genre_id: Number(genre_id)
        });

        res.json({ message: 'Film berhasil diperbarui.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFilm = async (req, res) => {
    try {
        const film = await Film.findByPk(req.params.id);
        if (!film) return res.status(404).json({ message: 'Film tidak ditemukan.' });

        await film.destroy();
        res.json({ message: 'Film berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};