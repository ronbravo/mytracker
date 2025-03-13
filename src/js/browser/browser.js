export async function start (details = {}) {
  try {
    let mod;

    await startSocket ();
    mod = await import ('./app/start.js');
    if (mod.startApp) {
      await mod.startApp ();
    }
  }
  catch (err) {
    console.error (err);
  }
}

// ----------------------------------------------------------------------
// Start Socket
import '/socket.io/socket.io.min.js';

export async function startSocket (details = {}) {
  let { io } = window;
  let socket, target;

  target = `ws://${location.hostname}${location.port ? ':' + location.port : ''}`;
  socket = io (target);

  socket.on ('file change', (details) => {
    let { file } = details;
    window.location.reload ();
    if (file.indexOf ('/browser/') > -1 || file.indexOf ('public/') > -1) {
      window.location.reload ();
    }
  });
}
