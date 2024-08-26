import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, registerUser } from '../../store/actions/usersActions';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

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
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await dispatch(registerUser(formData));
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

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(prev => !prev);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Join GameZone</h2>
                <p className="auth-subtitle">Create your gaming account today.</p>

                {error && <div className="auth-error">{error.error}</div>}

                <form onSubmit={handleFormSubmit} className="auth-form">
                    <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="auth-input"
                    />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        required
                        className="auth-input"
                    />
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
                    <div className="password-container">
                        <input
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            required
                            className="auth-input"
                        />
                        <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account?</span>
                    <Link to="/login" className="auth-link">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
