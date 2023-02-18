// Modules
import express, { json, static as Static, Express, Router } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import helmet from 'helmet';
import { Server as SocketServer } from 'socket.io';
import { EventEmitter } from 'stream';

import { Store } from './Store';

// Types
interface ssl {
  cert: Buffer,
  key: Buffer
}
interface ServerProps {
  corsOptions?: object,
  socketOptions?: object,
  ssl?: ssl,
  port?: number,
  distPath?: string,
  store?: Store,
}

// Configs
const DEFAULT_PORT = 3100;

/**
 * Server 
 */
export class Server extends EventEmitter {
  private _App?: Express;
  private _Server?: http.Server | https.Server;
  private _SocketServer?: SocketServer;
  private _Store?: Store;
  private _sessions: { [key: string]: string } = {};

  public port = DEFAULT_PORT;
  public ssl?: ssl;
  public distPath?: string;

  public corsOptions?: object;
  public socketOptions?: object;

  /* eslint-disable-next-line require-jsdoc */
  constructor (props: ServerProps) {
    super();
    // Configs
    this.port = props.port || DEFAULT_PORT;
    this.ssl = props.ssl;
    this.distPath = props.distPath;

    this.corsOptions = props.corsOptions;
    this.socketOptions = props.socketOptions;

    // Modules
    this._Store = props.store;
  }
  
  /**
   * Initialize the server.
   */
  async init (props?: ServerProps) {
    // App
    this._App = express();

    // Middlewares
    this._App.use(cors(props?.corsOptions || this.corsOptions));
    this._App.use(helmet());
    this._App.use(json());
    this._App.use(Static(props?.distPath || this.distPath || 'public', { index: false }));

    // Server
    const ssl = props?.ssl || this.ssl;
    this._Server = ssl ? 
      https.createServer({
        cert: ssl.cert,
        key: ssl.key
      }, this._App) :
      http.createServer(this._App);

    // Socket
    this._SocketServer = new SocketServer(this._Server, {
      connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true,
      },
      // Aditional options
      ...(props?.socketOptions || this.socketOptions || {})
    });
    this._SocketServer.socketsJoin('players');
    this._SocketServer.use((socket, next) => {
      const uuid = socket.handshake.auth.uuid;
      this.emit('userAuth', [socket.id, uuid]);
      this._sessions[uuid] = socket.id;
      console.log(`User connected: ${uuid} - ${socket.id}`);
      next();
    });
    this._SocketServer.on('disconnection', socket => {
      this._sessions[socket.handshake.auth.uuid] = ''; 
    });
    
    // Start
    this._Server.listen(props?.port || this.port);

    console.log(`Server listening on port ${props?.port || this.port}`);
    return this;
  }
  /**
   * Broadcast a message to all socket users in the players namespace.
   */
  broadcast (event: string, data: object): Promise<object | void> | void {
    this._SocketServer?.to('players').emit(event, data);
  }
  /**
   * Emit a message to a certain socket user
   */
  message (to: string, event: string, data: object) {
    const socketId = this._sessions[to as keyof typeof this._sessions];
    if (!socketId) return;
    this._SocketServer?.to(socketId).emit(event, data);
  }
  /**
   * Register routes into the express server.
   */
  registerRoutes (routes: Router | Array<Router>) {
    if (!this._App) console.log('App is not defined');
    if (Array.isArray(routes)) {
      console.log(`Registering ${routes.length} routes`);
      return routes.forEach(route => {
        this._App?.use(route);
        console.log('- Route added.');
      });
    }
    this._App?.use(routes);
    console.log('Route added.');
  } 
}
