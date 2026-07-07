# ⚽ Trybe Futebol Clube (TFC) API — Back-end Dockerizado com TDD & Sequelize

O **Trybe Futebol Clube (TFC)** é uma plataforma informativa e dinâmica sobre partidas e classificações de futebol. O foco central deste projeto foi o desenvolvimento completo da API do ecossistema, utilizando **TypeScript**, orquestrando o banco de dados relacional por meio do **Sequelize** e blindando o fluxo de dados seguindo rigorosamente a metodologia **TDD (Test-Driven Development)**.

A API foi projetada para ser consumida integralmente por um front-end (provido em React), integrando todos os serviços por meio de containers isolados no **Docker Compose**.

---

## 🚀 Habilidades Desenvolvidas & Consolidadas

Este projeto representou um marco na consolidação de práticas avançadas de engenharia de software no back-end:

* **Desenvolvimento Guiado por Testes (TDD):**
    * Escrita prévia de testes de integração e comportamento antes da implementação real das rotas e regras de negócio.
    * Garantia estrita de cobertura de linhas e arquivos usando **Mocha, Chai e Sinon**.
    * Uso avançado de *Stubs* para simular comportamentos do Sequelize, eliminando a dependência de um banco de dados real durante a suíte de testes.
* **Tipagem Estrita com TypeScript:**
    * Implementação completa de interfaces, tipos customizados e Generics para garantir a segurança em tempo de compilação.
* **Mapeamento Objeto-Relacional (ORM) com Sequelize:**
    * Criação e gerenciamento de *Migrations*, *Models* e relacionamentos associativos complexos (ex: tabelas com chaves estrangeiras duplas apontando para a mesma origem, como em `homeTeamId` e `awayTeamId`).
    * Uso de *Seeders* dinâmicas para população segura de dados em ambientes de teste e produção.
* **Arquitetura de Microsserviços e Dockerização:**
    * Criação de `Dockerfiles` otimizados para ambientes Node.js com TypeScript.
    * Configuração de redes e sincronização de status de inicialização usando *Healthchecks* no Docker Compose para orquestrar o banco de dados MySQL, o Front-end e o Back-end de forma harmônica.
* **Segurança e Criptografia:**
    * Proteção e hash de senhas de usuários através da biblioteca `bcryptjs`.
    * Geração, assinatura e validação de Tokens de acesso via **JWT (JSON Web Tokens)** com verificação baseada em níveis de acesso (*Roles*).

---

## 📁 Estrutura de Fluxos de Negócio Implementados

A API resolve a lógica interna de quatro fluxos cruciais da plataforma:

1.  **Teams (Times):** Listagem geral e busca filtrada por ID de clubes mapeados no banco.
2.  **Users & Login:** Processamento seguro de login com autenticação encriptada, validação de campos obrigatórios, geração de tokens JWT e verificação de cargo (`role: admin` ou `user`).
3.  **Matches (Partidas):** Criação de novas partidas em andamento, atualizações de placar em tempo real (via requisições `PATCH`), encerramento de partidas e filtros condicionais por meio de *query strings* (`?inProgress=true/false`).
4.  **Leaderboards (Placares):** Algoritmo avançado implementado nativamente no back-end para cálculo em tempo real de estatísticas de classificação (Total de Pontos, Jogos, Vitórias, Empates, Derrotas, Gols Pró, Gols Contra, Saldo de Gols e Aproveitamento Percentual), contendo critérios estritos de desempate ordenados de forma decrescente.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Linguagem Principal:** TypeScript (v4+)
* **Runtime:** Node.js
* **Framework Back-end:** Express.js
* **Mapeamento ORM:** Sequelize & `sequelize-cli`
* **Banco de Dados Relacional:** MySQL
* **Autenticação & Segurança:** JWT (jsonwebtoken) & bcryptjs
* **Ferramentas de Testes Unitários/Integração:** Mocha, Chai, Chai-Http e Sinon
* **Containers & Orquestração:** Docker & Docker Compose

---

## 🐳 Como Executar o Ecossistema Completo

Toda a infraestrutura do projeto está configurada para subir em poucos segundos usando o Docker Compose.

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:seu-usuario/sd-040-project-trybe-futebol-clube.git
    cd sd-040-project-trybe-futebol-clube
    ```

2.  **Instale todas as dependências das aplicações:**
    ```bash
    npm run install:apps
    ```

3.  **Suba os containers da aplicação (Back-end, Front-end e DB):**
    ```bash
    npm run compose:up
    ```
    *Isso ativará o Front-end na porta `3000`, o Back-end na porta `3001` e o MySQL na porta `3306` de forma orquestrada.*

4.  **Para derrubar ou resetar o ambiente:**
    ```bash
    npm run compose:down
    ```

---

## 🧪 Comandos de Testes e Qualidade (TDD)

Os testes automatizados podem ser executados a qualquer momento a partir da pasta raiz ou do escopo do back-end.

* **Executar os testes de integração e cobertura locais (Mocha/Chai):**
    ```bash
    # Entre no escopo do back-end
    cd app/backend

    # Execute a suite de testes
    npm test

    # Verifique a porcentagem de cobertura de código
    npm run test:coverage
    ```
* **Resetar as tabelas e rodar as Seeders dentro do container de back-end:**
    ```bash
    npm run db:reset
    ```

---

## 📐 Modelo de Dados (DER)

A estrutura relacional desenvolvida mapeia a interação lógica de campeonatos esportivos através do Sequelize:

* **`users`:** Armazena dados cadastrais e credenciais encriptadas.
* **`teams`:** Armazena o ID e o nome dos times de futebol.
* **`matches`:** Tabela de eventos que conecta os times de forma dupla através de chaves estrangeiras (`home_team_id` e `away_team_id`), salvando o progresso da partida e os saldos de gols.
