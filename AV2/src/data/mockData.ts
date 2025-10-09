import { Aeronave } from '../models/Aeronave';
import { Funcionario } from '../models/Funcionario';
import { TipoAeronave, NivelPermissao } from '../models/enums';

export const mockFuncionarios: Funcionario[] = [
    new Funcionario(1, 'Gerson Penha', '123456789', 'Rua X, 123', 'admin@aerocode.com', 'admin', NivelPermissao.ADMINISTRADOR),
    new Funcionario(2, 'Lucas Guerra', '987654321', 'Rua Y, 456', 'engenheiro@aerocode.com', 'eng', NivelPermissao.ENGENHEIRO),
    new Funcionario(3, 'Maria Costa', '111222333', 'Rua Z, 789', 'operador@aerocode.com', 'op', NivelPermissao.OPERADOR),
];

export const mockAeronaves: Aeronave[] = [
    new Aeronave('AX-550', 'Jato Executivo Veloce', TipoAeronave.COMERCIAL, 12, 6000),
    new Aeronave('TG-123', 'Cargueiro Titan', TipoAeronave.MILITAR, 3, 12000),
    new Aeronave('PR-DEV', 'Monomotor Sprint', TipoAeronave.COMERCIAL, 4, 1500),
];
