export async function start (details = {}) {
  try {
    await startSocket ();
    await createApp ();
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

// ----------------------------------------------------------------------
// App
import '/script/library/object-path/start.js';
import '/script/library/axios/start.js';
import '/script/library/route-recognizer/start.js';
import '/script/library/dayjs/start.js';
import '/script/library/simulacra/start.js';

import Mustache from '/script/library/mustache/start.js';

export async function createApp (details = {}) {
  const { axios, dayjs, Navigo, objectPath, routie, } = window;
  let result, router;

  console.log ('- started app', window);

  router = new RouteRecognizer ();
  router.add ([
    {
      path: '/users/bob',
      handler: function () {
        console.log ('wow it works...');
      }
    },
  ]);

  result = router.recognize ('/users/bob');
  console.log ('WHAT:', result);
}
