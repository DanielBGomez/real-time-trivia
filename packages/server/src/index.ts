// Modules
import path from 'path';
import fs from 'fs';

import { Server } from './modules/Server';
import { Store } from './modules/Store';
import { Trivia } from './modules/Trivia';

// Routes
import { TriviaRouter } from './routes/Trivia.route';

// Configs
const SSL = {
  cert: fs.readFileSync(path.resolve('ssl/server.crt')),
  key: fs.readFileSync(path.resolve('ssl/server.key')),
};
const DIST = path.resolve('../../node_modules/client/lib');

// Initialize modules
const store = new Store();
const server = new Server({
  store,
  port: 3100,
  distPath: DIST,
  ssl: SSL
});
const trivia = new Trivia({
  broadcast: server.broadcast,
  message: () => { return; },
  store,
});

// Server listeners
server.on('userLogin', trivia.userConnected);

// Initialize
server.init();

console.log('server init');

// Routes
server.registerRoutes([
  TriviaRouter
]);