const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
    title: 'User API',
    description: 'Users API'
    },
    host: 'localhost:3000',
    schema: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
