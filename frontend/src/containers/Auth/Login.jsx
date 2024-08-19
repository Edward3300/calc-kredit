import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, loginUser } from '../../store/actions/usersActions';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
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
        await dispatch(loginUser(formData));
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <section className="auth-container">
            <div className="auth-content">
                <h2 className="auth-heading">Добро пожаловать!</h2>
                <p className="auth-subheading">Введите свои данные для входа в систему.</p>

                {error && <div className="auth-error">{error.error}</div>}

                <form onSubmit={handleFormSubmit} className="auth-form">
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Электронная почта"
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="input-group password-group">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Пароль"
                            className="auth-input"
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? 'Скрыть' : 'Показать'}
                        </span>
                    </div>

                    <button type="submit" className="auth-submit-button" disabled={loading}>
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Нет аккаунта?</span>
                    <Link to="/register" className="auth-link">
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
