import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilmTable from '../components/FilmTable';
import { getFilms, deleteFilm } from '../services/filmService';

const Film = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFilms = async () => {
        try {
            const data = await getFilms();
            setFilms(data);
        } catch (err) {
            setError('Gagal memuat data film.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus film ini?')) {
            try {
                await deleteFilm(id);
                fetchFilms();
            } catch (err) {
                alert('Gagal menghapus film.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Film</h1>
                    <Link to="/films/create" className="btn btn-primary btn-sm">+ Tambah Film</Link>
                </div>
                {loading && <p>Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <FilmTable films={films} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default Film;