import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFilmById, updateFilm } from '../services/filmService';
import { getGenres } from '../services/genreService';

const EditFilm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        judul: '',
        sutradara: '',
        tahun_rilis: '',
        durasi: '',
        genre_id: ''
    });
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil daftar genre dan detail film sekaligus
        Promise.all([getGenres(), getFilmById(id)])
            .then(([genreList, filmData]) => {
                setGenres(genreList);
                setFormData({
                    judul: filmData.judul,
                    sutradara: filmData.sutradara,
                    tahun_rilis: filmData.tahun_rilis,
                    durasi: filmData.durasi,
                    genre_id: filmData.genre_id
                });
            })
            .catch(() => setError('Gagal memuat data edit.'));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFilm(id, formData);
            navigate('/films');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memperbarui data film.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Film</h1>
                {error && <div className="alert alert-error mb-4 text-white">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-semibold">Judul Film</label>
                        <input
                            type="text"
                            name="judul"
                            className="input input-bordered w-full"
                            value={formData.judul}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Sutradara</label>
                        <input
                            type="text"
                            name="sutradara"
                            className="input input-bordered w-full"
                            value={formData.sutradara}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Tahun Rilis</label>
                        <input
                            type="number"
                            name="tahun_rilis"
                            className="input input-bordered w-full"
                            value={formData.tahun_rilis}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Durasi (Menit)</label>
                        <input
                            type="number"
                            name="durasi"
                            className="input input-bordered w-full"
                            value={formData.durasi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Genre</label>
                        <select
                            name="genre_id"
                            className="select select-bordered w-full"
                            value={formData.genre_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Pilih Genre --</option>
                            {genres.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.nama_genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Update Film
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditFilm;