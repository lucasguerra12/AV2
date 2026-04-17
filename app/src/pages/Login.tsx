import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TerminalStream() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const generateLine = () => {
      const prefixes = ['[SYS_CORE]', '[AUTH_NET]', '[KINETIC]', '[ENC_AES]', '[NODE_07]', '[TELEMETRY]'];
      const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
      const statuses = ['OK', 'ACTIVE', 'VERIFIED', 'STANDBY', 'SECURE', 'ENCRYPTED'];
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return `${prefix} 0x${hex} ...... ${status}`;
    };

    setLines(Array.from({ length: 30 }, generateLine));

    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        for(let i=0; i<3; i++) {
          const randomIndex = Math.floor(Math.random() * newLines.length);
          newLines[randomIndex] = generateLine();
        }
        return newLines;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-40 top-0 h-full overflow-hidden flex flex-col justify-center gap-1 opacity-15 pointer-events-none select-none font-headline text-[10px] text-primary whitespace-nowrap z-0 drop-shadow-[0_0_8px_rgba(183,199,235,0.6)]">
      {lines.map((line, i) => (
        <div key={i} className="transition-opacity duration-100">{line}</div>
      ))}
    </div>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [operatorId, setOperatorId] = useState('');
  const [authKey, setAuthKey] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (authKey.length < 6) {
        setError('AUTENTICAÇÃO FALHOU: Chave de autorização inválida ou expirada.');
        setIsLoading(false);
        return;
      }

      const fakeUser = {
        id: 'ARC-29402',
        nome: operatorId, 
        nivelPermissao: 'ENGENHEIRO'
      };
      localStorage.setItem('@Aerocode:user', JSON.stringify(fakeUser));
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center overflow-hidden relative font-body">
      
      {/* Background Layers (Mantidos iguais) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-0 " ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-12 left-12 border-l border-t border-outline-variant/30 w-32 h-32"></div>
        <div className="absolute bottom-12 right-12 border-r border-b border-outline-variant/30 w-32 h-32"></div>
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-70">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surfaceVariant/50">Terminal Status</span>
            <span className="text-xs font-headline text-primary/70">VAULT_ACTIVE_00</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surfaceVariant/50">Encryption</span>
            <span className="text-xs font-headline text-primary/70">AES_256_KINETIC</span>
          </div>
        </div>
      </div>

      <TerminalStream />

      <main className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-surface-highest/20 border border-outline-variant/20 rounded">
            <span className="material-symbols-outlined text-primary scale-125">security</span>
          </div>
          <h1 className="text-2xl font-headline font-bold tracking-[0.25em] text-on-background">AEROCODE</h1>
          <p className="text-[10px] font-label uppercase tracking-[0.15em] text-on-surfaceVariant mt-2">Kinetic Defense Architecture</p>
        </div>

        <div className="bg-surface-container/40 backdrop-blur-3xl p-8 rounded-lg shadow-[0_0_80px_rgba(11,14,20,0.8)] border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-primary/30 to-transparent"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-label uppercase tracking-widest text-on-surfaceVariant">User Identifier</label>
                <span className="text-[9px] font-label text-outline-variant">LEVEL_05_REQ</span>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  disabled={isLoading}
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  className="w-full bg-background border border-outline-variant/40 text-on-surface p-4 rounded focus:ring-0 focus:border-primary transition-colors text-sm font-body placeholder:text-outline-variant/50 disabled:opacity-50" 
                  placeholder="Operator ID / Service Email" 
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm text-primary">alternate_email</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-label uppercase tracking-widest text-on-surfaceVariant">Authorization Key</label>
                <button type="button" className="text-[9px] font-label uppercase text-primary/60 hover:text-primary transition-colors">Reset Protocol</button>
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  required
                  disabled={isLoading}
                  value={authKey}
                  onChange={(e) => setAuthKey(e.target.value)}
                  className="w-full bg-background border border-outline-variant/40 text-on-surface p-4 rounded focus:ring-0 focus:border-primary transition-colors text-sm font-headline tracking-widest placeholder:text-outline-variant/50 disabled:opacity-50" 
                  placeholder="••••••••••••" 
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm text-primary">lock</span>
                </div>
              </div>
            </div>

            {/* MENSAGEM DE ERRO VISUAL */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 p-3 rounded flex items-start gap-2">
                <span className="material-symbols-outlined text-red-500 text-[16px] mt-0.5">error</span>
                <p className="text-[10px] text-red-400 font-label tracking-wide uppercase leading-relaxed">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-surface-highest font-headline font-bold uppercase tracking-widest text-xs py-4 rounded transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span>Initiate Session</span>
                    <span className="material-symbols-outlined text-base">login</span>
                  </>
                )}
              </button>
              
              <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-label uppercase tracking-widest text-on-surfaceVariant">Access restricted to authorized employees</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}