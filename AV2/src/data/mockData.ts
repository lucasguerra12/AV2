import { Aeronave } from '../models/Aeronave';
import { Funcionario } from '../models/Funcionario';
import { Etapa } from '../models/Etapa';
import { Peca } from '../models/Peca'; 
import { TipoAeronave, NivelPermissao, StatusEtapa, TipoPeca, StatusPeca } from '../models/enums';

// Simulação de Funcionários
export const mockFuncionarios: Funcionario[] = [
    new Funcionario(1, 'Gerson Penha', '123456789', 'Rua X, 123', 'admin@aerocode.com', 'admin', NivelPermissao.ADMINISTRADOR),
    new Funcionario(2, 'Lucas Guerra', '987654321', 'Rua Y, 456', 'engenheiro@aerocode.com', 'eng', NivelPermissao.ENGENHEIRO),
    new Funcionario(3, 'Maria Costa', '111222333', 'Rua Z, 789', 'operador@aerocode.com', 'op', NivelPermissao.OPERADOR),
];

// Aeronaves
const aeronave1 = new Aeronave('AX-550', 'Jato Executivo Veloce', TipoAeronave.COMERCIAL, 12, 6000);
const aeronave2 = new Aeronave('TG-123', 'Cargueiro Titan', TipoAeronave.MILITAR, 3, 12000);
const aeronave3 = new Aeronave('PR-DEV', 'Monomotor Sprint', TipoAeronave.COMERCIAL, 4, 1500);

// --- Etapas ---
// Etapas da primeira aeronave
aeronave1.adicionarEtapa(new Etapa("Montagem da Fuselagem", new Date("2025-11-20")));
aeronave1.adicionarEtapa(new Etapa("Instalação do Cockpit", new Date("2025-12-05")));
aeronave1.etapas[0].status = StatusEtapa.CONCLUIDA;
aeronave1.etapas[1].status = StatusEtapa.EM_ANDAMENTO; // Corrigindo o enum aqui
aeronave1.etapas[1].associarFuncionario(mockFuncionarios[1]);

// Etapas da segunda aeronave
aeronave2.adicionarEtapa(new Etapa("Estrutura da Asa", new Date("2026-01-15")));
aeronave2.etapas[0].status = StatusEtapa.CONCLUIDA;


// --- PEÇAS ---
const peca1 = new Peca("Turbina GE9X", TipoPeca.IMPORTADA, "General Electric");
peca1.status = StatusPeca.PRONTA;
const peca2 = new Peca("Assento do Piloto", TipoPeca.NACIONAL, "AeroComfort Brasil");
peca2.status = StatusPeca.EM_TRANSPORTE;

aeronave1.adicionarPeca(peca1);
aeronave1.adicionarPeca(peca2);
aeronave1.adicionarPeca(new Peca("Sistema de Navegação", TipoPeca.IMPORTADA, "Garmin"));


aeronave2.adicionarPeca(new Peca("Trem de Pouso Reforçado", TipoPeca.NACIONAL, "Indústria Aeronáutica BR"));


export const mockAeronaves: Aeronave[] = [aeronave1, aeronave2, aeronave3];