import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  // 1. Criamos um estado para saber se o utilizador está logado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Criamos uma função para "fazer o login"
  const handleLogin = () => {
    // Aqui, no futuro, você validaria o email e a senha
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        } />
        {/* Rota inicial: se estiver logado, vai para o dashboard, senão, para o login */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;