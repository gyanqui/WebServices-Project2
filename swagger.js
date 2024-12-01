const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
    title: 'User API',
    description: 'Users API'
    },
    host: 'localhost:3000',
    schema: ['https'],


    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {
                'user:email': 'Access to user email'
            }
        }
    },
    security: [{
        OAuth2: ['user:email']
    }]

};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
