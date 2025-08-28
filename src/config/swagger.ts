import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Khorfakkan Smart City API',
      version: '1.0.0',
      description: 'API documentation for Khorfakkan Smart City Management System',
      contact: {
        name: 'API Support',
        email: 'support@khorfakkan.gov.ae'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.khorfakkan.gov.ae/api',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Park: {
          type: 'object',
          properties: {
            Id: { type: 'integer', example: 1 },
            park_Id: { type: 'string', example: 'PARK001' },
            park_english_name: { type: 'string', example: 'Central Park' },
            park_arabic_name: { type: 'string', example: 'الحديقة المركزية' },
            image: { type: 'string', example: 'park_image.jpg' },
            latitude: { type: 'number', format: 'decimal', example: 25.3314 },
            longitude: { type: 'number', format: 'decimal', example: 56.3419 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        SmokingDetection: {
          type: 'object',
          properties: {
            Id: { type: 'integer', example: 1 },
            park_Id: { type: 'integer', example: 1 },
            location: { type: 'string', example: 'Main Entrance Area' },
            camera_Id: { type: 'integer', example: 5 },
            occurrence_date: { type: 'string', format: 'date', example: '2024-01-15' },
            occurrence_time: { type: 'string', format: 'time', example: '14:30:00' },
            snap_shot: { type: 'string', example: 'smoking_detection_20240115_143000.jpg' },
            posted_to_intranet_date: { type: 'string', format: 'date', example: '2024-01-15' },
            posted_to_intranet_time: { type: 'string', format: 'time', example: '14:35:00' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        LitterDetection: {
          type: 'object',
          properties: {
            Id: { type: 'integer', example: 1 },
            park_Id: { type: 'integer', example: 1 },
            case_Id: { type: 'string', example: 'LITTER_20240115_001' },
            location: { type: 'string', example: 'Playground Area' },
            occurrence_date: { type: 'string', format: 'date', example: '2024-01-15' },
            occurrence_time: { type: 'string', format: 'time', example: '10:30:00' },
            snap_shot: { type: 'string', example: 'litter_detection_20240115_103000.jpg' },
            status: { type: 'string', enum: ['pending', 'in_progress', 'resolved', 'closed'], example: 'pending' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error message' },
            status: { type: 'integer', example: 400 }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options); 