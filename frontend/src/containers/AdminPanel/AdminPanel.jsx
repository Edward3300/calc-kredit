import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalculations, deleteCalculation } from '../../store/actions/adminActions';
import CalculationForm from '../../components/CalculationForm/CalculationForm';
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
        <section className="admin-dashboard">
            <header className="dashboard-header">
                <h1 className="header-title">Панель Администратора</h1>
                <button className="btn-export" onClick={handleExport}>Экспортировать данные</button>
            </header>

            <CalculationForm
                currentCalculation={selectedCalculation}
                setCurrentCalculation={setSelectedCalculation}
            />

            {loading && <p className="status-message status-loading">Загрузка данных...</p>}
            {error && <p className="status-message status-error">Ошибка: {error}</p>}

            <div className="calculations-table-container">
                <table className="calculations-table">
                    <thead>
                    <tr>
                        <th>Тип кредита</th>
                        <th>Сумма кредита</th>
                        <th>Первоначальный взнос</th>
                        <th>Срок кредита</th>
                        <th>Процентная ставка</th>
                        <th>Ежемесячный платеж</th>
                        <th>Общая сумма выплат</th>
                        <th>Необходимый доход</th>
                        <th>Дата создания</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {calculations && calculations.map((calc) => (
                        <tr key={calc._id}>
                            <td>{calc.type}</td>
                            <td>{calc.cost.toLocaleString()} ₽</td>
                            <td>{calc.initialPayment.toLocaleString()} ₽</td>
                            <td>{calc.term} лет</td>
                            <td>{calc.interestRate}%</td>
                            <td>{calc.monthlyPayment.toLocaleString()} ₽</td>
                            <td>{calc.totalPayment.toLocaleString()} ₽</td>
                            <td>{calc.requiredIncome.toLocaleString()} ₽</td>
                            <td>{new Date(calc.createdAt).toLocaleDateString()} {new Date(calc.createdAt).toLocaleTimeString()}</td>
                            <td>
                                <button onClick={() => handleEdit(calc)} className="btn-edit">Редактировать</button>
                                <button onClick={() => handleDelete(calc._id)} className="btn-delete">Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminDashboard;
