import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="navbar bg-primary text-primary-content shadow-lg px-6">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl normal-case font-bold">
                    Movie Management System
                </Link>
            </div>
            <div className="flex-none gap-4">
                <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
                <Link to="/genres" className="btn btn-ghost btn-sm">Genre</Link>
                <Link to="/films" className="btn btn-ghost btn-sm">Film</Link>
                <button onClick={handleLogout} className="btn btn-error btn-sm text-white">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;