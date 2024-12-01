const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api',
    },
    host: 'https://project1-8xqo.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);