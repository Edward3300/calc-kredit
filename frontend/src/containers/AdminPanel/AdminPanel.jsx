import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCalculations, deleteCalculation } from "../../store/actions/adminActions";
import CalculationForm from '../../components/CalculationForm';
import './AdminPanel.css';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { calculations, loading, error } = useSelector(state => state.admin);
    const [selectedCalculation, setSelectedCalculation] = useState(null);

    useEffect(() => {
        dispatch(fetchCalculations());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCalculation(id));
        if (selectedCalculation && selectedCalculation._id === id) {
            setSelectedCalculation(null);
        }
    };

    const handleEdit = (calculation) => {
        setSelectedCalculation(calculation);
    };

    const handleExport = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/export');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calculations_export.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Ошибка экспорта данных:', error);
        }
    };

    return (
        <section className="dashboard">
            <header className="dashboard-header">
                <h1>Панель Администратора</h1>
                <button className="export-btn" onClick={handleExport}>Экспортировать расчеты</button>
            </header>

            <CalculationForm
                currentCalculation={selectedCalculation}
                setCurrentCalculation={setSelectedCalculation}
            />

            {loading && <p className="dashboard-loading">Загрузка расчетов...</p>}
            {error && <p className="dashboard-error">Ошибка: {error}</p>}

            <div className="calculations-list">
                {calculations && calculations.map((calc, index) => (
                    <div className="calculation-item" key={index}>
                        <div className="calculation-info">
                            <p><span>Тип кредита:</span> {calc.type}</p>
                            <p><span>Сумма кредита:</span> {calc.cost.toLocaleString()} ₽</p>
                            <p><span>Первоначальный взнос:</span> {calc.initialPayment.toLocaleString()} ₽</p>
                            <p><span>Срок кредита:</span> {calc.term} лет</p>
                            <p><span>Процентная ставка:</span> {calc.interestRate}%</p>
                            <p><span>Сумма кредита:</span> {calc.loanAmount.toLocaleString()} ₽</p>
                            <p><span>Ежемесячный платеж:</span> {calc.monthlyPayment.toLocaleString()} ₽</p>
                            <p><span>Общая сумма выплат:</span> {calc.totalPayment.toLocaleString()} ₽</p>
                            <p><span>Необходимый доход:</span> {calc.requiredIncome.toLocaleString()} ₽</p>
                            <p><span>Дата создания:</span> {new Date(calc.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="calculation-actions">
                            <button onClick={() => handleEdit(calc)} className="edit-btn">Редактировать</button>
                            <button onClick={() => handleDelete(calc._id)} className="delete-btn">Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminDashboard;
