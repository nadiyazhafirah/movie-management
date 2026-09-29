import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getGenreById, updateGenre } from '../services/genreService';

const EditGenre = () => {
    const { id } = useParams();
    const [namaGenre, setNamaGenre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getGenreById(id)
            .then((data) => setNamaGenre(data.nama_genre))
            .catch(() => setError('Gagal mengambil data genre.'));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenre(id, { nama_genre: namaGenre });
            navigate('/genres');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memperbarui genre.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
                {error && <div className="alert alert-error mb-4 text-white">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Nama Genre</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={namaGenre}
                            onChange={(e) => setNamaGenre(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditGenre;