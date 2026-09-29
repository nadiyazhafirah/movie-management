import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GenreTable from '../components/GenreTable';
import { getGenres, deleteGenre } from '../services/genreService';

const Genre = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchGenres = async () => {
        try {
            const data = await getGenres();
            setGenres(data);
        } catch (err) {
            setError('Gagal memuat data genre.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus genre ini?')) {
            try {
                await deleteGenre(id);
                fetchGenres();
            } catch (err) {
                alert(err.response?.data?.message || 'Gagal menghapus data.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Genre</h1>
                    <Link to="/genres/create" className="btn btn-primary btn-sm">+ Tambah Genre</Link>
                </div>
                {loading && <p>Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <GenreTable genres={genres} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default Genre;