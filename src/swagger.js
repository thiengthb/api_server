import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tracknova API',
      version: '1.0.0',
      description: 'RESTful APIs'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;

