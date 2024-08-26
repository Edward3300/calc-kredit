import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, loginUser } from '../../store/actions/usersActions';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        };
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(loginUser(formData));
            if (response.error) {
                // Error message is already handled by Redux store and displayed below
                return;
            }
            navigate('/'); // Only navigate if no error
        } catch (e) {
            console.error(e);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Login to GameZone</h2>
                <p className="auth-subtitle">Access your personalized dashboard.</p>

                {error && <div className="auth-error">{error.error}</div>}

                <form onSubmit={handleFormSubmit} className="auth-form">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        className="auth-input"
                    />
                    <div className="password-container">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            required
                            className="auth-input"
                        />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>New to GameZone?</span>
                    <Link to="/register" className="auth-link">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
