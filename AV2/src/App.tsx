import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';

import { mockAeronaves, mockFuncionarios } from './data/mockData';
import { Aeronave } from './models/Aeronave';
import { Funcionario } from './models/Funcionario';

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const AircraftDetails = React.lazy(() => import('./pages/AircraftDetails/AircraftDetails'));
const Funcionarios = React.lazy(() => import('./pages/Funcionarios/Funcionarios'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. O estado da aplicação agora vive aqui!
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionarios);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // 2. Funções de gestão que serão passadas para as páginas
  const handleAdicionarAeronave = (novaAeronave: Aeronave) => {
    setAeronaves(estadoAnterior => [...estadoAnterior, novaAeronave]);
  };

  const handleAdicionarFuncionario = (novoFuncionario: Funcionario) => {
    // Adiciona o novo funcionário garantindo um id único
    const novoId = Math.max(...funcionarios.map(f => f.id), 0) + 1;
    novoFuncionario.id = novoId;
    setFuncionarios(estadoAnterior => [...estadoAnterior, novoFuncionario]);
  };

  const handleRemoverFuncionario = (idFuncionario: number) => {
    setFuncionarios(estadoAnterior => estadoAnterior.filter(f => f.id !== idFuncionario));
  };

  return (
    <Router>
      <Suspense fallback={<div>A carregar...</div>}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          
          {/* 3. Passamos os dados e as funções como props para as rotas */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard aeronaves={aeronaves} onAdicionarAeronave={handleAdicionarAeronave} /> : <Navigate to="/login" />} />
          <Route path="/aeronave/:codigo" element={isAuthenticated ? <AircraftDetails aeronavesIniciais={aeronaves} /> : <Navigate to="/login" />} />
          <Route path="/funcionarios" element={isAuthenticated ? <Funcionarios funcionarios={funcionarios} onAdicionarFuncionario={handleAdicionarFuncionario} onRemoverFuncionario={handleRemoverFuncionario} /> : <Navigate to="/login" />} />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;