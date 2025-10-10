import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import AircraftCard from '../../components/AircraftCard/AircraftCard';
import StatCard from '../../components/StatCard/StatCard';
import { Aeronave } from '../../models/Aeronave';
import { TipoAeronave } from '../../models/enums';
import { FaPlane, FaTools, FaCheckCircle } from 'react-icons/fa';

interface DashboardProps {
  aeronaves: Aeronave[];
  onAdicionarAeronave: (novaAeronave: Aeronave) => void;
}

const Dashboard = ({ aeronaves, onAdicionarAeronave }: DashboardProps) => {
  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState<TipoAeronave>(TipoAeronave.COMERCIAL);
  const [capacidade, setCapacidade] = useState(0);
  const [alcance, setAlcance] = useState(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo || !modelo) return alert("Código e Modelo são obrigatórios.");

    const novaAeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
    onAdicionarAeronave(novaAeronave);

    // Limpa o formulário
    setCodigo('');
    setModelo('');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h2>Dashboard de Produção</h2>
            <p>Bem-vindo ao painel de controlo da AeroCode</p>
          </div>
        </header>
        
        <section className="overview-section">
          {/* ... StatCards inalterados ... */}
        </section>

        {/* Formulário para Adicionar Aeronave */}
        <section className="add-aircraft-section">
            <h3>Adicionar Nova Aeronave</h3>
            <form onSubmit={handleSubmit} className="add-form aircraft-form">
                <input type="text" placeholder="Código (ex: AX-550)" value={codigo} onChange={e => setCodigo(e.target.value)} required />
                <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} required />
                <input type="number" placeholder="Capacidade" value={capacidade} onChange={e => setCapacidade(parseInt(e.target.value))} />
                <input type="number" placeholder="Alcance (km)" value={alcance} onChange={e => setAlcance(parseInt(e.target.value))} />
                <select value={tipo} onChange={e => setTipo(e.target.value as TipoAeronave)}>
                    <option value={TipoAeronave.COMERCIAL}>Comercial</option>
                    <option value={TipoAeronave.MILITAR}>Militar</option>
                </select>
                <button type="submit" className="add-button-small">Adicionar Aeronave</button>
            </form>
        </section>

        <section className="aircraft-list-section">
          <h3>Aeronaves em Produção</h3>
          <div className="aircraft-grid">
            {aeronaves.map(aeronave => (
              <AircraftCard key={aeronave.codigo} aeronave={aeronave} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;