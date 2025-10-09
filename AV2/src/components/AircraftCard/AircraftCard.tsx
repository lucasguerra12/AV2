import React from 'react';
import './AircraftCard.css';
import { Aeronave } from '../../models/Aeronave';

interface AircraftCardProps {
    aeronave: Aeronave;
}

const AircraftCard = ({ aeronave }: AircraftCardProps) => {
    // Simular progresso e status
    const progress = Math.floor(Math.random() * (80 - 40 + 1)) + 40; // Progresso aleatório entre 40% e 80%
    const statusText = "Em Andamento";
    const statusColor = "#ff9800"; // Laranja

    return (
        <div className="aircraft-card-new">
            <div className="info-section">
                <span className="info-label">Modelo</span>
                <span className="info-value">{aeronave.modelo}</span>
            </div>
            <div className="info-section">
                <span className="info-label">Código</span>
                <span className="info-value">{aeronave.codigo}</span>
            </div>
            <div className="info-section">
                <span className="info-label">Status</span>
                <span className="info-value status-pill" style={{ backgroundColor: statusColor }}>
                    {statusText}
                </span>
            </div>
            <div className="progress-section">
                <div className="progress-bar-container-new">
                    <div className="progress-bar-new" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="action-section">
                <button className="details-button-new">Ver Detalhes</button>
            </div>
        </div>
    );
};

export default AircraftCard;