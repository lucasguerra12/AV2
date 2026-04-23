# ✈️ AEROCODE — Kinetic Vault

> **Sistema de Gestão de Produção Aeronáutica**  
> Plataforma web para controle e monitoramento do ciclo de vida de aeronaves: da montagem ao relatório de entrega técnica.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura](#-arquitetura)
- [Modelo de Dados](#-modelo-de-dados)
- [Controle de Acesso (RBAC)](#-controle-de-acesso-rbac)
- [Páginas e Rotas](#-páginas-e-rotas)
- [Como Executar](#-como-executar)
- [Credenciais de Teste](#-credenciais-de-teste)
- [Sistema de Logs](#-sistema-de-logs)
- [Persistência de Dados](#-persistência-de-dados)

---

## 🌐 Visão Geral

O **Aerocode** é uma aplicação web de gestão operacional voltada para o setor aeronáutico. Desenvolvida como projeto acadêmico, a plataforma permite que equipes técnicas monitorem toda a linha de produção de aeronaves — desde o cadastro do ativo na frota, passando pelo gerenciamento de etapas de montagem, controle de inventário de peças e execução de testes de qualidade, até a geração do **Relatório Técnico de Entrega** ao final do processo.

O sistema foi projetado com uma identidade visual de alta fidelidade, inspirada em sistemas de controle aeroespacial, utilizando uma paleta **dark mode** com tokens de design bem definidos, tipografia técnica e uma UX otimizada para uso profissional em ambientes industriais.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Sessão
- Login por usuário e senha com validação client-side
- Proteção de rotas via `React Router` — usuários não autenticados são redirecionados para `/login`
- Sessão persistida em `localStorage`, com logout explícito disponível na barra lateral
- Registro de eventos de acesso no log do sistema (entrada e saída de sessão)

### ✈️ Gestão da Frota (Aeronaves)
- Listagem tabular de todas as aeronaves cadastradas com código único e modelo
- Cadastro de novas aeronaves com: código, modelo, tipo (COMERCIAL / MILITAR), capacidade de passageiros e alcance em km
- Edição e exclusão de aeronaves (restrito ao perfil ADMINISTRADOR)
- Drill-down para o **Painel de Detalhes** de cada aeronave
- Cálculo automático de **Integridade de Montagem** (% de etapas concluídas)

### 📦 Detalhes da Aeronave
- Visualização de todos os dados técnicos do ativo
- Barra de progresso da integridade de montagem (0% a 100%)
- Gestão de **Etapas de Produção**: criação, atualização de status e remoção
- Alocação de funcionários por etapa de produção
- Gestão de **Testes de Qualidade**: elétrico, hidráulico e aerodinâmico — com datas de validade e resultado (APROVADO / REPROVADO / pendente)
- Vinculação e desvinculação de peças do inventário à aeronave
- Acesso ao **Relatório Final** habilitado somente quando integridade atinge 100%

### 📋 Relatório Técnico de Entrega
- Gerado automaticamente ao final de todas as etapas concluídas
- Exibe: dados da aeronave, etapas concluídas com responsáveis alocados, testes realizados com resultados e peças utilizadas
- Exportação para arquivo `.txt` com assinatura digital simulada (`VALIDADA - AEROCODE SYSTEMS`)
- Identificação do inspetor (usuário logado) e data de emissão

### 🗂️ Inventário de Componentes
- Cadastro e edição de peças com: código, nome, categoria, fornecedor e status logístico
- Status possíveis: `PRONTA`, `EM_TRANSPORTE`, `EM_PRODUCAO`, `MANUTENCAO`
- Vinculação direta de componentes à aeronave destino
- Filtro automático: apenas peças com status `PRONTA` e sem destino aparecem disponíveis para vinculação

### 👥 Gestão de Equipe
- Listagem de todos os membros autorizados com nível de permissão
- Credenciamento de novos membros com nome, usuário, senha, telefone, endereço e nível de acesso
- Revogação de acesso (remoção) restrita ao ADMINISTRADOR
- Visibilidade da aba restrita a ADMINISTRADOR e ENGENHEIRO

### 📊 Dashboard de Operações
- Cards de métricas em tempo real: frota ativa, peças em trânsito, testes aprovados e alertas críticos
- Tabela de monitoramento com as aeronaves mais recentes
- Feed de **logs do sistema** ao vivo (últimas 15 ações)

---

## 🛠 Stack Tecnológica

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Framework UI** | React | `^19.2.4` |
| **Linguagem** | TypeScript | `^6.0.3` |
| **Build Tool** | Vite | `^8.0.4` |
| **Roteamento** | React Router DOM | `^7.14.1` |
| **Estilização** | Tailwind CSS | `^3.4.17` |
| **Ícones** | Lucide React | `^1.8.0` |
| **Ícones Material** | Google Material Symbols | CDN |
| **Tipografia** | Space Grotesk + Inter | Google Fonts |
| **Linting** | ESLint + TypeScript ESLint | `^9.39.4` |

---

## 📁 Estrutura do Projeto

```
AV2-main/
└── app/
    ├── public/
    │   ├── favicon.svg          # Ícone da aplicação
    │   └── icons.svg            # Sprites de ícones SVG
    ├── src/
    │   ├── assets/
    │   │   └── hero.png         # Imagem hero (login/marketing)
    │   ├── components/
    │   │   └── layout/
    │   │       ├── Layout.tsx   # Wrapper principal com Sidebar + Outlet
    │   │       └── Sidebar.tsx  # Navegação lateral persistente
    │   ├── contexts/
    │   │   └── SystemContext.tsx # Estado global + lógica de negócio
    │   ├── domain/
    │   │   └── types.ts         # Tipos e interfaces TypeScript
    │   ├── infrastructure/
    │   │   └── mocks.ts         # Dados iniciais (seed) da aplicação
    │   ├── pages/
    │   │   ├── Login.tsx        # Tela de autenticação
    │   │   ├── Dashboard.tsx    # Painel de métricas e logs
    │   │   ├── Aeronaves.tsx    # Lista e CRUD de aeronaves
    │   │   ├── AeronaveDetalhe.tsx # Painel completo de um ativo
    │   │   ├── Relatorio.tsx    # Relatório técnico de entrega
    │   │   ├── Inventario.tsx   # Gestão de peças e componentes
    │   │   └── Equipe.tsx       # Gestão de membros e credenciais
    │   ├── App.tsx              # Roteamento e providers raiz
    │   ├── main.tsx             # Entry point React
    │   ├── App.css              # Estilos globais e animações
    │   └── index.css            # Importação do Tailwind
    ├── index.html               # HTML raiz com fontes e meta tags
    ├── tailwind.config.js       # Design tokens e tema customizado
    ├── vite.config.ts           # Configuração do Vite
    ├── tsconfig.json            # Configuração TypeScript raiz
    └── package.json             # Dependências e scripts NPM
```

---

## 🏗 Arquitetura

A aplicação segue uma arquitetura **orientada a contexto**, sem backend ou banco de dados real — ideal para prototipagem e avaliações acadêmicas.

```
┌─────────────────────────────────────────────────┐
│                   App.tsx                       │
│   ┌─────────────────────────────────────────┐   │
│   │           SystemProvider               │   │
│   │   (Estado Global via React Context)    │   │
│   │                                        │   │
│   │  ┌──────────────────────────────────┐  │   │
│   │  │         BrowserRouter            │  │   │
│   │  │                                  │  │   │
│   │  │  /login  →  <Login />            │  │   │
│   │  │                                  │  │   │
│   │  │  [ProtectedRoutes]               │  │   │
│   │  │   /           → <Dashboard />    │  │   │
│   │  │   /aeronaves  → <Aeronaves />    │  │   │
│   │  │   /aeronaves/:id → <Detalhe />   │  │   │
│   │  │   /aeronaves/:id/relatorio       │  │   │
│   │  │   /inventario → <Inventario />   │  │   │
│   │  │   /equipe     → <Equipe />       │  │   │
│   │  └──────────────────────────────────┘  │   │
│   └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

        ┌───────────────────────────────┐
        │       SystemContext           │
        │  - Estado: aeronaves          │
        │  - Estado: inventario         │
        │  - Estado: equipe             │
        │  - Estado: logs               │
        │  - Estado: usuarioLogado      │
        │                               │
        │  Persistência: localStorage   │
        │  Seed inicial: mocks.ts       │
        └───────────────────────────────┘
```

**Fluxo de dados:**
1. O `SystemProvider` inicializa o estado a partir do `localStorage` (se existir) ou dos dados mockados em `mocks.ts`
2. Qualquer página acessa e manipula o estado via hook `useSystem()`
3. Toda mutação dispara um `useEffect` que persiste o estado atualizado no `localStorage`
4. Ações relevantes geram entradas no feed de logs em tempo real

---

## 🗃 Modelo de Dados

### `Funcionario`
```ts
interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha?: string;
  nivelPermissao: 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR';
}
```

### `Aeronave`
```ts
interface Aeronave {
  codigo: string;          // Identificador único (ex: "KV-001")
  modelo: string;          // Ex: "Boeing 737-800"
  tipo: 'COMERCIAL' | 'MILITAR';
  capacidade: number;      // Passageiros
  alcance: number;         // Km
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}
```

### `Etapa`
```ts
interface Etapa {
  id: string;
  nome: string;
  status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA' | 'BLOQUEADA';
  prazo: string;
  funcionariosAlocados: Funcionario[];
  etapaAnteriorId?: string | null;
}
```

### `Teste`
```ts
interface Teste {
  id: string;
  nome: string;
  tipo: 'ELETRICO' | 'HIDRAULICO' | 'AERODINAMICO';
  dataValidade: string;
  resultado: 'APROVADO' | 'REPROVADO' | null;
}
```

### `Peca`
```ts
interface Peca {
  id: string;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: 'PRONTA' | 'EM_TRANSPORTE' | 'EM_PRODUCAO' | 'MANUTENCAO';
}
```

### `PecaInventario` (Inventário Global)
```ts
interface PecaInventario {
  codigo: string;
  nome: string;
  categoria: string;
  fornecedor: string;
  status: StatusPeca;
  aeronaveDestino?: string | null;
}
```

---

## 🔒 Controle de Acesso (RBAC)

O sistema implementa **Role-Based Access Control** com três perfis de usuário:

| Funcionalidade | ADMINISTRADOR | ENGENHEIRO | OPERADOR |
|---|:---:|:---:|:---:|
| Visualizar Dashboard | ✅ | ✅ | ✅ |
| Visualizar Frota | ✅ | ✅ | ✅ |
| **Cadastrar / Editar Aeronave** | ✅ | ❌ | ❌ |
| **Excluir Aeronave** | ✅ | ❌ | ❌ |
| Visualizar Detalhes da Aeronave | ✅ | ✅ | ✅ |
| Gerenciar Etapas e Testes | ✅ | ✅ | ✅ |
| Visualizar Inventário | ✅ | ✅ | ✅ |
| Gerenciar Peças (CRUD) | ✅ | ✅ | ✅ |
| Visualizar Equipe | ✅ | ✅ | ❌ |
| **Credenciar / Remover Membros** | ✅ | ❌ | ❌ |
| Gerar Relatório de Entrega | ✅ | ✅ | ✅ |

> A aba **Equipe** é invisível para usuários com perfil `OPERADOR`. Ações exclusivas do `ADMINISTRADOR` têm seus botões ocultados dinamicamente para os demais perfis.

---

## 🗺 Páginas e Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/login` | `Login.tsx` | Autenticação. Redireciona para `/` em caso de sucesso. |
| `/` | `Dashboard.tsx` | Painel principal com métricas e feed de logs. |
| `/aeronaves` | `Aeronaves.tsx` | Lista de aeronaves com CRUD (requer ADMIN para escrita). |
| `/aeronaves/:id` | `AeronaveDetalhe.tsx` | Painel completo do ativo: etapas, testes, peças, equipe. |
| `/aeronaves/:id/relatorio` | `Relatorio.tsx` | Relatório técnico final (disponível com 100% de integridade). |
| `/inventario` | `Inventario.tsx` | Gestão de componentes e peças aeronáuticas. |
| `/equipe` | `Equipe.tsx` | Gestão de membros (oculto para OPERADOR). |

Todas as rotas exceto `/login` são protegidas por `<ProtectedRoutes />`, que redireciona automaticamente para `/login` caso não haja sessão ativa.

---

## ▶️ Como Executar

### Pré-requisitos

- **Node.js** `>= 18.x`
- **npm** `>= 9.x` (ou `yarn`, `pnpm`)

### Instalação

```bash
# Clone ou extraia o repositório
cd AV2-main/app

# Instale as dependências
npm install
```

### Desenvolvimento (Hot Reload)

```bash
npm run dev
```

Acesse em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

O output estático será gerado em `app/dist/`.

### Preview do Build de Produção

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🔑 Credenciais de Teste

Use os dados abaixo para explorar os diferentes níveis de acesso do sistema:

| Perfil | Usuário | Senha | Nome Completo |
|---|---|---|---|
| **ADMINISTRADOR** | `admin` | `123456` | Eng. Chefe Gerson |
| **ENGENHEIRO** | `eng` | `123456` | Eng. Lucas Guerra |
| **OPERADOR** | `op` | `123456` | Téc. Marcos Silva |

> ⚠️ As credenciais são armazenadas no `localStorage` do navegador. Para resetar o estado da aplicação, limpe o `localStorage` via DevTools (`F12` → Application → Local Storage → Clear All).

---

## 📟 Sistema de Logs

O Aerocode possui um feed de auditoria em tempo real exibido no Dashboard. Cada ação relevante no sistema gera um log com as seguintes propriedades:

| Campo | Descrição |
|---|---|
| `time` | Hora do evento (HH:MM:SS) |
| `tag` | Categoria da ação (ex: `ACESSO`, `FROTA`, `PRODUÇÃO`, `LOGÍSTICA`, `SEGURANÇA`, `ALERTA`) |
| `color` | Classe CSS de cor associada à tag |
| `text` | Descrição legível do evento |

O feed mantém as **últimas 15 entradas** e atualiza automaticamente sempre que uma ação é executada no sistema.

**Exemplos de logs gerados:**

```
[09:14:32]  SIST      Sistema Kinetic Vault iniciado.
[09:14:55]  ACESSO    Usuário admin autenticado.
[09:15:10]  FROTA     Ativo KV-002 registrado.
[09:16:02]  PRODUÇÃO  Colaborador alocado na etapa do ativo KV-001.
[09:17:30]  LOGÍSTICA Componente PRP-903 adicionado.
[09:18:44]  ALERTA    Credencial de acesso revogada.
```

---

## 💾 Persistência de Dados

Toda a camada de dados é gerenciada via **`localStorage`** do navegador. Não há backend ou banco de dados externo.

| Chave no localStorage | Conteúdo |
|---|---|
| `ac_aeronaves` | Array de aeronaves com etapas, testes e peças |
| `ac_inventario` | Array de peças do inventário global |
| `ac_equipe` | Array de funcionários/usuários |
| `ac_logs` | Feed de logs do sistema |
| `ac_usuario` | Objeto do usuário logado atualmente |

O estado é inicializado com dados de seed definidos em `src/infrastructure/mocks.ts` na primeira execução (quando o `localStorage` está vazio).

---

## 🎨 Design System

O projeto utiliza um tema **dark mode** customizado definido no `tailwind.config.js`, com os seguintes tokens de design:

| Token | Valor HEX | Uso |
|---|---|---|
| `background` | `#10131a` | Fundo geral da aplicação |
| `surface.low` | `#191c22` | Sidebar e painéis principais |
| `surface.container` | `#1d2026` | Cards e contêineres |
| `surface.highest` | `#32353c` | Hover states |
| `primary` | `#b7c7eb` | Textos de destaque, ícones ativos, borda ativa |
| `primary.container` | `#1b2b48` | Fundo do item de nav ativo |
| `on.surface` | `#e1e2eb` | Texto principal |
| `on.surfaceVariant` | `#c5c6ce` | Texto secundário / labels |
| `outline.variant` | `#44474d` | Bordas e divisores |

**Tipografia:**
- **Headline**: `Space Grotesk` — títulos, labels de navegação, códigos
- **Body / Label**: `Inter` — textos corridos, formulários, tabelas

---

<div align="center">
  <sub>Desenvolvido como projeto acadêmico na Fatec São José dos Campos · Curso DSM</sub>
</div>
