// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Páginas temporárias apenas para testarmos a navegação */}
          <Route index element={<div className="p-8"><h1 className="text-2xl font-bold">Dashboard em Construção</h1></div>} />
          <Route path="aeronaves" element={<div className="p-8"><h1 className="text-2xl font-bold">Gestão de Aeronaves</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;