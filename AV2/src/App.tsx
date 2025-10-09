import React, { useState, Suspense } from 'react'; // 1. Importe o Suspense
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
// import Dashboard from './pages/Dashboard/Dashboard'; // -> Vamos remover a importação direta
// import AircraftDetails from './pages/AircraftDetails/AircraftDetails'; // -> E esta também

// 2. Importe os componentes de forma "preguiçosa" (lazy)
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const AircraftDetails = React.lazy(() => import('./pages/AircraftDetails/AircraftDetails'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {/* 3. Envolva as suas rotas com o componente Suspense */}
      <Suspense fallback={<div>A carregar...</div>}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
          } />
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
          <Route path="/aeronave/:codigo" element={
            isAuthenticated ? <AircraftDetails /> : <Navigate to="/login" />
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;