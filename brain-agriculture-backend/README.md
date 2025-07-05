# Brain Agriculture Backend

Backend da aplicação Brain Agriculture desenvolvido em Node.js com TypeScript, Express e TypeORM.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados

## 📋 Pré-requisitos

- Node.js 18+
- MySQL 8.0+
- Git

## 🛠️ Instalação

### Desenvolvimento Local

1. **Clone o repositório**
```bash
git clone <repository-url>
cd brain-agriculture-backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env com suas configurações
```

4. **Configure o banco de dados**
```bash
# Crie o banco de dados
mysql -u root -p -e "CREATE DATABASE serasa;"
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Estrutura dos Testes

- **Testes de Integração**: `src/tests/integration/`
  - `farm.integration.test.ts` - Testes para Farm
  - `producer.integration.test.ts` - Testes para Producer
  - `harvest.integration.test.ts` - Testes para Harvest
  - `cultivate.integration.test.ts` - Testes para Cultivate

### Cobertura de Testes

O projeto utiliza NYC para cobertura de testes com meta de **85%**.

## 📊 API Endpoints

### Farms
- `GET /farms` - Lista todas as fazendas
- `POST /farms` - Cria uma nova fazenda
- `GET /farms/:id` - Busca fazenda por ID
- `PUT /farms/:id` - Atualiza fazenda
- `DELETE /farms/:id` - Remove fazenda
- `GET /farms/:id/harvests` - Lista safras da fazenda
- `GET /farms/:id/cultivates` - Lista cultivos da fazenda
- `GET /farms/state/:state` - Lista fazendas por estado

### Producers
- `GET /producers` - Lista todos os produtores
- `POST /producers` - Cria um novo produtor
- `GET /producers/:id` - Busca produtor por ID
- `PUT /producers/:id` - Atualiza produtor
- `DELETE /producers/:id` - Remove produtor
- `GET /producers/:id/farms` - Lista fazendas do produtor

### Harvests
- `GET /harvests` - Lista todas as safras
- `POST /harvests` - Cria uma nova safra
- `GET /harvests/:id` - Busca safra por ID
- `PUT /harvests/:id` - Atualiza safra
- `DELETE /harvests/:id` - Remove safra
- `GET /harvests/:id/farm` - Busca fazenda da safra
- `GET /harvests/:id/cultivates` - Lista cultivos da safra

### Cultivates
- `GET /cultivates` - Lista todos os cultivos
- `POST /cultivates` - Cria um novo cultivo
- `GET /cultivates/:id` - Busca cultivo por ID
- `PUT /cultivates/:id` - Atualiza cultivo
- `DELETE /cultivates/:id` - Remove cultivo
- `GET /cultivates/farm/:farmId` - Lista cultivos por fazenda
- `GET /cultivates/:id/harvests` - Busca cultivo com safra e fazenda

## 📚 Documentação da API

A documentação da API está disponível em:
- **Swagger UI**: `http://localhost:3001/api-docs`
- **OpenAPI JSON**: `http://localhost:3001/api-docs.json`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Compila TypeScript
npm run start            # Inicia aplicação em produção

# Testes
npm test                 # Executa todos os testes
npm run test:coverage    # Executa testes com cobertura
npm run test:watch       # Executa testes em modo watch

# Linting
npm run lint             # Executa ESLint
npm run lint:fix         # Corrige problemas do ESLint
```

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/         # Controladores da API
├── services/           # Lógica de negócio
├── model/             # Entidades e repositórios
│   ├── entities/      # Entidades do TypeORM
│   ├── repositories/  # Repositórios
│   └── database/      # Configuração do banco
├── middlewares/       # Middlewares do Express
├── utils/            # Utilitários
├── dtos/             # Data Transfer Objects
├── docs/             # Documentação Swagger
├── routers/          # Rotas da API
└── tests/            # Testes
    └── integration/  # Testes de integração
```

## 🔒 Variáveis de Ambiente

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=test
DB_NAME=serasa

# Ambiente
NODE_ENV=development
PORT=3001
```