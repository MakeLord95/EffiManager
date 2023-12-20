const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API for EffiManager",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John",
              description: "Name of the user",
            },
            email: {
              type: "string",
              example: "john.doe@email.com",
              description: "Email of the user",
            },
            password: {
              type: "string",
              example: "ABCabc123",
              description: "Password of the user",
            },
          },
        },
      },
    },
  },
  apis: ["./routers/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
