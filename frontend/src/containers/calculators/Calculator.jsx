import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {calculateLoan, setCalculatorData} from "../../store/actions/calculatorActions";
import './Calculator.css';

function Calculator({ interestRate, loanType }) {
    const dispatch = useDispatch();
    const calculator = useSelector(state => state.calculator);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = Number(value);

        if (numericValue !== 0 || value === '') {
            dispatch(setCalculatorData({ [name]: numericValue }));
        }
    };

    const handleCalculate = () => {
        if (calculator.cost > 0 && calculator.term > 0 && calculator.initialPayment >= 0) {
            dispatch(setCalculatorData({ interestRate, loanType }));
            dispatch(calculateLoan());
        } else {
            alert("Fill out all fields to calculate!");
        }
    };

    const handleReset = () => {
        dispatch(setCalculatorData({
            cost: '',
            term: '',
            initialPayment: '',
            monthlyPayment: 0,
            totalPayment: 0,
            requiredIncome: 0
        }));
    };

    return (
        <div className="calculator-container">
            <div className="calculator-header">
                <h2 className="calculator-title">Loan Estimator</h2>
                <p className="loan-description">
                    Calculate your <strong>{loanType}</strong> with a rate of <strong>{interestRate}%</strong>
                </p>
            </div>
            <div className="calculator-body">
                <div className="input-section">
                    <InputField
                        label="Loan Amount (up to 10M ₽)"
                        name="cost"
                        value={calculator.cost}
                        min={1}
                        max={10000000}
                        step={1000}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Loan Duration (up to 30 years)"
                        name="term"
                        value={calculator.term}
                        min={1}
                        max={30}
                        step={1}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Initial Payment (₽)"
                        name="initialPayment"
                        value={calculator.initialPayment || ''}
                        min={0}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="result-section">
                    <ResultItem label="Monthly Payment" value={calculator.monthlyPayment} />
                    <ResultItem label="Total Payment" value={calculator.totalPayment} />
                    <ResultItem label="Required Income" value={calculator.requiredIncome} />
                </div>
                <div className="action-section">
                    <button
                        onClick={handleCalculate}
                        className="action-button calculate-button"
                        disabled={calculator.cost <= 0 || calculator.initialPayment < 0 || calculator.term <= 0}
                    >
                        Estimate
                    </button>
                    <button
                        onClick={handleReset}
                        className="action-button reset-button"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ label, name, value, min, max, step, onChange }) => (
    <div className="input-group">
        <label htmlFor={name} className="input-label">{label}</label>
        <input
            type="number"
            id={name}
            name={name}
            value={value !== 0 ? value : ''}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className="input-field"
        />
    </div>
);

const ResultItem = ({ label, value }) => (
    <div className="result-item">
        <span className="result-label">{label}</span>
        <span className="result-value">{value ? `${value.toLocaleString()} ₽` : '0 ₽'}</span>
    </div>
);

export default Calculator;
