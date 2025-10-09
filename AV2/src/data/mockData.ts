// src/data/mockData.ts

import { Aeronave } from '../models/Aeronave';
import { Funcionario } from '../models/Funcionario';
import { TipoAeronave, NivelPermissao, StatusEtapa } from '../models/enums'; // Adicione StatusEtapa
import { Etapa } from '../models/Etapa'; // Importe a classe Etapa

// Simulação de Funcionários (sem alterações)
export const mockFuncionarios: Funcionario[] = [
    new Funcionario(1, 'Gerson Penha', '123456789', 'Rua X, 123', 'admin@aerocode.com', 'admin', NivelPermissao.ADMINISTRADOR),
    new Funcionario(2, 'Lucas Guerra', '987654321', 'Rua Y, 456', 'engenheiro@aerocode.com', 'eng', NivelPermissao.ENGENHEIRO),
    new Funcionario(3, 'Maria Costa', '111222333', 'Rua Z, 789', 'operador@aerocode.com', 'op', NivelPermissao.OPERADOR),
];

// Simulação de Aeronaves (com etapas adicionadas)
const aeronave1 = new Aeronave('AX-550', 'Jato Executivo Veloce', TipoAeronave.COMERCIAL, 12, 6000);
const aeronave2 = new Aeronave('TG-123', 'Cargueiro Titan', TipoAeronave.MILITAR, 3, 12000);
const aeronave3 = new Aeronave('PR-DEV', 'Monomotor Sprint', TipoAeronave.COMERCIAL, 4, 1500);

// Adicionar etapas à primeira aeronave
aeronave1.adicionarEtapa(new Etapa("Montagem da Fuselagem", new Date("2025-11-20")));
aeronave1.adicionarEtapa(new Etapa("Instalação do Cockpit", new Date("2025-12-05")));
aeronave1.adicionarEtapa(new Etapa("Instalação Elétrica", new Date("2025-12-20")));
aeronave1.etapas[0].status = StatusEtapa.CONCLUIDA; // Marcar a primeira como concluída
aeronave1.etapas[1].status = StatusEtapa.EM_ANDAMENTO; // E a segunda como em andamento
aeronave1.etapas[1].associarFuncionario(mockFuncionarios[1]); // Associar um funcionário

// Adicionar etapas à segunda aeronave
aeronave2.adicionarEtapa(new Etapa("Estrutura da Asa", new Date("2026-01-15")));
aeronave2.adicionarEtapa(new Etapa("Montagem dos Motores", new Date("2026-02-01")));
aeronave2.etapas[0].status = StatusEtapa.CONCLUIDA;

export const mockAeronaves: Aeronave[] = [aeronave1, aeronave2, aeronave3];