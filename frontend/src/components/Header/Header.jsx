import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import "./Header.css";

function Header() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    return (
        <header className="new-header">
            <div className="new-header__top">
                <div className="new-header__brand">
                    <Link to="/" className="new-header__logo">Финансы PRO</Link>
                </div>
                <div className="new-header__auth">
                    {user ? (
                        <button className="new-header__logout" onClick={() => dispatch(logoutUser())}>
                            Выйти
                        </button>
                    ) : (
                        <div className="new-header__auth-links">
                            <Link to="/login" className="new-header__auth-link">Вход</Link>
                            <Link to="/register" className="new-header__auth-link">Регистрация</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="new-header__bottom">
                {user && user.role === 'admin' && (
                    <Link to="/admin" className="new-header__admin-link">Админка</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
