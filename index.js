'use strict';

const Hapi = require('@hapi/hapi');

const quotes = require("./quotes.json");

const init = async () => {

    const server = Hapi.server({
      port: process.env.PORT || 4000,
      host: process.env.HOST || '0.0.0.0',
      routes: {
        cors: true,
      }
    });

    server.route({
        config: {
          cors: {
            origin: ['*']
          }
        },
        method: 'GET',
        path: '/quote',
        handler: function (request, h) {
            let quoteObject = {
                content: quotes[Math.floor(Math.random() * quotes.length)].content
            }
            return quoteObject;
        }
    });

    await server.start();
    console.log('Server is up and running on port ' + server.info.port);
}

init();
