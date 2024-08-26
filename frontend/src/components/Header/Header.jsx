import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import { FaUserAstronaut, FaDoorOpen, FaSignInAlt, FaUserShield } from "react-icons/fa";
import "./Header.css";

function Header() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    return (
        <header className="unique-header">
            <div className="unique-header__wrapper">
                <div className="unique-header__brand">
                    <Link to="/" className="unique-header__logo">AstroFinance</Link>
                </div>
                <nav className="unique-header__navigation">
                    {user ? (
                        <div className="unique-header__user-section">
                            <FaUserAstronaut className="unique-header__icon" />
                            <span className="unique-header__username">{user.name}</span>
                            <button
                                className="unique-header__logout-btn"
                                onClick={() => dispatch(logoutUser())}
                            >
                                <FaDoorOpen /> Выйти
                            </button>
                        </div>
                    ) : (
                        <div className="unique-header__auth-section">
                            <Link to="/login" className="unique-header__auth-btn">
                                <FaSignInAlt /> Вход
                            </Link>
                            <Link to="/register" className="unique-header__auth-btn">
                                <FaUserShield /> Регистрация
                            </Link>
                        </div>
                    )}
                </nav>
                {user && user.role === 'admin' && (
                    <div className="unique-header__admin">
                        <Link to="/admin" className="unique-header__admin-link">Управление</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
