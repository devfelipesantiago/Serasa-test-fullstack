import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Serasa Test Fullstack API',
      version: '1.0.0',
      description: 'Documentação da API para o teste fullstack da Serasa',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor local'
      }
    ],
    components: {
      schemas: {
        Producer: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'João Silva' },
            document: { type: 'string', example: '12345678900' },
            farms: { type: 'array', items: { $ref: '#/components/schemas/Farm' } },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Farm: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Fazenda Primavera' },
            city: { type: 'string', example: 'Uberlândia' },
            state: { type: 'string', example: 'MG' },
            totalArea: { type: 'number', example: 100 },
            arableArea: { type: 'number', example: 60 },
            vegetationArea: { type: 'number', example: 40 },
            harvests: { type: 'array', items: { $ref: '#/components/schemas/Harvest' } },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Harvest: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            year: { type: 'integer', example: 2022 },
            cultivates: { type: 'array', items: { $ref: '#/components/schemas/Cultivate' } },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Cultivate: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Soja' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Maria Cliente' },
            email: { type: 'string', example: 'maria@email.com' },
            role: { type: 'string', enum: ['CLIENT', 'PARTNER', 'ADMIN'], example: 'CLIENT' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateUserDto: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Maria Cliente' },
            email: { type: 'string', example: 'maria@email.com' },
            password: { type: 'string', example: 'senhaSegura123' },
            role: { type: 'string', enum: ['CLIENT', 'PARTNER', 'ADMIN'], example: 'CLIENT' }
          }
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Maria Cliente' },
            email: { type: 'string', example: 'maria@email.com' },
            password: { type: 'string', example: 'novaSenha123' },
            role: { type: 'string', enum: ['CLIENT', 'PARTNER', 'ADMIN'], example: 'PARTNER' }
          }
        }
      }
    }
  },
  apis: [
    'src/routers/*.ts',
    'src/controllers/*.ts',
    'src/model/entities/*.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
