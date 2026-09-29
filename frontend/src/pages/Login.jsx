import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa kembali input Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold">Login Admin</h2>
                    {error && <div className="alert alert-error text-sm text-white py-2">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input
                                type="email"
                                className="input input-bordered"
                                placeholder="admin@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-2">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input
                                type="password"
                                className="input input-bordered"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className={`btn btn-primary ${loading ? 'loading' : ''}`} type="submit">
                                {loading ? 'Proses...' : 'Masuk'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;