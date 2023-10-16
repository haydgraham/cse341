const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "ecommerce api",
    description: "cse341 project",
  },
  host: "cse341-qga0.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
