# AeroCode - Sistema de Gestão de Produção de Aeronaves

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-7.9.4-blue?logo=react-router)

Este projeto é uma Single Page Application (SPA) desenvolvida em React e TypeScript para a **AeroCode**, uma empresa fictícia especializada em software para a indústria aeroespacial.

[cite_start]A aplicação simula um protótipo navegável de um sistema de gestão para o processo de fabrico de aeronaves, desde o registo inicial de um projeto até à sua conclusão, incluindo a gestão de etapas, peças, testes e funcionários. [cite: 83, 92, 266]

## Funcionalidades Principais

[cite_start]O sistema foi projetado com uma arquitetura baseada em componentes e um fluxo de dados controlado, permitindo uma experiência de utilizador fluida e reativa. [cite: 270, 272]

* **Dashboard de Produção:** Visualização geral das aeronaves em produção, com estatísticas chave como número de aeronaves, total de peças e projetos concluídos.
* [cite_start]**Gestão de Aeronaves:** Funcionalidade para adicionar novas aeronaves ao sistema (restrito a Administradores e Engenheiros), com validação para evitar códigos duplicados. [cite: 93, 95]
* **Página de Detalhes da Aeronave:** Uma visão completa de cada aeronave, dividida em abas:
    * **Etapas de Produção:** Adicione, remova e altere o status das etapas. [cite_start]O sistema impõe uma ordem lógica, impedindo que uma etapa seja iniciada antes da anterior ser concluída. [cite: 102, 103, 104]
    * [cite_start]**Peças:** Gestão completa das peças associadas à aeronave. [cite: 97]
    * [cite_start]**Testes:** Registo de testes (elétricos, hidráulicos, etc.) e os seus resultados. [cite: 112, 113]
    * [cite_start]**Relatório:** Geração automática de um relatório de produção que pode ser descarregado como um ficheiro `.txt`. [cite: 114, 115]
* [cite_start]**Gestão de Funcionários:** Visualização da lista de funcionários e adição de novos utilizadores (apenas para Administradores). [cite: 106, 109]
* **Sistema de Permissões Baseado em Níveis:** A aplicação simula três níveis de acesso para controlar as ações disponíveis:
    * **Administrador:** Controlo total sobre todas as funcionalidades.
    * **Engenheiro:** Pode gerir aeronaves, etapas, peças e testes, mas não pode gerir funcionários.
    * [cite_start]**Operador:** Acesso limitado, pode apenas alterar o status das etapas (iniciar/finalizar). [cite: 109]

## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface de utilizador.
* [cite_start]**TypeScript:** Garante a tipagem estática, tornando o código mais robusto e seguro. [cite: 161, 163, 164]
* **React Router:** Para a gestão de rotas e navegação na SPA.
* **CSS:** Estilização pura para os componentes, organizada por componente.

## Como Executar o Projeto

Siga os passos abaixo para instalar e executar a aplicação em ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* `npm` ou `yarn`

### Instalação

1.  Clone o repositório para a sua máquina local:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  Navegue até a pasta do projeto:
    ```bash
    cd AV2
    ```

3.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

### Execução

1.  Para iniciar a aplicação em modo de desenvolvimento, execute:
    ```bash
    npm start
    ```

2.  A aplicação será aberta automaticamente no seu navegador padrão no endereço `http://localhost:3000`.

## Teste de Níveis de Permissão

Para testar as diferentes funcionalidades de acordo com o nível de acesso, utilize as seguintes credenciais de login (a senha pode ser qualquer uma):

* **Administrador:**
    * **Email:** `admin@aerocode.com`
    * **Acesso:** Pode ver e interagir com todas as funcionalidades, incluindo adicionar e remover funcionários.

* **Engenheiro:**
    * **Email:** `engenheiro@aerocode.com`
    * **Acesso:** Pode adicionar aeronaves e gerir todas as abas de produção (etapas, peças, testes), mas não vê os botões para gerir funcionários.

* **Operador:**
    * **Email:** `operador@aerocode.com`
    * **Acesso:** Tem uma visão de "leitura". Não pode adicionar ou remover nada. A sua única interação permitida é clicar nos botões "Iniciar" e "Finalizar" nas etapas de produção.

## Estrutura de Pastas do Projeto

A estrutura de ficheiros do projeto segue um padrão lógico para facilitar a manutenção:

```
src
├── assets/         # Imagens e logos
├── components/     # Componentes React reutilizáveis
├── data/           # Dados simulados (mock data)
├── models/         # Classes e Enums do TypeScript
├── pages/          # Componentes que representam as páginas da aplicação
├── App.tsx         # Componente principal, gere o estado e as rotas
└── index.tsx       # Ponto de entrada da aplicação
```

---
**Autor:**

[SEU NOME AQUI]