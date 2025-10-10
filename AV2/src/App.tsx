import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';

import { mockAeronaves, mockFuncionarios } from './data/mockData';
import { Aeronave } from './models/Aeronave';
import { Funcionario } from './models/Funcionario';
import { NivelPermissao } from './models/enums';

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const AircraftDetails = React.lazy(() => import('./pages/AircraftDetails/AircraftDetails'));
const Funcionarios = React.lazy(() => import('./pages/Funcionarios/Funcionarios'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<Funcionario | null>(null);

  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionarios);

  const handleLogin = (email: string) => {
    const user = mockFuncionarios.find(f => f.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      alert("Utilizador não encontrado! Tente 'admin@aerocode.com', 'engenheiro@aerocode.com' ou 'operador@aerocode.com'.");
    }
  };

  const handleAdicionarAeronave = (novaAeronave: Aeronave) => {
    setAeronaves(estadoAnterior => [...estadoAnterior, novaAeronave]);
  };

  const handleUpdateAeronave = (aeronaveAtualizada: Aeronave) => {
    setAeronaves(estadoAnterior => 
      estadoAnterior.map(a => 
        a.codigo === aeronaveAtualizada.codigo ? aeronaveAtualizada : a
      )
    );
  };

  const handleAdicionarFuncionario = (novoFuncionario: Funcionario) => {
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
          
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard currentUser={currentUser} aeronaves={aeronaves} onAdicionarAeronave={handleAdicionarAeronave} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/aeronave/:codigo" 
            element={isAuthenticated ? <AircraftDetails currentUser={currentUser} aeronavesIniciais={aeronaves} onUpdateAeronave={handleUpdateAeronave} todosFuncionarios={funcionarios} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/funcionarios" 
            element={isAuthenticated ? <Funcionarios currentUser={currentUser} funcionarios={funcionarios} onAdicionarFuncionario={handleAdicionarFuncionario} onRemoverFuncionario={handleRemoverFuncionario} /> : <Navigate to="/login" />} 
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;