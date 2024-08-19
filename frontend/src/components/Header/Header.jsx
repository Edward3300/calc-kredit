import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import "./Header.css";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Header() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__brand">
                    <Link to="/" className="header__logo">MoneyFlow</Link>
                </div>
                <nav className="header__nav">
                    {user ? (
                        <>
                            <div className="header__user-info">
                                <FaUserCircle className="header__user-icon" />
                                <span className="header__user-name">{user.name}</span>
                            </div>
                            <button
                                className="header__logout-button"
                                onClick={() => dispatch(logoutUser())}
                            >
                                <FaSignOutAlt /> Выйти
                            </button>
                        </>
                    ) : (
                        <div className="header__auth-links">
                            <Link to="/login" className="header__auth-link">
                                <FaSignInAlt /> Войти
                            </Link>
                            <Link to="/register" className="header__auth-link">
                                <FaUserPlus /> Создать аккаунт
                            </Link>
                        </div>
                    )}
                </nav>
                {user && user.role === 'admin' && (
                    <div className="header__admin-link">
                        <Link to="/admin">Панель управления</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
