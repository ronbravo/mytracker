//import '/script/library/dayjs/start.js';
//import '/my-tracker-mithril/start.js';
//import '/my-tracker-simulacra/start.js';
// import Mustache from '/script/library/mustache/start.js';
// import { startSimulacra } from '/my-tracker-simulacra/start.js';

import '/my-tracker-domo/start.js';

listen ({
  path: 'my-tracker/create',
  handler: async function createMyTracker (details = {}) {
    console.log ('**** TRACE ');
  },
});

// ------------------------------------------------
// Not Organized

const FULL_TIME_FORMAT = 'dddd, MMMM DD, YYYY - hh:mm:ss a';

const READY_ENTRY_MODE  = 'ready';
const PAUSE_ENTRY_MODE  = 'paused';
const TRACK_ENTRY_MODE  = 'track';
const DONE_ENTRY_MODE   = 'done';

async function createItem (details = {}) {
  let date, item;

  date = dayjs();
  item = {
    info: {},
    data: {
      name: 'My Tracker',
      description: 'My own simple time tracking app.',
      date: date.format (FULL_TIME_FORMAT),
      logs: [],
    },
    temp: {
      date,
      entry: {
        description: '',
        name: '',
        mode: READY_ENTRY_MODE,
        start: date,
        stop: date,
      },
    },
  }
  return item;
}
