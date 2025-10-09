import React from 'react';
import './AircraftCard.css';
import { Aeronave } from '../../models/Aeronave';
import { Link } from 'react-router-dom'; // 1. Importe o componente Link

interface AircraftCardProps {
    aeronave: Aeronave;
}

const AircraftCard = ({ aeronave }: AircraftCardProps) => {
    const progress = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    const statusText = "Em Andamento";
    const statusColor = "#ff9800";

    return (
        // 2. Envolva o card inteiro num Link
        <Link to={`/aeronave/${aeronave.codigo}`} className="aircraft-card-link">
            <div className="aircraft-card-new">
                <div className="info-section">
                    <span className="info-label">Modelo</span>
                    <span className="info-value">{aeronave.modelo}</span>
                </div>
                {/* ... (resto das seções de info) ... */}
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
                    {/* 3. O botão agora é só visual, o link faz a ação */}
                    <button className="details-button-new">Ver Detalhes</button>
                </div>
            </div>
        </Link>
    );
};

export default AircraftCard;