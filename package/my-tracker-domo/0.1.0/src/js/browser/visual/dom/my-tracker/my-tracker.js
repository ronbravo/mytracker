onData ({ 
  change: 'app/my-tracker', 
  response: async function createMyTrackerVisuals (details = {}) {
    console.log ('- on data for adding my-tracker, add ui.');
  },
});

afterAction ({ 
  name: 'my-tracker/create', 
  response: async function afterCreateTracker (details = {}) {
    console.log ('- after action creating the tracker, add ui');
  
    let dom;
    dom = document.createElement ('div');
    div.innerHTML = `
      <h1>My Tracker</h1>
    `.trim ();
    document.body.appendChild (dom);
  },
});








//
//// ------------------------------------------------
//// import '/script/library/object-path/start.js';
//import '/script/library/axios/start.js';
//import '/script/library/dayjs/start.js';
//import '/script/library/simulacra/start.js';
//import '/script/library/less/start.js';
//
//export async function startSimulacra (details = {}) {
//  await createDomUi ();
//}
//
//async function createDomUi (details = {}) {
//  // await loadTemplate ();
//  // await loadStyle ();
//}
//
//async function loadStyle () {
//  let dom, parent, path, reply;
//
//  path = '/app/app.less';
//  parent = (await selectDom ({ create: true, class: 'app main style area' })) [0];
//  reply = await axios (path, {
//    headers: {
//      accept: 'text/plain',
//    },
//  });
//  dom = document.createElement ('style');
//  dom.dataset.path = path;
//
//  await new Promise ((done, cancel) => {
//    less.render (reply.data).then (function (result) {
//      // console.log ('less:', result);
//      dom.textContent = result.css;
//      parent.appendChild (dom);
//      done ();
//    },
//    function (err) {
//      console.error (err);
//      cancel (err);
//    });
//  })
//
//}
//
//async function loadTemplate () {
//  let html, parent, reply;
//
//  parent = (await selectDom ({ create: true, class: 'app main area' })) [0];
//  reply = await axios ('/app/app.html');
//  html = reply.data;
//  parent.innerHTML = html;
//  // console.log ('html:', reply.data, parent);
//}
//
//async function selectDom (details = {}) {
//  let { class: className, create, selector = '', target = document.body } = details;
//  let dom, list;
//
//  if (className) {
//    selector = '.' + className.trim ().replace (new RegExp (`\\s+`, 'g'), '.')
//    // console.log (selector);
//  }
//
//  list = target.querySelectorAll (selector);
//  list = [].slice.call (list);
//
//  if (!list.length && create) {
//    dom = document.createElement ('div');
//
//    if (className) {
//      dom.className = className;
//    }
//
//    target.appendChild (dom);
//    list.push (dom);
//  }
//  return list;
//}
//
//// ----------------------------------------------------------------------
//// App
//
//// reply = await axios ('/app/app.html');
//// console.log ('WHAT:', reply.data);
//
//// router.add ([
////   {
////     path: '/users/bob',
////     handler: function () {
////       console.log ('wow it works...');
////     }
////   },
//// ]);
//// result = router.recognize ('/users/bob');
//// console.log ('WHAT:', result);
