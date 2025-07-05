# Brain Agriculture

O Brain Agriculture é uma aplicação full-stack projetada para gerenciar produtores rurais, suas fazendas e plantações.

## Visão Geral do Projeto

Este projeto é dividido em duas partes principais:

- **Backend:** Uma API RESTful construída com Node.js, Express e TypeScript, responsável por toda a lógica de negócios e interação com o banco de dados.
    
- **Frontend:** Uma aplicação de página única (SPA) desenvolvida com React, TypeScript e Vite, que consome a API do backend para fornecer uma interface de usuário para o gerenciamento de dados.
    

## Backend

O backend é construído usando uma arquitetura em camadas, separando as responsabilidades em controladores, serviços e repositórios.

### Tecnologias

- **Node.js:** Ambiente de execução para o JavaScript no servidor.
    
- **Express:** Framework web para a construção da API RESTful.
    
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
    
- **TypeORM:** ORM (Object-Relational Mapper) para a interação com o banco de dados.
    
- **MySQL:** Banco de dados relacional utilizado para armazenar os dados da aplicação.
    
- **Swagger:** Ferramenta para documentação da API, permitindo a visualização e teste dos endpoints.
    
- **Docker:** A aplicação utiliza o Docker para criar um ambiente de desenvolvimento com um contêiner para o banco de dados MySQL.
    

### Estrutura de Diretórios

```
src/
├── controllers/      # Controladores da API
├── services/         # Lógica de negócio
├── model/            # Entidades e repositórios
│   ├── entities/     # Entidades do TypeORM
│   ├── repositories/ # Repositórios
│   └── database/     # Configuração do banco
├── middlewares/      # Middlewares do Express
├── utils/            # Utilitários
├── dtos/             # Data Transfer Objects
├── docs/             # Documentação Swagger
├── routers/          # Rotas da API
└── tests/            # Testes
    └── integration/  # Testes de integração
```

### Endpoints da API

A API fornece endpoints para o gerenciamento de produtores, fazendas, safras e culturas.

#### Produtores

- `GET /producers`: Lista todos os produtores.
    
- `POST /producers`: Cria um novo produtor.
    
- `GET /producers/:id`: Busca um produtor por ID.
    
- `PUT /producers/:id`: Atualiza um produtor.
    
- `DELETE /producers/:id`: Remove um produtor.
    
- `GET /producers/:id/farms`: Lista as fazendas de um produtor.
    
- `GET /producers/:id/harvests`: Lista as safras de um produtor.
    
- `GET /producers/:id/cultivates`: Lista os cultivos de um produtor.
    
- `GET /producers/document/:document`: Busca um produtor pelo documento (CPF/CNPJ).
    
- `GET /producers/dashboard`: Retorna os dados para o dashboard.
    

#### Fazendas

- `GET /farms`: Lista todas as fazendas.
    
- `POST /farms`: Cria uma nova fazenda.
    
- `GET /farms/:id`: Busca uma fazenda por ID.
    
- `PUT /farms/:id`: Atualiza uma fazenda.
    
- `DELETE /farms/:id`: Remove uma fazenda.
    
- `GET /farms/:id/producer`: Busca o produtor de uma fazenda.
    
- `GET /farms/:id/harvests`: Lista as safras de uma fazenda.
    
- `GET /farms/:id/cultivates`: Lista os cultivos de uma fazenda.
    
- `GET /farms/state/:state`: Lista fazendas por estado.
    

#### Safras

- `GET /harvests`: Lista todas as safras.
    
- `POST /harvests`: Cria uma nova safra.
    
- `GET /harvests/:id`: Busca uma safra por ID.
    
- `PUT /harvests/:id`: Atualiza uma safra.
    
- `DELETE /harvests/:id`: Remove uma safra.
    
- `GET /harvests/:id/farm`: Busca a fazenda de uma safra.
    
- `GET /harvests/:id/cultivates`: Lista os cultivos de uma safra.
    

#### Culturas

- `GET /cultivates`: Lista todos os cultivos.
    
- `POST /cultivates`: Cria um novo cultivo.
    
- `GET /cultivates/:id`: Busca um cultivo por ID.
    
- `PUT /cultivates/:id`: Atualiza um cultivo.
    
- `DELETE /cultivates/:id`: Remove um cultivo.
    
- `GET /cultivates/farm/:farmId`: Lista cultivos por fazenda.
    
- `GET /cultivates/:id/harvests`: Busca cultivo com safra e fazenda.
    

## Frontend

O frontend é uma aplicação React moderna que utiliza o Redux Toolkit para o gerenciamento do estado e o React Router para a navegação.

### Tecnologias

- **React:** Biblioteca para a construção de interfaces de usuário.
    
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
    
- **Vite:** Ferramenta de build para o desenvolvimento frontend.
    
- **Redux Toolkit:** Biblioteca para o gerenciamento do estado da aplicação.
    
- **React Router:** Biblioteca para o gerenciamento de rotas na aplicação.
    
- **Styled Components:** Biblioteca para a estilização de componentes React.
    

### Estrutura de Diretórios

```
src/
├── app/              # Configuração do Redux
├── api/              # Lógica da API e slices do Redux
├── components/       # Componentes React reutilizáveis
├── pages/            # Páginas da aplicação
├── styles/           # Estilos globais
├── types/            # Tipos TypeScript
└── main.tsx          # Ponto de entrada da aplicação
```

### Funcionalidades

O frontend permite ao usuário:

- **Visualizar um dashboard** com o total de fazendas, área total, distribuição por estado, distribuição por cultura e uso de solo.
    
- **Listar, criar, editar e excluir produtores.**
    
- **Visualizar e gerenciar as fazendas** de cada produtor.
    

## Como Executar

Para executar o projeto, siga os passos abaixo:

### Pré-requisitos

- Node.js (versão 18 ou superior)
    
- Docker
    
- Git
    

### Backend

1. **Clone o repositório:**
    
    Bash
    
    ```
    git clone git@github.com:devfelipesantiago/Serasa-test-fullstack.git
    ```
    
2. **Navegue até o diretório do backend:**
    
    Bash
    
    ```
    cd Serasa-test-fullstack/brain-agriculture-backend
    ```
    
3. **Crie o arquivo de variáveis de ambiente:**
    
    - Renomeie o arquivo `.env.example` para `.env` e preencha com as suas credenciais do banco de dados.
        
4. **Inicie o contêiner do Docker:**
    
    Bash
    
    ```
    docker-compose up -d
    ```
    
5. **Instale as dependências:**
    
    Bash
    
    ```
    npm install
    ```
    
6. **Execute o servidor de desenvolvimento:**
    
    Bash
    
    ```
    npm run dev
    ```
    

O servidor do backend estará rodando em `http://localhost:3001`.

### Frontend

1. **Navegue até o diretório do frontend:**
    
    Bash
    
    ```
    cd ../brain-agriculture-frontend
    ```
    
2. **Instale as dependências:**
    
    Bash
    
    ```
    npm install
    ```
    
3. **Execute o servidor de desenvolvimento:**
    
    Bash
    
    ```
    npm run dev
    ```
    

A aplicação frontend estará disponível em `http://localhost:5173`.