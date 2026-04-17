// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
//import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública (Fora do Layout) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas (Dentro do Layout com Sidebar) */}
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="aeronaves" element={<div className="p-8 text-on-surface">Gestão de Aeronaves</div>} />
          {/* As outras rotas entrarão aqui depois */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;