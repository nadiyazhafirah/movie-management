import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createGenre } from '../services/genreService';

const CreateGenre = () => {
    const [namaGenre, setNamaGenre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createGenre({ nama_genre: namaGenre });
            navigate('/genres');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menambahkan genre.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold mb-4">Tambah Genre Baru</h1>
                {error && <div className="alert alert-error mb-4 text-white">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Nama Genre</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={namaGenre}
                            onChange={(e) => setNamaGenre(e.target.value)}
                            placeholder="Contoh: Action"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Simpan</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGenre;