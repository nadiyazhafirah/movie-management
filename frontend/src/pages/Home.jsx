import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="container mx-auto p-8 text-center">
                <div className="hero bg-base-200 py-12 rounded-lg">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-4xl font-bold">Selamat Datang!</h1>
                            <p className="py-6">
                                Sistem Manajemen Film (Movie Management System) untuk mengelola genre dan koleksi film berbasis Fullstack.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;