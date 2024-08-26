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
            console.error('Error exporting data:', error);
        }
    };

    return (
        <section className="admin-dashboard">
            <header className="dashboard-header">
                <h1 className="header-title">Admin Dashboard</h1>
                <button className="export-button" onClick={handleExport}>Export Data</button>
            </header>

            <CalculationForm
                currentCalculation={selectedCalculation}
                setCurrentCalculation={setSelectedCalculation}
            />

            {loading && <p className="status-message loading">Loading...</p>}
            {error && <p className="status-message error">Error: {error}</p>}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Down Payment</th>
                        <th>Term</th>
                        <th>Rate</th>
                        <th>Monthly</th>
                        <th>Total</th>
                        <th>Income</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {calculations && calculations.map((calc) => (
                        <tr key={calc._id}>
                            <td>{calc.type}</td>
                            <td>{calc.cost.toLocaleString()} ₽</td>
                            <td>{calc.initialPayment.toLocaleString()} ₽</td>
                            <td>{calc.term} years</td>
                            <td>{calc.interestRate}%</td>
                            <td>{calc.monthlyPayment.toLocaleString()} ₽</td>
                            <td>{calc.totalPayment.toLocaleString()} ₽</td>
                            <td>{calc.requiredIncome.toLocaleString()} ₽</td>
                            <td>{new Date(calc.createdAt).toLocaleDateString()} {new Date(calc.createdAt).toLocaleTimeString()}</td>
                            <td>
                                <button onClick={() => handleEdit(calc)} className="action-button edit-button">Edit</button>
                                <button onClick={() => handleDelete(calc._id)} className="action-button delete-button">Delete</button>
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
