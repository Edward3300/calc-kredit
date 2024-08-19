import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Auth/Login";
import Header from "./components/Header/Header";
import './components/styles/App.css'
import Register from "./containers/Auth/Register";
import AdminPanel from "./containers/AdminPanel/AdminPanel";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
