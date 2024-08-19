import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailModal from '../../components/EmailModal';
import { calculateLoan, sendEmail, setCalculatorData } from "../../store/actions/calculatorActions";
import './NewApp.css'; // Новый файл стилей

function Calculator({ interestRate, loanType }) {
  const dispatch = useDispatch();
  const calculator = useSelector(state => state.calculator);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCalculatorData({ [name]: Number(value) }));
  };

  const handleCalculate = () => {
    dispatch(setCalculatorData({ interestRate, loanType }));
    dispatch(calculateLoan());
  };

  const handleSendEmail = (email) => {
    dispatch(sendEmail(email));
  };

  return (
      <div className="new-calculator-wrapper">
        <header className="new-calculator-header">
          <h2 className="loan-type">{loanType}</h2>
          <div className="interest-details">
            <span className="interest-rate">{interestRate}%</span>
            <span className="interest-label">Годовая ставка</span>
          </div>
        </header>
        <div className="new-calculator-content">
          <div className="input-section">
            <InputField
                label="Сумма кредита до 10000000"
                name="cost"
                value={calculator.cost}
                min={0}
                max={10000000}
                step={1000}
                onChange={handleChange}
            />
            <InputField
                label="Срок кредита (лет) до 30 лет"
                name="term"
                value={calculator.term}
                min={1}
                max={30}
                step={1}
                onChange={handleChange}
            />
            <InputField
                label="Первоначальный взнос"
                name="initialPayment"
                value={calculator.initialPayment === 0 ? '' : calculator.initialPayment}
                min={0}
                onChange={handleChange}
            />
          </div>
          <div className="output-section">
            <OutputItem label="Ежемесячный платеж" value={calculator.monthlyPayment ? `${calculator.monthlyPayment.toLocaleString()} ₽` : '0 ₽'} />
            <OutputItem label="Общая сумма выплат" value={calculator.totalPayment ? `${calculator.totalPayment.toLocaleString()} ₽` : '0 ₽'} />
            <OutputItem label="Необходимый доход" value={calculator.requiredIncome ? `${calculator.requiredIncome.toLocaleString()} ₽` : '0 ₽'} />
          </div>
          <div className="action-buttons">
            <ActionButton onClick={handleCalculate} disabled={calculator.cost <= 0 || calculator.initialPayment <= 0 || calculator.term <= 0} label="Рассчитать" />
            <ActionButton onClick={() => setShowModal(true)} label="Отправить на почту" />
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
    <div className="input-group">
      <label className="input-label" htmlFor={name}>{label}:</label>
      <input
          type="number"
          id={name}
          name={name}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          className="input-field"
      />
    </div>
);

const OutputItem = ({ label, value }) => (
    <div className="output-item">
      <span className="output-label">{label}:</span>
      <strong className="output-value">{value}</strong>
    </div>
);

const ActionButton = ({ onClick, disabled, label }) => (
    <button onClick={onClick} disabled={disabled} className="action-button">
      {label}
    </button>
);

export default Calculator;
