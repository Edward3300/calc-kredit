import React, { useState } from "react";
import Calculator from "../calculators/Calculator";
import "./Home.css";
import { FaHouseDamage, FaCarSide, FaShoppingCart } from "react-icons/fa";

function Home() {
    const [activeCalculator, setActiveCalculator] = useState("mortgage");

    const calculators = [
        { id: "mortgage", label: "Ипотечный Заём", interestRate: 9.6, loanType: "Ипотека", icon: <FaHouseDamage /> },
        { id: "car", label: "Авто Заём", interestRate: 3.5, loanType: "Автокредит", icon: <FaCarSide /> },
        { id: "consumer", label: "Потребительский Заём", interestRate: 14.5, loanType: "Потребзайм", icon: <FaShoppingCart /> }
    ];

    return (
        <div className="game-home-container">
            <aside className="game-sidebar">
                <h1 className="game-sidebar-title">Выбор Займа</h1>
                <ul className="game-calculator-list">
                    {calculators.map((calc) => (
                        <li
                            key={calc.id}
                            className={`game-calculator-item ${activeCalculator === calc.id ? "active" : ""}`}
                        >
                            <button
                                className="game-calculator-button"
                                onClick={() => setActiveCalculator(calc.id)}
                            >
                                {calc.icon} <span className="calc-label">{calc.label}</span>
                                <span className="interest-rate">{calc.interestRate}%</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="game-content">
                {calculators.map(
                    (calc) =>
                        activeCalculator === calc.id && (
                            <Calculator
                                key={calc.id}
                                interestRate={calc.interestRate}
                                loanType={calc.loanType}
                            />
                        )
                )}
            </main>
        </div>
    );
}

export default Home;
