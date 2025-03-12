import express from 'express';
import minimist from 'minimist';
import { createServer } from 'http';
import { startMount } from './mount/start.js';

export async function start () {
  let args;
  args = minimist (process.argv.slice (2));

  console.log ('- args:', args);
  console.log ('');

  if (args.start === true) {
    if (args.port === undefined) { args.port = 9100 }
    startServer ({ args });
  }
}

export async function startServer (details = {}) {
  let { args } = details;
  let app, nodeServer, server;

  app = {
    data: {
      port: args.port,
    },
    temp: {
      args,
    },
  }

  server = express ();
  nodeServer = createServer (server);

  Object.assign (app.temp, {
    nodeServer,
    server,
  })

  await startMount ({ app });

  nodeServer.listen (app.data.port, () => {
    console.log ('- MyTracker server started on port:', app.data.port);
  });
}
