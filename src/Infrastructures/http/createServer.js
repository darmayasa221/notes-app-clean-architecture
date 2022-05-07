const Hapi = require('@hapi/hapi');
const notes = require('../../Interfaces/http/api/notes');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([{
    plugin: notes,
    options: { container },
  }]);

  return server;
};

module.exports = createServer;
