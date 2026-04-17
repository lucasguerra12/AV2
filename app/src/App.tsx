// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Aeronaves } from './pages/Aeronaves';
import { SystemProvider } from './contexts/SystemContext'; 
import { Inventario } from './pages/Inventario';

function App() {
  return (
    <SystemProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="aeronaves" element={<Aeronaves />} /> 
            <Route path="inventario" element={<Inventario />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SystemProvider>
  );
}

export default App;