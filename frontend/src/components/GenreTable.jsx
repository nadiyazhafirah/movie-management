import React from 'react';
import { Link } from 'react-router-dom';

const GenreTable = ({ genres, onDelete }) => {
    if (genres.length === 0) {
        return <p className="text-gray-500 my-4">Belum ada data genre.</p>;
    }

    return (
        <div className="overflow-x-auto my-4">
            <table className="table w-full border">
                <thead>
                    <tr className="bg-base-200">
                        <th className="w-16">No</th>
                        <th>Nama Genre</th>
                        <th className="w-48 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre, index) => (
                        <tr key={genre.id}>
                            <th>{index + 1}</th>
                            <td>{genre.nama_genre}</td>
                            <td className="text-center space-x-2">
                                <Link to={`/genres/${genre.id}/edit`} className="btn btn-warning btn-xs">
                                    Edit
                                </Link>
                                <button onClick={() => onDelete(genre.id)} className="btn btn-error btn-xs text-white">
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

export default GenreTable;