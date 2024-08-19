import React, { useState } from "react";
import Calculator from "../calculators/Calculator";
import './Home.css';

function Home() {
    const [activeCalculator, setActiveCalculator] = useState("mortgage");

    const calculators = [
        { id: "mortgage", label: "Ипотека", interestRate: 9.6, loanType: "Ипотека" },
        { id: "car", label: "Автокредитование", interestRate: 3.5, loanType: "Автокредитование" },
        { id: "consumer", label: "Потребительский кредит", interestRate: 14.5, loanType: "Потребкредит" }
    ];

    return (
        <main className="home-container">
            <aside className="sidebar">
                <div className="calculator-header">
                    <h1>Финансовый Калькулятор</h1>
                    <p>Выберите тип кредита для расчета</p>
                </div>
                <ul className="calculator-list">
                    {calculators.map((calc) => (
                        <li key={calc.id} className={`calculator-item ${activeCalculator === calc.id ? "active" : ""}`}>
                            <button
                                className="calculator-link"
                                onClick={() => setActiveCalculator(calc.id)}
                            >
                                {calc.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <section className="content">

                <div className="calculator-display">
                    {calculators.map((calc) =>
                            activeCalculator === calc.id && (
                                <Calculator
                                    key={calc.id}
                                    interestRate={calc.interestRate}
                                    loanType={calc.loanType}
                                />
                            )
                    )}
                </div>
            </section>
        </main>
    );
}

export default Home;
