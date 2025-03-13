import { createApp } from './app.js';

export async function startApp (details = {}) {
  console.log ('- started app', window);
  await createApp ();
}
