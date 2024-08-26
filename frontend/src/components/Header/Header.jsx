import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import "./Header.css";
import { GiGamepad, GiExitDoor, GiEntryDoor, GiCheckedShield } from "react-icons/gi";

function Header() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    return (
        <header className="game-header">
            <div className="header-background">
                <div className="logo-section">
                    <GiGamepad className="logo-icon" />
                    <Link to="/" className="site-title">CalculateZone</Link>
                </div>
                <nav className="navigation">
                    {user ? (
                        <div className="user-info">
                            <span className="greeting">Hello, <strong>{user.name}</strong>!</span>
                            <button
                                className="nav-button exit-button"
                                onClick={() => dispatch(logoutUser())}
                            >
                                <GiExitDoor /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="auth-options">
                            <Link to="/login" className="nav-button login-button">
                                <GiEntryDoor /> Log In
                            </Link>
                            <Link to="/register" className="nav-button signup-button">
                                <GiCheckedShield /> Register
                            </Link>
                        </div>
                    )}
                </nav>
                {user && user.role === 'admin' && (
                    <div className="admin-panel-link">
                        <Link to="/admin" className="admin-button">Admin Dashboard</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
