import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Aeronave, StatusEtapa, ResultadoTeste, TipoTeste, StatusPeca } from '../domain/types';
import { mockAeronaves } from '../infrastructure/mocks';

export interface SystemLog { id: number; time: string; tag: string; color: string; text: string; }

export interface PecaInventario {
  codigo: string; nome: string; categoria: string; fornecedor: string; status: StatusPeca; aeronaveDestino?: string | null;
}

interface SystemContextData {
  aeronaves: Aeronave[];
  logs: SystemLog[];
  inventario: PecaInventario[];
  registrarAeronave: (novaAeronave: Aeronave) => void;
  atualizarAeronave: (codigo: string, dados: Partial<Aeronave>) => void;
  removerAeronave: (codigo: string) => void;
  registrarPeca: (novaPeca: PecaInventario) => void;
  atualizarPeca: (codigo: string, dados: Partial<PecaInventario>) => void;
  removerPeca: (codigo: string) => void;
  vincularPeca: (codigoPeca: string, codigoAeronave: string) => void;
  desvincularPeca: (codigoPeca: string) => void;
  atualizarStatusEtapa: (codigoAeronave: string, idEtapa: string, novoStatus: StatusEtapa) => void;
  atualizarResultadoTeste: (codigoAeronave: string, idTeste: string, resultado: ResultadoTeste) => void;
  adicionarEtapa: (codigoAeronave: string, nome: string, prazo: string) => void;
  adicionarTeste: (codigoAeronave: string, nome: string, dataValidade: string, tipo: TipoTeste) => void;
  adicionarLog: (tag: string, color: string, text: string) => void;
}

const SystemContext = createContext<SystemContextData>({} as SystemContextData);

const mockInventario: PecaInventario[] = [
  { codigo: 'PRP-902', nome: 'Motor GE9X', categoria: 'PROPULSÃO', fornecedor: 'GE Aviation', status: 'PRONTA', aeronaveDestino: 'KV-001' },
  { codigo: 'EST-881', nome: 'Trem de Pouso Principal', categoria: 'ESTRUTURA', fornecedor: 'Safran', status: 'PRONTA', aeronaveDestino: null },
];

export function SystemProvider({ children }: { children: ReactNode }) {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [inventario, setInventario] = useState<PecaInventario[]>(mockInventario);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const adicionarLog = (tag: string, color: string, text: string) => {
    const newLog = { id: Date.now(), time: getTime(), tag, color, text };
    setLogs(prev => [newLog, ...prev].slice(0, 15)); 
  };

  const registrarAeronave = (a: Aeronave) => { setAeronaves(p => [a, ...p]); adicionarLog('FROTA', 'bg-primary-container text-primary', `Novo ativo ${a.codigo} registrado.`); };
  const atualizarAeronave = (c: string, d: Partial<Aeronave>) => { setAeronaves(p => p.map(a => a.codigo === c ? { ...a, ...d } : a)); };
  const removerAeronave = (c: string) => { setAeronaves(p => p.filter(a => a.codigo !== c)); adicionarLog('ALERTA', 'bg-[#ef4444]/20 text-[#ef4444]', `Ativo ${c} removido permanentemente.`); };
  
  const registrarPeca = (p: PecaInventario) => { setInventario(pr => [p, ...pr]); adicionarLog('LOGÍSTICA', 'bg-[#1b2e36] text-[#b5cad4]', `Componente ${p.codigo} adicionado ao inventário.`); };
  const atualizarPeca = (c: string, d: Partial<PecaInventario>) => { setInventario(p => p.map(i => i.codigo === c ? { ...i, ...d } : i)); };
  const removerPeca = (c: string) => { setInventario(p => p.filter(i => i.codigo !== c)); adicionarLog('ALERTA', 'bg-[#ef4444]/20 text-[#ef4444]', `Peça ${c} removida.`); };

  const vincularPeca = (codigoPeca: string, codigoAeronave: string) => {
    setInventario(prev => prev.map(p => p.codigo === codigoPeca ? { ...p, aeronaveDestino: codigoAeronave } : p));
    adicionarLog('LOGÍSTICA', 'bg-secondary/20 text-secondary', `Componente ${codigoPeca} alocado ao ativo ${codigoAeronave}.`);
  };

  const desvincularPeca = (codigoPeca: string) => {
    setInventario(prev => prev.map(p => p.codigo === codigoPeca ? { ...p, aeronaveDestino: null } : p));
    adicionarLog('ALERTA', 'bg-error-container text-error', `Vínculo removido: peça ${codigoPeca} retornou ao estoque.`);
  };

  const atualizarStatusEtapa = (codigoAeronave: string, idEtapa: string, novoStatus: StatusEtapa) => {
    setAeronaves(prev => prev.map(aero => {
      if (aero.codigo !== codigoAeronave) return aero;
      return { ...aero, etapas: aero.etapas.map(e => e.id === idEtapa ? { ...e, status: novoStatus } : e) };
    }));
    adicionarLog('PRODUÇÃO', 'bg-primary/20 text-primary', `Etapa alterada para ${novoStatus} na aeronave ${codigoAeronave}.`);
  };

  const atualizarResultadoTeste = (codigoAeronave: string, idTeste: string, resultado: ResultadoTeste) => {
    setAeronaves(prev => prev.map(aero => {
      if (aero.codigo !== codigoAeronave) return aero;
      return { ...aero, testes: aero.testes.map(t => t.id === idTeste ? { ...t, resultado } : t) };
    }));
    if (resultado === 'REPROVADO') {
      adicionarLog('CRÍTICO', 'bg-error text-on-error animate-pulse', `FALHA DETECTADA: aeronave ${codigoAeronave} reprovada em teste.`);
    }
  };

  const adicionarEtapa = (codigoAeronave: string, nome: string, prazo: string) => {
    setAeronaves(prev => prev.map(aero => {
      if (aero.codigo !== codigoAeronave) return aero;
      const novaEtapa = { id: `e-${Date.now()}`, nome, prazo, status: 'PENDENTE' as StatusEtapa, funcionariosAlocados: [] };
      return { ...aero, etapas: [...aero.etapas, novaEtapa] };
    }));
  };

  const adicionarTeste = (codigoAeronave: string, nome: string, dataValidade: string, tipo: TipoTeste) => {
    setAeronaves(prev => prev.map(aero => {
      if (aero.codigo !== codigoAeronave) return aero;
      const novoTeste = { id: `t-${Date.now()}`, nome, dataValidade, tipo, resultado: null };
      return { ...aero, testes: [...aero.testes, novoTeste] };
    }));
  };

  useEffect(() => { adicionarLog('SIST', 'bg-surface-highest text-on-surface', 'Protocolo de segurança Kinetic Vault ativado.'); }, []);

  return (
    <SystemContext.Provider value={{ 
      aeronaves, logs, inventario, registrarAeronave, atualizarAeronave, removerAeronave,
      registrarPeca, atualizarPeca, removerPeca, vincularPeca, desvincularPeca,
      atualizarStatusEtapa, atualizarResultadoTeste, adicionarEtapa, adicionarTeste, adicionarLog 
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export const useSystem = () => useContext(SystemContext);