// Modules
import path from 'path';
import fs from 'fs-extra';
import { Server } from './modules/Server';

// Configs
const SSL = {
  cert: fs.readFileSync(path.resolve('ssl/server.crt')),
  key: fs.readFileSync(path.resolve('ssl/server.key')),
};
const DIST = path.resolve('../../node_modules/client/lib');

// Create and initialize server.
const server = Server();
server.init({
  port: 3100,
  distPath: DIST,
  ssl: SSL,
});
