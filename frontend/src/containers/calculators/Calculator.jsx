import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {calculateLoan, setCalculatorData} from "../../store/actions/calculatorActions";
import { FaRubleSign, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import './Calculator.css';

function Calculator({ interestRate, loanType }) {
    const dispatch = useDispatch();
    const calculator = useSelector(state => state.calculator);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = Number(value);

        if (numericValue !== 0 || value === '') {
            dispatch(setCalculatorData({ [name]: numericValue }));
        }
    };

    return (
        <div className="new-calculator-container">
            <header className="new-calculator-header">
                <h1 className="new-calculator-title">Финансовый Ассистент</h1>
                <div className="new-calculator-subtitle">
                    <h2 className="new-loan-type">{loanType}</h2>
                    <p className="new-interest-details">
                        Процентная ставка: <strong>{interestRate}%</strong>
                    </p>
                </div>
            </header>
            <div className="new-calculator-body">
                <div className="new-input-container">
                    <InputField
                        label="Введите сумму займа"
                        name="cost"
                        value={calculator.cost}
                        min={1}
                        max={10000000}
                        step={1000}
                        onChange={handleChange}
                        icon={<FaRubleSign />}
                    />
                    <InputField
                        label="Выберите срок займа (лет)"
                        name="term"
                        value={calculator.term}
                        min={1}
                        max={30}
                        step={1}
                        onChange={handleChange}
                        icon={<FaCalendarAlt />}
                    />
                    <InputField
                        label="Начальный взнос"
                        name="initialPayment"
                        value={calculator.initialPayment || ''}
                        min={0}
                        onChange={handleChange}
                        icon={<FaMoneyBillWave />}
                    />
                </div>
                <div className="new-results-container">
                    <ResultItem label="Ежемесячный платёж" value={calculator.monthlyPayment} />
                    <ResultItem label="Итоговая сумма выплат" value={calculator.totalPayment} />
                    <ResultItem label="Рекомендуемый доход" value={calculator.requiredIncome} />
                </div>
                <div className="new-actions-container">
                    <ActionButton
                        onClick={() => dispatch(calculateLoan())}
                        disabled={calculator.cost <= 0 || calculator.initialPayment <= 0 || calculator.term <= 0}
                        label="Рассчитать"
                    />
                </div>
            </div>
        </div>
    );
}

const InputField = ({ label, name, value, min, max, step, onChange, icon }) => (
    <div className="new-input-field">
        <label htmlFor={name} className="new-input-label">
            {icon} {label}
        </label>
        <input
            type="number"
            id={name}
            name={name}
            value={value !== 0 ? value : ''}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className="new-input-element"
        />
    </div>
);

const ResultItem = ({ label, value }) => (
    <div className="new-result-item">
        <span className="new-result-label">{label}</span>
        <span className="new-result-value">{value ? `${value.toLocaleString()} ₽` : '0 ₽'}</span>
    </div>
);

const ActionButton = ({ onClick, disabled, label }) => (
    <button onClick={onClick} disabled={disabled} className="new-action-btn">
        {label}
    </button>
);

export default Calculator;
