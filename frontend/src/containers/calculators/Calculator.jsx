import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailModal from '../../components/EmailModal/EmailModal';
import { calculateLoan, sendEmail, setCalculatorData } from "../../store/actions/calculatorActions";
import './Calculator.css'; // Новый файл стилей

function Calculator({ interestRate, loanType }) {
    const dispatch = useDispatch();
    const calculator = useSelector(state => state.calculator);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = Number(value);

        // Если значение не 0, обновляем состояние
        if (numericValue !== 0 || value === '') {
            dispatch(setCalculatorData({ [name]: numericValue }));
        }
    };

    const handleCalculate = () => {
        dispatch(setCalculatorData({ interestRate, loanType }));
        dispatch(calculateLoan());
    };

    const handleSendEmail = (email) => {
        dispatch(sendEmail(email));
    };

    return (
        <div className="calculator-container">
            <header className="calculator-header">
                <h1 className="calculator-title">Кредитный калькулятор</h1>
                <div className="calculator-subtitle">
                    <h2 className="loan-type">{loanType}</h2>
                    <p className="interest-details">
                        Годовая процентная ставка: <strong>{interestRate}%</strong>
                    </p>
                </div>
            </header>
            <div className="calculator-body">
                <div className="input-container">
                    <InputField
                        label="Сумма кредита (до 10,000,000 ₽)"
                        name="cost"
                        value={calculator.cost}
                        min={1}  // Минимальное значение 1, чтобы избежать 0
                        max={10000000}
                        step={1000}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Срок кредита (до 30 лет)"
                        name="term"
                        value={calculator.term}
                        min={1}  // Минимальное значение 1, чтобы избежать 0
                        max={30}
                        step={1}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Первоначальный взнос (₽)"
                        name="initialPayment"
                        value={calculator.initialPayment || ''}
                        min={0}
                        onChange={handleChange}
                    />
                </div>
                <div className="results-container">
                    <ResultItem label="Ежемесячный платеж" value={calculator.monthlyPayment} />
                    <ResultItem label="Общая сумма выплат" value={calculator.totalPayment} />
                    <ResultItem label="Рекомендуемый доход" value={calculator.requiredIncome} />
                </div>
                <div className="actions-container">
                    <ActionButton onClick={handleCalculate} disabled={calculator.cost <= 0 || calculator.initialPayment <= 0 || calculator.term <= 0} label="Рассчитать" />
                    <ActionButton onClick={() => setShowModal(true)} label="Отправить по Email" />
                </div>
            </div>
            <EmailModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSend={handleSendEmail}
                isSending={calculator.emailSending}
                isSent={calculator.emailSent}
                error={calculator.error}
            />
        </div>
    );
}

const InputField = ({ label, name, value, min, max, step, onChange }) => (
    <div className="input-field">
        <label htmlFor={name} className="input-label">{label}</label>
        <input
            type="number"
            id={name}
            name={name}
            value={value !== 0 ? value : ''} // Не показывать 0 в поле
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className="input-element"
        />
    </div>
);

const ResultItem = ({ label, value }) => (
    <div className="result-item">
        <span className="result-label">{label}</span>
        <span className="result-value">{value ? `${value.toLocaleString()} ₽` : '0 ₽'}</span>
    </div>
);

const ActionButton = ({ onClick, disabled, label }) => (
    <button onClick={onClick} disabled={disabled} className="action-btn">
        {label}
    </button>
);

export default Calculator;
