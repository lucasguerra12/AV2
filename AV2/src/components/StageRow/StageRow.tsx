import React from 'react';
import './StageRow.css';
import { Etapa } from '../../models/Etapa';
import { FaCheckCircle, FaCog, FaClock } from 'react-icons/fa'; 
import { StatusEtapa } from '../../models/enums';

interface StageRowProps {
    etapa: Etapa;
}

const getStatusInfo = (status: StatusEtapa) => {
    switch (status) {
        case StatusEtapa.CONCLUIDA:
            return { icon: <FaCheckCircle />, text: 'Concluída', color: '#4caf50' };
        case StatusEtapa.EM_ANDAMENTO:
            return { icon: <FaCog />, text: 'Em Andamento', color: '#ff9800' };
        case StatusEtapa.PENDENTE:
        default:
            return { icon: <FaClock />, text: 'Pendente', color: '#6c757d' };
    }
};

const StageRow = ({ etapa }: StageRowProps) => {
    const statusInfo = getStatusInfo(etapa.status);

    return (
        <div className="stage-row">
            <div className="stage-name">{etapa.nome}</div>
            <div className="stage-deadline">
                Prazo: {etapa.prazo.toLocaleDateString()}
            </div>
            <div className="stage-responsible">
                Responsável: {etapa.funcionarios?.map(func => func.nome).join(', ') || 'N/D'}
            </div>
            <div className="stage-status" style={{ color: statusInfo.color }}>
                {statusInfo.icon}
                <span>{statusInfo.text}</span>
            </div>
            <div className="stage-actions">
                <button className="manage-button">Gerir</button>
            </div>
        </div>
    );
};

export default StageRow;