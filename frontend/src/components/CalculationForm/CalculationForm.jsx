import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCalculation, editCalculation } from "../../store/actions/adminActions";
import './CalculationForm.css';

const CalculationForm = ({ currentCalculation, setCurrentCalculation }) => {
    const [formData, setFormData] = useState({
        loanCategory: '',
        loanAmount: '',
        downPayment: '',
        duration: '',
        rate: '',
    });

    useEffect(() => {
        if (currentCalculation) {
            setFormData({
                loanCategory: currentCalculation.type,
                loanAmount: currentCalculation.cost,
                downPayment: currentCalculation.initialPayment,
                duration: currentCalculation.term,
                rate: currentCalculation.interestRate,
            });
        }
    }, [currentCalculation]);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const calculationData = {
            type: formData.loanCategory,
            cost: formData.loanAmount,
            initialPayment: formData.downPayment,
            term: formData.duration,
            interestRate: formData.rate,
        };

        if (currentCalculation) {
            dispatch(editCalculation(currentCalculation._id, calculationData));
        } else {
            dispatch(createCalculation(calculationData));
        }

        setFormData({
            loanCategory: '',
            loanAmount: '',
            downPayment: '',
            duration: '',
            rate: '',
        });

        setCurrentCalculation(null);
    };

    const handleCancel = () => {
        setFormData({
            loanCategory: '',
            loanAmount: '',
            downPayment: '',
            duration: '',
            rate: '',
        });
        setCurrentCalculation(null);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>{currentCalculation ? 'Update Loan' : 'New Loan'}</h3>
            <select
                name="loanCategory"
                value={formData.loanCategory}
                onChange={handleChange}
                required
                className="form-select"
            >
                <option value="" disabled>Select Loan Type</option>
                <option value="Mortgage">Mortgage</option>
                <option value="AutoLoan">Auto Loan</option>
                <option value="PersonalLoan">Personal Loan</option>
            </select>
            <input
                type="number"
                name="loanAmount"
                placeholder="Loan Amount"
                value={formData.loanAmount}
                onChange={handleChange}
                required
                className="form-input"
            />
            <input
                type="number"
                name="downPayment"
                placeholder="Down Payment"
                value={formData.downPayment}
                onChange={handleChange}
                required
                className="form-input"
            />
            <input
                type="number"
                name="duration"
                placeholder="Duration (months)"
                value={formData.duration}
                onChange={handleChange}
                required
                className="form-input"
            />
            <input
                type="number"
                name="rate"
                placeholder="Interest Rate (%)"
                value={formData.rate}
                onChange={handleChange}
                required
                className="form-input"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-button">
                    {currentCalculation ? 'Save Changes' : 'Add Loan'}
                </button>
                {currentCalculation && (
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CalculationForm;
