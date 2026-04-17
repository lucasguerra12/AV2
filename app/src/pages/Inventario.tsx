// src/pages/Inventario.tsx
import { useState } from 'react';
import { useSystem, type StatusPeca, type PecaInventario } from '../contexts/SystemContext';

export function Inventario() {
  const { inventario, registrarPeca, atualizarPeca, removerPeca } = useSystem();
  
  // Controle do Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Estados do Formulário
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('ESTRUTURA');
  const [fornecedor, setFornecedor] = useState('');
  const [status, setStatus] = useState<StatusPeca>('EM_PRODUCAO');

  // Cálculos Dinâmicos
  const totalPecas = inventario.length;
  const prontas = inventario.filter(p => p.status === 'PRONTA').length;
  const emTransito = inventario.filter(p => p.status === 'EM_TRANSPORTE').length;
  const criticos = inventario.filter(p => p.status === 'MANUTENCAO').length;

  // Função para ABRIR para criar NOVO
  const handleAbrirNovo = () => {
    setCodigo(''); setNome(''); setFornecedor(''); setCategoria('ESTRUTURA'); setStatus('EM_PRODUCAO');
    setIsEditMode(false);
    setIsDrawerOpen(true);
  };

  // Função para ABRIR em modo de EDIÇÃO
  const handleAbrirEdicao = (peca: PecaInventario) => {
    setCodigo(peca.codigo);
    setNome(peca.nome);
    setCategoria(peca.categoria);
    setFornecedor(peca.fornecedor);
    setStatus(peca.status);
    setIsEditMode(true);
    setIsDrawerOpen(true);
  };

  // Função para SALVAR (Cria ou Atualiza)
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo || !nome) return;

    if (isEditMode) {
      atualizarPeca(codigo, { nome, categoria, fornecedor, status });
    } else {
      registrarPeca({ codigo, nome, categoria, fornecedor, status, aeronaveDestino: null });
    }
    
    setIsDrawerOpen(false);
  };

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case 'PROPULSÃO': return { icon: 'bolt', color: 'text-primary' };
      case 'AVIÔNICOS': return { icon: 'memory', color: 'text-secondary' };
      case 'INTERIOR': return { icon: 'radar', color: 'text-secondary' };
      default: return { icon: 'settings_input_component', color: 'text-primary' };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative font-body">
      
      {/* Header mantido */}
      <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex items-center gap-6">
          <span className="text-lg font-black tracking-widest text-primary font-headline uppercase">INVENTORY_LOGISTICS_V1</span>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-sm">search</span>
            <input className="bg-surface-container-lowest border border-outline-variant/30 focus:border-primary focus:ring-0 text-xs py-2 pl-10 pr-4 w-64 transition-all font-label tracking-wider placeholder:text-outline-variant/50 rounded-sm text-on-surface" placeholder="CONSULTAR SISTEMA..." type="text"/>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8 flex-1">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-on-surfaceVariant font-label text-[0.6875rem] uppercase tracking-[0.2em] mb-2">Visão Operacional de Ativos</h2>
            <h1 className="text-5xl font-bold font-headline tracking-tighter text-on-surface leading-none">Inventário de Peças e Logística</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleAbrirNovo}
              className="bg-primary text-background px-6 py-2 h-10 font-bold font-label text-xs uppercase tracking-widest self-end hover:brightness-110 active:scale-95 transition-all rounded-sm shadow-[0_0_15px_rgba(183,199,235,0.15)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add_box</span>
              Registrar Lote
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-surface-low p-6 border-l-2 border-primary relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-6xl">inventory</span>
            </div>
            <p className="text-[10px] font-label text-on-surfaceVariant uppercase tracking-widest">Total de SKUs Ativos</p>
            <p className="text-4xl font-headline font-bold text-on-surface mt-2">{totalPecas}</p>
          </div>
          <div className="bg-surface-low p-6 border-l-2 border-[#1b2b48] shadow-md">
            <p className="text-[10px] font-label text-on-surfaceVariant uppercase tracking-widest">Em Trânsito</p>
            <p className="text-4xl font-headline font-bold text-on-surface mt-2">{emTransito}</p>
          </div>
          <div className="bg-surface-low p-6 border-l-2 border-secondary shadow-md">
            <p className="text-[10px] font-label text-on-surfaceVariant uppercase tracking-widest">Prontas / Estoque</p>
            <p className="text-4xl font-headline font-bold text-on-surface mt-2">{prontas}</p>
          </div>
          <div className="bg-surface-low p-6 border-l-2 border-[#ef4444] shadow-md">
            <p className="text-[10px] font-label text-on-surfaceVariant uppercase tracking-widest">Manutenção / Alertas</p>
            <p className="text-4xl font-headline font-bold text-[#ef4444] mt-2">{criticos}</p>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-surface-low border border-outline-variant/20 rounded-sm overflow-hidden shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30">
                <th className="p-5 font-label text-[10px] uppercase tracking-[0.2em] text-on-surfaceVariant">Designação do Ativo</th>
                <th className="p-5 font-label text-[10px] uppercase tracking-[0.2em] text-on-surfaceVariant">Origem</th>
                <th className="p-5 font-label text-[10px] uppercase tracking-[0.2em] text-on-surfaceVariant">Classificação</th>
                <th className="p-5 font-label text-[10px] uppercase tracking-[0.2em] text-on-surfaceVariant">Status do Ciclo de Vida</th>
                <th className="p-5 font-label text-[10px] uppercase tracking-[0.2em] text-on-surfaceVariant text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {inventario.map((peca) => {
                const { icon, color } = getIconForCategory(peca.categoria);
                const isProd = peca.status === 'EM_PRODUCAO' || peca.status === 'EM_TRANSPORTE' || peca.status === 'PRONTA';
                const isTransito = peca.status === 'EM_TRANSPORTE' || peca.status === 'PRONTA';
                const isPronto = peca.status === 'PRONTA';

                return (
                  <tr key={peca.codigo} className="hover:bg-surface-highest/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-sm border border-outline-variant/10">
                          <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface font-headline">{peca.nome}</div>
                          <div className="text-[10px] text-on-surfaceVariant font-label mt-1">ID: {peca.codigo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-xs font-label">{peca.fornecedor}</div>
                      <div className="text-[10px] text-on-surfaceVariant mt-1">{peca.categoria}</div>
                    </td>
                    <td className="p-5">
                      <span className="bg-surface-highest text-on-surfaceVariant border border-outline-variant/20 text-[9px] px-2 py-1 uppercase tracking-widest font-bold rounded-sm">
                        {peca.fornecedor.includes('GE') || peca.fornecedor.includes('Boeing') ? 'IMPORTADO' : 'NACIONAL'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1">
                        <div className={`flex flex-col items-center ${isProd ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-2 h-2 rounded-full mb-1 ${isProd ? 'bg-primary shadow-[0_0_8px_rgba(183,199,235,0.6)]' : 'bg-outline-variant'}`}></div>
                        </div>
                        <div className={`w-12 h-0.5 mt-[-4px] ${isTransito ? 'bg-primary/80' : 'bg-outline-variant/30'}`}></div>
                        
                        <div className={`flex flex-col items-center ${isTransito ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-2 h-2 rounded-full mb-1 ${isTransito ? 'bg-primary shadow-[0_0_8px_rgba(183,199,235,0.6)]' : 'bg-outline-variant'}`}></div>
                        </div>
                        <div className={`w-12 h-0.5 mt-[-4px] ${isPronto ? 'bg-primary/80' : 'bg-outline-variant/30'}`}></div>
                        
                        <div className={`flex flex-col items-center ${isPronto ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-2 h-2 rounded-full mb-1 ${isPronto ? 'bg-primary shadow-[0_0_8px_rgba(183,199,235,0.6)]' : 'bg-outline-variant'}`}></div>
                        </div>
                      </div>
                    </td>
                    
                    {/* BOTÕES DE AÇÃO REAIS (Editar e Deletar) */}
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleAbrirEdicao(peca)} className="text-on-surfaceVariant hover:text-primary transition-colors" title="Editar Peça">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button onClick={() => removerPeca(peca.codigo)} className="text-on-surfaceVariant hover:text-[#ef4444] transition-colors" title="Excluir Peça">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* DRAWER (Agora Dinâmico para Novo ou Edição) */}
      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-low border-l border-outline-variant/20 shadow-2xl z-[70] flex flex-col">
            
            <div className="p-8 border-b border-outline-variant/20 bg-surface-container">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#b5cad4] uppercase font-label">Recepção Logística</span>
                <button onClick={() => setIsDrawerOpen(false)} className="text-on-surfaceVariant hover:text-[#ef4444] transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h2 className="text-2xl font-headline font-bold text-on-surface">
                {isEditMode ? 'Editar Componente' : 'Novo Lote'}
              </h2>
              <p className="text-xs text-on-surfaceVariant mt-2 font-label">
                {isEditMode ? 'Altere as especificações ou o status operacional.' : 'Registre a entrada de componentes na cadeia de suprimentos.'}
              </p>
            </div>

            <form onSubmit={handleSalvar} className="flex-1 overflow-y-auto p-8 space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Código (SKU)</label>
                {/* Se for edição, o código é bloqueado para não quebrar a referência */}
                <input required disabled={isEditMode} value={codigo} onChange={e => setCodigo(e.target.value)} className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-[#b5cad4] focus:bg-surface-low text-[#b5cad4] outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm font-headline tracking-widest uppercase shadow-inner disabled:opacity-50" placeholder="EX: PRP-102" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Nome do Componente</label>
                <input required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-[#b5cad4] focus:bg-surface-low text-on-surface outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm shadow-inner" placeholder="ex: Turbina GE-90" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Categoria</label>
                  <div className="relative">
                    <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full appearance-none bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-[#b5cad4] focus:bg-surface-low text-on-surface outline-none transition-all pr-10 text-xs font-headline uppercase shadow-inner cursor-pointer">
                      <option className="bg-background text-on-surface">PROPULSÃO</option>
                      <option className="bg-background text-on-surface">AVIÔNICOS</option>
                      <option className="bg-background text-on-surface">ESTRUTURA</option>
                      <option className="bg-background text-on-surface">INTERIOR</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surfaceVariant text-sm">keyboard_arrow_down</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Status Operacional</label>
                  <div className="relative">
                    <select value={status} onChange={e => setStatus(e.target.value as StatusPeca)} className="w-full appearance-none bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-[#b5cad4] focus:bg-surface-low text-primary font-bold outline-none transition-all pr-10 text-xs font-headline uppercase shadow-inner cursor-pointer">
                      <option value="EM_PRODUCAO" className="bg-background text-on-surface">Em Produção</option>
                      <option value="EM_TRANSPORTE" className="bg-background text-on-surface">Em Transporte</option>
                      <option value="PRONTA" className="bg-background text-on-surface">Pronto / Estoque</option>
                      <option value="MANUTENCAO" className="bg-background text-error">Manutenção</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surfaceVariant text-sm">keyboard_arrow_down</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Fornecedor</label>
                <input required value={fornecedor} onChange={e => setFornecedor(e.target.value)} className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-[#b5cad4] focus:bg-surface-low text-on-surface outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm shadow-inner" placeholder="ex: Boeing, GE, Honeywell" />
              </div>

              {/* BOTOES */}
              <div className="flex gap-4 pt-6 mt-auto">
                <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest text-on-surfaceVariant hover:text-[#b5cad4] hover:bg-[#b5cad4]/10 transition-colors border border-outline-variant/30 hover:border-[#b5cad4]/50 rounded-sm font-headline">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest bg-[#1b2e36] text-[#b5cad4] border border-[#b5cad4]/30 rounded-sm hover:bg-[#b5cad4] hover:text-background active:scale-95 transition-all shadow-[0_0_15px_rgba(181,202,212,0.1)] hover:shadow-[0_0_20px_rgba(181,202,212,0.3)] font-headline">
                  {isEditMode ? 'Salvar Alterações' : 'Dar Entrada'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}