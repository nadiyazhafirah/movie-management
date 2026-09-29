import React from 'react';
import { Link } from 'react-router-dom';

const FilmTable = ({ films, onDelete }) => {
    if (films.length === 0) {
        return <p className="text-gray-500 my-4">Belum ada data film.</p>;
    }

    return (
        <div className="overflow-x-auto my-4">
            <table className="table w-full border">
                <thead>
                    <tr className="bg-base-200">
                        <th>No</th>
                        <th>Judul</th>
                        <th>Sutradara</th>
                        <th>Tahun Rilis</th>
                        <th>Durasi</th>
                        <th>Genre</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film, index) => (
                        <tr key={film.id}>
                            <th>{index + 1}</th>
                            <td className="font-semibold">{film.judul}</td>
                            <td>{film.sutradara}</td>
                            <td>{film.tahun_rilis}</td>
                            <td>{film.durasi} menit</td>
                            <td>
                                <span className="badge badge-accent">
                                    {film.genre ? film.genre.nama_genre : '-'}
                                </span>
                            </td>
                            <td className="text-center space-x-2">
                                <Link to={`/films/${film.id}/edit`} className="btn btn-warning btn-xs">
                                    Edit
                                </Link>
                                <button onClick={() => onDelete(film.id)} className="btn btn-error btn-xs text-white">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilmTable;