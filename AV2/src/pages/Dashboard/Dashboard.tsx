// src/pages/Dashboard/Dashboard.tsx
import React from 'react';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mockAeronaves } from '../../data/mockData';
import AircraftCard from '../../components/AircraftCard/AircraftCard';
import StatCard from '../../components/StatCard/StatCard';

// Importando os ícones da biblioteca Font Awesome (fa)
import { FaPlane, FaTools, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-title">
                        <h2>Dashboard de Produção</h2>
                    </div>
                    <div className="header-controls">
                        <input type="text" placeholder="Pesquisar aeronave..." className="search-bar" />
                        <button className="add-button">+ Nova Aeronave</button>
                    </div>
                </header>

                <section className="overview-section">
                    <h3>Visão Geral</h3>
                    <div className="stats-container">
                        <StatCard icon={<FaPlane />} label="Total de Aeronaves" value={12} color="#007bff" />
                        <StatCard icon={<FaTools />} label="Em Produção" value={8} color="#ff9800" />
                        <StatCard icon={<FaCheckCircle />} label="Concluídas" value={4} color="#4caf50" />
                    </div>
                </section>
                
                <section className="list-section">
                    <h3>Aeronaves em Andamento</h3>
                    <div className="aircraft-list">
                        {mockAeronaves.map(aeronave => (
                            <AircraftCard key={aeronave.codigo} aeronave={aeronave} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;