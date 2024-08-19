import React, { useState } from 'react';
import './EmailModal.css';

function EmailModal({ show, onClose, onSend, isSending, isSent, error }) {
    const [email, setEmail] = useState('');

    const handleSend = () => {
        onSend(email);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Отправка результатов на Email</h2>
                <input
                    type="email"
                    placeholder="Введите ваш Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSending}
                    className="modal-input"
                />
                <div className="modal-buttons">
                    <button
                        onClick={handleSend}
                        disabled={!email || isSending}
                        className="modal-send-button"
                    >
                        {isSending ? 'Отправка...' : 'Отправить'}
                    </button>
                    <button onClick={onClose} className="modal-close-button">Закрыть</button>
                </div>
                {isSent && <p className="modal-success">Email успешно отправлен!</p>}
                {error && <p className="modal-error">Ошибка: {error}</p>}
            </div>
        </div>
    );
}

export default EmailModal;
