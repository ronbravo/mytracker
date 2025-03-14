// ------------------------------------------------
// Core Item System

const NOTHING_ITEM  = '(nothing)';
const SELF_ITEM     = '(self)';

const ITEM_KIND           = 'graceful/core/item';
const LIST_ITEM_KIND      = 'graceful/core/list';
const NUMBER_ITEM_KIND    = 'graceful/core/number';
const TEXT_ITEM_KIND      = 'graceful/core/text';
const ERROR_ITEM_KIND     = 'graceful/core/error';

async function createItem (details = {}) {
  let { data = {}, kind } = details;
  let item;
  
  item = {
    info: {
      item: {
        kind: ITEM_KIND,
        composite: [ITEM_KIND],
      },
    },
    link: {
      from: {
        ordered: {},
        tagged: {},
      },
      to: {
        ordered: {},
        tagged: {},
      },
    },
    storage: {
      0: '(nothing)',
      1: '(self)',
    },
    temp: {},
  }
  
  if (kind) {
    item.info.item.kind = kind;
    item.info.item.composite.push (kind);
  }
  
  return item;
}

// ------------------------------------------------
// Environment

let shared;
async function getEnvironment (details = {}) {
  let { name = 'main' } = details;
  let area;
  
  if (!shared) {
    shared = await createItem ();
  }
  
  area = shared.area [name];
  if (!area) {
    area = await createEnvironment ({ name }),
    shared.area [name] = area;
  }
  return area;
}

// ------------------------------------------------
// Link Items
async function createLink (details) {  
}

//shared.enviornment = await createItem ();
//  environment: {},
//  
//  // OLD...
//  area: {},
//  actions: {},
//  storage: {},
//}

//const shared = {
//  environment: {},
//  
//  // OLD...
//  area: {},
//  actions: {},
//  storage: {},
//}

// ------------------------------------------------
// App

export async function startApp (details = {}) {
  console.log ('- started app', window);
  
  await import ('/my-tracker-domo/start.js');
  
  await action ({
    name: 'my-tracker/create',
    // NOTE: In graceful we would convert data to a graceful item and list structure
    data: {
      name: 'My Tracker',
      description: 'My personal and simple task and time tracker app.',
      entry: {
        end: 0,
        start: 0,
        mode: 'ready',
      },
      history: [],
    },
  });
}

// ------------------------------------------------
// My Tracker App

onAction ({
  name: 'my-tracker/create',
  response: async function createMyTrackerApp (details = {}) {
    console.log ('create the my tracker app...');
  },
});












// ------------------------------------------------
// Core system

// Data to store
async function getData (details = {}) {}
async function setData (details = {}) {}

async function beforeData (details = {}) {}
async function afterData (details = {}) {}

async function onData (details = {}) {
  let main;
  main = await getEnvironment ();
}

async function createEnvironment (details = {}) {
  let { name = 'no name' } = details;
  let area;
  
  area = createItem ({ 
    data: { name },
  });
  
//  area = {
//    name,
//    action: {},
//    storage: {
//      0: '(nothing)',
//      1: '(self)',
//      2: {},
//    },
//  }
  
  return area;
}

globalThis.onData = onData;

// Action
async function onAction (details = {}) {
  let { name, response } = details;
  let area, list;
  
  if (!name) { throw new Error ('action handler needs a name.'); }
  if (!response) { throw new Error ('action handler needs a response handler.'); }
  
  area = await getEnvironment ();
//  list = name.split ('/');
//  console.log (list);
}

async function beforeAction () {}
async function afterAction () {}

async function action (details = {}) {
  let { data = {}, name } = details;
  let area, ensure, list, result;
  
  if (!name) { throw new Error ('must provide a name for target action.'); }
  
  area = await getEnvironment ();
  return console.log (JSON.stringify (area, null, 2));
  
  list = name.split ('/');
  console.log (list);
  
  ensure = [];
  await nextPathSection ({
    ensure,
    list,
    current: area.action,
  });
  
  if (ensure.length) {
    console.log ('created action path for name: (' + name + ')');
    console.log (JSON.stringify (area.action, null, 2));
  }
}

async function nextPathSection (details = {}) {
  let { current, ensure, index = 0, list } = details;
  let item, tag;

  tag = list [index];
  item = current [tag];
 
  if (!item && ensure && index < (list.length - 1)) {
    item = await createItem ();
    
    current [tag] = item;
    ensure.push (tag);
    console.log ('creating:', index, tag);
  }
  
  if (item) {
    details.index = index + 1;
    details.current = item;
    await nextPathSection (details);
  }
}

globalThis.action = action;
globalThis.afterAction = afterAction;

// ------------------------------------------------
// BRAINSTORM

//  await action ({
//    name: 'set-data',
//    data: { target: 'bravo/apps/my-tracker', end: Date.now (), start: Date.now () },
//  });
//  
//  await action ({
//    name: 'my-tracker/start-tracking-time',
//    data: { target: 'bravo/apps/my-tracker', end: Date.now (), start: Date.now () },
//  });

//onData ({ path: 'bravo/apps/my-tracker', handler: async function createMyTrackerVisuals (details = {}) {
//  console.log ('- Add a ui to my-tracker');
//}});
//
//onAction ({ path: 'my-tracker/start-tracking-time', handler: async function startTrackingTime (details = {}) {
//  console.log ('- start tracking time');
//}});

// ------------------------------------------------
// OLD CODE

  //  setData ({ path: 'app/my-tracker', data: {
//    name: 'My Tracker',
//    description: 'My personal time and task tracker app',
//  }});
  
  
//  let item;
//  
//  item = {
//    name: 'bob',
//    age: 32,
//    city: 'phoenix',
//  }
//  
//  setData ('app/my-tracker', item)

//  send ({ path: 'app/my-tracker', item });
//  addItem ('app/my-tracker', item);
  // setData ('app/my-tracker', item);
  
//  setPath ();
//  await import ('./my-tracker/start.js');  
//  emit ({ path: 'my-tracker/create' });
//}

//import '/script/library/route-recognizer/start.js';
//
//const {
//  // axios, dayjs, Navigo, objectPath, routie, less,
//  RouteRecognizer,
//} = window;
//
//async function getRouter (details = {}) {
//  let router;
//  router = shared.router;
//  if (!router) {
//    router = new RouteRecognizer ();
//    shared.router = router;
//  }
//  return router;
//}
//  
//async function emit (details = {}) {
//  let { path } = details;
//  let result, router;
//
//  router = await getRouter ();
//  result = router.recognize (path);
//  
//  if (result && result.length) {
//    await runNextHandler ({
//      path,
//      list: result,
//      index: 0,
//    });
//  }
//  else {
//    console.error ('route was not found:', path);
//  }
//}
//
//async function listen (details = {}) {
//  let { handler, path } = details;
//  let router;
//  
//  if (handler) {
//    router = await getRouter ();
//    router.add ([
//      {
//        path,
//        handler,
//      },
//    ]);
//  }
//  else {
//    console.error ('a handler must be provided to accept messages on path: [' + path + ']');
//  }
//}
//
//globalThis.emit     = emit;
//globalThis.listen   = listen;
//
//async function runNextHandler (details = {}) {
//  let { index = 0, list, path } = details;
//  let item;
//  
//  item = list [index];
//  if (item) {
//    details.index = index + 1;
//    
//    if (item.handler) {
//      console.log (item);
//      await item.handler ();
//    }
//    else {
//      console.error ('handler not provided for path: [' + path + ']');
//    }
//    
//    await runNextHandler (details);
//  }
//}
