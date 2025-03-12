export async function startMount (details = {}) {
  console.warn ('- TODO: Setup server to use https.');
  console.log ('');

  await setupLogging (details);
  await serveStaticContent (details);
  await watchForFileChanges (details);
}

// ----------------------------------------------------------------------
// Logging
import morgan from 'morgan';

export async function setupLogging (details = {}) {
  let { app } = details;
  let { temp } = app;
  let { server } = temp;

  server.use (morgan ('tiny'));
}

// ----------------------------------------------------------------------
// Serve Static Content
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { join } from 'path';

export async function serveStaticContent (details = {}) {
  let { app } = details;
  let { temp } = app;
  let { server } = temp;
  let defaultPage, root;

  // Serve static content
  server = app.temp.server;
  root = join (fileURLToPath (import.meta.url), '..', '..', '..', '..', '..');
  app.data.root = root;

  server.use (serveStatic (join (root, 'public')));
  server.use (serveStatic (join (root, 'src', 'js', 'browser')));

  // Handle all other routes by sending the index.html file
  defaultPage = join (root, 'public', 'index.html');
  server.get ('*', (req, res) => {
    res.sendFile (defaultPage);
  });
}

// ----------------------------------------------------------------------
// Websockets and File Watching
import { Server } from 'socket.io';
import chokidar from 'chokidar';
import { platform } from 'os';

export async function watchForFileChanges (details = {}) {
  let { app } = details;
  let { data, temp } = app;
  let { nodeServer } = temp;
  let { root } = data;
  let io, osname, sockets;

  // Create the sockets
  sockets = {}
  io = new Server (nodeServer, {
    serveClient: true,
  });

  io.on ('connection', (socket) => {
    sockets [socket.id] = socket;

    console.log ('- connecting:', socket.id);

    socket.on ('disconnect', () => {
      console.log ('- disconnecting:', socket.id);
      delete sockets [socket.id];
    });
  });

  // Watch the file
  osname = platform ();
  chokidar.watch ([
    join (root, 'public'),
    join (root, 'src', 'js', 'browser'),
  ], {
    ignoreInitial: true,
  }).on ('all', (event, path) => {
    let id, socket;
    for (id in sockets) {
      socket = sockets [id];

      if (osname === 'win32') {
        path = path.replace (root, '');
        path = path.replaceAll ('\\', '/').substring (1);
      }

      socket.emit ('file change', { file: path });
    }
  });
}
