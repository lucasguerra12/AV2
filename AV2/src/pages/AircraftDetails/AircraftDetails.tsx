import React, { useState } from 'react'; // Importe useState
import { useParams } from 'react-router-dom';
import './AircraftDetails.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mockAeronaves } from '../../data/mockData';
import StageRow from '../../components/StageRow/StageRow'; // Importe o novo componente

const AircraftDetails = () => {
    const { codigo } = useParams<{ codigo: string }>();
    const aeronave = mockAeronaves.find(a => a.codigo === codigo);

    // Estado para controlar a aba ativa. 'etapas' é o valor inicial.
    const [activeTab, setActiveTab] = useState('etapas');

    if (!aeronave) {
        return (
            <div className="details-layout">
                <Sidebar />
                <main className="main-content">
                    <h2>Aeronave não encontrada</h2>
                </main>
            </div>
        );
    }

    return (
        <div className="details-layout">
            <Sidebar />
            <main className="main-content">
                <header className="details-header">
                    <h1>{aeronave.modelo}</h1>
                    <span className="aircraft-code">(Cód: {aeronave.codigo})</span>
                </header>
                
                <div className="details-card">
                    <h3>Informações Gerais</h3>
                    <p><strong>Tipo:</strong> {aeronave.tipo}</p>
                    <p><strong>Capacidade:</strong> {aeronave.capacidade} passageiros</p>
                    <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
                </div>

                <div className="details-tabs">
                    <button 
                        className={`tab ${activeTab === 'etapas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('etapas')}
                    >
                        Etapas de Produção
                    </button>
                    <button 
                        className={`tab ${activeTab === 'pecas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pecas')}
                    >
                        Peças
                    </button>
                    {/* Outras abas aqui */}
                </div>

                <div className="tab-content">
                    {/* Renderização Condicional do Conteúdo da Aba */}
                    {activeTab === 'etapas' && (
                        <div>
                            {aeronave.etapas.length > 0 ? (
                                aeronave.etapas.map((etapa, index) => (
                                    <StageRow key={index} etapa={etapa} />
                                ))
                            ) : (
                                <p>Nenhuma etapa de produção cadastrada para esta aeronave.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'pecas' && (
                        <p>Conteúdo da aba de Peças aparecerá aqui.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AircraftDetails;