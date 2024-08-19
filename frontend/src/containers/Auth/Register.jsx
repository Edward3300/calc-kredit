import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, registerUser } from '../../store/actions/usersActions';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

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
        displayName: '', // Добавляем новое поле
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
            alert('Пароли не совпадают');
            return;
        }
        await dispatch(registerUser(formData));
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(prev => !prev);
    };

    return (
        <section className="auth-container">
            <div className="auth-content">
                <h1 className="auth-heading">Регистрация нового аккаунта</h1>
                <p className="auth-subheading">Пожалуйста, заполните информацию для создания нового аккаунта.</p>

                {error && <div className="auth-error">{error.error}</div>}

                <form onSubmit={handleFormSubmit} className="auth-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            placeholder="Отображаемое имя"
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Имя пользователя"
                            className="auth-input"
                            required
                        />
                    </div>

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

                    <div className="input-group password-group">
                        <input
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Подтвердите пароль"
                            className="auth-input"
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {isConfirmPasswordVisible ? 'Скрыть' : 'Показать'}
                        </span>
                    </div>

                    <button type="submit" className="auth-submit-button" disabled={loading}>
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Уже есть аккаунт?</span>
                    <Link to="/login" className="auth-link">
                        Войти
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
